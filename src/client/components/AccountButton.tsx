import { Avatar, Box, Button, DropButton, Text } from 'grommet'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo } from 'react'

import avatarPlaceholder from '../../images/avatar-placeholder.png'
import linkIcon from '../../images/icons/link.svg'
import { getImageSrc } from '../../image'
import { ACCENT_COLOR, BRAND_COLOR } from '../../theme'
import { formatDID } from '../../utils'

import { useIDXAuth, useDIDsData, useLogin, useLogout } from '../hooks'

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
  const [knownDIDsData, loadDIDsData] = useDIDsData()

  useEffect(() => {
    void loadDIDsData()
  }, [])

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

  const [displayName, avatarSrc] = useMemo(() => {
    if (auth.id == null) {
      return ['', avatarPlaceholder]
    }

    const profile = knownDIDsData?.[auth.id]?.profile
    const name = profile?.name ?? formatDID(auth.id)
    const src = profile?.image
      ? getImageSrc(profile.image, { height: 60, width: 60 })
      : avatarPlaceholder
    return [name, src]
  }, [auth.id, knownDIDsData])

  if (auth.id != null) {
    const content = (
      <Box border={{ color: 'neutral-5' }} margin={{ top: '30px' }} round={{ size: 'small' }}>
        <Box
          align="center"
          background="neutral-6"
          gap="small"
          pad="medium"
          round={{ corner: 'top', size: 'small' }}>
          <Avatar size="60px" src={avatarSrc} />
          <Text size="medium" truncate weight="bold">
            {displayName}
          </Text>
          {/* <Button
            label="Switch identities"
            onClick={() => router.push('/me/identities')}
            plain
            size="small"
            style={{
              backgroundColor: 'white',
              border: '1px solid #A8A8A8',
              borderRadius: 30,
              fontSize: '14px',
              padding: '6px 12px',
            }}
          /> */}
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
        <DisplayAvatar label={displayName} src={avatarSrc} />
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
