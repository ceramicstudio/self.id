import type { RequestState } from '@self.id/framework'
import { Box, Button, Form, FormField, Heading, Paragraph, Text, TextArea } from 'grommet'
import type { GetServerSideProps } from 'next'

import NotesList from '../../components/NotesList'
import { useNote } from '../../hooks'

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
  const note = useNote(did, id)

  let contents = null
  if (note.content != null) {
    const titleButton = note.isEditing ? (
      <Button disabled={note.isMutating} label="Cancel" onClick={() => note.toggleEditing(false)} />
    ) : note.isEditable ? (
      <Button label="Edit" onClick={() => note.toggleEditing(true)} />
    ) : null

    const text = note.isEditing ? (
      <Form
        value={{ text: note.editingText }}
        onChange={({ text }) => note.setEditingText(text)}
        onReset={() => note.resetEditingText()}
        onSubmit={() => note.update()}>
        <FormField name="text" htmlFor="text-input-text">
          <TextArea autoFocus id="text-input-text" name="text" />
        </FormField>
        <Box direction="row" gap="medium">
          <Button
            disabled={!note.isValid || note.isMutating}
            type="submit"
            primary
            style={{ color: 'white' }}
            label={note.isMutating ? 'Updating...' : 'Update note'}
          />
          <Button disabled={note.isMutating} type="reset" label="Reset" />
        </Box>
      </Form>
    ) : (
      <Box>
        <Text>{note.content.text}</Text>
      </Box>
    )

    contents = (
      <>
        <Box direction="row">
          <Box flex>
            <Heading level={2} margin={{ top: 'none' }}>
              {note.content.title}
            </Heading>
          </Box>
          <Box>{titleButton}</Box>
        </Box>
        {text}
      </>
    )
  } else if (note.isLoading) {
    contents = <Paragraph>Loading...</Paragraph>
  } else if (note.isError) {
    contents = <Paragraph>Error loading note</Paragraph>
  }

  return (
    <Box direction="row" fill="vertical" flex>
      <NotesList did={did} active={id} />
      <Box direction="column" flex pad="medium">
        {contents}
      </Box>
    </Box>
  )
}
