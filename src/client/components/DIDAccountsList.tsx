import type { AccountIDParams } from 'caip'
import { Box, Button, Text } from 'grommet'
import { useMemo } from 'react'
import type { ReactNode } from 'react'

import { useEthereum } from '../../multiauth/ethereum/hooks'

import { useAccountLinks, useIDXAuth, useKnownDIDs, useSwitchAccount } from '../hooks'

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
        <Text>{address}</Text>
      </Box>
      <Box>{children}</Box>
    </Box>
  )
}

type CurrentAccountsProps = {
  select: (did: string | null) => void
}

function CurrentDIDAccountsList({ select }: CurrentAccountsProps) {
  const [linkedAccounts, linkingAddress, linkAddress] = useAccountLinks()
  const [eth] = useEthereum()
  const [auth] = useIDXAuth()
  const dids = useKnownDIDs()

  const addressDID = useMemo(() => {
    return Object.entries(dids).reduce((acc, [did, data]) => {
      for (const account of data.accounts) {
        acc[account.address] = did
      }
      return acc
    }, {} as Record<string, string>)
  }, [dids])

  const knownAccounts = linkedAccounts.map((account) => {
    const text =
      auth.state === 'CONFIRMED' ? (
        account.address === auth.address ? (
          <Text weight="bold">Active</Text>
        ) : (
          <Text>Linked</Text>
        )
      ) : null
    return (
      <AccountItem address={account.address} key={account.address}>
        {text}
      </AccountItem>
    )
  })

  let connectedAccount = null
  const address =
    eth.status === 'CONNECTED' && !linkedAccounts.find((a) => a.address === eth.account)
      ? eth.account
      : null
  if (address != null) {
    const did = addressDID[address]
    let content
    if (linkingAddress === address) {
      content = <Button disabled label="Linking..." plain />
    } else if (did == null) {
      content = <Button color="brand" label="Link" onClick={() => linkAddress(address)} plain />
    } else if (auth.state === 'CONFIRMED' && did === auth.id) {
      content = <Text>Linked</Text>
    } else {
      content = (
        <Button color="brand" label="Linked to other DID" onClick={() => select(did)} plain />
      )
    }
    connectedAccount = (
      <AccountItem address={address} key={address}>
        {content}
      </AccountItem>
    )
  }

  return (
    <Box>
      <Box border={{ color: 'neutral-5', side: 'bottom' }} pad={{ vertical: 'medium' }}>
        <Box width="small">
          <Text size="large">Accounts</Text>
        </Box>
      </Box>
      {knownAccounts}
      {connectedAccount}
    </Box>
  )
}

type OtherAccountsProps = {
  accounts: Array<AccountIDParams>
}

function OtherDIDAccountsList({ accounts }: OtherAccountsProps) {
  // TODO: track state of account switch in dedicated atom
  const switchAccount = useSwitchAccount()
  const [eth] = useEthereum()

  const connectableAccounts = accounts.map((account) => {
    const button =
      eth.status === 'CONNECTED' && eth.account === account.address ? (
        <Button
          color="brand"
          label="Connect"
          onClick={() => {
            console.log('connect with account', account)
            void switchAccount(account.address)
          }}
          plain
        />
      ) : null
    return (
      <AccountItem address={account.address} key={account.address}>
        {button}
      </AccountItem>
    )
  })

  return (
    <Box>
      <Box border={{ color: 'neutral-5', side: 'bottom' }} pad={{ vertical: 'medium' }}>
        <Box width="small">
          <Text size="large">Accounts</Text>
        </Box>
      </Box>
      {connectableAccounts}
    </Box>
  )
}

export type Props = {
  id: string
  select: (did: string | null) => void
}

export default function AccountsList({ id, select }: Props) {
  const [auth] = useIDXAuth()
  const dids = useKnownDIDs()

  return id === auth.id ? (
    <CurrentDIDAccountsList select={select} />
  ) : (
    <OtherDIDAccountsList accounts={dids[id]?.accounts ?? []} />
  )
}
