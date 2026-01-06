import { useRef } from 'react';
import { IconEye } from '@tabler/icons-react';
import { ActionIcon, Table, Tooltip } from '@mantine/core';
import { FastaListItem } from '@/api/types/fasta';
import { DisplayEnumListItem } from '../shared/DisplayEnumListItem';
import { readNumberList } from '../shared/readNumberList';
import { EListActionType, ListActionMenu } from '@/shared/ui/components/compound';
import { FastaDetailsModal, IHandles } from './FastaDetails.Modal';

export interface IProps {
  data: FastaListItem[];
  forAllSamples: boolean;
}

export function FastaTable({
  data,
  forAllSamples
}: IProps) {
  const fastaDetails = useRef<IHandles>(null)

  const actionHdl = async (id: string, actionType: EListActionType) => {
    switch (actionType) {
      case EListActionType.Details:
        fastaDetails.current?.open(id)
        return
    }
  }

  return (
    <>
      <FastaDetailsModal ref={fastaDetails}/>
      <Table withTableBorder withColumnBorders stickyHeader striped>
        <Table.Thead>
          <Table.Tr>
            {(forAllSamples)
              ? (
                <Table.Th style={{ backgroundColor: 'black', color: 'white', width: '120px' }}>
                  Sample
                </Table.Th>
              ) : null
            }             
            <Table.Th style={{ backgroundColor: 'black', color: 'white', width: '280px' }}>
              SMID
            </Table.Th>
            <Table.Th style={{ backgroundColor: 'black', color: 'white', width: '75px' }}>
              Fragments
            </Table.Th>
            <Table.Th style={{ backgroundColor: 'black', color: 'white', width: '80px' }}>
              Read #
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
              <Table.Td>{item.smid}</Table.Td>
              <Table.Td>{item.numFragments}</Table.Td>
              <Table.Td>
                <DisplayEnumListItem list={readNumberList} value={item.readNumber} />
              </Table.Td>
              <Table.Td>{item.definitionLine}</Table.Td>
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
