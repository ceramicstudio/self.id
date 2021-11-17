import type { ModelTypesToAliases } from '@glazed/types'
import { Provider as SelfIDProvider } from '@self.id/framework'
import { Provider as JotaiProvider } from 'jotai'
import type { AppProps } from 'next/app'

import Layout from '../components/Layout'
import { CERAMIC_NETWORK } from '../constants'
import publishedModel from '../model.json'
import type { ModelTypes } from '../types'

const model: ModelTypesToAliases<ModelTypes> = publishedModel

export default function App({ Component, pageProps }: AppProps) {
  const { state, ...props } = pageProps

  return (
    <SelfIDProvider
      client={{ ceramic: CERAMIC_NETWORK, model }}
      state={state}
      ui={{ full: true, style: { display: 'flex' } }}>
      <JotaiProvider>
        <Layout>
          <Component {...props} />
        </Layout>
      </JotaiProvider>
    </SelfIDProvider>
  )
}
