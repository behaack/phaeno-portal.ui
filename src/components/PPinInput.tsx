import { Input, PinInput, PinInputProps } from '@mantine/core';

export interface IProps extends PinInputProps {
  label?: string;
  hint?: string;
}

export default function PPinInput(props: IProps) {
  const { label, hint, ...parentProps } = props;
  return (
    <Input.Wrapper label={props.label}>
      <div className="text-xs pb-1">{props.hint}</div>
      <PinInput my="sm" key={props.name} size={props.size ? props.size : 'md'} {...parentProps} />
    </Input.Wrapper>
  );
}
