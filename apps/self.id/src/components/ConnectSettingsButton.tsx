import { useViewerID } from '@self.id/framework'
import { Button } from 'grommet'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

import { useConnectionState, useLogin } from '../hooks'

export type Props = {
  did: string | null
}

export default function ConnectSettingsButton({ did }: Props) {
  const router = useRouter()
  const connection = useConnectionState()
  const viewerID = useViewerID()
  const login = useLogin()

  const onOpen = useCallback(() => {
    if (connection.status === 'connected') {
      void router.push('/me/settings')
    } else if (connection.status !== 'connecting') {
      login().then(
        (self) => {
          if (self != null) {
            void router.push('/me/settings')
          }
        },
        () => console.warn('Failed to authenticate DID')
      )
    }
  }, [connection.status, login, router])

  return did != null && viewerID?.id === did ? (
    <Button
      primary
      color="black"
      label={connection.status === 'connected' ? 'Edit' : 'Connect to edit'}
      onClick={onOpen}
      style={{ border: 0, color: 'white', width: 180 }}
    />
  ) : null
}
