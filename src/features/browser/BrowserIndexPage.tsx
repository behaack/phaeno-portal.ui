import { PTabs, PTabsList, PTabsPanel, PTabsTab } from "@/shared/ui/components/layout";
import { IconLanguage } from "@tabler/icons-react";
import { TranscriptPanel } from "./TranscriptPanel";
import { FastaPanel } from "./FastaPanel";
import { NaturalLangPanel } from "./NaturalLangPanel";
import { useBrowserStore } from '@/stores/browser.store';
import { SampleSelector } from "./components/shared/SampleSelector";
import { Surface, Text } from "@/shared/ui/primiatives";
import { IconBrowser, IconDna, IconDna2 } from "@tabler/icons-react";
import { CanViewData } from "../_common/CanViewData";


export function BrowserIndexPage() {
  const store = useBrowserStore()

  return (
    <Surface className="p-5" fullHeight elevation="sm" hover="none">
      <Text className="flex gap-3 items-center mb-6" variant="heading"><IconBrowser />Data Browser</Text>
      <CanViewData>
        <div>

          <SampleSelector />

          <PTabs value={store.selectedTab} onChange={(tab) => (store.setSelectedTab(tab ?? 'transcript'))} defaultValue="transcript" className="mt-5">
            <PTabsList>
              <PTabsTab value="transcript" leftSection={<IconDna size={12} />}>Transcript</PTabsTab>
              <PTabsTab value="fasta" leftSection={<IconDna2 size={12} />}>FastA</PTabsTab>  
              <PTabsTab value="natural-language" leftSection={<IconLanguage size={12} />}>Nat'l Lang</PTabsTab>                         
            </PTabsList>      
            <PTabsPanel value="transcript">
              <TranscriptPanel />
            </PTabsPanel>
            <PTabsPanel value="fasta">
              <FastaPanel />
            </PTabsPanel>
            <PTabsPanel value="natural-language">
              <NaturalLangPanel />
            </PTabsPanel>
          </PTabs>
        </div>
      </CanViewData>
    </Surface>
)}