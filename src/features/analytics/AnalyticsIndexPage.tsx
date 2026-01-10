import { lazy, Suspense, useMemo, useRef, useState } from 'react'
import { IconMath } from '@tabler/icons-react'
import { useGetJobs } from '@/api/hooks/job-pipeline.hooks'
import { JobStatusList, JobTypesList } from '@/api/types/job-pipeline'
import { authSession } from '@/auth/auth.session'
import { emptyPagedList } from '@/shared/types/IPagedList'
import { PButton, PSelect } from '@/shared/ui/components'
import { PSearchInput } from '@/shared/ui/components/compound'
import { PDivider } from '@/shared/ui/components/layout'
import { Surface, Text } from '@/shared/ui/primiatives'
import { useImpersonationStore } from '@/stores/impersonation.store'
import { CanViewData } from '../_common/CanViewData'
import { JobListIndex } from './components/JobListIndex'
import { CreateJobModal, IHandles } from './CreateJob.Modal'

const statusMenuList: string[] = ['<All Statuses>', ...JobStatusList]

export function AnalyticsIndexPage() {
  const impersonationStore = useImpersonationStore()
  const [jobType, setType] = useState('Report')
  const [jobStatus, setStatus] = useState('<All Statuses>')
  const [q, setQ] = useState('')
  const jobRef = useRef<IHandles>(null)

  const FormComponent = lazy(() => import(`./forms/${jobType}Form`))

  const jobStatusParameter = useMemo(() => {
    console.log(jobStatus)
    if (jobStatus === '<All Statuses>') return ''
    return jobStatus
  }, [jobStatus])

  console.log(jobStatusParameter)

  const { data } = useGetJobs({ jobType, jobStatus: jobStatusParameter, page: 1, q })

  const createJobHndl = () => {
    jobRef.current?.open()
  }

  const mayViewData = useMemo(() => {
    if (authSession.isPhaeno()) {
      return !!impersonationStore.selectedCustomerId
    }
    return true
  }, [authSession.isPhaeno(), impersonationStore.selectedCustomerId])

  return (
    <Surface className="p-5" fullHeight elevation="sm" hover="none">
      <Text className="flex gap-3 items-center mb-6" variant="heading">
        <IconMath />
        Data Analytics
      </Text>
      <CanViewData>
        <div>
          <CreateJobModal ref={jobRef} title={`Create ${jobType} Job`}>
            <Suspense fallback={<div style={{ minHeight: 280, padding: 16 }}>Loading…</div>}>
              <FormComponent onClose={() => jobRef.current?.close()} />
            </Suspense>
          </CreateJobModal>

          <PSelect
            label="Job Type"
            placeholder="Pick value"
            allowDeselect={false}
            data={JobTypesList}
            value={jobType}
            onChange={(value) => setType(value ?? '')}
          />

          <PSelect
            label="Status"
            placeholder="Pick value"
            allowDeselect={false}
            data={statusMenuList}
            value={jobStatus}
            onChange={(value) => setStatus(value ?? '')}
          />

          <PDivider />

          <div className="flex justify-between mb-1">
            <PSearchInput placeholder="Search" value={q} onChange={(value) => setQ(value)} />
            <PButton
              variant="outline"
              onClick={createJobHndl}
              rightSection={<IconMath size={18} />}
            >
              Create{' '}
            </PButton>
          </div>
          <JobListIndex data={data || emptyPagedList} />
        </div>
      </CanViewData>
    </Surface>
  )
}
