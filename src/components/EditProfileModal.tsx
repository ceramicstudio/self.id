import { Box, Button, Form, Layer, Text, TextArea, TextInput } from 'grommet'
import type { TextInputProps, TypedForm } from 'grommet'
import { useState } from 'react'
import type { ReactNode } from 'react'

type FormValue = {
  name?: string
  image?: string
  description?: string
  emoji?: string
  background?: string
  birthDate?: string
  url?: string
  gender?: string
  homeLocation?: string
  residenceCountry?: string
  nationality?: string // Array<string> in IDX
}

const ProfileForm = Form as TypedForm<FormValue>

interface CommonFieldProps {
  inputWidth?: string
  label: string
}

interface FieldProps extends CommonFieldProps {
  children: ReactNode
  id: string
}

function Field({ children, id, inputWidth, label }: FieldProps) {
  return (
    <Box direction="row" margin="small">
      <Box align="end" justify="center" margin="small" width="small">
        {/* @ts-ignore htmlFor from label */}
        <Text as="label" color="neutral-2" htmlFor={id}>
          {label}
        </Text>
      </Box>
      <Box width={inputWidth ?? 'medium'}>{children}</Box>
    </Box>
  )
}

interface TextFieldProps extends CommonFieldProps, Omit<TextInputProps, 'value'> {
  name: keyof FormValue
  setValue: (value: FormValue) => void
  value: FormValue
}

function TextField({ inputWidth, label, name, setValue, value, ...props }: TextFieldProps) {
  const id = `field-${name}`

  return (
    <Field id={id} inputWidth={inputWidth} label={label}>
      <TextInput
        {...props}
        id={id}
        onChange={(event) => {
          setValue({ ...value, [name]: event.target.value })
        }}
        value={value[name] ?? ''}
      />
    </Field>
  )
}

interface ModalProps {
  initialValue?: FormValue
  onClose: () => void
}

export default function EditProfileModal({ initialValue, onClose }: ModalProps) {
  const [value, setValue] = useState<FormValue>(initialValue ?? {})

  return (
    <Layer onEsc={onClose} onClickOutside={onClose}>
      <ProfileForm
        value={value}
        onSubmit={() => {
          console.log('submit form', value)
        }}>
        <Box margin="medium">
          <TextField
            label="Image"
            name="image"
            placeholder="https://mysite.com/avatar.png"
            setValue={setValue}
            value={value}
          />
          <TextField
            label="Banner"
            name="background"
            placeholder="https://mysite.com/background.png"
            setValue={setValue}
            value={value}
          />
          <TextField label="Name" name="name" setValue={setValue} value={value} />
          <Field id="field-bio" label="Bio">
            <TextArea
              id="field-bio"
              onChange={(event) => {
                setValue({ ...value, description: event.target.value })
              }}
              rows={4}
              value={value.description}
            />
          </Field>
          <TextField
            inputWidth="60px"
            label="Emoji"
            name="emoji"
            setValue={setValue}
            value={value}
          />
          <TextField label="Location" name="homeLocation" setValue={setValue} value={value} />
          <TextField
            label="URL"
            name="url"
            placeholder="https://mysite.com"
            setValue={setValue}
            value={value}
          />
          <Box direction="row">
            <Box flex margin="small">
              <Button label="Cancel" onClick={onClose} style={{ border: 0 }} />
            </Box>
            <Box flex margin="small">
              <Button type="submit" primary label="Submit" style={{ color: 'white' }} />
            </Box>
          </Box>
        </Box>
      </ProfileForm>
    </Layer>
  )
}
