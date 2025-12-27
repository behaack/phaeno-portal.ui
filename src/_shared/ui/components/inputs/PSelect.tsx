import { Select, type SelectProps } from "@mantine/core";

export type PSelectProps = SelectProps;

export function PSelect(props: PSelectProps) {
  return <Select radius="md" size="sm" {...props} />;
}
