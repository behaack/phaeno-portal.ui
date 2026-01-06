import { forwardRef, useImperativeHandle, useRef, useState } from "react"
import { IconMath } from "@tabler/icons-react";
import { PModalDialog } from "@/shared/ui/modals";
import { KeyValueList } from "@/shared/ui/components/compound";
import { toFastaKeyValuePairs } from "../../helpers/toFastaKeyValuePairs";
import { useFastaDetails } from "@/api/hooks/fasta.hooks";
import { IconDna } from "@tabler/icons-react";

export interface IHandles {
  open: (id: string) => void;
}

export const FastaDetailsModal = forwardRef<IHandles>((_, ref) => {
  const fastaId = useRef<string | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data } = useFastaDetails(fastaId.current)

  useImperativeHandle(ref, () => ({
    open(id: string) {
      fastaId.current = id
      setIsOpen(true)  
    },
  }));  

  return (
    <PModalDialog 
      title="Fasta Details" 
      icon={<IconDna size={21} />} 
      opened={isOpen} 
      onClose={() => setIsOpen(false)}
      className="py-3 px-5"
      size="xl"
    >
      <KeyValueList items={toFastaKeyValuePairs(data)} />
    </PModalDialog>
  )
})