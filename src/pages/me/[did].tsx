import type { BasicProfile, ImageSources } from '@ceramicstudio/idx-constants'
import { Anchor, Box, Paragraph, Text } from 'grommet'
import type { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'

import Navbar from '../../components/Navbar'
import { getImageSrc } from '../../image'
import type { Dimensions } from '../../image'
import countryIcon from '../../images/icons/country.png'
import linkIcon from '../../images/icons/link.svg'
import locationIcon from '../../images/icons/location.png'
import { loadProfile } from '../../profile'
import { BRAND_COLOR, PLACEHOLDER_COLOR } from '../../theme'

export function getImageURL(
  sources: ImageSources | undefined,
  dimensions: Dimensions
): string | undefined {
  return sources ? getImageSrc(sources, dimensions) : undefined
}

const EditProfileButton = dynamic(() => import('../../client/components/EditProfileButton'), {
  ssr: false,
})

interface Props {
  did: string | null
  loadedProfile: BasicProfile | null
}

export const getServerSideProps: GetServerSideProps<Props, { did: string }> = async (ctx) => {
  const did = ctx.params?.did ?? null
  let loadedProfile = null

  if (did !== null) {
    try {
      const { idx } = await import('../../server/idx')
      loadedProfile = await loadProfile(idx, did)
    } catch (err) {
      console.log('error loading profile from IDX', err)
    }
  }

  return {
    props: { did, loadedProfile },
  }
}

const Header = styled.div<{ url?: string }>`
  height: 307px;
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
  ${(props) =>
    props.url &&
    css`
      background-image: url(${props.url});
      background-size: cover;
    `}
`

const Name = styled.h1`
  color: ${BRAND_COLOR};
  font-size: 28px;
  font-weight: 500;
`

interface NoProfileProps {
  did: string | null
  setProfile: (profile: BasicProfile) => void
}

function NoProfile({ did, setProfile }: NoProfileProps) {
  return (
    <Box>
      <Head>
        <title>No profile found | self.ID</title>
      </Head>
      <Header>
        <Navbar variant="white" />
      </Header>
      <Box alignSelf="center" width="large">
        <Box direction="row" flex>
          <Avatar />
          <Box flex>
            <Box alignSelf="end" margin="medium" width="150px">
              <EditProfileButton did={did} setProfile={setProfile} />
            </Box>
          </Box>
        </Box>
        <Name>No profile found</Name>
      </Box>
    </Box>
  )
}

export default function ProfilePage({ did, loadedProfile }: Props) {
  const [profile, setProfile] = useState<BasicProfile | null>(loadedProfile)
  useEffect(() => {
    setProfile(loadedProfile)
  }, [loadedProfile])

  if (did == null || profile == null) {
    return <NoProfile did={did} setProfile={setProfile} />
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
        <Navbar variant="white" />
      </Header>
      <Box alignSelf="center" width="large" pad="medium">
        <Box direction="row" flex>
          <Avatar url={getImageURL(profile.image, { height: 150, width: 150 })} />
          <Box flex>
            <Box alignSelf="end" width="150px">
              <EditProfileButton did={did} setProfile={setProfile} />
            </Box>
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
