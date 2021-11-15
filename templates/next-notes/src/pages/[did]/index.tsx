import { usePublicRecord } from '@self.id/framework'
import type { RequestState } from '@self.id/framework'
import { Box } from 'grommet'
import type { GetServerSideProps } from 'next'

import NotesList from '../../components/NotesList'
import type { ModelTypes } from '../../types'

type Props = {
  did: string
  state: RequestState
}

export const getServerSideProps: GetServerSideProps<Props, { did: string }> = async (ctx) => {
  const did = ctx.params?.did
  if (did == null) {
    return {
      redirect: { destination: '/', permanent: true },
    }
  }

  const { getRequestState } = await import('../../server')
  return {
    props: { did, state: await getRequestState(ctx, did) },
  }
}

export default function NotesPage({ did }: Props) {
  return (
    <Box>
      <Box>Notes</Box>
      <NotesList did={did} />
    </Box>
  )
}
