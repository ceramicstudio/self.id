import { Box, Spinner, Text } from 'grommet'
import React from 'react'
import type { ReactElement } from 'react'
import styled, { css } from 'styled-components'

const selectedIconSrc = new URL('../assets/icon-selected.svg', import.meta.url).href

function noop() {
  // Do nothing
}

type LogoImageProps = { src: string }

const LogoImage = styled.div<LogoImageProps>`
  position: relative;
  display: inline-block;
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
  border-radius: 10px;
  background-size: cover;
  ${({ src }: LogoImageProps) => css`
    background-image: url(${src});
  `}
`

const SpinnerContainer = styled.div`
  display: inline-block;
  margin: 11px;
  width: 70px;
  height: 70px;
`

const SelectedImage = styled.span`
  position: absolute;
  bottom: 0;
  right: 0;
  margin-bottom: -15px;
  margin-right: -15px;
`

export type ProviderDisplay = {
  label: string
  logo: string
}

export type ProviderOptionProps = ProviderDisplay & {
  disabled?: boolean
  loading?: boolean
  onClick: () => void
  selected?: boolean
}

export function ProviderOption({
  disabled,
  label,
  loading,
  logo,
  onClick,
  selected,
}: ProviderOptionProps): ReactElement {
  const selectedIcon = selected ? (
    <SelectedImage>
      <img alt="✓" src={selectedIconSrc} />
    </SelectedImage>
  ) : null

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
        {selectedIcon}
      </LogoImage>
      <Text>{label}</Text>
    </Box>
  )
}
