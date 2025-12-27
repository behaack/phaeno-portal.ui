import { TextInput, TextInputProps } from '@mantine/core';

export interface IProps extends TextInputProps {}

export default function PTextInput(props: IProps) {
  return <TextInput my="sm" key={props.name} size={props.size ? props.size : 'md'} {...props} />;
}
