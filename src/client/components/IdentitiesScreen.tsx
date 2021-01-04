import { Avatar, Box, Button, Collapsible, Heading, Text } from 'grommet'
import { useMemo, useState } from 'react'

import { getImageSrc } from '../../image'
import avatarPlaceholder from '../../images/avatar-placeholder.png'
import { formatDID } from '../../utils'
import { useIDXAuth, useDIDsData } from '../hooks'
import { KnownDIDData } from '../idx'

import ConnectedContainer from './ConnectedContainer'

type ItemProps = {
  data: KnownDIDData
  did: string
  selected: boolean
}

function IdentityItem({ data, did, selected }: ItemProps) {
  const { accounts, profile } = data

  const [isOpen, setOpen] = useState<boolean>(false)

  const avatarSrc = useMemo(() => {
    return profile?.image
      ? getImageSrc(profile.image, { height: 65, width: 65 })
      : avatarPlaceholder
  }, [profile])

  const displayAccounts = accounts.map((account) => (
    <Text key={account.address} color="neutral-3">
      {account.address}
    </Text>
  ))

  // TODO: add button to connect account if not selected

  return (
    <Box border={{ color: 'neutral-5' }} margin={{ bottom: 'medium' }} round="small">
      <Box direction="row" gap="small" pad="medium">
        <Avatar size="65px" src={avatarSrc} />
        <Box flex>
          <Text weight="bold">{profile?.name ?? '(no name)'}</Text>
          <Text color="neutral-4">{formatDID(did)}</Text>
        </Box>
        {selected ? (
          <Text color="brand" weight="bold">
            Selected
          </Text>
        ) : null}
      </Box>
      <Box border={{ color: 'neutral-5', side: 'top' }} pad="medium">
        <Button color="neutral-3" label="Accounts" onClick={() => setOpen(!isOpen)} plain />
        <Collapsible open={isOpen}>
          <Box pad={{ top: 'small' }}>{displayAccounts}</Box>
        </Collapsible>
      </Box>
    </Box>
  )
}

export default function IdentitiesScreen() {
  const [auth] = useIDXAuth()
  const [didsData] = useDIDsData()

  const items = useMemo(() => {
    return didsData
      ? Object.entries(didsData).map(([did, data]) => (
          <IdentityItem key={did} data={data} did={did} selected={auth.id === did} />
        ))
      : []
  }, [auth.id, didsData])

  return (
    <ConnectedContainer>
      <Heading>Identities</Heading>
      {items}
    </ConnectedContainer>
  )
}
