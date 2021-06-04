import Avatar from 'boring-avatars'

type Props = {
  did?: string | null
  size: number | string
}

export default function AvatarPlaceholder({ did, size }: Props) {
  return (
    <Avatar
      name={did ?? 'self.id'}
      size={size}
      variant="marble"
      colors={['#FF0092', '#FFCA1B', '#B6FF00', '#228DFF', '#BA01FF']}
    />
  )
}
