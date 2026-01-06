import { useRef } from 'react';
import { Table } from '@mantine/core';
import { TranscriptListItem } from '@/api/types/transcript';
import { EListActionType, ListActionMenu } from '@/shared/ui/components/compound';
import { IHandles, TranscriptDetailsModal } from './TranscriptDetails.Modal';

export interface IProps {  
  data: TranscriptListItem[];
  forAllSamples: boolean;
}

export function TranscriptTable({
  data,
  forAllSamples
}: IProps) {
  const transcriptDetails = useRef<IHandles>(null)

  const actionHdl = async (id: string, actionType: EListActionType) => {
    switch (actionType) {
      case EListActionType.Details:
        transcriptDetails.current?.open(id)
        return
    }
  }

  return (
    <>
      <TranscriptDetailsModal ref={transcriptDetails} />
      <Table withTableBorder stickyHeader withColumnBorders striped>
        <Table.Thead>
          <Table.Tr>
            {(forAllSamples)
              ? (
                <Table.Th style={{ backgroundColor: 'black', color: 'white', width: '175px' }}>
                  Sample
                </Table.Th>
              ) : null
            }            
            <Table.Th style={{ backgroundColor: 'black', color: 'white', width: '175px' }}>
              Transcript Id
            </Table.Th>
            <Table.Th style={{ backgroundColor: 'black', color: 'white', width: '175px' }}>
              Gene Id
            </Table.Th>
            <Table.Th style={{ backgroundColor: 'black', color: 'white' }}>
              Gene Symbol
            </Table.Th>
            <Table.Th
              style={{
                backgroundColor: 'black',
                color: 'white',
                width: '75px',
                textAlign: 'center',
              }}
            >
              Actions
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((item) => (
            <Table.Tr key={item.id}>
              {(forAllSamples)
                ? (
                  <Table.Td>{item.sampleName}</Table.Td>
                ) : null
              }                 
              <Table.Td>{item.transcriptId}</Table.Td>
              <Table.Td>{item.geneId}</Table.Td>
              <Table.Td>{item.geneSymbol}</Table.Td>
              <Table.Td className="text-center">
                <ListActionMenu 
                  id={item.id.toString()} 
                  showDetails 
                  onActionClick={actionHdl}
                />
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </>
  );
}
