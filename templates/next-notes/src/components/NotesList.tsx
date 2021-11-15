import { Nav } from 'grommet'
import Link from 'next/link'

import { useNotesRecord } from '../hooks'

type Props = {
  did: string
}

export default function NotesList({ did }: Props) {
  const record = useNotesRecord(did)

  console.log('NotesList record', record)

  const notes = record.content?.notes ?? []
  const items = notes.map((note) => {
    return (
      <Link key={note.id} href={`/${did}/${note.id.replace('ceramic://', '')}`}>
        {note.title}
      </Link>
    )
  })

  return <Nav>{items}</Nav>
}
