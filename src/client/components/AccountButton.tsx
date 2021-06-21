import { Avatar, Box, Button, DropButton, Spinner, Text } from 'grommet'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'

import AvatarPlaceholder from '../../components/AvatarPlaceholder'
import linkIcon from '../../images/icons/link.svg'
import { getImageSrc } from '../../sdk'
import { formatDID } from '../../utils'

import { useDIDsData, useEnvState, useLogin, useLogout } from '../hooks'

type DisplayAvatarProps = {
  did?: string
  label: string
  loading?: boolean
  src?: string | null
}

function DisplayAvatar({ did, label, loading, src }: DisplayAvatarProps) {
  const avatar = loading ? (
    <Box pad="xxsmall">
      <Spinner />
    </Box>
  ) : src ? (
    <Avatar size="32px" src={src} flex={false} />
  ) : (
    <AvatarPlaceholder did={did} size={32} />
  )

  return (
    <Box
      border={{ color: 'neutral-5' }}
      direction="row"
      gap="small"
      pad="xxsmall"
      round="large"
      width="250px">
      {avatar}
      <Text alignSelf="center" size="medium" truncate weight="bold">
        {label}
      </Text>
    </Box>
  )
}

type MenuButtonProps = {
  href?: string
  label: string
  loading?: boolean
  onClick?: () => void
}

function MenuButton({ label, loading, ...props }: MenuButtonProps) {
  return (
    <Button
      {...props}
      alignSelf="start"
      icon={
        loading ? (
          <Spinner size="xsmall" />
        ) : (
          <Box style={{ marginBottom: '2px', marginTop: '2px', marginRight: '4px' }}>
            <Image alt="" src={linkIcon} />
          </Box>
        )
      }
      label={
        <Text color="neutral-2" weight="bold">
          {label}
        </Text>
      }
      plain
    />
  )
}

export default function AccountButton() {
  const router = useRouter()
  const { auth } = useEnvState()
  const login = useLogin()
  const logout = useLogout()
  const [knownDIDsData, loadDIDsData] = useDIDsData()
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [isLoadingProfile, setLoadingProfile] = useState(false)

  useEffect(() => {
    void loadDIDsData()
  }, [])

  const toProfile = useCallback(
    (id: string | null) => {
      if (id != null) {
        setLoadingProfile(true)
        return router.push(`/${id}`).then(() => {
          setMenuOpen(false)
          setLoadingProfile(false)
        })
      }
    },
    [router]
  )

  const onClickLogin = useCallback(() => {
    if (auth.state !== 'loading') {
      void login().then((self) => {
        return self ? toProfile(self.id) : null
      })
    }
  }, [auth.state, login, toProfile])

  const [displayName, avatarSrc] = useMemo(() => {
    if (auth.id == null) {
      return ['', null]
    }

    const profile = knownDIDsData?.[auth.id]?.profile
    const name = profile?.name ?? formatDID(auth.id)
    const src = profile?.image ? getImageSrc(profile.image, { height: 60, width: 60 }) : null
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
          {avatarSrc ? (
            <Avatar size="60px" src={avatarSrc} />
          ) : (
            <AvatarPlaceholder did={auth.id} size={60} />
          )}
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
          <MenuButton
            label="Profile"
            loading={isLoadingProfile}
            onClick={() => toProfile(auth.id as string)}
          />
          <Link href="/me/settings" passHref>
            <MenuButton label="Settings" onClick={() => setMenuOpen(false)} />
          </Link>
          <MenuButton label="Log out" onClick={() => logout()} />
        </Box>
      </Box>
    )

    return (
      <DropButton
        dropAlign={{ top: 'bottom', right: 'right' }}
        dropContent={content}
        dropProps={{ plain: true }}
        onClose={() => {
          setMenuOpen(false)
        }}
        onOpen={() => {
          setMenuOpen(true)
        }}
        open={isMenuOpen}>
        <DisplayAvatar
          did={auth.id}
          label={displayName}
          loading={isLoadingProfile}
          src={avatarSrc}
        />
      </DropButton>
    )
  }

  return auth.state === 'loading' ? (
    <DisplayAvatar did={auth.id} label="Connecting..." loading />
  ) : (
    <Button
      primary
      color="black"
      label="Connect"
      onClick={onClickLogin}
      style={{ border: 0, color: 'white' }}
    />
  )
}
