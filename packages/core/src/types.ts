/** Default model types provided by the Self.ID SDK. */
export type { ModelTypes as CoreModelTypes } from './__generated__/model.js'

/**
 * Configured Ceramic endpoints:
 *
 * - "local" -> http://localhost:7007
 * - "mainnet-gateway" -> https://gateway.ceramic.network (read-only)
 * - "testnet-clay" -> https://ceramic-clay.3boxlabs.com
 * - "testnet-clay-gateway" -> https://gateway-clay.ceramic.network (read-only)
 */
export type CeramicNetwork = 'local' | 'mainnet-gateway' | 'testnet-clay' | 'testnet-clay-gateway'
