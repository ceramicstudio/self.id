import { getLegacy3BoxProfileAsBasicProfile, isCaip10, isDid } from '@ceramicstudio/idx'
import type { BasicProfile, ImageSources } from '@ceramicstudio/idx-constants'
import { Anchor, Box, Paragraph, Text } from 'grommet'
import type { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'

import Navbar from '../components/Navbar'
import { getImageSrc } from '../image'
import type { Dimensions } from '../image'
import avatarPlaceholder from '../images/avatar-placeholder.png'
import countryIcon from '../images/icons/country.png'
import linkIcon from '../images/icons/link.svg'
import locationIcon from '../images/icons/location.png'
import { BRAND_COLOR, PLACEHOLDER_COLOR } from '../theme'
import { isEthereumAddress, isSupportedDid } from '../utils'

const ETH_CHAIN_ID = `@eip155:1`

export function getImageURL(
  sources: ImageSources | undefined,
  dimensions: Dimensions
): string | undefined {
  return sources ? getImageSrc(sources, dimensions) : undefined
}

const EditProfileButton = dynamic(() => import('../client/components/EditProfileButton'), {
  ssr: false,
})

type Support =
  | 'invalid' // not a DID or CAIP-10
  | 'legacy' // legacy 3Box profile loaded from Ethereum address
  | 'supported' // did:3 or did:key
  | 'unsupported' // other DID method, not supported by Ceramic node

function canEditProfile(support: Support): boolean {
  return support === 'supported' || support === 'legacy'
}

type Props = {
  id: string | null
  loadedProfile: BasicProfile | null
  support: Support
}

export const getServerSideProps: GetServerSideProps<Props, { id: string }> = async (ctx) => {
  const id = ctx.params?.id ?? null
  if (id === null) {
    return {
      redirect: { destination: '/', permanent: true },
    }
  }

  let loadedProfile = null
  let support: Support = 'unsupported'

  if (isDid(id)) {
    if (isSupportedDid(id)) {
      // Main case: we expect a DID to be provided
      support = 'supported'
      const { idx } = await import('../server/idx')
      try {
        loadedProfile = await idx.get<BasicProfile>('basicProfile', id)
      } catch (err) {
        console.warn((err as Error).message)
      }
    } else {
      support = 'unsupported'
    }
  } else if (isEthereumAddress(id)) {
    // If an Ethereum address is provided, redirect to CAIP-10 URL
    return {
      redirect: { destination: `/${id}${ETH_CHAIN_ID}`, permanent: true },
    }
  } else if (isCaip10(id)) {
    const { idx } = await import('../server/idx')
    try {
      const linkedDid = await idx.caip10ToDid(id)
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
      const address = id.slice(0, -ETH_CHAIN_ID.length)
      loadedProfile = await getLegacy3BoxProfileAsBasicProfile(address)
    }
  }

  return {
    props: { id, loadedProfile, support },
  }
}

const Header = styled.div<{ url?: string }>`
  height: 386px;
  background-color: ${PLACEHOLDER_COLOR};
  ${(props) =>
    props.url &&
    css`
      background-image: url(${props.url});
      background-position: center;
      background-size: cover;
    `}
`

const Avatar = styled.div<{ url?: string }>`
  width: 146px;
  height: 146px;
  background-color: ${PLACEHOLDER_COLOR};
  border: 3px solid white;
  border-radius: 78px;
  margin-top: -78px;
  background-size: cover;
  ${(props) => css`
    background-image: url(${props.url ?? avatarPlaceholder});
  `}
`

const Name = styled.h1`
  color: ${BRAND_COLOR};
  font-size: 28px;
  font-weight: 500;
`

type NoProfileProps = {
  id: string | null
  setProfile: (profile: BasicProfile) => void
  support: Support
}

function NoProfile({ id, setProfile, support }: NoProfileProps) {
  const edit = canEditProfile(support) ? (
    <Box flex>
      <Box alignSelf="end" margin="medium" width="150px">
        <EditProfileButton did={id} setProfile={setProfile} />
      </Box>
    </Box>
  ) : null

  return (
    <Box>
      <Head>
        <title>No profile found | self.ID</title>
      </Head>
      <Header>
        <Navbar />
      </Header>
      <Box alignSelf="center" width="large">
        <Box direction="row" flex>
          <Avatar />
          {edit}
        </Box>
        <Name>No profile found</Name>
      </Box>
    </Box>
  )
}

export default function ProfilePage({ id, loadedProfile, support }: Props) {
  const [profile, setProfile] = useState<BasicProfile | null>(loadedProfile)
  useEffect(() => {
    setProfile(loadedProfile)
  }, [loadedProfile])

  if (id == null || profile == null || !canEditProfile(support)) {
    return <NoProfile id={id} setProfile={setProfile} support={support} />
  }

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
      <img alt="Link" src={linkIcon} />
      {link}
    </Box>
  ) : null

  const location = profile.homeLocation ? (
    <Box direction="row" flex={false} margin={{ left: 'medium' }}>
      <img alt="Home location" src={locationIcon} />
      <Text color="neutral-4" margin={{ left: 'small' }}>
        {profile.homeLocation}
      </Text>
    </Box>
  ) : null
  const country = profile.residenceCountry ? (
    <Box direction="row" flex={false} margin={{ left: 'medium' }}>
      <img alt="Residence country" src={countryIcon} />
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

  const socialTitle = profile.name ? `${profile.name} on Self.ID` : 'Self.ID'

  const metaDescription = profile.description ? (
    <>
      <meta name="description" content={profile.description} />
      <meta name="twitter:description" content={profile.description} />
      <meta property="og:description" content={profile.description} />
    </>
  ) : null

  const metaImage = profile.image ? (
    <>
      <meta name="twitter:image" content={profile.image.original.src} />
      <meta name="twitter:image:alt" content={`Image for ${socialTitle}`} />
      <meta property="og:image" content={profile.image.original.src} />
    </>
  ) : profile.background ? (
    <>
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={profile.background.original.src} />
      <meta name="twitter:image:alt" content={`Background image for ${socialTitle}`} />
      <meta property="og:image" content={profile.background.original.src} />
    </>
  ) : (
    <meta name="twitter:card" content="summary" />
  )

  return (
    <Box>
      <Head>
        <title>{name} | Self.ID</title>
        <meta name="twitter:title" content={socialTitle} />
        <meta property="og:title" content={socialTitle} />
        {metaDescription}
        {metaImage}
      </Head>
      <Header url={getImageURL(profile.background, { height: 310, width: 2000 })}>
        <Navbar />
      </Header>
      <Box alignSelf="center" width="large" pad="medium">
        <Box direction="row" flex>
          <Avatar url={getImageURL(profile.image, { height: 150, width: 150 })} />
          <Box align="end" flex>
            <EditProfileButton did={id} setProfile={setProfile} />
          </Box>
        </Box>
        <Name>
          {name}
          {profile.emoji ? ` ${profile.emoji}` : null}
        </Name>
        {description}
        {linksContainer}
        {locationContainer}
      </Box>
    </Box>
  )
}
