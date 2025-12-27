import { Select, SelectProps } from '@mantine/core';

export interface IProps extends SelectProps {}

export default function PActionIcon(props: IProps) {
  return (
    <Select
      my="sm"
      key={props.name}
      size={props.size ? props.size : 'md'}
      type={props.type}
      {...props}
    />
  );
}
