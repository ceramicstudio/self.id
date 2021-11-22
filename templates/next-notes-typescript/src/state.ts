import { atom } from 'jotai'
import { atomWithReset } from 'jotai/utils'

import type { EditionState, NoteForm } from './types'

export const draftNoteAtom = atomWithReset<NoteForm>({ text: '', title: '' })

export const editionStateAtom = atom<EditionState>({ status: 'pending' })
