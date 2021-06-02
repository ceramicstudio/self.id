import type { CeramicNetwork } from './sdk'

export const CERAMIC_NETWORK = (process.env.NEXT_PUBLIC_CERAMIC_NETWORK as CeramicNetwork) ?? 'clay'

export const PROFILE_URL = 'https://ipfs.3box.io/profile'
