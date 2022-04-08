/**
 * React framework for decentralized apps.
 *
 * ## Purpose
 *
 * The `framework` module is the highest-level abstraction provided by the Self.ID SDK, aimed at
 * helping developers to quickly get started with building decentralized apps using Ceramic with
 * React.
 *
 * The framework is built on top of the {@linkcode core}, {@linkcode web} and {@linkcode react}
 * modules to provide APIs to easily authenticate users, keep track of the current user and
 * interact with both public (read-only) and user-owned (mutable) records.
 *
 * ## Installation
 *
 * ```sh
 * npm install @self.id/framework
 * ```
 *
 * ## Common use-cases
 *
 * ### Configure the Provider
 *
 * The {@linkcode react.Provider Provider} component must be added at the root of the
 * application tree in order to use the hooks described below. It can be used to provide a custom
 * configuration for the Self.ID clients, authentication, state and UI options.
 *
 * ```ts
 * import { Provider } from '@self.id/framework'
 *
 * function App({ children }) {
 *   return <Provider client={{ ceramic: 'testnet-clay' }}>{children}</Provider>
 * }
 * ```
 *
 * ### Authenticate the user
 *
 * The framework provides a React hook to easily initiate an authentication flow for the Viewer
 * (the "current user" of the app). This flow is made of the following steps:
 *
 * The user authentication flow consists of the following steps:
 *
 * 1. An [Ethereum authentication provider](https://developers.ceramic.network/reference/typescript/classes/_ceramicnetwork_blockchain_utils_linking.ethereumauthprovider-1.html) is created using the Ethereum provider.
 * 1. The auth flow with 3ID Connect starts, using the [Ethereum authentication provider](https://developers.ceramic.network/reference/typescript/classes/_ceramicnetwork_blockchain_utils_linking.ethereumauthprovider-1.html).
 * 1. A {@linkcode web.SelfID SelfID} instance is created and stored in application state.
 *
 * Once this flow is successfully applied, the Viewer's cookie is set to the authenticated DID and
 * writing records associated to the Viewer becomes possible.
 *
 * ```ts
 * import { useViewerConnection } from '@self.id/framework'
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
 *       onClick={async () => {
 *         const accounts = await window.ethereum.request({
 *           method: 'eth_requestAccounts',
 *         })
 *         await connect(new EthereumAuthProvider(window.ethereum, accounts[0]))
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
 * ### Interact with a viewer record
 *
 * The {@linkcode react.useViewerRecord useViewerRecord} hook loads the record for a given
 * definition in the index of the current viewer, with the following variants:
 *
 * - If no viewer is set, no record can be loaded
 * - If the viewer is not authenticated, the record gets loaded but cannot be mutated
 * - If the viewer is authenticated, the record gets loaded and be mutated
 *
 * ```ts
 * import { useViewerRecord } from '@self.id/framework'
 *
 * // Load and display the record contents
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
 *
 * // Mutate the record
 * function SetViewerName() {
 *   const record = useViewerRecord('basicProfile')
 *
 *   return (
 *     <button
 *       disabled={!record.isMutable || record.isMutating}
 *       onClick={async () => {
 *         await record.merge({ name: 'Alice' })
 *       }}>
 *       Set name
 *     </button>
 *   )
 * }
 * ```
 *
 * ### Read a public record
 *
 * The {@linkcode react.usePublicRecord usePublicRecord} hook is similar to the
 * `useViewerRecord` hook described above, but reading from the index of an explicitly provided
 * account rather than the viewer. Public records are read-only, `useViewerRecord` must be used in
 *  case mutations are needed.
 *
 * ```ts
 * import { usePublicRecord } from '@self.id/framework'
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
 * page. The framework exports a {@linkcode react.RequestClient RequestClient} class from the
 * {@linkcode react @self.id/react} package that can be used to fetch wanted records on the server
 * in order to have them immediately available by the `usePublicRecord` and `useViewerRecord`
 * hooks.
 *
 * The following example shows how this can be used in a [Next.js](https://nextjs.org/) page, using
 * the `ShowViewerName` component created in the previous example:
 *
 * ```ts
 * import { Provider, RequestClient } from '@self.id/framework'
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
 * ## Re-exported classes
 *
 * - {@linkcode core.Core}
 * - {@linkcode core.PublicID}
 * - {@linkcode react.ReactClient}
 * - {@linkcode react.RequestClient}
 * - {@linkcode web.SelfID}
 * - `EthereumAuthProvider` from 3ID Connect
 *
 *
 * @module framework
 */

// DataModels re-exports
export type { Account as AlsoKnownAsAccount, AlsoKnownAs } from '@datamodels/identity-accounts-web'
export type { BasicProfile } from '@datamodels/identity-profile-basic'

// SDK re-exports ignored from docs to avoid duplications (links added above)
/** @ignore */
export { Core, PublicID } from '@self.id/core'
/** @ignore */
export { ReactClient, RequestClient } from '@self.id/react'
/** @ignore */
export { EthereumAuthProvider, SelfID } from '@self.id/web'

// Documented SDK re-exports
export { isCAIP10string, isDIDstring } from '@self.id/core'
export { selectImageSource, uploadImage } from '@self.id/image-utils'
export type { Dimensions, ImageSources } from '@self.id/image-utils'
export {
  Provider,
  ViewerConnectedContainer,
  useClient,
  usePublicRecord,
  useViewerConnection,
  useViewerID,
  useViewerRecord,
} from '@self.id/react'
export type {
  ProviderProps,
  PublicRecord,
  RequestClientParams,
  RequestState,
  ViewerConnectedContainerProps,
  ViewerConnectionState,
  ViewerRecord,
} from '@self.id/react'
export type { ConnectNetwork, EthereumProvider } from '@self.id/web'

// Local exports
export { formatDID, getImageURL } from './utils.js'
