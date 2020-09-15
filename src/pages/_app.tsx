import NextApp, { AppInitialProps } from 'next/app'
import { Grommet, grommet as grommetTheme } from 'grommet'

export default class App extends NextApp<AppInitialProps> {
  render() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { Component, pageProps } = this.props
    return (
      <Grommet theme={grommetTheme}>
        <Component {...pageProps} />
      </Grommet>
    )
  }
}
