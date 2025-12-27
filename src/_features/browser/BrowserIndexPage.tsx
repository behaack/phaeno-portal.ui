import { PTabs, PTabsList, PTabsPanel, PTabsTab } from "@/_shared/ui/components/layout";
import { IconLanguage } from "@tabler/icons-react";
import { IconDna2 } from "@tabler/icons-react";
import { IconDna } from "@tabler/icons-react";
import { NIL } from "uuid";
import { TranscriptPanel } from "./components/TranscriptPanel";
import { FastaPanel } from "./components/FastaPanel";
import { NaturalLangPanel } from "./components/NaturalLangPanel";
import SampleSelector from "./components/SampleSelector";
import { useState } from "react";

export function BrowserIndexPage() {
  const [sampleId, changeSampleId] = useState("")

  return (
  <div>
    <SampleSelector 
      onSampleChange={(value) => changeSampleId(value ?? "")}
      sampleId={sampleId ?? NIL}    
    />

    <PTabs defaultValue="transcript" className="mt-5">
      <PTabsList>
        <PTabsTab value="transcript" leftSection={<IconDna size={12} />}>Transcript</PTabsTab>
        <PTabsTab value="fasta" leftSection={<IconDna2 size={12} />}>FastA</PTabsTab>  
        <PTabsTab value="natural-language" leftSection={<IconLanguage size={12} />}>Nat'l Lang</PTabsTab>                         
      </PTabsList>      
      <PTabsPanel value="transcript">
        <TranscriptPanel sampleId={sampleId} />
      </PTabsPanel>
      <PTabsPanel value="fasta">
        <FastaPanel  sampleId={sampleId} />
      </PTabsPanel>
      <PTabsPanel value="natural-language">
        <NaturalLangPanel />
      </PTabsPanel>
    </PTabs>

  </div>
)}