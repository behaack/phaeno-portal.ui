import { IconEye } from '@tabler/icons-react';
import { PToolTip } from '@/_shared/ui/components/feedback';
import { PActionIcon } from '@/_shared/ui/components/inputs';
import { DisplayEnumListItem } from '../shared/DisplayEnumListItem';
import { FastaListItem } from '@/_api/types/fasta';
import readNumberList from './readNumberList';

export interface IProps {
  data: FastaListItem[];
  forAllSamples: boolean;
}

export function FastaList({
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
                <PToolTip label="View details">
                  <PActionIcon 
                    variant="filled" 
                    size="sm" 
                    radius="xl" 
                    aria-label="Transcript details"
                    // onClick={() => detailsHndl(item.id)}
                  >
                    <IconEye size="1em" />
                  </PActionIcon>
                </PToolTip>
              </div>
              {(forAllSamples)
                ? (
                  <div>
                    <span className="font-medium">Sample</span>: {item.sampleName}
                  </div>              
                ) : null
              }              
              <div>
                <span className="font-medium">Fragments</span>: {item.numFragments}
              </div>
              <div>
                <span className="font-medium">Read #</span>:{' '}
                <DisplayEnumListItem list={readNumberList} value={item.readNumber} />
              </div>
              <div>
                <span className="font-medium">Definition</span>:
              </div>
              <div>{item.definitionLine}</div>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
