import { useRef } from 'react';
import { IconEye } from '@tabler/icons-react';
import { ActionIcon, Table, Tooltip } from '@mantine/core';
import { IFasta } from '@/assets/interfaces/_index';
import { readNumberList } from '@/assets/lookupLists/_index';
import { DisplayEnumListItem } from '@/components/_index';
import ModalFastaDetails, { IHandles } from '../browser/fasta-details';

export interface IProps {
  data: IFasta[];
  forAllSamples: boolean;
}

export default function FastaTable({
  data,
  forAllSamples
}: IProps) {
  const details = useRef<IHandles>(null)

  const detailsHndl = (id: number) => {
    details.current?.open(id);
  }  

  return (
    <>
      <ModalFastaDetails
        ref={details} 
      />
      <Table withTableBorder withColumnBorders stickyHeader stickyHeaderOffset={50} striped>
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
              <Table.Td>{item.num_fragments}</Table.Td>
              <Table.Td>
                <DisplayEnumListItem list={readNumberList} value={item.read_number} />
              </Table.Td>
              <Table.Td>{item.definition_line}</Table.Td>
              <Table.Td className="text-center">
                <Tooltip label="View details" openDelay={500}>
                  <ActionIcon 
                    variant="filled" 
                    color="green"
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
