import { useRef } from 'react';
import { IconEye } from '@tabler/icons-react';
import { ActionIcon, Table, Tooltip } from '@mantine/core';
import { readNumberList } from '@/assets/lookupLists/_index';
import { DisplayEnumListItem } from '@/components/_index';
import { FastaListItem } from '@/_api/types/fasta';

export interface IProps {
  data: FastaListItem[];
  forAllSamples: boolean;
}

export default function FastaTable({
  data,
  forAllSamples
}: IProps) {
  return (
    <>
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
              <Table.Td>{item.numFragments}</Table.Td>
              <Table.Td>
                <DisplayEnumListItem list={readNumberList} value={item.readNumber} />
              </Table.Td>
              <Table.Td>{item.definitionLine}</Table.Td>
              <Table.Td className="text-center">
                <Tooltip label="View details" openDelay={500}>
                  <ActionIcon 
                    variant="filled" 
                    color="green"
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
