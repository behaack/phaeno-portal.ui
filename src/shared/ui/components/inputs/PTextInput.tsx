import { TextInput, type TextInputProps } from "@mantine/core";

export type PTextInputProps = TextInputProps;

export function PTextInput(props: PTextInputProps) {
  return <TextInput radius="md" size="sm" {...props} />;
}
