import type { BasicProfile, ImageSources } from '@ceramicstudio/idx-constants'
import { Anchor, Avatar, Box, Button, Heading, Image, Text, TextArea, TextInput } from 'grommet'
import type { TextInputProps } from 'grommet'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'

import { getImageSrc } from '../../sdk'
import type { Dimensions } from '../../sdk'
import { useEditProfile, useEnvState, useImageUpload } from '../hooks'

import ConnectedContainer from './ConnectedContainer'

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

function changeProfile(profile: BasicProfile, { nationality, ...value }: FormValue): BasicProfile {
  const changed = { ...profile, ...value }

  const nationalities = profile.nationalities ?? []
  if (nationality && !nationalities.includes(nationality)) {
    nationalities.unshift(nationality)
  }
  if (nationalities.length) {
    changed.nationalities = nationalities
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
  const [editProfileState, editProfile] = useEditProfile()
  const [value, setValue] = useState<FormValue>(() => profileToForm(profile))

  const isLoading = editProfileState.status === 'editing'

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
            <Avatar onClick={onClick} src={getImageSrc(sources, { height: 50, width: 50 })} />
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
            const src = getImageSrc(sources, { width: 300, height: 100 })
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

type LoaderState =
  | { status: 'loading' }
  | { status: 'loaded'; profile: BasicProfile }
  | { status: 'error'; error: Error }

function EditProfileLoader() {
  const { self } = useEnvState()
  const [state, setState] = useState<LoaderState>({ status: 'loading' })

  useEffect(() => {
    self?.getProfile().then(
      (profile) => {
        setState({ status: 'loaded', profile: profile ?? {} })
      },
      (error: Error) => {
        setState({ status: 'error', error })
      }
    )
  }, [self])

  switch (state.status) {
    case 'loading':
      return (
        <>
          <Heading margin={{ horizontal: 'none', vertical: 'small' }}>My profile</Heading>
          <Text>Loading profile...</Text>
        </>
      )
    case 'error':
      return (
        <>
          <Heading margin={{ horizontal: 'none', vertical: 'small' }}>My profile</Heading>
          <Text>Failed to load profile: {state.error.message}</Text>
        </>
      )
    case 'loaded':
      return <EditProfileForm profile={state.profile} />
  }
}

export default function EditProfileScreen() {
  return (
    <ConnectedContainer>
      <Link href="/me/settings">
        <Anchor color="neutral-4">Settings</Anchor>
      </Link>
      <EditProfileLoader />
    </ConnectedContainer>
  )
}
