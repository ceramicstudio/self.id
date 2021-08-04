import type { AppNetwork } from '@self.id/core'

export const APP_NETWORK: AppNetwork =
  (process.env.NEXT_PUBLIC_APP_NETWORK as AppNetwork | undefined) ?? ('testnet-clay' as AppNetwork)

export const PROFILE_URL = 'https://ipfs.3box.io/profile'

export const IPFS_API_URL = 'https://ipfs.infura.io:5001/api/v0'
export const IPFS_URL = 'https://ipfs.infura.io/ipfs/'
