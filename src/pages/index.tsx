import { Box, Button, Heading, TextInput } from 'grommet'
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
        <form onSubmit={onSubmit}>
          <Heading>
            <label htmlFor="did">Looking for an identity?</label>
          </Heading>
          <Box direction="row">
            <TextInput
              disabled={loading}
              id="did"
              onChange={(event) => setValue(event.target.value)}
              placeholder="DID or CAIP-10 account"
              style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
              value={value}
            />
            <Button
              color="brand"
              disabled={loading || value === ''}
              label={loading ? '...' : 'Go'}
              style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
              type="submit"
            />
          </Box>
        </form>
      </Box>
    </Box>
  )
}
