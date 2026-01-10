import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { FilesIndexPage } from '@/features/files/FilesIndexPage'

const queryValidator = z.object({
  parentId: z.string().optional(),
})

export const Route = createFileRoute('/app/files')({
  validateSearch: queryValidator,
  component: FilesIndexPage,
})
