import { Grommet } from 'grommet'
import { Provider as StateProvider } from 'jotai'
import NextApp, { AppInitialProps } from 'next/app'
import Head from 'next/head'
import { createGlobalStyle } from 'styled-components'

import { Provider as MultiauthProvider } from '../multiauth/ethereum/components'

const GlobalStyle = createGlobalStyle`   
  @font-face {
    font-family: 'DM Sans';       
    font-style: normal;
    font-weight: 400;
    font-display: fallback;
    src: local('DM Sans Regular'),
      local('DMSans-Regular'),
      url('/fonts/DMSans-Regular.woff2') format('woff2'),
      url('/fonts/DMSans-Regular.woff') format('woff');
  }
  @font-face {
    font-family: 'DM Sans';       
    font-style: normal;
    font-weight: 500;
    font-display: fallback;
    src: local('DM Sans Medium'),
      local('DMSans-Medium'),
      url('/fonts/DMSans-Medium.woff2') format('woff2'),
      url('/fonts/DMSans-Medium.woff') format('woff');
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
      <MultiauthProvider>
        <StateProvider>
          <Grommet full theme={theme}>
            <GlobalStyle />
            <Head>
              <link rel="icon" href="/favicon.ico" />
              <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Component {...pageProps} />
          </Grommet>
        </StateProvider>
      </MultiauthProvider>
    )
  }
}
