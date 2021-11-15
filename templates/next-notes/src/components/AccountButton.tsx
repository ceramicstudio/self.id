import {
  AvatarPlaceholder,
  formatDID,
  getImageURL,
  useConnection,
  useViewerID,
  useViewerRecord,
} from '@self.id/framework'
import { Avatar, Box, Button, DropButton, Text } from 'grommet'
import Link from 'next/link'

import { IPFS_URL } from '../constants'
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
  const [connection, connect, disconnect] = useConnection()
  const viewerID = useViewerID()
  const profileRecord = useViewerRecord('basicProfile')

  if (viewerID != null) {
    const displayName = profileRecord.content?.name ?? formatDID(viewerID.id)
    const avatarSrc = getImageURL(IPFS_URL, profileRecord.content?.image, { height: 60, width: 60 })

    const buttons =
      connection.status === 'connected' ? (
        <MenuButton label="Disconnect" onClick={() => disconnect()} />
      ) : (
        <>
          <MenuButton label="Connect" onClick={() => connect()} />
          <MenuButton label="Clear" onClick={() => disconnect()} />
        </>
      )

    const content = (
      <Box
        border={{ color: 'neutral-5' }}
        margin={{ top: 'small' }}
        round={{ size: 'small' }}
        width="250px">
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
        dropProps={{ plain: true }}>
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
      onClick={() => connect()}
      style={{ border: 0, color: 'white' }}
    />
  )
}
