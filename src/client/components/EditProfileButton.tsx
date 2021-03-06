import type { BasicProfile } from '@ceramicstudio/idx-constants'
import { Button } from 'grommet'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { useIDXAuth, useIDXEnv, useKnownDIDs, useLogin } from '../hooks'

import EditProfileModal from './EditProfileModal'

export interface Props {
  did: string | null
  setProfile: (profile: BasicProfile) => void
}

type EditableState =
  | { loadingProfile: boolean; modalOpen: false; profile?: BasicProfile }
  | { loadingProfile: boolean; modalOpen: true; profile: BasicProfile }

type State = { canEdit: false } | ({ canEdit: true } & EditableState)

export default function EditProfileButton({ did, setProfile }: Props) {
  const [auth] = useIDXAuth()
  const { idx } = useIDXEnv()
  const knownDIDs = useKnownDIDs()
  const [login, loginModal] = useLogin()

  const ownDIDs = useMemo(() => Object.keys(knownDIDs), [knownDIDs])
  const [state, setState] = useState<State>({ canEdit: false })

  const loadAndOpen = useCallback((id) => {
    idx.get<BasicProfile>('basicProfile', id).then(
      (profile) => {
        setState({ canEdit: true, loadingProfile: false, modalOpen: true, profile: profile ?? {} })
      },
      (err) => {
        console.warn('Failed to load profile', err)
        setState({ canEdit: true, loadingProfile: false, modalOpen: false })
      }
    )
  }, [])

  const onClose = useCallback(
    (profile?: BasicProfile) => {
      if (profile != null) {
        setProfile(profile)
      }
      setState((current) => ({ ...current, modalOpen: false, profile }))
    },
    [setProfile]
  )

  const onOpen = useCallback(() => {
    if (auth.state === 'confirmed') {
      setState({ canEdit: true, loadingProfile: true, modalOpen: false })
      loadAndOpen(auth.id)
    } else if (auth.state !== 'loading') {
      setState({ canEdit: true, loadingProfile: true, modalOpen: false })
      login().then(
        (id) => {
          if (id == null) {
            setState({ canEdit: true, loadingProfile: false, modalOpen: false })
          } else {
            loadAndOpen(id)
          }
        },
        () => console.warn('Failed to authenticate DID')
      )
    }
  }, [auth, loadAndOpen, login])

  useEffect(() => {
    if (did != null && ownDIDs.includes(did)) {
      setState({ canEdit: true, loadingProfile: false, modalOpen: false })
    } else {
      setState({ canEdit: false })
    }
  }, [did, ownDIDs])

  const button = state.canEdit ? (
    <Button
      primary
      color="black"
      label={
        state.loadingProfile
          ? 'Loading...'
          : auth.state === 'confirmed'
          ? 'Edit'
          : 'Connect to edit'
      }
      onClick={onOpen}
      style={{ border: 0, color: 'white', width: 180 }}
    />
  ) : null
  const modal =
    state.canEdit && state.modalOpen ? (
      <EditProfileModal onClose={onClose} profile={state.profile} />
    ) : null

  return (
    <>
      {button}
      {loginModal}
      {modal}
    </>
  )
}
