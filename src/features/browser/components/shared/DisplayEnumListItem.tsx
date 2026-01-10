import IListItem from '@/shared/types/IListItem'

export interface IProps {
  list: IListItem[]
  value: number | null | undefined
}

export function DisplayEnumListItem({ list, value }: IProps) {
  const findValue = (val: number | null | undefined): string => {
    const index = list.findIndex((item: IListItem) => item.value === val)
    if (index >= 0) {
      return list[index].label
    }
    return ''
  }

  return <span>{findValue(value)}</span>
}
