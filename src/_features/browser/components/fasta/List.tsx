import { useRef } from 'react';
import { IconEye } from '@tabler/icons-react';
import { ActionIcon, Tooltip } from '@mantine/core';
import { IFasta } from '@/assets/interfaces/_index';
import { readNumberList } from '@/assets/lookupLists/_index';
import DisplayEnumListItem from '@/components/DisplayEnumListItem';

export interface IProps {
  data: IFasta[];
  forAllSamples: boolean;
}

export default function FastaList({
  data,
  forAllSamples
}: IProps) {

  return (
    <div>
      {data.length ? (
        <ul className="list-group-container">
          {data.map((item) => (
            <li key={item.id}>
              <div className="flex justify-between">
                <div className="list-item primary">{item.smid}</div>
                <Tooltip label="View details">
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
              </div>
              {(forAllSamples)
                ? (
                  <div>
                    <span className="font-medium">Sample</span>: {item.sampleName}
                  </div>              
                ) : null
              }              
              <div>
                <span className="font-medium">Fragments</span>: {item.num_fragments}
              </div>
              <div>
                <span className="font-medium">Read #</span>:{' '}
                <DisplayEnumListItem list={readNumberList} value={item.read_number} />
              </div>
              <div>
                <span className="font-medium">Definition</span>:
              </div>
              <div>{item.definition_line}</div>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
