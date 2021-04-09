import { atom } from 'jotai'

import type { KnownAccount, KnownAccounts } from './types'

export const knownAccountsAtom = atom<KnownAccounts>({})

export const selectedAccountID = atom<string | null>(null)

export const selectedKnownAccount = atom<KnownAccount | null>((get) => {
  const id = get(selectedAccountID)
  const account = id ? get(knownAccountsAtom)[id] : null
  return account ?? null
})
