import { AvatarPlaceholder, usePublicRecord } from '@self.id/framework'
import { Anchor, Avatar, Box, Nav, Text } from 'grommet'
import Link from 'next/link'

import { useNotesRecord } from '../hooks'
import { getProfileInfo } from '../utils'

type Props = {
  did: string
  active?: string
}

export default function NotesList({ active, did }: Props) {
  const profileRecord = usePublicRecord('basicProfile', did)
  const notesRecord = useNotesRecord(did)

  const profile = getProfileInfo(did, profileRecord.content)
  const avatar = profile.avatarSrc ? (
    <Avatar size="32px" src={profile.avatarSrc} flex={false} />
  ) : (
    <AvatarPlaceholder did={did} size={32} />
  )

  const notes = notesRecord.content?.notes ?? []
  const items = notes.map((note) => {
    const id = note.id.replace('ceramic://', '')
    const link =
      id === active ? (
        <Text color="brand">{note.title}</Text>
      ) : (
        <Link href={`/${did}/${id}`}>{note.title}</Link>
      )
    return (
      <Box key={id} border={{ color: 'brand', side: 'bottom' }} pad="small">
        {link}
      </Box>
    )
  })

  return (
    <Box fill="vertical" overflow="vertical" width="medium" pad="medium">
      <Box
        border={{ color: 'brand', side: 'bottom' }}
        direction="row"
        gap="small"
        pad={{ bottom: 'small' }}>
        {avatar}
        <Link href={`/${did}`} passHref>
          <Anchor>
            <Text alignSelf="center" size="medium" truncate weight="bold">
              {profile.displayName}
              {"'"}s notes
            </Text>
          </Anchor>
        </Link>
      </Box>
      <Nav direction="column" gap="none">
        {items}
      </Nav>
    </Box>
  )
}
