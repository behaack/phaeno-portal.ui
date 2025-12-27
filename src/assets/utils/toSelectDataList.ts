import { IListItem } from "../interfaces/_index";

export function toSelectData(list: IListItem[]) {
  return list.map(i => ({
    value: String(i.value),
    label: i.label,
  }));
}