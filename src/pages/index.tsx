import { Anchor, Box, Heading, Image, ResponsiveContext, Spinner, Text, TextInput } from 'grommet'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import type { FormEvent } from 'react'

import backgroundImage from '../images/home-background.jpg'
import linkIcon from '../images/icons/home-link.svg'
import metaverseIcon from '../images/icons/home-metaverse.svg'
import profileIcon from '../images/icons/home-profile.svg'
import verifyIcon from '../images/icons/home-verify.svg'
import searchIcon from '../images/icons/search.svg'
import footerDiscordIcon from '../images/icons/social-discord.svg'
import footerGithubIcon from '../images/icons/social-github.svg'
import footerTwitterIcon from '../images/icons/social-twitter.svg'

import Navbar from '../components/Navbar'
import { BRAND_COLOR } from '../theme'

export default function Home() {
  const router = useRouter()
  const size = useContext(ResponsiveContext)
  const [loading, setLoading] = useState<boolean>(false)
  const [focus, setFocus] = useState<boolean>(false)
  const [value, setValue] = useState<string>('')

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    void router.push(`/${value}`)
  }

  const inputIcon = loading ? (
    <Spinner />
  ) : (
    <Image margin={{ left: 'small' }} src={searchIcon} height={24} width={24} />
  )

  return (
    <Box
      style={{
        display: 'flex',
        minHeight: '100vh',
        paddingBottom: size === 'large' ? 0 : '420px',
        flexDirection: 'column',
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: 'right bottom',
        backgroundRepeat: 'no-repeat',
      }}>
      <Head>
        <title>Self.ID</title>
      </Head>
      <Navbar />
      <Box flex>
        <Box alignSelf="center" pad="small" width="large">
          <Box align="center">
            <Text weight={500}>A profile 100% owned by you</Text>
            <Heading margin={{ top: '-20px', bottom: '65px' }} size="136px">
              Be your self
            </Heading>
            <form onSubmit={onSubmit}>
              <Box width="480px">
                <TextInput
                  disabled={loading}
                  icon={inputIcon}
                  id="did"
                  onChange={(event) => setValue(event.target.value)}
                  onBlur={() => setFocus(false)}
                  onFocus={() => setFocus(true)}
                  placeholder="Search by DID or blockchain address"
                  style={{
                    borderRadius: 30,
                    borderWidth: 0,
                    padding: 18,
                    paddingLeft: 60,
                    width: 480,
                    boxShadow: `0 2px 20px ${focus ? BRAND_COLOR : 'rgba(0,0,0,0.5)'}`,
                  }}
                  value={value}
                />
              </Box>
            </form>
          </Box>
          <Box margin="large">
            <Text size="large" weight={600}>
              Self.ID is currently using Ceramic&apos;s testnet.
              <br />
              Profiles creation and edition will only be applied to the testnet, not mainnet.
            </Text>
          </Box>
        </Box>
        <Box
          alignSelf={size === 'large' ? 'start' : 'center'}
          margin={{ left: size === 'large' ? 'large' : 'none' }}>
          <Box direction="row">
            <Box direction="row" pad="medium" width="300px">
              <Box flex={{ shrink: 0 }}>
                <Image alt="profile" src={profileIcon} margin="small" width={27} height={30} />
              </Box>
              <Box>
                <Text color="brand" size="large" weight={600}>
                  Create a public profile
                </Text>
              </Box>
            </Box>
            <Box direction="row" pad="medium" width="300px">
              <Box flex={{ shrink: 0 }}>
                <Image alt="link" src={linkIcon} margin="small" width={36} height={23} />
              </Box>
              <Box>
                <Text color="brand" size="large" weight={600}>
                  Link crypto wallets from many chains
                </Text>
              </Box>
            </Box>
          </Box>
          <Box direction="row">
            <Box direction="row" pad="medium" width="300px">
              <Box flex={{ shrink: 0 }}>
                <Image alt="verify" src={verifyIcon} margin="small" width={27} height={30} />
              </Box>
              <Box>
                <Text color="brand" size="large" weight={600}>
                  Verify your social accounts
                </Text>
              </Box>
            </Box>
            <Box direction="row" pad="medium" width="300px">
              <Box flex={{ shrink: 0 }}>
                <Image alt="metaverse" src={metaverseIcon} margin="small" width={32} height={32} />
              </Box>
              <Box>
                <Text color="brand" size="large" weight={600}>
                  Use it across the Web3 metaverse
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box direction="row" pad="medium">
        <Anchor href="https://github.com/ceramicstudio/self.id">
          <Image alt="GitHub" src={footerGithubIcon} style={{ padding: '6px' }} />
        </Anchor>
        <Anchor href="https://discord.gg/TPmE2rdNWK">
          <Image alt="Discord" src={footerDiscordIcon} style={{ padding: '6px' }} />
        </Anchor>
        {/* <Anchor href="#">
          <Image alt="Twitter" src={footerTwitterIcon} style={{ padding: '6px' }} />
        </Anchor> */}
        {/* <Anchor color="text" href="#" label="About" margin={{ left: 'medium', right: 'small' }} />
        <Anchor
          color="text"
          href="#"
          label="Integration"
          margin={{ left: 'small', right: 'medium' }}
        /> */}
        <Text margin={{ left: 'medium' }}>
          Powered by{' '}
          <Anchor
            color="text"
            href="https://github.com/ceramicstudio/3id-connect"
            label="3ID DID"
            style={{ textDecoration: 'underline' }}
          />
          ,{' '}
          <Anchor
            color="text"
            href="https://www.ceramic.network"
            label="Ceramic Network"
            style={{ textDecoration: 'underline' }}
          />
          , and{' '}
          <Anchor
            color="text"
            href="https://idx.xyz"
            label="IDX"
            style={{ textDecoration: 'underline' }}
          />
        </Text>
      </Box>
    </Box>
  )
}
