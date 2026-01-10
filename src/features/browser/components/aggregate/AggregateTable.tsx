import { Table } from '@mantine/core'

export interface IProps {
  rows: any[]
  columns: string[]
}

export default function AggregateTable({ columns, rows }: IProps) {
  if (!rows || !rows.length) {
    return <div>No data</div>
  }

  const prettifyName = (title: string): string => {
    const spaced = title
      // Replace underscores and hyphens with spaces first
      .replace(/[_-]+/g, ' ')
      // Insert spaces between camelCase or PascalCase words
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
      // Replace "Count" or "Number" with "#"
      .replace(/\b(Count|Number)\b/gi, '#')
      // Normalize multiple spaces
      .replace(/\s+/g, ' ')
      .trim()

    return spaced
  }

  return (
    <Table withTableBorder withColumnBorders striped>
      <Table.Thead>
        <Table.Tr>
          {columns.map((c) => (
            <Table.Th
              key={c}
              className={typeof rows[0][c] === 'number' ? 'agg-table__metric' : ''}
              style={{ backgroundColor: 'black', color: 'white' }}
            >
              {prettifyName(c)}
            </Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {rows.map((r, i) => (
          <Table.Tr key={i}>
            {columns.map((c) => (
              <Table.Td key={c} className={typeof r[c] === 'number' ? 'agg-table__metric' : ''}>
                {r[c]}
              </Table.Td>
            ))}
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}
