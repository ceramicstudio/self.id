import { Button, Menu } from 'grommet'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

import { useIDXAuth, useLogin, useLogout } from '../hooks'
import accountIconOrange from '../../images/icons/account-orange.svg'
import accountIconWhite from '../../images/icons/account-white.svg'

export type Props = {
  variant?: 'orange' | 'white'
}

export default function AccountButton({ variant }: Props) {
  const router = useRouter()
  const [auth] = useIDXAuth()
  const [login, loginModal] = useLogin()
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

  // const onClickSwitch = useCallback(() => {
  //   if (auth.state !== 'LOADING') {
  //     void login(true).then(toProfile)
  //   }
  // }, [auth.state, login, toProfile])

  const accountIcon = variant === 'white' ? accountIconWhite : accountIconOrange

  if (auth.id != null || auth.state === 'LOADING') {
    let items: Array<any> = [{ label: 'Authenticating...' }]
    if (auth.id != null) {
      const profilePage = `/me/${auth.id}`
      items = [
        { label: 'Accounts', onClick: () => router.push('/accounts') },
        { label: 'Profile', onClick: () => router.push(profilePage) },
        // { label: 'Switch account', onClick: onClickSwitch },
        { label: 'Logout', onClick: logout },
      ]
    }

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
    <>
      <Button onClick={onClickLogin} style={{ padding: '12px' }}>
        <img alt="Login" src={accountIcon} />
      </Button>
      {loginModal}
    </>
  )
}
