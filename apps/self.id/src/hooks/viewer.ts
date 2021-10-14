import { useViewerRecord } from '@self.id/framework'
import type {
  AlsoKnownAsAccount,
  AlsoKnownAs,
  BasicProfile,
  ViewerRecord,
} from '@self.id/framework'
import type { DID } from 'dids'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import {
  IdentityLink,
  createGitHub,
  createTwitter,
  findGitHub,
  findTwitter,
  removeSocialAccount,
} from '../identity-link'

export function useIdentityLink(url?: string): IdentityLink {
  const [identityLink, setIdentityLink] = useState<IdentityLink>(() => new IdentityLink(url))
  useEffect(() => {
    setIdentityLink(new IdentityLink(url))
  }, [url])
  return identityLink
}

export function useViewerProfile(): ViewerRecord<BasicProfile | null> {
  return useViewerRecord('basicProfile')
}

export function useEditProfile(): [boolean, (profile: BasicProfile) => Promise<void>] {
  const profileRecord = useViewerRecord('basicProfile')

  const editProfile = useCallback(
    async (profile: BasicProfile) => {
      if (!profileRecord.isMutable || profileRecord.isMutating) {
        return
      }

      try {
        await toast.promise(profileRecord.set(profile), {
          loading: 'Saving profile...',
          success: 'Profile successfully saved!',
          error: 'Failed to save profile',
        })
      } catch (error) {
        console.warn('Failed to save profile', error)
      }
    },
    [profileRecord]
  )

  return [profileRecord.isMutating, editProfile]
}

export function useViewerSocialAccounts(): ViewerRecord<AlsoKnownAs | null> {
  return useViewerRecord('alsoKnownAs')
}

export function useRemoveSocialAccount(): [
  AlsoKnownAsAccount | null,
  (account: AlsoKnownAsAccount) => Promise<void>
] {
  const accountsRecord = useViewerSocialAccounts()
  const [removingAccount, setRemovingAccount] = useState<AlsoKnownAsAccount | null>(null)

  const removeAccount = useCallback(
    async (account: AlsoKnownAsAccount) => {
      if (!accountsRecord.isMutable || removingAccount != null) {
        return
      }

      setRemovingAccount(account)
      const currentAccounts = accountsRecord.content?.accounts ?? []
      try {
        const accounts = removeSocialAccount(currentAccounts, account.host, account.id)
        if (accounts !== currentAccounts) {
          await accountsRecord.set({ accounts })
        }
      } catch (err) {
        console.warn('Failed to remove social account', err)
      } finally {
        setRemovingAccount(null)
      }
    },
    [accountsRecord, removingAccount, setRemovingAccount]
  )

  return [removingAccount, removeAccount]
}

export function useAddGitHubAttestation(identityLink: IdentityLink) {
  const accountsRecord = useViewerSocialAccounts()

  return useCallback(
    async (did: DID, username: string, challengeCode: string): Promise<boolean> => {
      if (!accountsRecord.isMutable || accountsRecord.isMutating) {
        return false
      }

      const attestation = await identityLink.confirmGitHubChallenge(did, challengeCode)
      const accounts = accountsRecord.content?.accounts ?? []

      const existing = findGitHub(accounts, username)
      if (existing == null) {
        accounts.push(createGitHub(username, attestation))
      } else {
        existing.attestations = existing.attestations ?? []
        existing.attestations.push({ 'did-jwt-vc': attestation })
      }

      await accountsRecord.set({ accounts })
      return true
    },
    [accountsRecord, identityLink]
  )
}

export function useAddTwitterAttestation(identityLink: IdentityLink) {
  const accountsRecord = useViewerSocialAccounts()

  return useCallback(
    async (did: DID, username: string, challengeCode: string): Promise<boolean> => {
      if (!accountsRecord.isMutable || accountsRecord.isMutating) {
        return false
      }

      const attestation = await identityLink.confirmTwitterChallenge(did, challengeCode)
      const accounts = accountsRecord.content?.accounts ?? []

      const existing = findTwitter(accounts, username)
      if (existing == null) {
        accounts.push(createTwitter(username, attestation))
      } else {
        existing.attestations = existing.attestations ?? []
        existing.attestations.push({ 'did-jwt-vc': attestation })
      }

      await accountsRecord.set({ accounts })
      return true
    },
    [accountsRecord, identityLink]
  )
}
