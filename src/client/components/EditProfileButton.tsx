import type { BasicProfile } from '@ceramicstudio/idx-constants'
import { Button } from 'grommet'
import { useCallback, useEffect, useMemo, useState } from 'react'

import type { SelfID } from '../../sdk/self'

import { useEnvState, useKnownDIDs, useLogin } from '../hooks'

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
  const env = useEnvState()
  const knownDIDs = useKnownDIDs()
  const [login, loginModal] = useLogin()

  const ownDIDs = useMemo(() => Object.keys(knownDIDs), [knownDIDs])
  const [state, setState] = useState<State>({ canEdit: false })

  const loadAndOpen = useCallback((self: SelfID) => {
    self.getProfile().then(
      (profile) => {
        setState({
          canEdit: true,
          loadingProfile: false,
          modalOpen: true,
          profile: profile ?? {},
        })
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
    if (env.auth.state === 'confirmed' && env.self !== null) {
      setState({ canEdit: true, loadingProfile: true, modalOpen: false })
      loadAndOpen(env.self)
    } else if (env.auth.state !== 'loading') {
      setState({ canEdit: true, loadingProfile: true, modalOpen: false })
      login().then(
        (self) => {
          if (self == null) {
            setState({ canEdit: true, loadingProfile: false, modalOpen: false })
          } else {
            loadAndOpen(self)
          }
        },
        () => console.warn('Failed to authenticate DID')
      )
    }
  }, [env, loadAndOpen, login])

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
          : env.auth.state === 'confirmed'
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
