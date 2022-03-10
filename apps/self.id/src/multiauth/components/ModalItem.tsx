import { Box, Spinner, Text } from 'grommet'
import React from 'react'
import type { ReactElement, ReactNode } from 'react'

const defaultSelectedIconSrc = new URL('../images/icon-selected.svg', import.meta.url).href

function noop() {
  // Do nothing
}

type LogoImageProps = { children: ReactNode; src: string }

function LogoImage({ children, src }: LogoImageProps) {
  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-block',
        width: '70px',
        height: '70px',
        marginBottom: '10px',
        borderRadius: '10px',
        backgroundColor: '#D8D8D8',
        backgroundSize: 'cover',
        backgroundImage: `url(${src})`,
      }}>
      {children}
    </div>
  )
}

type ChildrenProps = { children: ReactNode }

function SpinnerContainer({ children }: ChildrenProps) {
  return (
    <div
      style={{
        display: 'inline-block',
        margin: '11px',
        width: '70px',
        height: '70px',
      }}>
      {children}
    </div>
  )
}

function SelectedImage({ children }: ChildrenProps) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        marginBottom: '-15px',
        marginRight: '-15px',
      }}>
      {children}
    </div>
  )
}

export type ProviderDisplay = {
  label: string
  logo: string
}

export type ModalItemProps = ProviderDisplay & {
  disabled?: boolean
  loading?: boolean
  onClick: () => void
  selected?: boolean
  selectedIcon?: string | ReactElement
}

export function ModalItem({
  disabled,
  label,
  loading,
  logo,
  onClick,
  selected,
  selectedIcon,
}: ModalItemProps): ReactElement {
  let displaySelected = null
  if (selected) {
    const icon =
      selectedIcon == null || typeof selectedIcon === 'string' ? (
        <img alt="✓" src={selectedIcon ?? defaultSelectedIconSrc} />
      ) : (
        selectedIcon
      )
    displaySelected = <SelectedImage>{icon}</SelectedImage>
  }

  return (
    <Box
      align="center"
      direction="column"
      flex={false}
      margin="small"
      onClick={disabled ? noop : onClick}>
      <LogoImage src={logo}>
        {loading ? (
          <SpinnerContainer>
            <Spinner size="medium" />
          </SpinnerContainer>
        ) : null}
        {displaySelected}
      </LogoImage>
      <Text>{label}</Text>
    </Box>
  )
}
