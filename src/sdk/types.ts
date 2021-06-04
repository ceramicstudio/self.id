import type { AlsoKnownAs, BasicProfile } from '@ceramicstudio/idx-constants'

export type Identifyable = {
  id: string
  getAlsoKnownAs(): Promise<AlsoKnownAs | null>
  getProfile(): Promise<BasicProfile | null>
}
