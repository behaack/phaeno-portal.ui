import { PTabs, PTabsList, PTabsPanel, PTabsTab } from "@/_shared/ui/components/layout";
import { IconLanguage } from "@tabler/icons-react";
import { IconDna2 } from "@tabler/icons-react";
import { IconDna } from "@tabler/icons-react";
import { NIL } from "uuid";
import { useNavigate } from "@tanstack/react-router";
import { Route } from "@/routes/browser/index"
import SampleSelector from "./components/SampleSelector";

type TabType = 'transcript' | 'fasta' | 'natural-language'

export function BrowserIndexPage() {
  const navigate = useNavigate()  
  const search = Route.useSearch()
  const { subject='transcript', sampleid }  = Route.useSearch()

  const sampleChangeHndl = (sampleId : string | null | undefined) => {
    navigate({
      to: Route.to,
      search: {
        ...search,
        sampleid: sampleId || NIL,
      },
    }); 
  }

  const tabChangeHndl = (tabValue: TabType) => {
    navigate({
      to: Route.to,
      search: {
        ...search,
        subject: tabValue,
      },
    });    
  }  

  return (
  <div>
    <SampleSelector 
      onSampleChange={sampleChangeHndl}
      sampleId={sampleid ?? NIL}    
    />

    <PTabs className="mt-5" value={subject} onChange={(value) => tabChangeHndl(value as TabType)}>
      <PTabsList>
        <PTabsTab value="transcript" leftSection={<IconDna size={12} />}>Transcript</PTabsTab>
        <PTabsTab value="fasta" leftSection={<IconDna2 size={12} />}>FastA</PTabsTab>  
        <PTabsTab value="natural-language" leftSection={<IconLanguage size={12} />}>Nat'l Lang</PTabsTab>                         
      </PTabsList>      
      <PTabsPanel value="transcript">
        TAB 1
      </PTabsPanel>
      <PTabsPanel value="fasta">
        TAB 2
      </PTabsPanel>
      <PTabsPanel value="natural-language">
        TAB 3
      </PTabsPanel>
    </PTabs>

  </div>
)}