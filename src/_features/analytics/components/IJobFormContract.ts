// forms/types.ts
import { JSX } from "react"
import { ZodSchema } from "zod"

export interface IJobFormContract<T> {
  schema: ZodSchema<T>
  Component: (props: { onSubmit: (values: T) => void }) => JSX.Element
}