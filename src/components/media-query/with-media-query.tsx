import React, { useContext } from 'react'
import styled from 'styled-components'
import { ThemeContext, ThemeType } from 'grommet'
import { createMediaQueriesArray, MediaQueryCssArrayType } from './create-media-queries'

interface MediaQueryProps {
  mediaQuery?: MediaQueryCssArrayType
}

export function withMediaQuery<T>(
  Component: React.ComponentType<T> | string
): React.ComponentType<MediaQueryProps & T> {
  const MediaQueryComponent = styled<any>(Component)`
    ${({ mediaQuery, breakpoints }) => {
      return createMediaQueriesArray(mediaQuery, breakpoints)
    }}
  `

  // eslint-disable-next-line react/prop-types,react/display-name
  return ({ mediaQuery, ...props }) => {
    const theme = useContext<ThemeType>(ThemeContext)
    const grommetBreakpoints = theme.global!.breakpoints as unknown as Record<
      string,
      { value: string }
    >

    //Grommets breakpoint API makes this awkward. Largest size has no value.
    const grommetBreakpointsArray = Object.keys(grommetBreakpoints).map(
      (key) => grommetBreakpoints[key].value || ''
    )

    return (
      <MediaQueryComponent
        mediaQuery={mediaQuery}
        breakpoints={grommetBreakpointsArray}
        {...props}
      />
    )
  }
}
