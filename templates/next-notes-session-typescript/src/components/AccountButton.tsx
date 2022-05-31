import {
  EthereumAuthProvider,
  useViewerConnection,
  useViewerID,
  useViewerRecord,
} from '@self.id/framework'
import { Avatar, Box, Button, DropButton, Text } from 'grommet'
import Link from 'next/link'
import { useCallback, useState } from 'react'

import { getProfileInfo } from '../utils'

import DisplayAvatar from './DisplayAvatar'

type MenuButtonProps = {
  label: string
  onClick: () => void
}

function MenuButton({ label, ...props }: MenuButtonProps) {
  return (
    <Box pad="small">
      <Button
        alignSelf="start"
        label={
          <Text color="neutral-2" weight="bold">
            {label}
          </Text>
        }
        plain
        {...props}
      />
    </Box>
  )
}

export default function AccountButton() {
  const [connection, connect, disconnect] = useViewerConnection()
  const viewerID = useViewerID()
  const profileRecord = useViewerRecord('basicProfile')
  const [isMenuOpen, setMenuOpen] = useState(false)

  const onClickConnect = useCallback(async () => {
    // @ts-ignore
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    // @ts-ignore
    await connect(new EthereumAuthProvider(window.ethereum, accounts[0]))
  }, [connect])

  if (viewerID != null) {
    const { avatarSrc, displayName } = getProfileInfo(viewerID.id, profileRecord.content)

    const buttons =
      connection.status === 'connected' ? (
        <MenuButton label="Disconnect" onClick={() => disconnect()} />
      ) : (
        <>
          <MenuButton
            label="Connect"
            onClick={() => {
              onClickConnect()
              setMenuOpen(false)
            }}
          />
          <MenuButton label="Clear" onClick={() => disconnect()} />
        </>
      )

    const content = (
      <Box
        border={{ color: 'neutral-5' }}
        margin={{ top: 'medium' }}
        round={{ size: 'small' }}
        width="250px">
        <Box
          align="center"
          background="neutral-6"
          gap="small"
          pad="medium"
          round={{ corner: 'top', size: 'small' }}>
          {avatarSrc ? <Avatar size="60px" src={avatarSrc} /> : null}
          <Text size="medium" truncate weight="bold">
            {displayName}
          </Text>
        </Box>
        <Box background="white" pad="small" round={{ corner: 'bottom', size: 'small' }}>
          <Box pad="small">
            <Link href={`/${viewerID.id}`} passHref>
              <Button
                alignSelf="start"
                label={
                  <Text color="neutral-2" weight="bold">
                    My notes
                  </Text>
                }
                onClick={() => {
                  setMenuOpen(false)
                }}
                plain
              />
            </Link>
          </Box>
          {buttons}
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
          loading={profileRecord.isLoading}
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
      onClick={onClickConnect}
      style={{ border: 0, color: 'white' }}
    />
  )
}
