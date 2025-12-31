import { Textarea, type TextareaProps } from "@mantine/core";

export type PTextAreaProps = TextareaProps;

export function PTextArea(props: PTextAreaProps) {
  return <Textarea radius="md" size="sm" autosize {...props} />;
}
