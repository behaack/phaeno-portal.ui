import { IconCopy } from '@tabler/icons-react'
import { FastaDetailsItem } from '@/api/types/fasta'
import { PToolTip } from '@/shared/ui/components/feedback'
import { PActionIcon } from '@/shared/ui/components/inputs'
import { DisplayEnumListItem } from '../components/shared/DisplayEnumListItem'
import { readNumberList } from '../components/shared/readNumberList'

export function toFastaKeyValuePairs(
  fasta: FastaDetailsItem | null | undefined,
  toolTipLabel: string,
  copyToClipboard: (sequence: string) => void
) {
  if (!fasta) return [] // ✅ ALWAYS return an array

  return [
    { label: 'Fasta Id', value: fasta.id },
    { label: 'Sample Name', value: fasta.sampleName },
    { label: 'SMID', value: fasta.smid },
    { label: 'Mate Pair', value: fasta.matePair },
    { label: 'Definition Line', value: fasta.definitionLine },
    { label: 'Fragment Len Array', value: fasta.fragLenArray },
    { label: 'Fragment Start Array', value: fasta.fragStartArray },
    { label: 'Number of Fragments', value: fasta.numFragments },
    {
      label: 'Read Number',
      value: <DisplayEnumListItem list={readNumberList} value={fasta.readNumber} />,
    },
    { label: 'Strand', value: fasta.strand },
    { label: 'Strand Descriminator', value: fasta.strandDiscriminator },
    { label: 'Comment', value: fasta.comment },
    {
      label: 'Sequence',
      value: (
        <div className="max-w-48">
          <div className="truncate font-mono text-xs" title={fasta.sequence}>
            {fasta.sequence}
          </div>
        </div>
      ),
      valueAction: (
        <PToolTip label={toolTipLabel}>
          <PActionIcon onClick={() => copyToClipboard(fasta?.sequence)} size="sm">
            <IconCopy size={15} />
          </PActionIcon>
        </PToolTip>
      ),
    },
  ]
}
