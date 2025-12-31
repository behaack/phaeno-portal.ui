// forms/types.ts
import { ZodTypeAny } from "zod"

export interface IFormBundle<T> {
  Fields: React.ComponentType
  schema: ZodTypeAny
  defaults: T
}
