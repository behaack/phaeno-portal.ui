import React from "react"
import { Table, type TableProps } from "@mantine/core"

export type PTableProps = TableProps

export function PTable(props: PTableProps) {
  return (
    <Table
      highlightOnHover
      withTableBorder
      withColumnBorders={false}
      verticalSpacing="xs"
      horizontalSpacing="sm"
      {...props}
    />
  )
}
