import { FormEvent, useRef, useEffect, useMemo } from 'react';
import { IFasta, ISqlAiDto, ITranscript } from '@/assets/interfaces/_index';
import { useDatabase } from '@/hooks/useDatabase';
import { Button, Textarea } from '@mantine/core';
import { useAuthStore } from '@/stores/authStore';
import { emptyNaturalLanguageStore, INaturalLanguageStore, useBrowserStore } from '@/stores/browserStore';
import { EOrganizationType, ERenderType, ESqlAiEntityType } from '@/assets/enums/_index';
import { NIL } from 'uuid';
import { IconLanguage } from '@tabler/icons-react';
import isEqual from 'lodash/isEqual';
import AggregationTable from '../aggregationData/table';
import AggregationMetric from '../aggregationData/metric';
import FastaTable from '../fasta/Table';
import TranscriptTable from '../transcript/Table';
import GenomicPaginator from '../GenomicPaginator';

export interface IData {
  organizationId: string;
  requestString: string;
}

export default function NaturalLanguage() {
  const db = useDatabase();
  const authStore = useAuthStore();
  const browserStore = useBrowserStore();
  
  const prevRef = useRef({
    store: browserStore.naturalLanguage,
  });    

  useEffect(() => {
    const hasChanged = !isEqual(prevRef.current.store, browserStore.naturalLanguage);
    if (hasChanged) {
      if (browserStore.naturalLanguage.runDisabled) {
        getData();
      }
    }
  }, [browserStore.naturalLanguage]);  

  const submitHndl = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getData();
  }
  
  const getData = () => {
    if (!browserStore.naturalLanguage.qryValue) { return }
    let organizationId = '';
    if (authStore.authToken?.organization.organizationType === EOrganizationType.Customer) {
      organizationId = authStore.authToken?.organization.id
    } else {
      if (authStore.selectedOrganization === null) { return }
      organizationId = authStore.selectedOrganization?.value ?? NIL
    }
    
    let data: any;
    let url = ""
    if (browserStore.naturalLanguage.runDisabled) {
      const { sql, cursorId, cursorValue, direction, pageNo } = browserStore.naturalLanguage
      url = "AiDataAssistant/ChangePage"
      data = {
        requestString: browserStore.naturalLanguage.qryValue,
        sql,
        cursor: cursorValue,
        lastId: cursorId ?? 0,
        direction,
        pageNo,
        pageSize: 25
      }            
    } else {
      url = "AiDataAssistant/DataFromString"
      data = {
        organizationId,
        requestString: browserStore.naturalLanguage.qryValue
      }      
    }

    db.httpPost<ISqlAiDto, any>(url, data, true).then((response) => {
      if (response.success) {
        if (response.data) {
          let store: INaturalLanguageStore = {
            ...browserStore.naturalLanguage,
            runDisabled: true,
            error: '',
            title: (response.data.title) ? response.data.title : browserStore.naturalLanguage.title,
            sql: response.data.sql,
            renderType: response.data.renderType,
            entityType: response.data.entityType,
            hasAdditional: response.data.hasAdditional,
            cursorValue: response.data.cursor,
            cursorId: response.data.nextId,
            columns: response.data.columns  
          }
          const genomeData = response.data.results;
          if (response.data.entityType === ESqlAiEntityType.Fasta) {
            store = {
              ...store,
              fastaList: genomeData as IFasta[],
              transcriptList: [],
            }
          } else if (response.data.entityType === ESqlAiEntityType.Transcript)  {
            store = {
              ...store,
              fastaList: [],
              transcriptList: genomeData as ITranscript[],
            }
          } else if (response.data.entityType === ESqlAiEntityType.Aggregation) {
            store = {
              ...store,
              fastaList: [],
              transcriptList: [],
              aggregationList: genomeData as any[],
            }            
          }
          prevRef.current = {
            store,
          };          
          browserStore.setNaturalLanguageStore(store);
        }
      } else if (response.error?.status === 460) {        
        const store: INaturalLanguageStore = {
          ...emptyNaturalLanguageStore,
          // @ts-ignore
          error: response.error?.response?.data?.detail,
        }
        browserStore.setNaturalLanguageStore(store);
      }
    });
  };

  const onNextPage = () => {
    browserStore.setNaturalLanguageStore({
      ...browserStore.naturalLanguage,
      pageNo: browserStore.naturalLanguage.pageNo + 1
    })
  }

  const onPrevPage = () => {
    const store = browserStore.naturalLanguage
    const entityType = store.entityType;
    if (store.pageNo === 1) { return }
    
    if (entityType === ESqlAiEntityType.Aggregation) {
            browserStore.setNaturalLanguageStore({
              ...store,
              pageNo: store.pageNo - 1
            })
    } else {
      let cursorId: number = 0;
      let cursorValue: string = "";
      if (entityType === ESqlAiEntityType.Fasta) {
        const fasta = store.fastaList;
        if (fasta.length) {
          cursorId = fasta[0].id;
          cursorValue = fasta[0].smid || '';
        }
      } else {
        const transcript = store.transcriptList;
        if (transcript.length) {
          cursorId = transcript[0].id;
          cursorValue = transcript[0].gene_symbol || '';
        }
      }
      browserStore.setNaturalLanguageStore({
        ...store,
        pageNo: store.pageNo - 1,
        cursorId,
        cursorValue,
        direction: 'prev'
      })          
    }
  }

  const clearResults = () => {
    browserStore.resetNaturalLanguageStore();
  }

  const setQueryValue = (qryValue: string) => {
    const value: INaturalLanguageStore = {
      ...browserStore.naturalLanguage,
      qryValue
    }
    
    browserStore.setNaturalLanguageStore(value);
  }

  const showFastaData = useMemo(() => {
    return browserStore.naturalLanguage.entityType === ESqlAiEntityType.Fasta;
  }, [browserStore.naturalLanguage.entityType])

  const showTranscriptData = useMemo(() => {
    return browserStore.naturalLanguage.entityType === ESqlAiEntityType.Transcript;
  }, [browserStore.naturalLanguage.entityType])  

  const showAggregateList = useMemo(() => {
    return (browserStore.naturalLanguage.entityType === ESqlAiEntityType.Aggregation && browserStore.naturalLanguage.renderType === ERenderType.Table);
  }, [browserStore.naturalLanguage.entityType])    

  const showAggregateMetric = useMemo(() => {
    return (browserStore.naturalLanguage.entityType === ESqlAiEntityType.Aggregation && browserStore.naturalLanguage.renderType === ERenderType.Metric);
  }, [browserStore.naturalLanguage.entityType])   
  
  const activeList = useMemo(() => {
    if (showFastaData) {
      return browserStore.naturalLanguage.fastaList
    }
    if (showTranscriptData) {
      return browserStore.naturalLanguage.transcriptList
    }
    if (showAggregateList || showAggregateMetric) {
      return browserStore.naturalLanguage.aggregationList
    }
    return null        
  }, [browserStore.naturalLanguage.entityType])   

  return (
    <div>
      <h2 className="flex items-center gap-2 text-[1.1rem] mt-2">
        <IconLanguage /> 
        Natural Language Browser
      </h2>      

      <form onSubmit={(e) => submitHndl(e)}>
        <Textarea 
          label="Type request" 
          description="Request either fasta data or transcript data" 
          placeholder="Type request" 
          value={browserStore.naturalLanguage.qryValue}
          onChange={(event) => setQueryValue(event.currentTarget.value)}          
          disabled={browserStore.naturalLanguage.runDisabled}
        />
        <div className="flex justify-end gap-2 mt-1 mb-3">
          <Button
            color="black"
            onClick={clearResults}
            disabled={!browserStore.naturalLanguage.runDisabled}
          >
            Clear Request
          </Button>          
          <Button
            type="submit" 
            disabled={browserStore.naturalLanguage.runDisabled || !browserStore.naturalLanguage.qryValue}
          >
            Run Request
          </Button>
        </div>
      </form>

      {(!browserStore.naturalLanguage.runDisabled) ? <div className="text-center text-lg font-bold mt-5">To see data make a request</div> : null}      
      {(browserStore.naturalLanguage.error) ? <div className="text-red-500 text-md text-center">{ browserStore.naturalLanguage.error }</div> : null }
      {(!showAggregateMetric)? <h3 className="natural-lang-title">{ browserStore.naturalLanguage.title }</h3> : null }

      {(showFastaData) ? (
        <FastaTable
          data={browserStore.naturalLanguage.fastaList}
          forAllSamples 
        />
      ): null}

      {(showTranscriptData) ? (
        <TranscriptTable
          data={browserStore.naturalLanguage.transcriptList}
          forAllSamples 
        />
      ): null}

      {(showAggregateList) ? (
        <AggregationTable 
          rows={browserStore.naturalLanguage.aggregationList}
          columns={browserStore.naturalLanguage.columns}
        />
      ): null}

      {(showAggregateMetric) ? (
        <AggregationMetric 
          title={browserStore.naturalLanguage.title}
          rows={browserStore.naturalLanguage.aggregationList}
          columns={browserStore.naturalLanguage.columns}
        />
      ): null}

      {(browserStore.naturalLanguage.runDisabled && !showAggregateMetric) ? (
        <div className="flex justify-center">
          {(activeList?.length) ? (
              <GenomicPaginator
                page={browserStore.naturalLanguage.pageNo}
                hasAdditional={browserStore.naturalLanguage.hasAdditional}
                onPreviousPage={onPrevPage}
                onNextPage={onNextPage}
              />
            ) : (
              <div className="mt-3">No records meet your request criteria</div>
            )
          }
        </div>      
      ): null}
    </div>
  );
};
