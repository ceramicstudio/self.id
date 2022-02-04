/**
 * Read and write records in browsers environments.
 *
 * ## Purpose
 *
 * The `web` module of the Self.ID SDK exports the {@linkcode WebClient} and
 * {@linkcode SelfID} classes to provide APIs for authenticating a DID to allow writing
 * records, in addition to reading them.
 *
 * DID authentication leverages 3ID Connect, which only works in browsers, therefore the `web`
 * module can only be used in browsers. The {@linkcode core} module can be used to read public
 * records in browsers as well as Node environments.
 *
 * ## Installation
 *
 * ```sh
 * npm install @self.id/web
 * ```
 *
 * ## Common use-cases
 *
 * ### Authenticate and write a record
 *
 * ```ts
 * import { EthereumAuthProvider, SelfID } from '@self.id/web'
 *
 * async function createSelfID() {
 *   // The following assumes there is an injected `window.ethereum` provider
 *   const addresses = await window.ethereum.request({ method: 'eth_requestAccounts' })
 *
 *   return await SelfID.authenticate({
 *     authProvider: new EthereumAuthProvider(window.ethereum, addresses[0]),
 *     ceramic: 'testnet-clay',
 *     // Make sure the `ceramic` and `connectNetwork` parameter connect to the same network
 *     connectNetwork: 'testnet-clay',
 *   })
 * }
 *
 * async function setBasicProfile(selfID) {
 *   // Use the SelfID instance created by the `createSelfID()` function
 *   await selfID.set('basicProfile', { name: 'Alice' })
 * }
 * ```
 *
 * ## Re-exported classes
 *
 * - `EthereumAuthProvider` from 3ID Connect
 *
 * @module web
 */

export { EthereumAuthProvider } from '@3id/connect'
export type { EthereumProvider } from '@3id/connect'

export * from './client.js'
export * from './self.js'
