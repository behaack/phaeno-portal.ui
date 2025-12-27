import React from "react";
import { Chip, type ChipProps } from "@mantine/core";

export type PChipProps = ChipProps & React.PropsWithChildren;

export function PChip({ children, ...props }: PChipProps) {
  return (
    <Chip radius="md" {...props}>
      {children}
    </Chip>
  );
}
