import type { RequestState } from '@self.id/framework'
import { Box } from 'grommet'
import type { GetServerSideProps } from 'next'

import NotesList from '../../components/NotesList'
import { useNotesRecord, useTileDoc } from '../../hooks'
import type { Note } from '../../types'

type Props = {
  did: string
  id: string
  state: RequestState
}

export const getServerSideProps: GetServerSideProps<Props, { did: string; id: string }> = async (
  ctx
) => {
  const did = ctx.params?.did
  if (did == null) {
    return {
      redirect: { destination: '/', permanent: true },
    }
  }

  const id = ctx.params?.id
  if (id == null) {
    return {
      redirect: { destination: `/${did}`, permanent: false },
    }
  }

  const { getRequestState } = await import('../../server')
  return {
    props: { did, id, state: await getRequestState(ctx, did) },
  }
}

export default function NotePage({ did, id }: Props) {
  const notesRecord = useNotesRecord(did)
  const noteDoc = useTileDoc<Note>(id)

  const noteTitle = notesRecord.content?.notes.find((item) => item.id === id)?.title

  console.log({ notesRecord, noteDoc })

  let contents = null
  if (noteDoc.content != null) {
    contents = (
      <>
        <Box>{noteTitle}</Box>
        <Box>{noteDoc.content.text}</Box>
      </>
    )
  } else if (noteDoc.isLoading) {
    contents = <Box>Loading...</Box>
  } else if (noteDoc.isError) {
    contents = <Box>Error!</Box>
  }

  return (
    <Box>
      <Box>
        <NotesList did={did} />
      </Box>
      <Box direction="column" flex>
        {contents}
      </Box>
    </Box>
  )
}
