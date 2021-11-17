import { AvatarPlaceholder } from '@self.id/framework'
import { Avatar, Box, Spinner, Text } from 'grommet'

type Props = {
  did?: string
  label: string
  loading?: boolean
  src?: string | null
}

export default function DisplayAvatar({ did, label, loading, src }: Props) {
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
