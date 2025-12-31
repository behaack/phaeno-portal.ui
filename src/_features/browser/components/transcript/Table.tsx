import { useRef } from 'react';
import { IconEye } from '@tabler/icons-react';
import { ActionIcon, Table, Tooltip } from '@mantine/core';
import { TranscriptListItem } from '@/_api/types/transcript';

export interface IProps {  
  data: TranscriptListItem[];
  forAllSamples: boolean;
}

export function TranscriptTable({
  data,
  forAllSamples
}: IProps) {
  return (
    <>
      <Table withTableBorder withColumnBorders striped>
        <Table.Thead>
          <Table.Tr>
            {(forAllSamples)
              ? (
                <Table.Th style={{ backgroundColor: 'black', color: 'white', width: '120px' }}>
                  Sample
                </Table.Th>
              ) : null
            }            
            <Table.Th style={{ backgroundColor: 'black', color: 'white', width: '120px' }}>
              Gene Symbol
            </Table.Th>
            <Table.Th style={{ backgroundColor: 'black', color: 'white', width: '120px' }}>
              Gene Id
            </Table.Th>
            <Table.Th style={{ backgroundColor: 'black', color: 'white', width: '120px' }}>
              Transcript Id
            </Table.Th>
            <Table.Th style={{ backgroundColor: 'black', color: 'white' }}>Definition</Table.Th>
            <Table.Th
              style={{
                backgroundColor: 'black',
                color: 'white',
                width: '100px',
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
              <Table.Td>{item.geneSymbol}</Table.Td>
              <Table.Td>{item.geneId}</Table.Td>
              <Table.Td>{item.transcriptId}</Table.Td>
              <Table.Td>{item.definitionLine}</Table.Td>
              <Table.Td className="text-center">
                <Tooltip label="View details" openDelay={500}>
                  <ActionIcon 
                    variant="filled" 
                    size="sm" 
                    radius="xl" 
                    aria-label="Transcript details"
                    // onClick={() => detailsHndl(item.id)}
                  >
                    <IconEye size="1em" />
                  </ActionIcon>
                </Tooltip>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </>    
  );
}
