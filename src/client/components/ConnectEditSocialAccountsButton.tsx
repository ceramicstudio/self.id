import { Anchor } from 'grommet'
import Link from 'next/link'

import { useKnownDIDs } from '../hooks'

export type Props = {
  did: string | null
}

export default function ConnectEditSocialAccountsButton({ did }: Props) {
  const knownDIDs = useKnownDIDs()

  return did && Object.keys(knownDIDs).includes(did) ? (
    <Link href="/me/social-accounts" passHref>
      <Anchor color="brand" label="Edit" />
    </Link>
  ) : null
}
