/**
 * Load legacy 3Box profiles.
 *
 * ## Purpose
 *
 * The`3box-legacy` module provides utility functions to load legacy 3Box profiles.
 *
 * ## Installation
 *
 * ```sh
 * npm install @self.id/3box-legacy
 * ```
 *
 * ## Common use-cases
 *
 * ### Load a legacy 3Box profile as a Self.ID basic profile
 *
 * ```ts
 * import { getLegacy3BoxProfileAsBasicProfile } from '@self.id/3box-legacy'
 *
 * async function getProfile() {
 *   // Ethereum address to load the profile of
 *   const address = '0x123efad...'
 *   return await getLegacy3BoxProfileAsBasicProfile(address)
 * }
 * ```
 *
 * @module 3box-legacy
 */

import type { BasicProfile } from '@datamodels/identity-profile-basic'
import crossFetch from 'cross-fetch'

export async function loadLegacy3BoxProfile<T = Record<string, any>>(
  address: string,
  fetchFunc: typeof crossFetch = crossFetch
): Promise<T | null> {
  try {
    const res = await fetchFunc(`https://ipfs.3box.io/profile?address=${address}`)
    return res.ok ? ((await res.json()) as T) : null
  } catch (err) {
    return null
  }
}

// Validation for BasicProfile
const lengthIndex: Record<string, number> = {
  name: 150,
  description: 420,
  location: 140, //homeLocation
  website: 240, // url
  emoji: 2,
  employer: 140, //affiliations
  school: 140, //affiliations
}

const isStrAndLen = (obj: Record<string, any>, key: string): boolean => {
  if (!lengthIndex[key]) return false
  return typeof obj[key] === 'string' && (obj[key] as string).length <= lengthIndex[key]
}

export const transformProfile = (profile: Record<string, any>): BasicProfile => {
  const transform = {} as BasicProfile
  let image, background
  if (isStrAndLen(profile, 'name')) transform.name = profile.name as string
  if (isStrAndLen(profile, 'description')) transform.description = profile.description as string
  if (isStrAndLen(profile, 'location')) transform.homeLocation = profile.location as string
  if (isStrAndLen(profile, 'website')) transform.url = profile.website as string
  if (isStrAndLen(profile, 'emoji')) transform.emoji = profile.emoji as string
  if (isStrAndLen(profile, 'employer')) transform.affiliations = [profile.employer]
  if (isStrAndLen(profile, 'school')) {
    transform.affiliations = (transform.affiliations || []).concat([profile.school])
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (Array.isArray(profile.image)) image = profile.image[0]?.contentUrl['/'] as string
  if (image != null && typeof image === 'string') {
    transform.image = {
      original: {
        src: `ipfs://${image}`,
        mimeType: 'application/octet-stream',
        width: 170,
        height: 170,
      },
    }
  }
  if (Array.isArray(profile.coverPhoto)) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    background = profile.coverPhoto[0]?.contentUrl['/'] as string
  }
  if (background != null && typeof background === 'string') {
    transform.background = {
      original: {
        src: `ipfs://${background}`,
        mimeType: 'application/octet-stream',
        width: 1000,
        height: 175,
      },
    }
  }
  return transform
}

export async function getLegacy3BoxProfileAsBasicProfile(
  address: string,
  fetchFunc?: typeof crossFetch
): Promise<BasicProfile | null> {
  const profile = await loadLegacy3BoxProfile(address, fetchFunc)
  return profile ? transformProfile(profile) : null
}
