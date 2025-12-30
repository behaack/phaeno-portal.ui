import { z } from "zod"
import { ETwoFactorMethod } from "@/_api/types/auth"
import { createFileRoute } from "@tanstack/react-router"
import { TwoFactorPage } from "@/_features/auth/TwoFactorPage"

const searchSchema = z.object({
  loginChallengeId: z.string().uuid(),
  method: z.coerce.number().pipe(z.nativeEnum(ETwoFactorMethod)),
})

export const Route = createFileRoute("/auth/two-factor/")({
  validateSearch: (search) => searchSchema.parse(search),
  component: TwoFactorPage  
})