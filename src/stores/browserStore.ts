import { IFasta, ITranscript } from '@/assets/interfaces/_index';
import { create } from 'zustand';
import { produce } from 'immer';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import isEqual from 'lodash/isEqual';
import { ERenderType, ESqlAiEntityType } from '@/assets/enums/_index';

// ─────────────────────────────────────────────
//  Types
// ─────────────────────────────────────────────
export interface IGenomicStore<T> {
  list: T[];
  pageNo: number;
  search: string;
  cursorId?: number | null;
  cursorValue?: string | undefined;
  direction: 'next' | 'prev';
  hasAdditional: boolean;
}

export interface INaturalLanguageStore {
  qryValue: string;
  runDisabled: boolean;
  error: string;
  title: string;
  sql: string;
  renderType: ERenderType | null;
  entityType: ESqlAiEntityType | null;
  fastaList: IFasta[];
  transcriptList: ITranscript[];
  aggregationList: any[];
  columns: string[];
  pageNo: number;
  search: string;
  cursorId?: number | null;
  cursorValue?: string | undefined;
  direction: 'next' | 'prev';
  hasAdditional: boolean;  
}

const emptyStoreEntity: IGenomicStore<any> = {
  list: [],
  pageNo: 1,
  search: '',
  cursorId: null,
  cursorValue: undefined,
  direction: 'next',
  hasAdditional: false,
};

export const emptyNaturalLanguageStore: INaturalLanguageStore = {
  qryValue: '',
  runDisabled: false,
  error: '',
  title: '',
  sql: '',
  renderType: null,
  entityType: null,
  fastaList: [],
  transcriptList: [],
  aggregationList: [],
  columns: [],
  pageNo: 1,
  search: '',
  cursorId: null,
  cursorValue: undefined,
  direction: 'next',
  hasAdditional: true,
}

export interface IBrowserStoreState {
  transcript: IGenomicStore<ITranscript>;
  fasta: IGenomicStore<IFasta>;
  naturalLanguage: INaturalLanguageStore;

  setTranscriptStore: (store: IGenomicStore<ITranscript>) => void;
  setFastaStore: (store: IGenomicStore<IFasta>) => void;
  setNaturalLanguageStore: (store: INaturalLanguageStore) => void;

  resetTranscriptStore: () => void;
  resetFastaStore: () => void;
  resetNaturalLanguageStore: () => void;
  resetAllStores: () => void;
}

// ─────────────────────────────────────────────
//  Helper: Only commit if value actually changed
// ─────────────────────────────────────────────
function setIfChanged<K extends keyof IBrowserStoreState>(
  set: any,
  get: any,
  key: K,
  next: IBrowserStoreState[K]
) {
  const current = get()[key];
  if (!isEqual(current, next)) {
    set(
      produce<IBrowserStoreState>((state) => {
        (state[key] as any) = next;
      })
    );
  }
}

// ─────────────────────────────────────────────
//  Store Definition
// ─────────────────────────────────────────────
export const useBrowserStore = create<IBrowserStoreState>()(
  devtools(
    persist(
      (set, get) => ({
        transcript: { ...emptyStoreEntity } as IGenomicStore<ITranscript>,
        fasta: { ...emptyStoreEntity } as IGenomicStore<IFasta>,
        naturalLanguage: { ...emptyNaturalLanguageStore } as INaturalLanguageStore,

        // ✅ Main setters (use setIfChanged)
        setTranscriptStore: (store) => setIfChanged(set, get, 'transcript', store),
        setFastaStore: (store) => setIfChanged(set, get, 'fasta', store),
        setNaturalLanguageStore: (store) => setIfChanged(set, get, 'naturalLanguage', store),

        // ✅ Reset functions (now using setIfChanged)
        resetTranscriptStore: () => setIfChanged(set, get, 'transcript', { ...emptyStoreEntity }),
        resetFastaStore: () => setIfChanged(set, get, 'fasta', { ...emptyStoreEntity }),
        resetNaturalLanguageStore: () => setIfChanged(set, get, 'naturalLanguage', { ...emptyNaturalLanguageStore }),
        resetAllStores: () => {
          setIfChanged(set, get, 'transcript', { ...emptyStoreEntity });
          setIfChanged(set, get, 'fasta', { ...emptyStoreEntity });
          setIfChanged(set, get, 'naturalLanguage', { ...emptyNaturalLanguageStore });
        },
      }),
      {
        name: 'browserStore',
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
