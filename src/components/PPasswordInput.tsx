import { PasswordInput, PasswordInputProps } from '@mantine/core';

export interface IProps extends PasswordInputProps {}

export default function PPasswordInput(props: IProps) {
  return (
    <PasswordInput my="sm" key={props.name} size={props.size ? props.size : 'md'} {...props} />
  );
}
