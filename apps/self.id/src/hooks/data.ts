import { usePublicRecord } from '@self.id/framework'
import type { AlsoKnownAsAccount, BasicProfile } from '@self.id/framework'

export function useProfile(id: string): BasicProfile | null | undefined {
  return usePublicRecord('basicProfile', id).content
}

export function useSocialAccounts(id: string): Array<AlsoKnownAsAccount> {
  const accountsRecord = usePublicRecord('alsoKnownAs', id)
  return accountsRecord.content?.accounts ?? []
}
