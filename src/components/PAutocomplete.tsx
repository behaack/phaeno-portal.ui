import { Autocomplete, AutocompleteProps } from '@mantine/core';

export interface IProps extends AutocompleteProps {}

export default function PAutoComplete(props: IProps) {
  return (
    <Autocomplete
      key={props.name}
      size={props.size ? props.size : 'sm'}
      type={props.type}
      {...props}
    />
  );
}
