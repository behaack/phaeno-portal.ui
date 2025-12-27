import { PinInput, type PinInputProps } from "@mantine/core";

export type PPinInputProps = PinInputProps;

export function PPinInput(props: PPinInputProps) {
  return <PinInput radius="md" {...props} />;
}
