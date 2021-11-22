import { Anchor } from 'grommet'
import Link from 'next/link'
import type { ReactNode } from 'react'

import ConnectedContainer from '../ConnectedContainer'

export type Props = {
  children: ReactNode
}

export default function AddSocialAccountScreen({ children }: Props) {
  return (
    <ConnectedContainer>
      <Link href="/me/social-accounts" passHref>
        <Anchor color="neutral-4">Social accounts</Anchor>
      </Link>
      {children}
    </ConnectedContainer>
  )
}
