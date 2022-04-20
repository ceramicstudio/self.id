/**
 * React hooks and utilities for authentication and records interactions.
 *
 * ## Purpose
 *
 * The `react` module provides React components, hooks and related utility functions to help manage
 * authentication and interactions with records, similar to the {@linkcode web} module but designed
 * specifically to be used with React.
 *
 * ## Installation
 *
 * ```sh
 * npm install @self.id/react
 * ```
 *
 * ## Common use-cases
 *
 * ### Configure the Provider
 *
 * The {@linkcode Provider} component must be added at the root of the
 * application tree in order to use the hooks described below. It can be used to provide a custom
 * configuration for the Self.ID clients and queries, as well as initial state.
 *
 * ```ts
 * import { Provider } from '@self.id/react'
 *
 * function App({ children }) {
 *   return <Provider client={{ ceramic: 'testnet-clay' }}>{children}</Provider>
 * }
 * ```
 *
 * ### Authenticate the user
 *
 * The module provides a React hook to easily initiate an authentication flow for the Viewer
 * (the "current user" of the app) using an `EthereumAuthProvider` instance, notably exported by
 * the {@linkcode web} module. Once authenticated, the Viewer's cookie is set to the authenticated
 * DID and writing records associated to the Viewer becomes possible.
 *
 * ```ts
 * import { useViewerConnection } from '@self.id/react'
 * import { EthereumAuthProvider } from '@self.id/web'
 *
 * async function createAuthProvider() {
 *   // The following assumes there is an injected `window.ethereum` provider
 *   const addresses = await window.ethereum.request({ method: 'eth_requestAccounts' })
 *   return new EthereumAuthProvider(window.ethereum, addresses[0])
 * }
 *
 * // A simple button to initiate the connection flow. A Provider must be present at a higher level
 * // in the component tree for the `useViewerConnection()` hook to work.
 * function ConnectButton() {
 *   const [connection, connect, disconnect] = useViewerConnection()
 *
 *   return connection.status === 'connected' ? (
 *     <button
 *       onClick={() => {
 *         disconnect()
 *       }}>
 *       Disconnect ({connection.selfID.id})
 *     </button>
 *   ) : 'ethereum' in window ? (
 *     <button
 *       disabled={connection.status === 'connecting'}
 *       onClick={() => {
 *         createAuthProvider().then(connect)
 *       }}>
 *       Connect
 *     </button>
 *   ) : (
 *     <p>
 *       An injected Ethereum provider such as{' '}
 *       <a href="https://metamask.io/">MetaMask</a> is needed to authenticate.
 *     </p>
 *   )
 * }
 * ```
 *
 * ### Read a viewer record
 *
 * The {@linkcode useViewerRecord} hook loads the record for a given
 * definition in the index of the current viewer, with the following variants:
 *
 * - If no viewer is set, no record can be loaded
 * - If the viewer is not authenticated, the record gets loaded but cannot be mutated
 * - If the viewer is authenticated, the record gets loaded and be mutated
 *
 * ```ts
 * import { useViewerRecord } from '@self.id/react'
 *
 * function ShowViewerName() {
 *   const record = useViewerRecord('basicProfile')
 *
 *   const text = record.isLoading
 *     ? 'Loading...'
 *     : record.content
 *     ? `Hello ${record.content.name || 'stranger'}`
 *     : 'No profile to load'
 *   return <p>{text}</p>
 * }
 * ```
 *
 * ### Read a public record
 *
 * The {@linkcode usePublicRecord} hook is similar to the
 * `useViewerRecord` hook described above, but reading from the index of an explicitly provided
 * account rather than the viewer. Public records are read-only, `useViewerRecord` must be used in
 *  case mutations are needed.
 *
 * ```ts
 * import { usePublicRecord } from '@self.id/react'
 *
 * function ShowProfileName({ did }) {
 *   const record = usePublicRecord('basicProfile', did)
 *
 *   const text = record.isLoading
 *     ? 'Loading...'
 *     : record.content
 *     ? `Hello ${record.content.name || 'stranger'}`
 *     : 'No profile to load'
 *   return <p>{text}</p>
 * }
 * ```
 *
 * ### Server-side prefetching
 *
 * Server-side rendering can be used to improve the user experience for the first load of an app or
 * page. The module exports a {@linkcode RequestClient} class that can be used
 * to fetch wanted records on the server in order to have them immediately available by the
 * `usePublicRecord` and `useViewerRecord` hooks.
 *
 * The following example shows how this can be used in a [Next.js](https://nextjs.org/) page, using
 * the `ShowViewerName` component created in the previous example:
 *
 * ```ts
 * import { Provider, RequestClient } from '@self.id/react'
 *
 * export const getServerSideProps = async (ctx) => {
 *   const client = new RequestClient({
 *     ceramic: 'testnet-clay',
 *     // Inject the cookie from the request headers to parse the viewerID
 *     cookie: ctx.req.headers.cookie,
 *   })
 *   if (client.viewerID != null) {
 *     // If the viewerID is set, fetch its profile
 *     await client.prefetch('basicProfile', client.viewerID)
 *   }
 *   return { props: { state: client.getState() } }
 * }
 *
 * // Use the state prop injected by the server
 * export default function Home({ state }) {
 *   return (
 *     <Provider state={state}>
 *       <ShowViewerName />
 *     </Provider>
 *   )
 * }
 * ```
 *
 * @module react
 */

export * from './components/Provider.js'
export * from './components/ViewerConnectedContainer.js'
export * from './constants.js'
export * from './client.js'
export * from './hooks.js'
export * from './server.js'
export * from './state.js'
export * from './types.js'
