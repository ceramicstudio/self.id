import { Button } from 'grommet'
import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'

import { useEnvState, useKnownDIDs, useLogin } from '../hooks'

export type Props = {
  did: string | null
}

export default function ConnectSettingsButton({ did }: Props) {
  const router = useRouter()
  const env = useEnvState()
  const knownDIDs = useKnownDIDs()
  const login = useLogin()

  const isOwnDID = useMemo(() => {
    return did != null && Object.keys(knownDIDs).includes(did)
  }, [did, knownDIDs])

  const onOpen = useCallback(() => {
    if (env.auth.state === 'confirmed') {
      void router.push('/me/settings')
    } else if (env.auth.state !== 'loading') {
      login().then(
        (self) => {
          if (self != null) {
            void router.push('/me/settings')
          }
        },
        () => console.warn('Failed to authenticate DID')
      )
    }
  }, [env, login, router])

  return isOwnDID ? (
    <Button
      primary
      color="black"
      label={env.auth.state === 'confirmed' ? 'Edit' : 'Connect to edit'}
      onClick={onOpen}
      style={{ border: 0, color: 'white', width: 180 }}
    />
  ) : null
}
