import { Anchor, Box, Heading, Spinner, Text, TextInput } from 'grommet'
import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image, { type StaticImageData } from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
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
import OpenGraphMeta from '../components/OpenGraphMeta'
import { withMediaQuery } from '../components/media-query/with-media-query'
import { colors } from '../theme'

const ResponsiveHeading = withMediaQuery(Heading)
const ResponsiveText = withMediaQuery(Text)
const ResponsiveTextInput = withMediaQuery(TextInput)
const ResponsiveBox = withMediaQuery(Box)

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { getRequestState } = await import('../server')
  return { props: { state: await getRequestState(ctx) } }
}

export default function Home() {
  const router = useRouter()
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
    <Box margin={{ left: 'small' }}>
      <Image alt="" src={searchIcon as StaticImageData} height={24} width={24} />
    </Box>
  )

  return (
    <ResponsiveBox
      direction="row"
      align="center"
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${backgroundImage.src})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom right',
      }}
      mediaQuery={{
        'padding-bottom': ['60%', '20%', '0px'],
        'background-size': ['90%', 'inherit', 'inherit'],
      }}>
      <Box
        style={{
          display: 'flex',
          minHeight: '100vh',
          flexDirection: 'column',
          maxWidth: '1536px',
        }}
        fill="horizontal">
        <Head>
          <title>Self.ID</title>
          <OpenGraphMeta />
        </Head>
        <Navbar />
        <Box flex>
          <Box alignSelf="center" pad="small">
            <Box align="center" margin={{ top: '6%' }}>
              <ResponsiveText
                weight={500}
                mediaQuery={{
                  'font-size': ['4vw', '2vw', '1.5vw'],
                }}>
                A profile 100% owned by you
              </ResponsiveText>
              <ResponsiveHeading
                mediaQuery={{
                  'margin-top': ['2rem', '2rem', '3rem'],
                  // 'margin-bottom': ['65px'],
                  'font-size': ['17vw', '14vw', '13rem'],
                }}>
                Be your self
              </ResponsiveHeading>
              <form
                onSubmit={onSubmit}
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <ResponsiveBox
                  mediaQuery={{
                    width: ['100%', '30em'],
                    padding: ['0.3rem', '0'],
                    'margin-top': ['0vh', '1vh', '0px'],
                    'margin-bottom': ['5vh', '2vh', '0px'],
                  }}>
                  <ResponsiveTextInput
                    disabled={loading}
                    icon={inputIcon}
                    id="did"
                    onChange={(event) => setValue(event.target.value)}
                    onBlur={() => setFocus(false)}
                    onFocus={() => setFocus(true)}
                    placeholder="Search by DID or blockchain address"
                    style={{
                      borderWidth: 0,
                      borderRadius: 30,
                      padding: 18,
                      paddingLeft: 60,
                      boxShadow: `0 2px 20px ${focus ? colors.brand : 'rgba(0,0,0,0.5)'}`,
                      width: '100%',
                    }}
                    value={value}
                  />
                </ResponsiveBox>
              </form>
            </Box>
          </Box>
          <ResponsiveBox
            alignSelf="center"
            margin={'medium'}
            style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}>
            <Box direction="row">
              <Box direction="row" pad="medium" width="300px">
                <Box flex={false} margin="small">
                  <Image
                    alt="profile"
                    src={profileIcon as StaticImageData}
                    width={27}
                    height={30}
                  />
                </Box>
                <Box>
                  <Text color="brand" size="large" weight={600}>
                    Create a public profile
                  </Text>
                </Box>
              </Box>
              <Box direction="row" pad="medium" width="300px">
                <Box flex={false} margin="small">
                  <Image alt="link" src={linkIcon as StaticImageData} width={36} height={23} />
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
                <Box flex={false} margin="small">
                  <Image alt="verify" src={verifyIcon as StaticImageData} width={27} height={30} />
                </Box>
                <Box>
                  <Text color="brand" size="large" weight={600}>
                    Verify your social accounts
                  </Text>
                </Box>
              </Box>
              <Box direction="row" pad="medium" width="300px">
                <Box flex={false} margin="small">
                  <Image
                    alt="metaverse"
                    src={metaverseIcon as StaticImageData}
                    width={32}
                    height={32}
                  />
                </Box>
                <Box>
                  <Text color="brand" size="large" weight={600}>
                    Use it across the Web3 metaverse
                  </Text>
                </Box>
              </Box>
            </Box>
          </ResponsiveBox>
        </Box>
        <Box direction="row" pad="medium">
          <Box
            direction={'row'}
            style={{
              backgroundColor: 'rgba(255,255,255,0.8)',
              fontSize: 0,
              lineHeight: 0,
              padding: '0.2rem 0.6rem 0 0.2rem',
            }}>
            <Anchor href="https://github.com/ceramicstudio/self.id" style={{ padding: '6px' }}>
              <Image alt="GitHub" src={footerGithubIcon as StaticImageData} />
            </Anchor>
            <Anchor href="https://discord.gg/TPmE2rdNWK" style={{ padding: '6px' }}>
              <Image alt="Discord" src={footerDiscordIcon as StaticImageData} />
            </Anchor>
            <Anchor href="https://twitter.com/mySelfID" style={{ padding: '6px' }}>
              <Image alt="Twitter" src={footerTwitterIcon as StaticImageData} />
            </Anchor>
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
              , and the{' '}
              <Anchor
                color="text"
                href="https://developers.ceramic.network/tools/self-id/overview/#sdk"
                label="Self.ID SDK"
                style={{ textDecoration: 'underline' }}
              />
            </Text>
          </Box>
        </Box>
      </Box>
    </ResponsiveBox>
  )
}
