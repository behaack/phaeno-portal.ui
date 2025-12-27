import { produce } from 'immer';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { ECodeProvider } from '@/assets/enums/_index';
import { IAuthToken, ILookupItem } from '@/assets/interfaces/_index';

export interface IAuthState {
  isAuthenticated: boolean;
  authToken: IAuthToken | null;
  selectedOrganization: ILookupItem | null;
  samples: ILookupItem[];
  login: (authToken: IAuthToken) => void;
  logout: () => void;
  refreshToken: (accessToken: string) => void;
  setDefaultCodeProvider: (codeProvider: ECodeProvider) => void;
  setSelectedOrganization: (selectedOrganisation: ILookupItem | null) => void;
  updateTimeoutSetting: (timeoutValue: number | null) => void;
  setSamples: (samples: ILookupItem[]) => void
}

export const useAuthStore = create<IAuthState>()(
  devtools(
    persist(
      (set) => ({
        isAuthenticated: false,
        authToken: null,
        selectedOrganization: null,
        samples: [],
        login: (authToken: IAuthToken) => {
          set(
            produce<IAuthState>((state) => {
              state.isAuthenticated = !authToken.tfaRequired;
              state.authToken = authToken;
            })
          );
        },
        logout: () => {
          set(
            produce<IAuthState>((state) => {
              state.isAuthenticated = false;
              state.authToken = null;
              state.selectedOrganization = null;
            })
          );
        },
        refreshToken: (accessToken: string) => {
          set(
            produce<IAuthState>((state) => {
              if (state.authToken) {
                state.authToken.token = accessToken;
              }
            })
          );
        },
        setDefaultCodeProvider: (codeProvider: ECodeProvider) => {
          set(
            produce<IAuthState>((state) => {
              if (state.authToken !== null) {
                state.authToken.codeProvider = codeProvider;
              }
            })
          );
        },
        setSelectedOrganization: (selectedOrganisation: ILookupItem | null) => {
          set(
            produce<IAuthState>((state) => {
              state.selectedOrganization = selectedOrganisation;
            })
          );
        },
        updateTimeoutSetting: (timeoutValue: number | null) => {
          set(
            produce<IAuthState>((state) => {
              if (state.authToken) {
                state.authToken.user.inactiveSignout = timeoutValue;
              }
            })
          );
        },
        setSamples: (samples: ILookupItem[]) => {
          set(
            produce<IAuthState>((state) => {
              state.samples = samples;
            })
          );
        },        
      }),
      {
        name: 'auth-storage',
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);

export function waitForHydration(): Promise<void> {
  const anyStore = useAuthStore as any;
  return new Promise((resolve) => {
    // If persist is missing, resolve immediately to avoid crashes
    if (!anyStore.persist || typeof anyStore.persist.hasHydrated !== 'function') {
      resolve();
      return;
    }
    if (anyStore.persist.hasHydrated()) {
      resolve();
      return;
    }
    const unsub = anyStore.persist.onFinishHydration(() => {
      unsub();
      resolve();
    });
  });
}
