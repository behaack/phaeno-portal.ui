import { JSX } from 'react';
import { produce } from 'immer';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type screenWidth = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type resultType = 'okay' | 'cancel';

export interface IDialogConfirmInput {
  width?: screenWidth;
  title?: string;
  icon?: JSX.Element;
  message: string;
}

export interface IDialogConfirmStoreState {
  width: screenWidth;
  title: string;
  icon: JSX.Element;
  isOpen: boolean;
  message: string;
  result: undefined | resultType;
  close: (resultType: resultType) => void;
  open: (dialogInput: IDialogConfirmInput) => void;
}

export const useDialogConfirmStore = create<IDialogConfirmStoreState>()(
  devtools(
    (set) => ({
      result: undefined,
      isOpen: false,
      width: 'xs',
      title: 'Confirm Action',
      icon: null,
      message: '',
      open: (dialogInput: IDialogConfirmInput) => {
        set(
          produce<IDialogConfirmStoreState>((state) => {
            state.isOpen = true;
            state.result = undefined;
            state.title = dialogInput.title || state.title;
            state.icon = dialogInput.icon || state.icon;
            state.width = dialogInput.width || state.width;
            state.message = dialogInput.message;
          })
        );
      },
      close: (result: resultType) => {
        set(
          produce<IDialogConfirmStoreState>((state) => {
            state.result = result;
            state.isOpen = false;
          })
        );
      },
    }),
    {
      name: 'dialogConfirmStore',
    }
  )
);
