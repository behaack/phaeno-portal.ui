import { useRef } from 'react';
import { IconEye } from '@tabler/icons-react';
import { ActionIcon, Table, Tooltip } from '@mantine/core';
import { ITranscript } from '@/assets/interfaces/_index';
import ModalTranscriptDetails, { IHandles } from '../browser/transcript-details';

export interface IProps {  
  data: ITranscript[];
  forAllSamples: boolean;
}

export default function TranscriptTable({
  data,
  forAllSamples
}: IProps) {
  const details = useRef<IHandles>(null)  

  const detailsHndl = (id: number) => {
    details.current?.open(id);
  } 
    
  return (
    <>
      <ModalTranscriptDetails
        ref={details} 
      />    
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
              <Table.Td>{item.gene_symbol}</Table.Td>
              <Table.Td>{item.gene_id}</Table.Td>
              <Table.Td>{item.transcript_id}</Table.Td>
              <Table.Td>{item.definition_line}</Table.Td>
              <Table.Td className="text-center">
                <Tooltip label="View details" openDelay={500}>
                  <ActionIcon 
                    variant="filled" 
                    size="sm" 
                    radius="xl" 
                    aria-label="Transcript details"
                    onClick={() => detailsHndl(item.id)}
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
