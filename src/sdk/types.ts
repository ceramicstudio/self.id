import type { AlsoKnownAsAccount, BasicProfile } from '@ceramicstudio/idx-constants'

export type Identifyable = {
  id: string
  getProfile(): Promise<BasicProfile | null>
  getSocialAccounts(): Promise<Array<AlsoKnownAsAccount>>
}
