import IListItem from "@/shared/types/IListItem";

export function toSelectData(list: IListItem[]) {
  return list.map(i => ({
    value: String(i.value),
    label: i.label,
  }));
}