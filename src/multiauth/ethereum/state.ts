import { atom } from 'jotai'

export const connectInjectedAtom = atom<Promise<void> | null>(null)
