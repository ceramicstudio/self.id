import NextApp, { AppInitialProps } from 'next/app'
import { Grommet } from 'grommet'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`   
  @font-face {
    font-family: 'DM Sans';       
    font-style: normal;
    font-weight: 400;
    font-display: fallback;
    src: local('DM Sans Regular'), local('DMSans-Regular'), url('/fonts/DMSans-Regular.ttf');
  }
  @font-face {
    font-family: 'DM Sans';       
    font-style: normal;
    font-weight: 500;
    font-display: fallback;
    src: local('DM Sans Medium'), local('DMSans-Medium'), url('/fonts/DMSans-Medium.ttf');
  }

  body {
    font-family: 'DM Sans', sans-serif;
  }
`

import { theme } from '../theme'

export default class App extends NextApp<AppInitialProps> {
  render() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { Component, pageProps } = this.props
    return (
      <Grommet full theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </Grommet>
    )
  }
}
