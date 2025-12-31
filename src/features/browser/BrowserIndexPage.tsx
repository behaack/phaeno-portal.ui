import { useEffect, useState } from "react";
import { PTabs, PTabsList, PTabsPanel, PTabsTab } from "@/shared/ui/components/layout";
import { IconLanguage } from "@tabler/icons-react";
import { NIL } from "uuid";
import { TranscriptPanel } from "./TranscriptPanel";
import { FastaPanel } from "./FastaPanel";
import { NaturalLangPanel } from "./NaturalLangPanel";
import { useBrowserStore } from '@/stores/browser.store';
import { SampleSelector } from "./components/shared/SampleSelector";
import { Surface, Text } from "@/shared/ui/primiatives";
import { IconBrowser, IconDna, IconDna2 } from "@tabler/icons-react";

export function BrowserIndexPage() {
  const [sampleId, changeSampleId] = useState<string | null>()
  const store = useBrowserStore()

  useEffect(() => {
    changeSampleId(store.selectedSample)
  }, [])

  const updateSample = (value: string | null) => {
    changeSampleId(value ?? "")
    store.setSelectedSample(value)
  }

  return (
  <Surface className="p-5" fullHeight elevation="sm" hover="none">
    <Text className="flex gap-3 items-center mb-6" variant="heading"><IconBrowser /> Data Browser</Text>
    <SampleSelector 
      onSampleChange={(value) => updateSample(value)}
      sampleId={sampleId ?? NIL}    
      value={sampleId ?? ""}
    />

    <PTabs defaultValue="transcript" className="mt-5">
      <PTabsList>
        <PTabsTab value="transcript" leftSection={<IconDna size={12} />}>Transcript</PTabsTab>
        <PTabsTab value="fasta" leftSection={<IconDna2 size={12} />}>FastA</PTabsTab>  
        <PTabsTab value="natural-language" leftSection={<IconLanguage size={12} />}>Nat'l Lang</PTabsTab>                         
      </PTabsList>      
      <PTabsPanel value="transcript">
        <TranscriptPanel sampleId={sampleId ?? ""} />
      </PTabsPanel>
      <PTabsPanel value="fasta">
        <FastaPanel  sampleId={sampleId ?? ""} />
      </PTabsPanel>
      <PTabsPanel value="natural-language">
        <NaturalLangPanel />
      </PTabsPanel>
    </PTabs>
  </Surface>
)}