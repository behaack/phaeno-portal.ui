import { IconEye } from '@tabler/icons-react'
import { ActionIcon, Tooltip } from '@mantine/core'
import { TranscriptListItem } from '@/api/types/transcript'

export interface IProps {
  data: TranscriptListItem[]
  forAllSamples: boolean
}

export function TranscriptList({ data, forAllSamples }: IProps) {
  return (
    <div>
      {data.length ? (
        <ul className="list-group-container">
          {data.map((item) => (
            <li key={item.id}>
              <div className="flex justify-between">
                <div className="list-item primary">{item.geneSymbol}</div>
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
              {forAllSamples ? (
                <div>
                  <span className="font-medium">Sample</span>: {item.sampleName}
                </div>
              ) : null}
              <div>
                <span className="font-medium">Gene Id</span>: {item.geneId}
              </div>
              <div>
                <span className="font-medium">Transcript Id</span>: {item.transcriptId}
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
  )
}
