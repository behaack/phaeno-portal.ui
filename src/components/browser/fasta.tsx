import { useEffect, useMemo, useRef } from 'react';
import { IconDna } from '@tabler/icons-react';
import { EOrganizationType } from '@/assets/enums/_index';
import { IFasta } from '@/assets/interfaces/_index';
import { GenomicPaginator, IncrementalSearchInput } from '@/components/_index';
import { useDatabase } from '@/hooks/useDatabase';
import { useDeviceSize } from '@/hooks/useDeviceSize';
import { useAuthStore } from '@/stores/authStore';
import { IGenomicStore, useBrowserStore } from '@/stores/browserStore';
import { IBrowserProps } from './IBrowserProps';
import { NIL } from 'uuid';
import { useNavigate } from '@tanstack/react-router';
import IGenomicList from '@/assets/interfaces/items/IGenomicList';
import FastaList from '@/components/fasta/List';
import FastaTable from '@/components/fasta/Table';
import isEqual from 'lodash/isEqual';

export default function Fastas({ sampleId, searchValues }: IBrowserProps) {
  const navigate = useNavigate()
  const db = useDatabase();
  const authStore = useAuthStore();
  const browserStore = useBrowserStore();
  const [width] = useDeviceSize();

  const prevRef = useRef({
    sampleId,
    fasta: browserStore.fasta,
  });    

  useEffect(() => {
    if (searchValues.subject !== 'fasta')  { 
      getData();
      return;
    }
    const fastaStore: IGenomicStore<IFasta> = {
      ...browserStore.fasta,
      pageNo: searchValues.pageno,
      search: searchValues.search || '',
      cursorId: searchValues.cursorid,
      cursorValue: searchValues.cursorvalue,
      direction: searchValues.direction,
      hasAdditional: searchValues.hasadditional || true,  
    }
    browserStore.setFastaStore(fastaStore)
  }, []);   

  useEffect(() => {
    const hasChanged = prevRef.current.sampleId !== sampleId || !isEqual(prevRef.current.fasta, browserStore.fasta);
    if (hasChanged) {
      getData();
    }
  }, [sampleId, browserStore.fasta]);

  const listUrl = useMemo(() => {
    if (authStore.authToken?.organization.organizationType === EOrganizationType.Phaeno) {
      return `fastas/ForOrganization/${authStore.selectedOrganization?.value}`;
    }
    return 'fastas';
  }, [authStore.authToken?.organization, authStore.selectedOrganization?.value]);

  const getData = async () => {
    const {search, cursorId, cursorValue, direction } = browserStore.fasta
    if (!search) {
      browserStore.resetFastaStore()
      return;
    }
    const id = cursorId ? `&lastId=${cursorId}` : ``;
    const value = cursorValue ? `&cursor=${cursorValue}` : ``;
    const url = `${listUrl}?sampleId=${sampleId}&search=${search}${id}${value}&direction=${direction}`;
    db.httpGet<IGenomicList<IFasta>>(url, true).then((response) => {
      if (response.success) {
        if (response.data) {
          const fastaStore = {
            ...browserStore.fasta,
            cursorId: response.data.nextId,
            cursorValue: response.data.cursor,
            hasAdditional: response.data.hasAdditional,
            list: response.data.list
          }
          prevRef.current = {
            sampleId,
            fasta: fastaStore,
          };          
          browserStore.setFastaStore(fastaStore);
          navigate({
            to: '/browser',
            search: {
              ...searchValues,
              pageno: fastaStore.pageNo,
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
    const store = browserStore.fasta 
    navigate({
      to: '/browser',
      search: {
        ...searchValues,
        search: value
      },
    });
    setTimeout(() => {
      browserStore.setFastaStore({
        ...store,
        search: value
      })
    }, 25);      
  };

  const onPrevPage = () => {
    const fasta = browserStore.fasta;
    if (fasta.pageNo > 1) {
      if (fasta.list.length) {
        const cursorId = fasta.list[0].id;
        const cursorValue = fasta.list[0].smid || '';
        browserStore.setFastaStore({
          ...fasta,
          pageNo: --fasta.pageNo,
          cursorId,
          cursorValue,
          direction: 'prev'
        })        
      }
    }
  };

  const onNextPage = () => {
    browserStore.setFastaStore({
      ...browserStore.fasta,
      pageNo: browserStore.fasta.pageNo + 1
    })
  };

  const lookupUrl = useMemo(() => {
    if (authStore.authToken?.organization.organizationType === EOrganizationType.Phaeno) {
      return `fastas/lookup/${authStore.selectedOrganization?.value}`;
    }
    return 'fastas/lookup';
  }, [authStore.authToken?.organization, authStore.selectedOrganization?.value]);

  return (
    <div>
      <h2 className="flex items-center gap-2 text-[1.1rem] mt-2">
        <IconDna /> 
        Fasta Browser
      </h2>
      <div>
        <IncrementalSearchInput
          lookupUrl={lookupUrl}
          searchValue={browserStore.fasta.search || ''}
          placeholder="Search SMID"
          onChange={searchChg}
        />
      </div>
      {width >= 750 ? (
        <FastaTable
          data={browserStore.fasta.list}
          forAllSamples={sampleId === NIL}
        />
      ) : (
        <FastaList
          data={browserStore.fasta.list}
          forAllSamples={sampleId === NIL}
        />
      )}
      {browserStore.fasta.list.length ? (
        <div className="flex justify-center">
          <GenomicPaginator
            page={browserStore.fasta.pageNo}
            hasAdditional={browserStore.fasta.hasAdditional}
            onPreviousPage={onPrevPage}
            onNextPage={onNextPage}
          />
        </div>
      ) : 
        <div className="text-center text-lg font-bold mt-5">
          <span>{`${browserStore.fasta.search ? 'No records' : 'To see data try doing a Search'}`}</span>
        </div>    
      }
    </div>
  );
}
