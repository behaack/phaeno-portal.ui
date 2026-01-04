import { Table } from "@mantine/core";
import { prettifyName } from "./helpers/ai-assist.helpers";

export interface IProps {  
  rows: any[];
  columns: string[];
}

export function AggregationTable({ columns, rows }: IProps) {

  if (!rows || !rows.length) { return <div>No data</div> };

  return (
    <Table withTableBorder withColumnBorders striped>
      <Table.Thead>
        <Table.Tr>
          {columns.map(c => (
            <Table.Th 
              key={c}
              className={typeof rows[0][c] === "number" ? "agg-table__metric" : ""}
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
            {columns.map(c => (
              <Table.Td
                key={c}
                className={typeof r[c] === "number" ? "agg-table__metric" : ""}
              >
                {r[c]}
              </Table.Td>
            ))}
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}