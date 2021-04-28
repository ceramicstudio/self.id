import { Box, Button, Heading, Spinner, Text, TextInput } from 'grommet'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import type { FormEvent } from 'react'

import Navbar from '../components/Navbar'

export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [value, setValue] = useState<string>('')

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    void router.push(`/${value}`)
  }

  return (
    <Box>
      <Head>
        <title>Self.ID</title>
      </Head>
      <Navbar />
      <Box alignSelf="center" pad="medium" width="large">
        <Box align="center">
          <Text>A profile 100% owned by you</Text>
          <Heading>Be your self</Heading>
        </Box>
        <form onSubmit={onSubmit}>
          <Box direction="row">
            <TextInput
              disabled={loading}
              id="did"
              onChange={(event) => setValue(event.target.value)}
              placeholder="Search by DID or blockchain address"
              style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
              value={value}
            />
            <Button
              color="brand"
              disabled={loading || value === ''}
              label={loading ? <Spinner /> : 'Go'}
              style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
              type="submit"
            />
          </Box>
        </form>
        <Box margin="large">
          <Text>
            Self.ID is currently using Ceramic's testnet.
            <br />
            Profiles creation and edition will only be applied to the testnet, not mainnet.
          </Text>
        </Box>
      </Box>
    </Box>
  )
}
