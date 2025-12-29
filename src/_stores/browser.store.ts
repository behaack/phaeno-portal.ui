import { create } from "zustand"
import { persist } from "zustand/middleware"

type BrowserState = {
  selectedSample: string | null
  selectedGene: string | null
  selectedSmid: string | null
  setSelectedSample: (sample: string | null) => void
  setSelectedGene: (gene: string | null) => void
  setSelectedSmid: (smid: string | null) => void
}

export const useBrowserStore = create<BrowserState>()(
  persist(
    (set) => ({
      selectedSample: null,
      selectedGene: null,
      selectedSmid: null,
      setSelectedSample: (sample: string | null) => set({selectedSample: sample }),
      setSelectedGene: (gene: string | null) => set({selectedGene: gene }),
      setSelectedSmid: (smid: string | null) => set({selectedSmid: smid }),
    }),
    {
      name: "browser.store",
      // optional: only persist the selected org
      partialize: (s) => ({ 
        selectedSample: s.selectedSample,
        selectedGene: s.selectedGene,
        selectedSmid: s.selectedSmid
      }),
    }
  )
)
