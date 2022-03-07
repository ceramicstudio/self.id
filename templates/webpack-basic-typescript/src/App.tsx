import { useViewerConnection } from '@self.id/framework'
import { Anchor, Box, Heading, Paragraph } from 'grommet'
import React from 'react'

import ConnectButton from './ConnectButton'

export default function App() {
  const [connection] = useViewerConnection()

  return (
    <Box align="center" flex pad="large">
      <Heading>Self.ID example app</Heading>
      <Box pad="medium">
        <Paragraph>
          {connection.status === 'connected' ? connection.selfID.id : 'Connect to dislay your DID'}
        </Paragraph>
      </Box>
      <ConnectButton />
      <Paragraph>
        Learn more about the{' '}
        <Anchor href="https://developers.ceramic.network/tools/self-id/overview/">
          Self.ID SDK
        </Anchor>
        .
      </Paragraph>
    </Box>
  )
}
