import { Box, Button, Text } from 'grommet'
import type { ReactNode } from 'react'

import { useAccountLinks, useEthereum, useIDXAuth } from '../hooks'

import LoginButton from './LoginButton'

type ItemProps = {
  address: string
  children?: ReactNode
}

function AccountItem({ address, children }: ItemProps) {
  return (
    <Box
      border={{ color: 'neutral-5', side: 'bottom' }}
      direction="row"
      key={address}
      pad={{ vertical: 'medium' }}>
      <Box flex>
        <Text weight="bold">{address}</Text>
      </Box>
      <Box>{children}</Box>
    </Box>
  )
}

export default function AccountsList() {
  const [linkedAccounts, linkingAddress, linkAddress] = useAccountLinks()
  const [eth] = useEthereum()
  const [auth] = useIDXAuth()

  if (auth.state !== 'CONFIRMED') {
    return <LoginButton />
  }

  const knownAccounts = linkedAccounts.map((account) => (
    <AccountItem address={account.address} key={account.address}>
      {account.address === auth.address ? <Text color="brand">Active</Text> : <Text>Linked</Text>}
    </AccountItem>
  ))

  const ethAddresses =
    eth.status === 'CONNECTED'
      ? eth.accounts.filter((address) => !linkedAccounts.find((a) => a.address === address))
      : []
  const connectedAccounts = ethAddresses.map((address) => (
    <AccountItem address={address} key={address}>
      {linkingAddress === address ? (
        <Button disabled label="Linking..." plain />
      ) : (
        <Button label="Link" onClick={() => linkAddress(address)} plain />
      )}
    </AccountItem>
  ))

  return (
    <Box>
      <Box border={{ color: 'neutral-5', side: 'bottom' }} pad={{ vertical: 'medium' }}>
        <Box width="small">
          <Text size="large">Accounts</Text>
        </Box>
      </Box>
      {knownAccounts}
      {connectedAccounts}
    </Box>
  )
}
