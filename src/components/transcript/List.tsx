import { useRef } from 'react';
import { IconEye } from '@tabler/icons-react';
import { ActionIcon, Tooltip } from '@mantine/core';
import { ITranscript } from '@/assets/interfaces/_index';
import ModalTranscriptDetails, { IHandles } from '../browser/transcript-details';

export interface IProps {
  data: ITranscript[];
  forAllSamples: boolean;
}

export default function TranscriptList({
  data,
  forAllSamples
}: IProps) {
  const details = useRef<IHandles>(null)  

  const detailsHndl = (id: number) => {    
    details.current?.open(id);
  } 
    
  return (
    <div>
      <ModalTranscriptDetails
        ref={details} 
      />         
      {data.length ? (
        <ul className="list-group-container">
          {data.map((item) => (
            <li key={item.id}>
              <div className="flex justify-between">
                <div className="list-item primary">{item.gene_symbol}</div>
                <Tooltip label="View details">
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
              </div>
              {(forAllSamples)
                ? (
                  <div>
                    <span className="font-medium">Sample</span>: {item.sampleName}
                  </div>              
                ) : null
              }
              <div>
                <span className="font-medium">Gene Id</span>: {item.gene_id}
              </div>
              <div>
                <span className="font-medium">Transcript Id</span>: {item.transcript_id}
              </div>
              <div>
                <span className="font-medium">Definition</span>:
              </div>
              <div>{item.definition_line}</div>
            </li>
          ))}
        </ul>
      ) : null }
    </div>
  );
}
