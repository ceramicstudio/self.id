import { Provider } from '@self.id/framework'
import { Grommet } from 'grommet'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast'
import { createGlobalStyle } from 'styled-components'

import { networks } from '../auth'
import { CERAMIC_URL, CONNECT_NETWORK } from '../constants'
import { Provider as MultiAuth } from '../multiauth/components/Provider'
import { theme } from '../theme'

const GlobalStyle = createGlobalStyle`   
  @font-face {
    font-family: Segment;       
    font-style: normal;
    font-weight: 400;
    font-display: fallback;
    src: local('Segment Regular'),
      local('Segment-Regular'),
      url('/fonts/Segment-Regular.woff2') format('woff2'),
      url('/fonts/Segment-Regular.woff') format('woff');
  }
  @font-face {
    font-family: Segment;       
    font-style: normal;
    font-weight: 500;
    font-display: fallback;
    src: local('Segment Medium'),
      local('Segment-Medium'),
      url('/fonts/Segment-Medium.woff2') format('woff2'),
      url('/fonts/Segment-Medium.woff') format('woff');
  }
  @font-face {
    font-family: Segment;       
    font-style: normal;
    font-weight: 600;
    font-display: fallback;
    src: local('Segment SemiBold'),
      local('Segment-SemiBold'),
      url('/fonts/Segment-SemiBold.woff2') format('woff2'),
      url('/fonts/Segment-SemiBold.woff') format('woff');
  }

  body {
    font-family: Segment, sans-serif;
  }
`

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const { state, ...props } = pageProps

  return (
    <Provider client={{ ceramic: CERAMIC_URL, connectNetwork: CONNECT_NETWORK }} state={state}>
      <Grommet full theme={theme}>
        <GlobalStyle />
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="fortmatic-site-verification" content="4keQaoARYXbW4snM" />
        </Head>
        <MultiAuth networks={networks}>
          <Component {...props} />
        </MultiAuth>
        <Toaster />
      </Grommet>
    </Provider>
  )
}
