import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { IconDna2 } from '@tabler/icons-react'
import { useClipboard, useTimeout } from '@mantine/hooks'
import { useTranscriptDetails } from '@/api/hooks/transcript.hooks'
import { KeyValueList } from '@/shared/ui/components/compound'
import { PModalDialog } from '@/shared/ui/modals'
import { toTranscriptKeyValuePairs } from '../../helpers/toTranscriptKeyValuePairs'

export interface IHandles {
  open: (id: string) => void
}

export const TranscriptDetailsModal = forwardRef<IHandles>((_, ref) => {
  const clipboard = useClipboard()
  const [tooltipLabel, setTooltipLabel] = useState<string>('Click to copy value to clipboard')
  const { start } = useTimeout(() => setTooltipLabel('Click to copy value to clipboard'), 500)
  const transcriptId = useRef<string | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { data } = useTranscriptDetails(transcriptId.current)

  const copyToClipboard = (value: string | null | undefined) => {
    clipboard.copy(value)
    setTooltipLabel('Copied to clipboard.')
    start()
  }

  useImperativeHandle(ref, () => ({
    open(id: string) {
      transcriptId.current = id
      setIsOpen(true)
    },
  }))

  return (
    <PModalDialog
      title="Transcript Details"
      icon={<IconDna2 size={21} />}
      opened={isOpen}
      onClose={() => setIsOpen(false)}
      className="py-3 px-5"
      size="xl"
    >
      <KeyValueList items={toTranscriptKeyValuePairs(data, tooltipLabel, copyToClipboard)} />
    </PModalDialog>
  )
})
