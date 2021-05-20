import type { BasicProfile } from '@ceramicstudio/idx-constants'

export type Identifyable = {
  id: string
  getProfile(): Promise<BasicProfile | null>
}
