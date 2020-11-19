import { Box, Text } from 'grommet'

import { useIDXAuth, useKnownDIDs } from '../hooks'

import LoginButton from './LoginButton'

export default function Accounts() {
  const [auth] = useIDXAuth()
  const knownDIDs = useKnownDIDs()

  if (auth.state !== 'CONFIRMED') {
    return <LoginButton />
  }

  const accounts = (knownDIDs[auth.id]?.accounts ?? []).map((account) => {
    return (
      <Box
        border={{ color: 'neutral-5', side: 'bottom' }}
        direction="row"
        key={account.address}
        pad={{ vertical: 'medium' }}>
        <Box flex>
          <Text weight="bold">{account.address}</Text>
        </Box>
        <Box>{account.address === auth.address ? <Text color="brand">Active</Text> : null}</Box>
      </Box>
    )
  })

  return (
    <Box>
      <Box border={{ color: 'neutral-5', side: 'bottom' }} pad={{ vertical: 'medium' }}>
        <Box width="small">
          <Text size="large">Accounts</Text>
        </Box>
      </Box>
      {accounts}
    </Box>
  )
}
