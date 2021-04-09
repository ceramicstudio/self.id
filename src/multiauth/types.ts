import type { AuthProvider } from '@ceramicnetwork/blockchain-utils-linking'
import type { AccountID } from 'caip'

export type AccountStatus = 'active' | 'unknown'

export type KnownAccount = {
  accountID: AccountID
  authProvider: AuthProvider
  status: AccountStatus
}

export type KnownAccounts = Record<string, KnownAccount>
