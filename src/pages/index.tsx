import { Box } from 'grommet'
import Head from 'next/head'

import Navbar from '../components/Navbar'

export default function Home() {
  return (
    <Box>
      <Head>
        <title>Self.ID</title>
      </Head>
      <Navbar />
    </Box>
  )
}
