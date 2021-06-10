import copy from 'copy-to-clipboard'
import { Anchor, Box, Button, Heading, Spinner, Text } from 'grommet'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'

import { useEnvState } from '../hooks'

import ConnectedContainer from './ConnectedContainer'

export default function AddGitHubAccountScreen() {
  const { self } = useEnvState()
  const [challengeLoading, setChallengeLoading] = useState<boolean>(false)
  const router = useRouter()
  const { username } = router.query

  const copyMessage = useCallback(() => {
    if (self == null || typeof username !== 'string' || challengeLoading) {
      return
    }

    const toastId = toast.loading('Loading challenge...')
    setChallengeLoading(true)

    self.getGitHubChallenge(username).then(
      () => {
        if (copy(self.id)) {
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
  }, [challengeLoading, username, self, setChallengeLoading])

  return (
    <ConnectedContainer>
      <Link href="/me/social-accounts">
        <Anchor color="neutral-4">Social accounts</Anchor>
      </Link>
      <Heading margin={{ horizontal: 'none', vertical: 'small' }}>Verify GitHub account</Heading>
      <Box margin={{ top: 'medium' }}>
        <Box
          border={{ color: 'neutral-5' }}
          direction="row"
          gap="small"
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
              <Button label="Copy" onClick={copyMessage} />
            )}
          </Box>
        </Box>
        <Box
          border={{ color: 'neutral-5' }}
          direction="row"
          gap="small"
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
            <Button label="Open" />
          </Box>
        </Box>
        <Box
          border={{ color: 'neutral-5' }}
          direction="row"
          gap="small"
          margin={{ bottom: 'medium' }}
          pad="medium"
          round="small">
          <Text margin={{ bottom: 'small' }} weight="bold">
            Step 3
          </Text>
          <Text color="neutral-2">
            Paste the verification message in the Gist and save as <Text color="brand">public</Text>
            .
          </Text>
        </Box>
        <Box
          border={{ color: 'neutral-5' }}
          direction="row"
          gap="small"
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
            <Button label="Verify" />
          </Box>
        </Box>
      </Box>
    </ConnectedContainer>
  )
}
