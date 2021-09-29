import type { Account as AlsoKnownAsAccount } from '@datamodels/identity-accounts-web'
import type { BasicProfile } from '@datamodels/identity-profile-basic'
import { usePublicRecord } from '@self.id/framework'

export function useProfile(id: string): BasicProfile | null | undefined {
  return usePublicRecord('basicProfile', id).content
}

export function useSocialAccounts(id: string): Array<AlsoKnownAsAccount> {
  const accountsRecord = usePublicRecord('alsoKnownAs', id)
  return accountsRecord.content?.accounts ?? []
}
