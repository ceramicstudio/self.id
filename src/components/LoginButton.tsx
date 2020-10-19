import { Button } from 'grommet'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

import { useIDXAuth } from '../client/hooks'

export default function LoginButton() {
  const router = useRouter()
  const [auth, authenticate] = useIDXAuth()

  const onClick = useCallback(() => {
    if (auth.state !== 'LOADING') {
      void authenticate().then((id) => router.push(`/me/${id}`))
    }
  }, [auth.state, authenticate, router])

  return auth.id ? (
    <Link href={`/me/${auth.id}`}>{auth.id}</Link>
  ) : (
    <Button onClick={onClick}>Login</Button>
  )
}
