import { produce } from 'immer';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface IAppStoreState {
  asyncCount: number;
  incrementAsyncCount: () => void;
  decrementAsyncCount: () => void;
}

export const useAppStore = create<IAppStoreState>()(
  devtools(
    (set) => ({
      asyncCount: 0,
      incrementAsyncCount: () => {
        set(
          produce<IAppStoreState>((state) => {
            state.asyncCount++;
          })
        );
      },
      decrementAsyncCount: () => {
        set(
          produce<IAppStoreState>((state) => {
            state.asyncCount = state.asyncCount ? state.asyncCount - 1 : 0;
          })
        );
      },
    }),
    {
      name: 'appStore',
    }
  )
);
