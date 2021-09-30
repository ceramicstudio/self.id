import { Provider as MultiauthProvider } from '@ceramicstudio/multiauth'
import { Provider as FrameworkProvider } from '@self.id/framework'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast'
import { createGlobalStyle } from 'styled-components'

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

import { connectors } from '../auth'
import { theme } from '../theme'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const { state, ...props } = pageProps

  return (
    <MultiauthProvider providers={[{ key: 'ethereum', connectors }]} theme={theme}>
      <FrameworkProvider state={state} ui={{ full: true, theme }}>
        <GlobalStyle />
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="fortmatic-site-verification" content="4keQaoARYXbW4snM" />
        </Head>
        <Component {...props} />
        <Toaster />
      </FrameworkProvider>
    </MultiauthProvider>
  )
}
