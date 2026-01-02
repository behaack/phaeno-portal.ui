import { ETwoFactorMethod } from "@/api/types/enums";
import { PButton } from "@/shared/ui/components";
import { Group, Radio, Stack, Text } from "@mantine/core";
import React, { useState } from "react";

interface IProps {
  value: ETwoFactorMethod;
  onChange: (method: ETwoFactorMethod) => void;
}

const data = [
  {
    name: 'One-time code (Email)',
    description: 'Receive a verification code by email.',
  },
  { name: 'Authenticator app', 
    description: 'Use an app like Google Authenticator, Authy, or 1Password.' },
];

export function TwoFactorMethodPicker({ value, onChange }: IProps) {
  const [method, setMethod] = useState<ETwoFactorMethod>(ETwoFactorMethod.Totp);
  
  const cards = data.map((item) => (
    <Radio.Card radius="md" value={item.name} key={item.name}>
      <Group className="p-4" wrap="nowrap" align="flex-start">
        <Radio.Indicator />
        <div>
          <div className="text-sm font-semibold">{item.name}</div>
          <div className="text-xs">{item.description}</div>
        </div>
      </Group>
    </Radio.Card>
  ));  

  return (
    <div>
      <Radio.Group
        value={method}
        onChange={setMethod}
        label="Select two-factor authentication method"
      >
        <Stack pt="md" gap="xs">
          {cards}
        </Stack>
      </Radio.Group>
      <div className="mt-5 text-right">
        <PButton onClick={() => {onChange(method)}} color="black">Continue</PButton>
      </div>
    </div>
  );
}
