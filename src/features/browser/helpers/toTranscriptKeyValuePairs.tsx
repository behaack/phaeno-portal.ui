import { IconCopy } from '@tabler/icons-react'
import { TranscriptDetailsItem } from '@/api/types/transcript'
import { PToolTip } from '@/shared/ui/components/feedback'
import { PActionIcon } from '@/shared/ui/components/inputs'

export function toTranscriptKeyValuePairs(
  transcript: TranscriptDetailsItem | null | undefined,
  toolTipLabel: string,
  copyToClipboard: (sequence: string) => void
) {
  if (!transcript) return [] // ✅ ALWAYS return an array

  return [
    { label: 'Id', value: transcript.id },
    { label: 'Transcript Id', value: transcript.transcriptId },
    { label: 'Sample Name', value: transcript.sampleName },
    { label: 'Gene id', value: transcript.geneId },
    { label: 'Gene Symbol', value: transcript.geneSymbol },
    { label: 'Definition Line', value: transcript.definitionLine },
    {
      label: 'Sequence',
      value: (
        <div className="max-w-48">
          <div className="truncate font-mono text-xs" title={transcript.sequence}>
            {transcript.sequence}
          </div>
        </div>
      ),
      valueAction: (
        <PToolTip label={toolTipLabel}>
          <PActionIcon onClick={() => copyToClipboard(transcript.sequence)} size="sm">
            <IconCopy size={15} />
          </PActionIcon>
        </PToolTip>
      ),
    },
  ]
}
