import { useViewerID } from '@self.id/framework'
import { Box, Button, Form, FormField, Text, TextArea, TextInput } from 'grommet'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

import NotesList from '../components/NotesList'
import { useDraftNote } from '../hooks'

export default function NewNotePage() {
  const draft = useDraftNote()
  const viewer = useViewerID()
  const router = useRouter()

  const isLoading = draft.state.status === 'loading'

  const onSubmit = useCallback(async () => {
    const notePage = await draft.publish()
    if (notePage) {
      await router.push(notePage)
    }
  }, [draft, router])

  const sidebar = viewer ? (
    <NotesList did={viewer.id} />
  ) : (
    <Box direction="column" width="medium" pad="medium">
      <Text>Not connected</Text>
    </Box>
  )

  return (
    <Box direction="row" flex>
      {sidebar}
      <Box direction="column" flex pad="medium">
        <Form
          value={draft.value}
          onChange={(nextValue) => draft.setValue(nextValue)}
          onReset={() => draft.resetValue()}
          onSubmit={onSubmit}>
          <FormField name="title" htmlFor="text-input-title" label="Title">
            <TextInput autoFocus disabled={isLoading} id="text-input-title" name="title" />
          </FormField>
          <FormField name="text" htmlFor="text-input-text" label="Contents">
            <TextArea disabled={isLoading} id="text-input-text" name="text" />
          </FormField>
          <Box direction="row" gap="medium">
            <Button
              disabled={!draft.isValid || isLoading}
              type="submit"
              primary
              style={{ color: 'white' }}
              label={isLoading ? 'Publishing...' : 'Publish note'}
            />
            <Button disabled={isLoading} type="reset" label="Reset" />
          </Box>
        </Form>
      </Box>
    </Box>
  )
}
