import { modals } from "@mantine/modals";

export function useConfirmAction() {
  return (options: {
    title?: string;
    message?: React.ReactNode;
    confirmLabel?: string;
    cancelLabel?: string;
    confirmColor?: string;
  }) =>
    new Promise<boolean>((resolve) => {
      modals.openConfirmModal({
        title: options.title ?? "Are you sure?",
        children: options.message ?? "This action cannot be undone.",
        labels: {
          confirm: options.confirmLabel ?? "Confirm",
          cancel: options.cancelLabel ?? "Cancel",
        },
        confirmProps: { color: options.confirmColor ?? "red" },
        onConfirm: () => resolve(true),
        onCancel: () => resolve(false),
        onClose: () => resolve(false),
      });
    });
}
