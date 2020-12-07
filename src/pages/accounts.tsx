import { Box, Button, Text } from 'grommet'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useState } from 'react'

import Navbar from '../components/Navbar'

const DIDsList = dynamic(() => import('../client/components/DIDsList'), {
  ssr: false,
})

export default function AccountsPage() {
  const [selected, select] = useState<string | null>(null)

  return (
    <Box>
      <Head>
        <title>Accounts | Self.ID</title>
      </Head>
      <Navbar />
      <Box alignSelf="center" margin="large" width="large">
        <Button
          label="My Identity"
          onClick={() => select(null)}
          plain
          style={{ fontSize: 42, lineHeight: 1.2 }}
        />
        {selected ? <Text color="neutral-3">{selected}</Text> : null}
        <Box pad={{ top: 'medium' }}>
          <DIDsList selected={selected} select={select} />
        </Box>
      </Box>
    </Box>
  )
}
