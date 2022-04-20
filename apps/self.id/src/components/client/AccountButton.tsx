import { useViewerID } from '@self.id/framework'
import { Avatar, Box, Button, DropButton, Spinner, Text } from 'grommet'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { forwardRef, useCallback, useMemo, useState } from 'react'
import type { ForwardedRef } from 'react'

import { useAuthConnection, useViewerProfile } from '../../hooks'
import linkIcon from '../../images/icons/link.svg'
import { formatDID, getImageURL } from '../../utils'

import AvatarPlaceholder from '../AvatarPlaceholder'

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

const MenuButton = forwardRef(function MenuButtonComponent(
  { label, loading, ...props }: MenuButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  return (
    <Button
      {...props}
      ref={ref as any}
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
})

export default function AccountButton() {
  const router = useRouter()
  const [connection, login, logout] = useAuthConnection()
  const viewerID = useViewerID()
  const profileRecord = useViewerProfile()
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [isLoadingProfile, setLoadingProfile] = useState(false)

  const toProfile = useCallback(
    (id: string | null) => {
      if (id != null) {
        if (router.route === '/[id]' && router.query.id === id) {
          // Already on wanted profile page
          setMenuOpen(false)
        } else {
          // Navigate to profile page
          setLoadingProfile(true)
          void router.push(`/${id}`).then(() => {
            setMenuOpen(false)
            setLoadingProfile(false)
          })
        }
      }
    },
    [router]
  )

  const onClickLogin = useCallback(() => {
    if (connection.status !== 'connecting') {
      void login().then((self) => {
        return self ? toProfile(self.id) : null
      })
    }
  }, [connection.status, login, toProfile])

  const [displayName, avatarSrc] = useMemo(() => {
    if (viewerID == null) {
      return ['', null]
    }

    const name = profileRecord.content?.name ?? formatDID(viewerID.id)
    const src = getImageURL(profileRecord.content?.image, { height: 60, width: 60 })
    return [name, src]
  }, [viewerID, profileRecord.content])

  if (viewerID != null) {
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
            <AvatarPlaceholder did={viewerID.id} size={60} />
          )}
          <Text size="medium" truncate weight="bold">
            {displayName}
          </Text>
        </Box>
        <Box
          background="white"
          gap="small"
          pad="medium"
          round={{ corner: 'bottom', size: 'small' }}>
          <MenuButton
            label="Profile"
            loading={isLoadingProfile}
            onClick={() => toProfile(viewerID.id)}
          />
          <Link href="/me/settings">
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
          did={viewerID.id}
          label={displayName}
          loading={isLoadingProfile}
          src={avatarSrc}
        />
      </DropButton>
    )
  }

  return connection.status === 'connecting' ? (
    <DisplayAvatar label="Connecting..." loading />
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
