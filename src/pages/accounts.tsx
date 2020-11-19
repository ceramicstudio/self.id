import { Anchor, Box, Paragraph, Text } from 'grommet'
import type { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'

import Navbar from '../components/Navbar'

const AccountsList = dynamic(() => import('../client/components/AccountsList'), {
  ssr: false,
})

const DisplayDID = dynamic(() => import('../client/components/DisplayDID'), {
  loading: function LoadingDID() {
    return <Text color="neutral-3">Loading DID...</Text>
  },
  ssr: false,
})

export default function AccountsPage() {
  return (
    <Box>
      <Head>
        <title>Accounts | Self.ID</title>
      </Head>
      <Navbar />
      <Box alignSelf="center" margin="large" width="large">
        <Text size="xxlarge">My Identity</Text>
        <DisplayDID />
        <Box pad={{ top: 'medium' }}>
          <AccountsList />
        </Box>
      </Box>
    </Box>
  )
}
