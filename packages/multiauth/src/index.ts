/**
 * Blockchain authentication for React apps.
 *
 * ## Purpose
 *
 * The `multiauth` module provides a React Provider component and hook to access a Wallet provider
 * from a given Wallet, notably useful in order to authenticate a DID for creating a
 * {@linkcode web.SelfID SelfID} instance.
 *
 * ## Installation
 *
 * The `multiauth` module uses components from the [Grommet library](https://v2.grommet.io/), that
 * needs to be explicitly installed along `@self.id/multiauth`:
 *
 * ```sh
 * npm install @self.id/multiauth grommet
 * ```
 *
 * ## Common use-cases
 *
 * ### Add the Provider to your component tree
 *
 * As the `multiauth` module uses components from the [Grommet library](https://v2.grommet.io/), a
 * top-level container must be added as a parent of the {@linkcode multiauth.Provider} component.
 *
 * The {@linkcode ui.Provider Provider} component from the {@linkcode ui} module can be used to
 * inject this container with a theme matching the [Self.ID application](https://self.id). In such
 * cases, the {@linkcode ui @self.id/ui} module needs to also be installed.
 *
 * ```ts
 * import { Provider as AuthProvider } from '@self.id/multiauth'
 * import { Provider as UIProvider } from '@self.id/ui'
 *
 * const networks = [
 *   {
 *     key: 'ethereum',
 *     connectors: [
 *       { key: 'injected' },
 *       { key: 'fortmatic', params: { apiKey: fortmaticApiKey }},
 *     ],
 *   },
 * ]
 *
 * function App({ children }) {
 *   return (
 *     <UIProvider>
 *       <AuthProvider networks={networks}>{children}</AuthProvider>
 *     </UIProvider>
 *   )
 * }
 * ```
 *
 * ### Access the authentication state
 *
 * ```ts
 * import { useMultiAuth } from '@self.id/multiauth'
 *
 * function useWallet() {
 *   const [authState, authenticate] = useMultiAuth()
 *   return [authState.status === 'authenticated' ? authState.auth : null, authenticate]
 * }
 * ```
 *
 * @module multiauth
 */

export type { ModalConfig } from './components/Modal'
export { Provider } from './components/Provider'
export type {
  ProviderConfig as MultiAuthProviderConfig,
  ProviderProps,
} from './components/Provider'
export * from './connectors'
export * from './hooks'
export * from './networks'
export * from './providers/types'
export * from './types'
