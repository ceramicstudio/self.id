import { Anchor, Box, Button, Heading, Text } from 'grommet'
import Link from 'next/link'

import { useEnvState } from '../hooks'

import ConnectedContainer from './ConnectedContainer'

export default function SettingsScreen() {
  const { self } = useEnvState()

  return (
    <ConnectedContainer>
      <Link href={`/${self?.id as string}`} passHref>
        <Anchor color="neutral-4">{self?.id}</Anchor>
      </Link>
      <Heading margin={{ horizontal: 'none', vertical: 'small' }}>Settings</Heading>
      <Box
        border={{ color: 'neutral-5' }}
        direction="row"
        gap="small"
        margin={{ bottom: 'medium' }}
        pad="medium"
        round="small">
        <Box flex justify="center">
          <Text weight="bold">Profile</Text>
        </Box>
        <Link href="/me/profile/edit" passHref>
          <Button primary color="black" label="Edit" style={{ border: 0, color: 'white' }} />
        </Link>
      </Box>
      {/* <Box
        border={{ color: 'neutral-5' }}
        direction="row"
        gap="small"
        margin={{ top: 'medium' }}
        pad="medium"
        round="small">
        <Box flex justify="center">
          <Text weight="bold">Social accounts</Text>
        </Box>
        <Button primary color="black" label="Edit" style={{ border: 0, color: 'white' }} />
      </Box> */}
    </ConnectedContainer>
  )
}
