import { Button } from 'grommet'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

import { useIDXAuth } from '../client/hooks'
import accountIcon from '../images/account.svg'

export default function LoginButton() {
  const router = useRouter()
  const [auth, authenticate] = useIDXAuth()

  const onClick = useCallback(() => {
    if (auth.state !== 'LOADING') {
      void authenticate().then((id) => router.push(`/me/${id}`))
    }
  }, [auth.state, authenticate, router])

  return auth.id ? (
    <Link href={`/me/${auth.id}`}>
      <img src={accountIcon} alt="Me" />
    </Link>
  ) : (
    <Button onClick={onClick}>
      <img src={accountIcon} alt="Login" />
    </Button>
  )
}
