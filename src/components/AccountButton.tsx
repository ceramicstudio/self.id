import { Button, Menu } from 'grommet'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

import { useIDXAuth, useLogout } from '../client/hooks'
import accountIcon from '../images/icons/account.svg'

export default function AccountButton() {
  const router = useRouter()
  const [auth, login] = useIDXAuth()
  const logout = useLogout()

  const toProfile = useCallback(
    (id: string | null) => {
      if (id != null) {
        return router.push(`/me/${id}`)
      }
    },
    [router]
  )

  const onClickLogin = useCallback(() => {
    if (auth.state !== 'LOADING') {
      void login().then(toProfile)
    }
  }, [auth.state, login, toProfile])

  const onClickSwitch = useCallback(() => {
    if (auth.state !== 'LOADING') {
      void login([], true).then(toProfile)
    }
  }, [auth.state, login, toProfile])

  if (auth.id != null || auth.state === 'LOADING') {
    const items = auth.id
      ? [
          { label: 'Profile', href: `/me/${auth.id}` },
          { label: 'Switch account', onClick: onClickSwitch },
          { label: 'Logout', onClick: logout },
        ]
      : [{ label: 'Authenticating...' }]

    return (
      <Menu
        justifyContent="end"
        dropAlign={{ right: 'right', top: 'top' }}
        icon={false}
        items={items}
        label={<img alt="Account" src={accountIcon} />}
        style={{ color: 'white' }}
      />
    )
  }

  return (
    <Button onClick={onClickLogin} style={{ padding: '12px' }}>
      <img alt="Login" src={accountIcon} />
    </Button>
  )
}
