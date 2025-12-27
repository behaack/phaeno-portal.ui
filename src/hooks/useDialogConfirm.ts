import { useEffect, useRef } from 'react';
import { IDialogConfirmInput, useDialogConfirmStore } from '@/stores/dialogConfirmStore';

export type { IDialogConfirmInput };

type fnExecuteOnAction = () => void;

export const useDialogConfirm = () => {
  const confirmFn = useRef<fnExecuteOnAction>(null);
  const cancelFn = useRef<fnExecuteOnAction | null | undefined>(null);
  const msgDialogStore = useDialogConfirmStore();

  const open = (
    onConfirmFn: fnExecuteOnAction,
    options: IDialogConfirmInput,
    onCancelfn?: fnExecuteOnAction
  ) => {
    confirmFn.current = onConfirmFn;
    cancelFn.current = onCancelfn;
    msgDialogStore.open(options);
  };

  const close = () => {
    msgDialogStore.close('cancel');
  };

  useEffect(() => {
    if (!msgDialogStore.isOpen) {
      if (msgDialogStore.result === 'okay') {
        if (confirmFn.current) {
          confirmFn.current();
        }
        return;
      }
      if (msgDialogStore.result === 'cancel') {
        if (cancelFn.current) {
          cancelFn.current();
        }
      }
    }
  }, [msgDialogStore.isOpen]);

  return { open, close };
};
