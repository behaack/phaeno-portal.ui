import { Table } from '@mantine/core'
import { prettifyName } from './helpers/ai-assist.helpers'

export interface IProps {
  rows: any[]
  columns: string[]
}

export function AggregationTable({ columns, rows }: IProps) {
  const getValue = (row: any, col: string) => {
    if (!row) return ''
    if (col in row) return row[col]
    const k = Object.keys(row).find((x) => x.toLowerCase() === col.toLowerCase())
    return k ? row[k] : ''
  }

  if (!rows || !rows.length) {
    return <div>No data</div>
  }
  return (
    <Table withTableBorder stickyHeader withColumnBorders striped>
      <Table.Thead>
        <Table.Tr>
          {columns.map((c) => (
            <Table.Th key={c} style={{ backgroundColor: 'black', color: 'white' }}>
              {prettifyName(c)}
            </Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {rows.map((r, i) => (
          <Table.Tr key={i}>
            {columns.map((c) => (
              <Table.Td key={c}>{getValue(r, c)}</Table.Td>
            ))}
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}
