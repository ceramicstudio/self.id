import { isCAIP10string, isDIDstring, useViewerID } from '@self.id/framework'
import type { BasicProfile, RequestState } from '@self.id/framework'
import { Anchor, Box, Paragraph, Text } from 'grommet'
import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image, { type StaticImageData } from 'next/image'
import styled, { css } from 'styled-components'

import Layout from '../components/Layout'
import Navbar from '../components/Navbar'
import { useProfile, useSocialAccounts } from '../hooks'
import { GITHUB_HOST, TWITTER_HOST } from '../identity-link'
import countryIcon from '../images/icons/country.png'
import linkIcon from '../images/icons/link.svg'
import locationIcon from '../images/icons/location.png'
import githubIcon from '../images/icons/social-github.svg'
import twitterIcon from '../images/icons/social-twitter.svg'
import { colors } from '../theme'
import { formatDID, getImageURL, isEthereumAddress, isSupportedDID } from '../utils'

import AvatarPlaceholder from '../components/AvatarPlaceholder'
import ConnectSettingsButton from '../components/ConnectSettingsButton'

const ETH_CHAIN_ID = `@eip155:1`

type Support =
  | 'invalid' // not a DID or CAIP-10
  | 'legacy' // legacy 3Box profile loaded from Ethereum address
  | 'supported' // did:3 or did:key
  | 'unsupported' // other DID method, not supported by Ceramic node

function canEditProfile(support: Support): boolean {
  return support === 'supported' || support === 'legacy'
}

type Props = {
  fallbackProfile: BasicProfile | null
  id: string
  state: RequestState
  support: Support
}

export const getServerSideProps: GetServerSideProps<Props, { id: string }> = async (ctx) => {
  const id = ctx.params?.id ?? null
  if (id === null) {
    return {
      redirect: { destination: '/', permanent: true },
    }
  }

  const { createRequestClient } = await import('../server')
  const requestClient = createRequestClient(ctx)
  const prefetch: Array<Promise<unknown>> = []

  let fallbackProfile: BasicProfile | null = null
  let support: Support = 'unsupported'

  if (isDIDstring(id)) {
    if (isSupportedDID(id)) {
      // Main case: we expect a DID to be provided
      support = 'supported'
      prefetch.push(requestClient.prefetch('basicProfile', id))
      prefetch.push(requestClient.prefetch('alsoKnownAs', id))
    } else {
      support = 'unsupported'
    }
  } else if (isEthereumAddress(id)) {
    // If an Ethereum address is provided, redirect to CAIP-10 URL
    return {
      redirect: { destination: `/${id}${ETH_CHAIN_ID}`, permanent: true },
    }
  } else if (isCAIP10string(id)) {
    const { core } = await import('../server')
    try {
      const linkedDid = await core.getAccountDID(id)
      if (linkedDid != null) {
        // If there is a linked DID, redirect to the DID URL
        // This is a temporary redirect as the CAIP-10 could get linked to another DID
        return {
          redirect: { destination: `/${linkedDid}`, permanent: false },
        }
      }
    } catch (err) {
      // Ignore error trying to get DID from CAIP-10
    }

    if (id.endsWith(ETH_CHAIN_ID)) {
      // Fallback for legacy 3Box profiles
      support = 'legacy'
      const { getLegacy3BoxProfileAsBasicProfile } = await import('@self.id/3box-legacy')
      const address = id.slice(0, -ETH_CHAIN_ID.length)
      fallbackProfile = await getLegacy3BoxProfileAsBasicProfile(address)
    }
  }

  if (requestClient.viewerID != null) {
    prefetch.push(requestClient.prefetch('basicProfile', requestClient.viewerID))
  }
  await Promise.all(prefetch)

  return {
    props: { id, fallbackProfile, state: requestClient.getState(), support },
  }
}

const Header = styled.div<{ url?: string }>`
  height: 310px;
  background-color: ${colors.placeholder};
  ${(props) =>
    props.url &&
    css`
      background-image: url(${props.url});
      background-position: center;
      background-size: cover;
    `}

  @media(min-width: 1536px) {
    border-radius: 20px;
  }
`

const AvatarContainer = styled.div`
  width: 146px;
  height: 146px;
  background-color: ${colors.placeholder};
  border: 3px solid white;
  border-radius: 78px;
  margin-top: -78px;
`

const Avatar = styled.div<{ url: string }>`
  width: 146px;
  height: 146px;
  border-radius: 78px;
  background-size: cover;
  ${(props) => css`
    background-image: url(${props.url});
  `}
`

const Name = styled.h1`
  color: ${colors.brand};
  font-size: 28px;
  font-weight: 500;
`

type NoProfileProps = {
  id: string
  support: Support
}

function NoProfile({ id, support }: NoProfileProps) {
  const edit = canEditProfile(support) ? (
    <Box flex>
      <Box alignSelf="end" margin="medium" width="150px">
        <ConnectSettingsButton did={id} />
      </Box>
    </Box>
  ) : null

  return (
    <>
      <Head>
        <title>No profile | self.ID</title>
      </Head>
      <Navbar />
      <Header />
      <Box alignSelf="center" width="large" pad="medium">
        <Box direction="row" flex>
          <AvatarContainer>
            <AvatarPlaceholder did={id} size={146} />
          </AvatarContainer>
          {edit}
        </Box>
        <Name>No profile</Name>
      </Box>
    </>
  )
}

type DisplayProfileProps = {
  id: string
  profile: BasicProfile
}

