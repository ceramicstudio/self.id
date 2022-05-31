import BoringAvatars from 'boring-avatars'
import React from 'react'

// @ts-ignore actual default import
const Avatar = BoringAvatars.default ?? BoringAvatars

const COLORS = ['#FF0092', '#FFCA1B', '#B6FF00', '#228DFF', '#BA01FF']

export type AvatarPlaceholderProps = {
  did?: string | null
  size: number | string
}

export default function AvatarPlaceholder(props: AvatarPlaceholderProps): JSX.Element {
  return <Avatar name={props.did ?? 'self.id'} size={props.size} variant="marble" colors={COLORS} />
}
