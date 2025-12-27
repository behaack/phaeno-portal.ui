import { useEffect, useMemo, useRef } from 'react';
import { IconDna2 } from '@tabler/icons-react';
import { EOrganizationType } from '@/assets/enums/_index';
import { ITranscript } from '@/assets/interfaces/_index';
import { GenomicPaginator, IncrementalSearchInput } from '@/components/_index';
import { useDatabase } from '@/hooks/useDatabase';
import { useDeviceSize } from '@/hooks/useDeviceSize';
import { useAuthStore } from '@/stores/authStore';
import { IGenomicStore, useBrowserStore } from '@/stores/browserStore';
import { IBrowserProps } from './IBrowserProps';
import { NIL } from 'uuid';
import { useNavigate } from '@tanstack/react-router';
import IGenomicList from '@/assets/interfaces/items/IGenomicList';
import TranscriptList from '@/components/transcript/List';
import TranscriptTable from '@/components/transcript/Table';
import isEqual from 'lodash/isEqual';

export default function Transcripts({ sampleId, searchValues }: IBrowserProps) {
  const navigate = useNavigate()
  const db = useDatabase();
  const authStore = useAuthStore();
  const browserStore = useBrowserStore();
  const [width] = useDeviceSize();

  const prevRef = useRef({
    sampleId,
    transcript: browserStore.transcript,
  });  

  useEffect(() => {
    if (searchValues.subject !== 'transcript')  { 
      getData();
      return;
    }
    const transcriptStore: IGenomicStore<ITranscript> = {
      ...browserStore.transcript,
      pageNo: searchValues.pageno,
      search: searchValues.search || '',
      cursorId: searchValues.cursorid,
      cursorValue: searchValues.cursorvalue,
      direction: searchValues.direction,
      hasAdditional: searchValues.hasadditional || true,  
    }
    browserStore.setTranscriptStore(transcriptStore)
  }, []);  

  useEffect(() => {
    const hasChanged = prevRef.current.sampleId !== sampleId || !isEqual(prevRef.current.transcript, browserStore.transcript);
    if (hasChanged) {
      getData();
    }
  }, [sampleId, browserStore.transcript]);
  
  const listUrl = useMemo(() => {
    if (authStore.authToken?.organization.organizationType === EOrganizationType.Phaeno) {
      return `transcripts/ForOrganization/${authStore.selectedOrganization?.value}`;
    }
    return 'transcripts';
  }, [authStore.authToken?.organization, authStore.selectedOrganization?.value]);

  const getData = () => {
    const {search, cursorId, cursorValue, direction } = browserStore.transcript
    if (!search) {
      browserStore.resetTranscriptStore();
      return;
    }
    const id = cursorId ? `&lastId=${cursorId}` : ``;
    const value = cursorValue ? `&cursor=${cursorValue}` : ``;
    const url = `${listUrl}?sampleId=${sampleId}&search=${search}${id}${value}&direction=${direction}`;
    db.httpGet<IGenomicList<ITranscript>>(url, true).then((response) => {
      if (response.success) {
        if (response.data) {
          const transcriptStore = {
            ...browserStore.transcript,
            cursorId: response.data.nextId,
            cursorValue: response.data.cursor,
            hasAdditional: response.data.hasAdditional,
            list: response.data.list
          }
          prevRef.current = {
            sampleId,
            transcript: transcriptStore,
          };          
          browserStore.setTranscriptStore(transcriptStore)
          navigate({
            to: '/browser',
            search: {
              ...searchValues,
              pageno: transcriptStore.pageNo,
              cursorid: response.data.nextId,
              cursorvalue: response.data.cursor,
              direction: 'next',
              hasadditional: response.data.hasAdditional,
            },
          });            
        }
      }
    });
  };

  const searchChg = (value: string) => {
    const store = browserStore.transcript 
    navigate({
      to: '/browser',
      search: {
        ...searchValues,
        search: value
      },
    });
    setTimeout(() => {
      browserStore.setTranscriptStore({
        ...store,
        search: value
      })
    }, 25);
  };

  const onPrevPage = () => {
    const transcript = browserStore.transcript;
    if (transcript.pageNo > 1) {
      if (transcript.list.length) {
        const cursorId = transcript.list[0].id;
        const cursorValue = transcript.list[0].gene_symbol || '';
        browserStore.setTranscriptStore({
          ...transcript,
          pageNo: transcript.pageNo - 1,
          cursorId,
          cursorValue,
          direction: 'prev'
        })        
      }
    }
  };

  const onNextPage = () => {
    browserStore.setTranscriptStore({
      ...browserStore.transcript,
      pageNo: browserStore.transcript.pageNo + 1
    })    
  };

  const lookupUrl = useMemo(() => {
    if (authStore.authToken?.organization.organizationType === EOrganizationType.Phaeno) {
      return `transcripts/lookup/${authStore.selectedOrganization?.value}`;
    }
    return 'transcripts/lookup';
  }, [authStore.authToken?.organization, authStore.selectedOrganization?.value]);

  return (
    <div>
      <h2 className="flex items-center gap-2 text-[1.1rem] mt-2">
        <IconDna2 />
        Transcript Browser
      </h2>
      <IncrementalSearchInput
        lookupUrl={lookupUrl}
        searchValue={browserStore.transcript.search || ''}
        placeholder="Search Gene Symbol"
        onChange={searchChg}
      />
      {width >= 750 ? (
        <TranscriptTable
          data={browserStore.transcript.list}
          forAllSamples={sampleId === NIL}
        />
      ) : (
        <TranscriptList
          data={browserStore.transcript.list}
          forAllSamples={sampleId === NIL}
        />
      )}
      {browserStore.transcript.list.length ? (
        <div className="flex justify-center">
          <GenomicPaginator
            page={browserStore.transcript.pageNo}
            hasAdditional={browserStore.transcript.hasAdditional}
            onPreviousPage={onPrevPage}
            onNextPage={onNextPage}
          />
        </div>
      ) : 
        <div className="text-center text-lg font-bold mt-5">
          <span>{`${browserStore.transcript.search ? 'No records' : 'To see data try doing a Search'}`}</span>
        </div>      
      }
    </div>
  );
}
