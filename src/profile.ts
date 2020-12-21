import type { IDX } from '@ceramicstudio/idx'
import type { BasicProfile } from '@ceramicstudio/idx-constants'

// import { PROFILE_URL } from './constants'

// type LegacyProfile = {
//   name?: string
//   description?: string
//   location?: string
//   website?: string
//   emoji?: string
//   birthday?: string
// }

export async function loadProfile(idx: IDX, did: string): Promise<BasicProfile | null> {
  const profile: BasicProfile | null = await idx.get('basicProfile', did)
  // if (profile == null) {
  //   const res = await fetch(`${PROFILE_URL}?did=${did}`)
  //   if (res.ok) {
  //     const legacy = (await res.json()) as LegacyProfile
  //     profile = {
  //       name: legacy.name,
  //       description: legacy.description,
  //       homeLocation: legacy.location,
  //       url: legacy.website,
  //       emoji: legacy.emoji,
  //       birthDate: legacy.birthday,
  //     }
  //   }
  // }
  return profile ?? null
}
