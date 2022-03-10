import type { SelfID } from '@self.id/framework'
import { Box, Button, Heading, Spinner, Text } from 'grommet'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'

import { useConnectionState, useAddTwitterAttestation, useIdentityLink } from '../../hooks'

import AddSocialAccountContainer from './AddSocialAccountContainer'

function createTweetLink(did: string): string {
  const text = encodeURIComponent(
    `Verifying my Twitter account for my decentralized identity ${did} on @ceramicnetwork via @mySelfID.\n\nView my Self.ID here ↓`
  )
  const url = encodeURIComponent(`${document.location.origin}/${did}`)
  return `https://twitter.com/intent/tweet?text=${text}&url=${url}`
}

type Props = {
  selfID: SelfID
}

function AddTwitterAccount({ selfID }: Props) {
  const identityLink = useIdentityLink()
  const addTwitterAttestation = useAddTwitterAttestation(identityLink)
  const [challengeLoading, setChallengeLoading] = useState<boolean>(false)
  const [challenge, setChallenge] = useState<string | null>(null)
  const [verifyLoading, setVerifyLoading] = useState<boolean>(false)
  const router = useRouter()
  const { username } = router.query
  const did = selfID.id

  const loadChallenge = useCallback(() => {
    if (typeof username !== 'string' || challengeLoading) {
      return
    }

    const toastId = toast.loading('Loading challenge...')
    setChallengeLoading(true)

    identityLink.requestTwitter(did, username).then(
      (challenge) => {
        setChallenge(challenge)
        toast.success('Challenge loaded!', { id: toastId })
        setChallengeLoading(false)
      },
      (err: Error) => {
        toast.error(`Failed to get challenge: ${err.message}`, { id: toastId })
        setChallengeLoading(false)
      }
    )
  }, [challengeLoading, did, identityLink, username])

  const verify = useCallback(() => {
    if (self == null || challenge == null || typeof username !== 'string' || verifyLoading) {
      return
    }

    const toastId = toast.loading('Verifying...')
    setVerifyLoading(true)

    addTwitterAttestation(selfID.did, username, challenge).then(
      () => {
        toast.success('Attestation added!', { id: toastId })
        setVerifyLoading(false)
        return router.push('/me/social-accounts')
      },
      (err: Error) => {
        toast.error(`Failed to verify or add attestation: ${err.message}`, { id: toastId })
        setVerifyLoading(false)
      }
    )
  }, [addTwitterAttestation, challenge, router, selfID.did, username, verifyLoading])

  return (
    <Box margin={{ top: 'medium' }}>
      <Box
        border={{ color: 'neutral-5' }}
        direction="row"
        margin={{ bottom: 'medium' }}
        pad="medium"
        round="small">
        <Box flex>
          <Text margin={{ bottom: 'small' }} weight="bold">
            Step 1
          </Text>
          <Text color="neutral-2">Click this button to load the attestation challenge.</Text>
        </Box>
        <Box>
          {challengeLoading ? (
            <Button disabled icon={<Spinner />} />
          ) : (
            <Button disabled={verifyLoading} label="Load" onClick={loadChallenge} />
          )}
        </Box>
      </Box>
      <Box
        border={{ color: 'neutral-5' }}
        direction="row"
        margin={{ bottom: 'medium' }}
        pad="medium"
        round="small">
        <Box flex>
          <Text margin={{ bottom: 'small' }} weight="bold">
            Step 2
          </Text>
          <Text color="neutral-2">
            Tweet a verification from <Text color="brand">@{username as string}</Text>
          </Text>
        </Box>
        <Box>
          <Button
            disabled={challenge == null}
            href={createTweetLink(did)}
            label="Tweet"
            target="_blank"
          />
        </Box>
      </Box>
      <Box
        border={{ color: 'neutral-5' }}
        direction="row"
        margin={{ bottom: 'medium' }}
        pad="medium"
        round="small">
        <Box flex>
          <Text margin={{ bottom: 'small' }} weight="bold">
            Step 3
          </Text>
          <Text color="neutral-2">
            Return to this page and verify your account by clicking this button.
          </Text>
        </Box>
        <Box>
          {verifyLoading ? (
            <Button disabled icon={<Spinner />} />
          ) : (
            <Button disabled={challenge == null} label="Verify" onClick={verify} />
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default function AddTwitterAccountScreen() {
  const connection = useConnectionState()

  return (
    <AddSocialAccountContainer>
      <Heading margin={{ horizontal: 'none', vertical: 'small' }}>Verify Twitter account</Heading>
      {connection.status === 'connected' ? <AddTwitterAccount selfID={connection.selfID} /> : null}
    </AddSocialAccountContainer>
  )
}
