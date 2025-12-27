import { forwardRef, useImperativeHandle, useMemo, useState } from 'react';
import { useDatabase } from '@/hooks/useDatabase';
import { Select } from '@mantine/core';
import { IDataPipelineItem } from '@/assets/interfaces/_index';
import { useAnalyticsStore } from '@/stores/analyticsStore';
import { IconMath } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

import { IUmap, umapFormSchema } from '@/assets/forms/umap';
import { ISummary, summaryFormSchema } from '@/assets/forms/summary';
import { IReport, reportFormSchema } from '@/assets/forms/report';
import { IScore, scoreFormSchema } from '@/assets/forms/score';

import PModalForm from '@/components/PModalForm';
import UmapForm from './UmapForm';
import ReportForm from './ReportForm';
import ScoreForm from './ScoreForm';
import SummaryForm from './SummaryForm';

import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';

import {
  MasterJobFormValues,
  masterJobSchema,
} from '@/assets/forms/masterJobSchema';

// ----------------
// TYPES
// ----------------
export type TJobListType = 'Report' | 'Score' | 'Summary' | 'Umap';

type TSectionTypeMap = {
  Report: IReport;
  Score: IScore;
  Summary: ISummary;
  Umap: IUmap;
};

export interface IProps {}
export interface IHandles {
  open: (type: TJobListType) => void;
}

// ----------------
// COMPONENT
// ----------------
const CreateJobDialog = forwardRef<IHandles, IProps>((_props, ref) => {
  const db = useDatabase();
  const analyticsStore = useAnalyticsStore();

  const [errorMessage, setErrorMessage] = useState('');
  const [jobType, setJobType] = useState<TJobListType>('Report');
  const [open, modalHandlers] = useDisclosure(false);  
  const defaultValues: MasterJobFormValues = {
    jobType: "Report",
    report: { jobName: "", h5adPath: "", outFile: "" },
    score: { jobName: "", h5adPath: "" },
    summary: { jobName: "", h5adPath: "" },
    umap: { jobName: "", h5adPath: "", nNeighbors: 15, minDist: 0.1 },
  };
  // ----------------
  // FORM
  // ----------------
  const form = useForm<MasterJobFormValues>({
    initialValues: defaultValues,
    validate: values => {
      if (!values.jobType) { return {}; }
      return zodResolver(masterJobSchema)(
        values as unknown as Record<string, unknown>
      );
    },
  });

  // Expose methods to the parent
  useImperativeHandle(ref, () => ({
    open(type: TJobListType) {
      initialize(type);
    },
  }));
  
  const initialize = (type: TJobListType) => {
    // Reset full form to default values
    form.setValues({
      ...defaultValues,
      jobType: type,              // set correct job type
    });

    // Clear all touched / errors
    form.resetDirty();
    form.clearErrors();

    setJobType(type);
    setErrorMessage("");
    modalHandlers.open();
  };

  // ----------------
  // SECTION HELPERS
  // ----------------
  const sectionKey = {
    Report: 'report',
    Score: 'score',
    Summary: 'summary',
    Umap: 'umap',
  } as const;

  const getSection = <T extends TJobListType>(
    values: MasterJobFormValues,
    type: T
  ): TSectionTypeMap[T] => {
    return values[sectionKey[type]] as TSectionTypeMap[T];
  };

  const validators: {
    [K in TJobListType]: (
      values: TSectionTypeMap[K]
    ) => Record<string, string | undefined>;
  } = {
    Report: reportFormSchema,
    Score: scoreFormSchema,
    Summary: summaryFormSchema,
    Umap: umapFormSchema,
  };

  const isSectionDirty = (type: TJobListType) =>
    form.isDirty(sectionKey[type]);

  const isSectionValid = (type: TJobListType) => {
    const section = getSection(form.values, type);
    // @ts-ignore Cannot get section to resolve properly
    const errors = validators[type](section);
    return Object.values(errors).every(e => !e);
  };

  // ---------------
  // JOBTYPE CHANGE HANDLE
  const jobTypeChangeHndl = (jobType: TJobListType) => {
    setJobType(jobType)
    form.setFieldValue("jobType", jobType);
  }

  // ----------------
  // SUBMIT + BUTTON DISABLE + DATA EXTRACTION UTILITY
  // ----------------
  const disableSubmit = useMemo(() => {
    return !isSectionDirty(jobType) || !isSectionValid(jobType);
  }, [jobType, form.values]);

  const extractPayload = <T extends TJobListType>(
    values: MasterJobFormValues,
    type: T
  ): TSectionTypeMap[T] => {
    return values[sectionKey[type]] as TSectionTypeMap[T];
  };  

  const submitHndl = (values: MasterJobFormValues) => {
    const payload = extractPayload(values, jobType);
    db.httpPost<IDataPipelineItem, IUmap | ISummary | IReport | IScore
    >(`DataPipeline/${jobType}`, payload, true).then(response => {
      if (response.success && response.data) {
        const item = response.data;
        analyticsStore.setdataPipelinePagedList({
          ...analyticsStore.dataPipelinePagedList,
          list: [item, ...analyticsStore.dataPipelinePagedList.list],
        });
        modalHandlers.close()
      }
    });
  };

  // ----------------
  // RENDER
  // ----------------
  return (
    <PModalForm
      title={`Create ${jobType} Job`}
      icon={<IconMath size={21} />}
      errorMessage={errorMessage}
      disableSubmit={disableSubmit}
      opened={open}
      onClose={() => modalHandlers.close()}
      onSubmit={form.onSubmit(submitHndl)}
      actionBtnLabel="Submit"
      size="lg"
    >
      <Select
        label="Job Type"
        placeholder="Pick value"
        data={['Report', 'Score', 'Summary', 'Umap']}
        allowDeselect={false}
        value={jobType}
        onChange={value => jobTypeChangeHndl(value as TJobListType)}
      />

      {jobType === 'Report' && <ReportForm form={form} />}
      {jobType === 'Score' && <ScoreForm form={form} />}
      {jobType === 'Summary' && <SummaryForm form={form} />}
      {jobType === 'Umap' && <UmapForm form={form} />}
    </PModalForm>
  );
});

export default CreateJobDialog;