function DisplayProfile({ id, profile }: DisplayProfileProps) {
  const viewerID = useViewerID()
  const socialAccounts = useSocialAccounts(id)

  const name = profile.name ?? '(no name)'

  const description = profile.description ? (
    <Paragraph color="neutral-1" fill>
      {profile.description}
    </Paragraph>
  ) : null

  const link = profile.url ? (
    <Anchor href={profile.url} label={profile.url} margin={{ left: 'small' }} target="_blank" />
  ) : null
  const linksContainer = link ? (
    <Box direction="row" margin={{ vertical: 'small' }}>
      <Image alt="Link" src={linkIcon as StaticImageData} />
      {link}
    </Box>
  ) : null

  const location = profile.homeLocation ? (
    <Box direction="row" flex={false} margin={{ left: 'medium' }}>
      <Image alt="Home location" src={locationIcon} />
      <Text color="neutral-4" margin={{ left: 'small' }}>
        {profile.homeLocation}
      </Text>
    </Box>
  ) : null
  const country = profile.residenceCountry ? (
    <Box direction="row" flex={false} margin={{ left: 'medium' }}>
      <Image alt="Residence country" src={countryIcon} />
      <Text color="neutral-4" margin={{ left: 'small' }}>
        {profile.residenceCountry}
      </Text>
    </Box>
  ) : null
  const locationContainer =
    location || country ? (
      <Box justify="end" direction="row" margin={{ vertical: 'small' }}>
        {location}
        {country}
      </Box>
    ) : null

  const socialTitle = `${profile.name ?? formatDID(id)} on Self.ID`

  const metaDescription = profile.description ? (
    <>
      <meta name="description" content={profile.description} />
      <meta name="twitter:description" content={profile.description} />
      <meta property="og:description" content={profile.description} />
    </>
  ) : null

  const avatarURL = getImageURL(profile.image, { height: 150, width: 150 })

  let metaImage = <meta name="twitter:card" content="summary" />
  if (avatarURL != null) {
    metaImage = (
      <>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:image" content={avatarURL} />
        <meta name="twitter:image:alt" content={`Image for ${socialTitle}`} />
        <meta property="og:image" content={avatarURL} />
      </>
    )
  } else if (profile.background != null) {
    // Twitter uses a 2:1 aspect ratio for large images
    const backgroundURL = getImageURL(profile.background, { height: 400, width: 800 })
    metaImage = (
      <>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={backgroundURL} />
        <meta name="twitter:image:alt" content={`Background image for ${socialTitle}`} />
        <meta property="og:image" content={backgroundURL} />
      </>
    )
  }

  const avatar = avatarURL ? <Avatar url={avatarURL} /> : <AvatarPlaceholder did={id} size={146} />

  let socialContainer = null
  if (socialAccounts.length) {
    const socialItems = socialAccounts.map((a) => {
      const host = a.host ?? ''
      const image =
        host === GITHUB_HOST ? (
          <Box margin={{ right: 'small' }} justify="center">
            <Image alt="GitHub" src={githubIcon as StaticImageData} />
          </Box>
        ) : host === TWITTER_HOST ? (
          <Box margin={{ right: 'small' }} justify="center">
            <Image alt="Twitter" src={twitterIcon as StaticImageData} />
          </Box>
        ) : null
      return (
        <Box
          key={host + a.id}
          border={{ color: 'neutral-5' }}
          direction="row"
          margin={{ top: 'small' }}
          pad="small"
          round="small">
          {image}
          <Anchor href={`${a.protocol}://${host}/${a.id}`}>{a.id}</Anchor>
        </Box>
      )
    })
    socialContainer = (
      <Box margin={{ top: 'large' }}>
        <Box direction="row">
          <Box flex>
            <Text size="medium" weight="bold">
              Social
            </Text>
          </Box>
          {viewerID?.id === id ? (
            <Link href="/me/social-accounts" passHref>
              <Anchor color="brand" label="Edit" />
            </Link>
          ) : null}
        </Box>
        {socialItems}
      </Box>
    )
  }

  return (
    <>
      <Head>
        <title>{name} | Self.ID</title>
        <meta name="twitter:site" content="@mySelfID" />
        <meta name="twitter:title" content={socialTitle} />
        <meta property="og:title" content={socialTitle} />
        {metaDescription}
        {metaImage}
      </Head>
      <Navbar />
      <Header url={getImageURL(profile.background, { height: 310, width: 2000 })} />
      <Box alignSelf="center" width="large" pad="medium">
        <Box direction="row" flex>
          <AvatarContainer>{avatar}</AvatarContainer>
          <Box align="end" flex>
            <ConnectSettingsButton did={id} />
          </Box>
        </Box>
        <Name>
          {name}
          {profile.emoji ? ` ${profile.emoji}` : null}
        </Name>
        <Box overflow="auto">
          <Text color="neutral-4">{id}</Text>
        </Box>
        {description}
        {linksContainer}
        {locationContainer}
        {socialContainer}
      </Box>
    </>
  )
}

type LoadProfileProps = {
  id: string
  support: Support
}

function LoadProfile({ id, support }: LoadProfileProps) {
  const profile = useProfile(id)
  return profile ? (
    <DisplayProfile id={id} profile={profile} />
  ) : (
    <NoProfile id={id} support={support} />
  )
}

export default function ProfilePage({ fallbackProfile, id, support }: Props) {
  const content =
    support === 'supported' ? (
      <LoadProfile id={id} support={support} />
    ) : fallbackProfile ? (
      <DisplayProfile id={id} profile={fallbackProfile} />
    ) : (
      <NoProfile id={id} support={support} />
    )

  return <Layout>{content}</Layout>
}
