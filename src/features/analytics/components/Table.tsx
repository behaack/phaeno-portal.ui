import { Table } from '@mantine/core';
import { DisplayStatus } from './DisplayStatus';
import { ActionButtons } from './ActionButtons';
import { IDataPipelineItem } from '../types/JobPipelineTypes';
import { statusDate } from '../utilities/statusDate';

export interface IProps {
  list: IDataPipelineItem[];
}
export function JobTable({ list }: IProps) {
  return (
    <Table withTableBorder withColumnBorders stickyHeader striped>
      <Table.Thead>
        <Table.Tr>
          <Table.Th style={{ backgroundColor: "black", color: "white" }}>
            Job Name
          </Table.Th>
          <Table.Th style={{ backgroundColor: "black", color: "white", width: 110 }}>
            Job Type
          </Table.Th>
          <Table.Th style={{ backgroundColor: "black", color: "white", width: 110 }}>
            Status
          </Table.Th>
          <Table.Th style={{ backgroundColor: "black", color: "white", width: 200 }}>
            Status Date
          </Table.Th>
          <Table.Th style={{ backgroundColor: 'black', color: 'white', width: '100px', textAlign: 'center' }}>
            Actions
          </Table.Th>          
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        {list.map((item) => (
          <Table.Tr key={item.id}>
            <Table.Td>{item.pipelineName}</Table.Td>
            <Table.Td>{item.jobType}</Table.Td>
            <DisplayStatus job={item} displayType="cell" />
            <Table.Td>
              {statusDate(item)}
            </Table.Td>
              <Table.Td className="text-center">
                <ActionButtons job={item} />
              </Table.Td>            
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}

