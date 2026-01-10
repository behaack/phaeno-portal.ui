import { IconKey } from '@tabler/icons-react'
import { useGetApiKeys } from '@/api/hooks/api-keys.hooks'
import { PButton } from '@/shared/ui/components'
import { PSearchInput } from '@/shared/ui/components/compound'
import { Text } from '@/shared/ui/primiatives'
import { ApiKeysTable } from './ApiKeysTable'

export function ApiKeysPanel() {
  const results = useGetApiKeys({ q: '', limit: 50, page: 1 })

  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <Text variant="subheading">Api Keys</Text>
      </div>
      <div className="flex justify-between mb-1">
        <PSearchInput placeholder="Search" />
        <PButton variant="outline" size="sm" rightSection={<IconKey size={16} />}>
          Add
        </PButton>
      </div>
      <ApiKeysTable list={results.data?.list ?? []} />
    </div>
  )
}
