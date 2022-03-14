import { Box, Spinner, Text } from 'grommet'
import React from 'react'
import type { CSSProperties, ReactElement, ReactNode } from 'react'

function noop() {
  // Do nothing
}

const IMAGE_STYLES: CSSProperties = {
  position: 'relative',
  display: 'inline-block',
  width: '70px',
  height: '70px',
  marginBottom: '10px',
  borderRadius: '10px',
  backgroundColor: '#D8D8D8',
  backgroundSize: 'cover',
}

type LogoImageProps = { children: ReactNode; src?: string }

function LogoImage({ children, src }: LogoImageProps) {
  const style = { ...IMAGE_STYLES }
  if (src != null) {
    style.backgroundImage = `url(${src})`
  }
  return <div style={style}>{children}</div>
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
  logo?: string
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
      typeof selectedIcon === 'string' ? (
        <img alt="✓" src={selectedIcon} />
      ) : (
        selectedIcon ?? <span>✓</span>
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
