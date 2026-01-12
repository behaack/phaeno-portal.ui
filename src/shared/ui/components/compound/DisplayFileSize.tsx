export interface IProps {
  value: number | undefined
  decimals?: number
}

export function DisplayFileSize({ value, decimals = 1 }: IProps) {
  if (value === 0 || value === undefined) {
    return '0 Bytes'
  }

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(value) / Math.log(k))
  return `${parseFloat((value / k ** i).toFixed(decimals))} ${sizes[i]}`
}
