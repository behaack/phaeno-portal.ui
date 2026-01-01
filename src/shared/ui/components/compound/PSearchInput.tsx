import { useEffect, useMemo, useState } from "react"
import { PCloseButton, PTextInput } from "../inputs"
import { IconSearch } from "@tabler/icons-react"
import { useDebouncedValue } from "@mantine/hooks"
import { PLoader } from "../feedback"

export interface IProps {
  className?: string
  placeholder?: string
  value?: string
  loading?: boolean
  onChange?: (value: string) => void
}

export function PSearchInput({
  className,
  placeholder="",
  value="",
  loading=false,
  onChange
}: IProps) {
  const [searchValue, setSearchValue] = useState(value)
  const [debouncedSearch] = useDebouncedValue(searchValue, 250)

  useEffect(() => {
    if (onChange) onChange(debouncedSearch)
  }, [debouncedSearch])

  const onChangeHndl = (value: string) => {
    setSearchValue(value)
  }

  const clearBtnVisible = useMemo(() => {
    return searchValue !== ''
  }, [searchValue])

  const clearContents = () => {
    setSearchValue("")
  }

  const rightSection = loading ? (
    <PLoader size="xs" />
  ) : clearBtnVisible ? (
    <PCloseButton
      size="md"
      variant="transparent"
      onClick={clearContents}
    />
  ) : null;

  return (
    <PTextInput 
      className={className}
      placeholder={placeholder}
      value={searchValue}
      onChange={(e) => onChangeHndl(e.currentTarget.value)}
      leftSection={<IconSearch style={{ width: 16, height: 16 }} />}
      rightSection={rightSection}      
    />
  )
}