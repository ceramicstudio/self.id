import type { BasicProfile, Dimensions, ImageSources } from '@self.id/framework'
import { Anchor, Avatar, Box, Button, Heading, Image, Text, TextArea, TextInput } from 'grommet'
import type { TextInputProps } from 'grommet'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'

import { useEditProfile, useImageUpload, useViewerProfile } from '../../hooks'
import { getImageURL } from '../../utils'

import ConnectedContainer from '../ConnectedContainer'

export type FormValue = {
  name?: string
  image?: ImageSources
  description?: string
  emoji?: string
  background?: ImageSources
  birthDate?: string
  url?: string
  gender?: string
  homeLocation?: string
  residenceCountry?: string
  nationality?: string // Array<string> in IDX
}

type ImageKey = 'image' | 'background'

function profileToForm({ nationalities, ...profile }: BasicProfile): FormValue {
  return { ...profile, nationality: nationalities?.[0] }
}

function changeProfile(
  profile: BasicProfile,
  { nationality, residenceCountry, ...value }: FormValue
): BasicProfile {
  const changed = { ...profile, ...value }

  // Turn single-value nationality into array, with uppercase value
  const nationalities = profile.nationalities
  if (nationality && Array.isArray(nationalities)) {
    const formattedNationality = nationality.toUpperCase()
    if (!nationalities.includes(formattedNationality)) {
      nationalities.unshift(formattedNationality)
    }
  }
  if (nationalities?.length) {
    changed.nationalities = nationalities
  }

  // Residence country code must be uppercase
  if (residenceCountry != null && residenceCountry !== '') {
    changed.residenceCountry = residenceCountry.toUpperCase()
  }

  return changed
}

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
    <Box direction="row" flex={false} margin={{ vertical: 'small' }}>
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

interface TextFieldProps
  extends CommonFieldProps,
    Omit<TextInputProps, 'value'>,
    Omit<JSX.IntrinsicElements['input'], 'onSelect' | 'size' | 'placeholder' | 'ref' | 'value'> {
  disabled?: boolean
  name: Exclude<keyof FormValue, ImageKey>
  setValue: (value: FormValue) => void
  value: FormValue
}

function TextField({ label, name, setValue, value, ...props }: TextFieldProps) {
  const id = `field-${name}`

  return (
    <Field id={id} label={label}>
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

interface ImageFieldProps extends CommonFieldProps {
  disabled?: boolean
  maxSize?: number
  name: ImageKey
  renderImage(props: { sources: ImageSources; onClick?: () => void }): ReactNode
  resizeDimensions?: Array<Dimensions>
  setValue: (value: FormValue) => void
  value: FormValue
}

function ImageField({
  disabled,
  label,
  maxSize,
  name,
  renderImage,
  resizeDimensions,
  setValue,
  value,
}: ImageFieldProps) {
  const { input, state, trigger } = useImageUpload(
    (sources) => setValue({ ...value, [name]: sources }),
    { maxSize, dimensions: resizeDimensions }
  )

  const sources = value[name]
  let content = null
  if (state === 'uploading') {
    content = <Button color="black" disabled fill label="Uploading..." />
  } else if (sources != null) {
    content = renderImage({ sources, onClick: disabled ? undefined : trigger })
  } else {
    content = <Button color="black" fill label="Select" onClick={trigger} />
  }

  return (
    <Field id={`field-${name}`} label={label}>
      {input}
      {content}
    </Field>
  )
}

interface FormProps {
  profile: BasicProfile
}

function EditProfileForm({ profile }: FormProps) {
  const [isLoading, editProfile] = useEditProfile()
  const [value, setValue] = useState<FormValue>(() => profileToForm(profile))

  const onReset = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      if (!isLoading) {
        setValue(profileToForm(profile))
      }
    },
    [isLoading, profile, setValue]
  )

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      if (isLoading) {
        return
      }

      const newProfile = changeProfile(profile, value)
      editProfile(newProfile).then(
        () => {
          console.log('Profile saved', newProfile)
        },
        (err) => {
          console.warn('Failed to save profile', err)
        }
      )
    },
    [editProfile, isLoading, profile, value]
  )

  return (
    <Box as="form" onReset={onReset} onSubmit={onSubmit}>
      <Box direction="row">
        <Box flex>
          <Heading fill margin={{ horizontal: 'none', vertical: 'small' }}>
            My profile
          </Heading>
        </Box>
        <Box direction="row" align="center">
          <Button color="neutral-5" disabled={isLoading} type="reset" label="Reset" />
          <Button
            disabled={isLoading}
            type="submit"
            primary
            label="Save"
            style={{ color: 'white', marginLeft: 8 }}
          />
        </Box>
      </Box>
      <Box flex="grow">
        <ImageField
          disabled={isLoading}
          label="Image (max 2.5 MB)"
          name="image"
          renderImage={({ onClick, sources }) => (
            <Avatar onClick={onClick} src={getImageURL(sources, { height: 50, width: 50 })} />
          )}
          resizeDimensions={[{ width: 150, height: 150 }]}
          setValue={setValue}
          value={value}
        />
        <ImageField
          disabled={isLoading}
          label="Banner (max 2.5 MB)"
          name="background"
          renderImage={({ onClick, sources }) => {
            const src = getImageURL(sources, { width: 300, height: 100 })
            return (
              <Box height="small">
                <Image alt={src} fit="cover" onClick={onClick} src={src} />
              </Box>
            )
          }}
          setValue={setValue}
          value={value}
        />
        <TextField
          disabled={isLoading}
          label="Name"
          name="name"
          maxLength={150}
          setValue={setValue}
          value={value}
        />
        <Field id="field-bio" label="Bio">
          <TextArea
            disabled={isLoading}
            id="field-bio"
            maxLength={420}
            onChange={(event) => {
              setValue({ ...value, description: event.target.value })
            }}
            rows={4}
            value={value.description}
          />
        </Field>
        <TextField
          disabled={isLoading}
          size="small"
          label="Emoji"
          maxLength={2}
          name="emoji"
          setValue={setValue}
          value={value}
        />
        <TextField
          disabled={isLoading}
          label="Location"
          name="homeLocation"
          maxLength={140}
          setValue={setValue}
          value={value}
        />
        <TextField
          disabled={isLoading}
          label="2-letter country code"
          name="residenceCountry"
          maxLength={2}
          setValue={setValue}
          value={value}
        />
        <TextField
          disabled={isLoading}
          label="URL"
          maxLength={240}
          name="url"
          placeholder="https://mysite.com"
          setValue={setValue}
          value={value}
        />
      </Box>
    </Box>
  )
}

function EditProfileLoader() {
  const profileRecord = useViewerProfile()

  return profileRecord.isLoading ? (
    <>
      <Heading margin={{ horizontal: 'none', vertical: 'small' }}>My profile</Heading>
      <Text>Loading profile...</Text>
    </>
  ) : profileRecord.isError ? (
    <>
      <Heading margin={{ horizontal: 'none', vertical: 'small' }}>My profile</Heading>
      <Text>Failed to load profile</Text>
    </>
  ) : (
    <EditProfileForm profile={profileRecord.content ?? {}} />
  )
}

export default function EditProfileScreen() {
  return (
    <ConnectedContainer>
      <Link href="/me/settings" passHref>
        <Anchor color="neutral-4">Settings</Anchor>
      </Link>
      <EditProfileLoader />
    </ConnectedContainer>
  )
}
