import { Checkbox, type CheckboxProps } from "@mantine/core";

export type PCheckboxProps = CheckboxProps;

export function PCheckbox(props: PCheckboxProps) {
  return <Checkbox radius="sm" {...props} />;
}
