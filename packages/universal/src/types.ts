import type { BasicProfile } from '@datamodels/self.id-profile'
import type { Account } from '@datamodels/self.id-social-accounts'

export type { BasicProfile, ImageMetadata, ImageSources } from '@datamodels/self.id-profile'
export type {
  Account as AlsoKnownAsAccount,
  AlsoKnownAs,
} from '@datamodels/self.id-social-accounts'

export type Identifyable = {
  id: string
  getProfile(): Promise<BasicProfile | null>
  getSocialAccounts(): Promise<Array<Account>>
}
