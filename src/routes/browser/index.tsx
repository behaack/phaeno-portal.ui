import { useMemo } from "react";
import { beforeLoadAuth } from "@/assets/route-guard";
import { searchSchema } from "@/assets/route-validator/genome";
import { BrowserErrorBoundary } from "@/components/errorBoundries/Browser";
import { IconBrowser, IconDna, IconDna2, IconLanguage } from "@tabler/icons-react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Tabs } from "@mantine/core";
import { IGenomicStore, INaturalLanguageStore, useBrowserStore } from "@/stores/browserStore";
import { IFasta, ITranscript } from "@/assets/interfaces/_index";
import { useAuthStore } from "@/stores/authStore";
import { EOrganizationType } from "@/assets/enums/_index";
import { NIL } from "uuid";
import SampleSelector from "@/components/SampleSelector";
import Transcripts from "@/components/browser/transcripts";
import Fastas from "@/components/browser/fasta";
import NaturalLanguage from "@/components/browser/natural-language";

export const Route = createFileRoute("/browser/")({
  component: BrowserIndex,
  validateSearch: (search) => searchSchema.parse(search),
  beforeLoad: beforeLoadAuth,
  errorComponent: BrowserErrorBoundary,
});

function BrowserIndex() {
  const navigate = useNavigate()
  const authStore = useAuthStore()
  const browserStore = useBrowserStore()
  const searchValues = Route.useSearch();
  const { subject = 'transcript', sampleid } = Route.useSearch();

  const tabChangeHndl = (tabValue: string | null) => {
    if (!tabValue) { return };
    const subject = tabValue as 'transcript' | 'fasta' | 'natural-language'
    let storeValues: IGenomicStore<IFasta> | IGenomicStore<ITranscript> | INaturalLanguageStore;
    switch (subject) {
      case 'fasta':
        storeValues = browserStore.fasta
        break;
      case 'transcript':
        storeValues = browserStore.transcript
        break;
      case 'natural-language':
        storeValues = browserStore.naturalLanguage
    }
    navigate({
      to: Route.to,
      search: {
        subject,
        sampleid: sampleid ?? '',
        pageno: storeValues.pageNo,
        search: storeValues.search,
        cursorid: storeValues.cursorId,
        cursorvalue: storeValues.cursorValue,
        direction: storeValues.direction,
        hasadditional: storeValues.hasAdditional,
      },
    });    
  }

  const sampleChangeHndl = (sampleId : string | null | undefined) => {
    if (!sampleId) { return };
    navigate({
      to: Route.to,
      search: {
        ...searchValues,
        subject: subject || '',
        sampleid: sampleId || NIL,
      },
    });  
  }

  const viewContents = useMemo(() => {
    if (authStore.authToken?.organization.organizationType === EOrganizationType.Phaeno) {
      return authStore.selectedOrganization != null
    }
    return true;
  }, [authStore.authToken?.organization, authStore.selectedOrganization])


  return (
    <main>
      <section>
        <h1 className="flex items-center gap-2">
          <IconBrowser size={25} />
          PSeq Browser
        </h1>        
        
        {(viewContents)
          ? (
            <>
              <SampleSelector 
                onSampleChange={sampleChangeHndl}
                sampleId={sampleid ?? NIL}
              />
              <Tabs className="mt-5" value={subject} onChange={tabChangeHndl}>
                <Tabs.List>
                  <Tabs.Tab value="transcript" leftSection={<IconDna size={12} />}>
                    Transcript
                  </Tabs.Tab>
                  <Tabs.Tab value="fasta" leftSection={<IconDna2 size={12} />}>
                    FastA
                  </Tabs.Tab>  
                  <Tabs.Tab value="natural-language" leftSection={<IconLanguage size={12} />}>
                    Nat'l Lang
                  </Tabs.Tab>                         
                </Tabs.List>
                <Tabs.Panel value="transcript">
                  <Transcripts 
                    sampleId={sampleid}
                    searchValues={searchValues}
                  />
                </Tabs.Panel>

                <Tabs.Panel value="fasta">
                  <Fastas 
                    sampleId={sampleid}
                    searchValues={searchValues}
                  />
                </Tabs.Panel>  

                <Tabs.Panel value="natural-language">
                  <NaturalLanguage />
                </Tabs.Panel>                    
              </Tabs>
            </>
          ) : (
            <div className="text-center mt-10">To view data, select an organization from the dropdown menu.</div>
          )
        }
      </section>
    </main>
  )
}