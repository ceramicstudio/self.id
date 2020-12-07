import { Box, Button, Text } from 'grommet'
import type { ReactNode } from 'react'

import { useIDXAuth, useKnownDIDs } from '../hooks'

import AccountsList from './DIDAccountsList'
import LoginButton from './LoginButton'

type ItemProps = {
  id: string
  onClick: () => void
  children?: ReactNode
}

function DIDItem({ id, onClick, children }: ItemProps) {
  return (
    <Box
      border={{ color: 'neutral-5', side: 'bottom' }}
      direction="row"
      key={id}
      pad={{ vertical: 'medium' }}>
      <Box flex>
        <Button color="brand" label={id} onClick={onClick} plain />
      </Box>
      <Box>{children}</Box>
    </Box>
  )
}

export type Props = {
  select: (did: string | null) => void
  selected: string | null
}

export default function DIDsList({ select, selected }: Props) {
  const [auth] = useIDXAuth()
  const knownDIDs = useKnownDIDs()

  if (auth.state !== 'CONFIRMED') {
    return (
      <Box pad={{ bottom: 'small' }}>
        <LoginButton />
      </Box>
    )
  }

  return selected ? (
    <AccountsList id={selected} select={select} />
  ) : (
    <Box>
      <Box border={{ color: 'neutral-5', side: 'bottom' }} pad={{ vertical: 'medium' }}>
        <Box width="small">
          <Text size="large">DIDs</Text>
        </Box>
      </Box>
      {Object.keys(knownDIDs).map((id) => (
        <DIDItem id={id} key={id} onClick={() => select(id)}>
          {id === auth.id ? <Text weight="bold">Active</Text> : null}
        </DIDItem>
      ))}
    </Box>
  )
}
