import { Button, Box } from 'grommet'
import { useCallback, useState } from 'react'

import { BRAND_COLOR } from '../theme'

import EditProfileModal from './EditProfileModal'

export default function EditProfileButton() {
  const [isOpen, setOpen] = useState(false)

  const onOpen = useCallback(() => {
    setOpen(true)
  }, [])
  const onClose = useCallback(() => {
    setOpen(false)
  }, [])

  const modal = isOpen ? <EditProfileModal onClose={onClose} /> : null

  return (
    <>
      {modal}
      <Box alignSelf="end" margin="medium" width="150px">
        <Button
          primary
          color="rgba(247, 101, 55, 0.1)"
          label="Edit"
          onClick={onOpen}
          style={{ border: 0, color: BRAND_COLOR }}
        />
      </Box>
    </>
  )
}
