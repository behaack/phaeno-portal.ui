import { DateTime } from "luxon";

export type DateFormat = 'short-date' | 'long-date' | 'short-datetime' | 'long-datetime'

export interface Props {
  value: string
  format: DateFormat
}

export function DisplayDateTime({ value, format }: Props) {
  const date = DateTime.fromISO(value)

  switch (format) {
    case 'short-date':
      return date.toLocaleString(DateTime.DATE_SHORT)
    case 'long-date':
      return date.toLocaleString(DateTime.DATE_FULL)
    case 'short-datetime':
      return date.toLocaleString(DateTime.DATETIME_SHORT)
    case 'long-datetime':
      return date.toLocaleString(DateTime.DATETIME_FULL)
  }
}