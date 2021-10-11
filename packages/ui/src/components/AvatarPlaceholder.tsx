import BoringAvatars from 'boring-avatars'
import React from 'react'

// @ts-ignore actual default import
const Avatar = BoringAvatars.default

const COLORS = ['#FF0092', '#FFCA1B', '#B6FF00', '#228DFF', '#BA01FF']

export type AvatarPlaceholderProps = {
  did?: string | null
  size: number | string
}

export function AvatarPlaceholder({ did, size }: AvatarPlaceholderProps): JSX.Element {
  return <Avatar name={did ?? 'self.id'} size={size} variant="marble" colors={COLORS} />
}
