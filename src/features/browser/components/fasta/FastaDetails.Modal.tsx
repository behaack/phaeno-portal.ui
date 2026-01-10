import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { IconDna } from '@tabler/icons-react'
import { useClipboard, useTimeout } from '@mantine/hooks'
import { useFastaDetails } from '@/api/hooks/fasta.hooks'
import { KeyValueList } from '@/shared/ui/components/compound'
import { PModalDialog } from '@/shared/ui/modals'
import { toFastaKeyValuePairs } from '../../helpers/toFastaKeyValuePairs'

export interface IHandles {
  open: (id: string) => void
}

export const FastaDetailsModal = forwardRef<IHandles>((_, ref) => {
  const clipboard = useClipboard()
  const [tooltipLabel, setTooltipLabel] = useState<string>('Click to copy value to clipboard')
  const { start } = useTimeout(() => setTooltipLabel('Click to copy value to clipboard'), 500)
  const fastaId = useRef<string | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { data } = useFastaDetails(fastaId.current)

  const copyToClipboard = (value: string | null | undefined) => {
    clipboard.copy(value)
    setTooltipLabel('Copied to clipboard.')
    start()
  }

  useImperativeHandle(ref, () => ({
    open(id: string) {
      fastaId.current = id
      setIsOpen(true)
    },
  }))

  return (
    <PModalDialog
      title="Fasta Details"
      icon={<IconDna size={21} />}
      opened={isOpen}
      onClose={() => setIsOpen(false)}
      className="py-3 px-5"
      size="xl"
    >
      <KeyValueList items={toFastaKeyValuePairs(data, tooltipLabel, copyToClipboard)} />
    </PModalDialog>
  )
})
