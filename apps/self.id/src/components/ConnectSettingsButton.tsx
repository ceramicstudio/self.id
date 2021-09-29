import { useAuthentication, useViewerID } from '@self.id/framework'
import { Button } from 'grommet'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

import { useLogin } from '../hooks'

export type Props = {
  did: string | null
}

export default function ConnectSettingsButton({ did }: Props) {
  const router = useRouter()
  const [authState] = useAuthentication()
  const viewerID = useViewerID()
  const login = useLogin()

  const onOpen = useCallback(() => {
    if (authState.status === 'authenticated') {
      void router.push('/me/settings')
    } else if (authState.status !== 'authenticating') {
      login().then(
        (self) => {
          if (self != null) {
            void router.push('/me/settings')
          }
        },
        () => console.warn('Failed to authenticate DID')
      )
    }
  }, [authState.status, login, router])

  return did != null && viewerID?.id === did ? (
    <Button
      primary
      color="black"
      label={authState.status === 'authenticated' ? 'Edit' : 'Connect to edit'}
      onClick={onOpen}
      style={{ border: 0, color: 'white', width: 180 }}
    />
  ) : null
}
