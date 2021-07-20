import type { AppNetwork } from '@self.id/universal'

export const APP_NETWORK: AppNetwork =
  (process.env.NEXT_PUBLIC_APP_NETWORK as AppNetwork | undefined) ?? ('testnet-clay' as AppNetwork)

export const PROFILE_URL = 'https://ipfs.3box.io/profile'
