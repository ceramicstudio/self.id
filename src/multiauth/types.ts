import type { AccountID } from 'caip'

import type {
  ConnectionProvider as EthereumConnectionProvider,
  ProviderConfig as EthereumConfig,
} from './ethereum/types'
import type { Deferred } from './utils'

export type ConnectionProviders = {
  ethereum: EthereumConnectionProvider
}

export type ProviderType = keyof ConnectionProviders

export type AuthAccount<Type extends ProviderType> = {
  accountID: AccountID
  provider: ConnectionProviders[Type]
}

export type SelectedAuthMethod<Type extends ProviderType> = {
  type: Type
  method: ConnectionProviders[Type]['method']
}

export type AuthState<Type extends ProviderType = 'ethereum'> =
  | { status: 'DISCONNECTED' }
  | {
      status: 'CONNECTING'
      promise: Deferred<AuthAccount<Type> | null>
      modal: boolean
      provider?: SelectedAuthMethod<Type>
    }
  | { status: 'CONNECTED'; connected: AuthAccount<Type> }
  | { status: 'FAILED'; error?: Error }

export type ProviderConfig = {
  ethereum: EthereumConfig
}
