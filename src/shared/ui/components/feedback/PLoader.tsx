import { Loader, type LoaderProps } from "@mantine/core"

export type PLoaderProps = LoaderProps

export function PLoader(props: PLoaderProps) {
  return <Loader size="sm" {...props} />
}
