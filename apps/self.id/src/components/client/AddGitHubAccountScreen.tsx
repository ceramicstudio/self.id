import type { SelfID } from '@self.id/framework'
import copy from 'copy-to-clipboard'
import { Box, Button, Heading, Spinner, Text } from 'grommet'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'

import { useConnectionState, useAddGitHubAttestation, useIdentityLink } from '../../hooks'

import AddSocialAccountContainer from './AddSocialAccountContainer'

type Props = {
  selfID: SelfID
}

function AddGitHubAccount({ selfID }: Props) {
  const identityLink = useIdentityLink()
  const addGitHubAttestation = useAddGitHubAttestation(identityLink)
  const [challengeLoading, setChallengeLoading] = useState<boolean>(false)
  const [challenge, setChallenge] = useState<string | null>(null)
  const [verifyLoading, setVerifyLoading] = useState<boolean>(false)
  const router = useRouter()
  const { username } = router.query

  const copyMessage = useCallback(() => {
    if (typeof username !== 'string' || challengeLoading) {
      return
    }

    const toastId = toast.loading('Loading challenge...')
    setChallengeLoading(true)

    identityLink.requestGitHub(selfID.id, username).then(
      (challenge) => {
        setChallenge(challenge)
        if (copy(selfID.id)) {
          toast.success('Copied to clipboard!', { id: toastId })
        } else {
          toast.error('Failed to copy to clipboard', { id: toastId })
        }
        setChallengeLoading(false)
      },
      (err: Error) => {
        toast.error(`Failed to get challenge: ${err.message}`, { id: toastId })
        setChallengeLoading(false)
      }
    )
  }, [challengeLoading, selfID.id, identityLink, username])

  const verify = useCallback(() => {
    if (challenge == null || typeof username !== 'string' || verifyLoading) {
      return
    }

    const toastId = toast.loading('Verifying...')
    setVerifyLoading(true)

    addGitHubAttestation(selfID.did, username, challenge).then(
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
  }, [addGitHubAttestation, challenge, router, selfID.did, username, verifyLoading])

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
          <Text color="neutral-2">Click this button to copy the verification message.</Text>
        </Box>
        <Box>
          {challengeLoading ? (
            <Button disabled icon={<Spinner />} />
          ) : (
            <Button disabled={verifyLoading} label="Copy" onClick={copyMessage} />
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
            Click this button to open a new window and create a Gist file.
          </Text>
        </Box>
        <Box>
          <Button
            disabled={challenge == null}
            href="https://gist.github.com/"
            label="Open"
            target="_blank"
          />
        </Box>
      </Box>
      <Box
        border={{ color: 'neutral-5' }}
        direction="column"
        margin={{ bottom: 'medium' }}
        pad="medium"
        round="small">
        <Text margin={{ bottom: 'small' }} weight="bold">
          Step 3
        </Text>
        <Text color="neutral-2">
          Paste your DID in the Gist and save as <Text color="brand">public</Text>.
        </Text>
      </Box>
      <Box
        border={{ color: 'neutral-5' }}
        direction="row"
        margin={{ bottom: 'medium' }}
        pad="medium"
        round="small">
        <Box flex>
          <Text margin={{ bottom: 'small' }} weight="bold">
            Step 4
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

export default function AddGitHubAccountScreen() {
  const connection = useConnectionState()

  return (
    <AddSocialAccountContainer>
      <Heading margin={{ horizontal: 'none', vertical: 'small' }}>Verify GitHub account</Heading>
      {connection.status === 'connected' ? <AddGitHubAccount selfID={connection.selfID} /> : null}
    </AddSocialAccountContainer>
  )
}
