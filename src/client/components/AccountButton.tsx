import { Avatar, Box, Button, DropButton, Text } from 'grommet'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

import avatarPlaceholder from '../../images/avatar-placeholder.png'
import linkIcon from '../../images/icons/link.svg'
import { useIDXAuth, useLogin, useLogout } from '../hooks'
import { ACCENT_COLOR, BRAND_COLOR } from '../../theme'

function formatDID(did: string): string {
  return did.length <= 20 ? did : `${did.slice(0, 10)}...${did.slice(-6, -1)}`
}

type DisplayAvatarProps = {
  label: string
  src?: string
}

function DisplayAvatar({ label, src }: DisplayAvatarProps) {
  return (
    <Box
      border={{ color: 'neutral-5' }}
      direction="row"
      gap="small"
      pad="xxsmall"
      round="large"
      width="250px">
      <Avatar size="35px" src={src ?? avatarPlaceholder} />
      <Text alignSelf="center" size="medium" weight="bold">
        {label}
      </Text>
    </Box>
  )
}

type MenuButtonProps = {
  label: string
  onClick: () => void
}

function MenuButton({ label, onClick }: MenuButtonProps) {
  return (
    <Button
      alignSelf="start"
      icon={<img src={linkIcon} />}
      label={
        <Text color="neutral-2" weight="bold">
          {label}
        </Text>
      }
      onClick={onClick}
      plain
    />
  )
}

export default function AccountButton() {
  const router = useRouter()
  const [auth] = useIDXAuth()
  const [login, loginModal] = useLogin()
  const logout = useLogout()

  const toProfile = useCallback(
    (id: string | null) => {
      if (id != null) {
        return router.push(`/${id}`)
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

  if (auth.id != null) {
    const displayDID = formatDID(auth.id)

    const content = (
      <Box border={{ color: 'neutral-5' }} margin={{ top: '30px' }} round={{ size: 'small' }}>
        <Box
          align="center"
          background="neutral-6"
          gap="small"
          pad="medium"
          round={{ corner: 'top', size: 'small' }}>
          <Avatar size="60px" src={avatarPlaceholder} />
          <Text size="medium" weight="bold">
            {displayDID}
          </Text>
        </Box>
        <Box
          background="white"
          gap="small"
          pad="medium"
          round={{ corner: 'bottom', size: 'small' }}>
          <MenuButton label="Profile" onClick={() => toProfile(auth.id as string)} />
          <MenuButton label="Log out" onClick={() => logout()} />
        </Box>
      </Box>
    )

    return (
      <DropButton
        dropAlign={{ top: 'bottom', right: 'right' }}
        dropContent={content}
        dropProps={{ plain: true }}>
        <DisplayAvatar label={displayDID} />
      </DropButton>
    )
  }

  return auth.state === 'LOADING' ? (
    <DisplayAvatar label="Connecting..." />
  ) : (
    <>
      <Button
        primary
        color={ACCENT_COLOR}
        label="Connect"
        onClick={onClickLogin}
        style={{ border: 0, color: BRAND_COLOR }}
      />
      {loginModal}
    </>
  )
}
