import { Checkbox, CheckboxProps } from '@mantine/core';

export interface IProps extends CheckboxProps {}

export default function PCheckbox(props: IProps) {
  return <Checkbox my="sm" key={props.name} size={props.size ? props.size : 'sm'} {...props} />;
}
