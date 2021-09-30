/**
 * Framework
 *
 * ```sh
 * npm install @self.id/framework
 * ```
 *
 * @module framework
 */

// DataModels re-exports
export type { Account as AlsoKnownAsAccount, AlsoKnownAs } from '@datamodels/identity-accounts-web'
export type { BasicProfile } from '@datamodels/identity-profile-basic'

// SDK re-exports
export { Core, PublicID, isCAIP10string, isDIDstring } from '@self.id/core'
export { selectImageSource, uploadImage } from '@self.id/image-utils'
export type { Dimensions, ImageSources } from '@self.id/image-utils'
export {
  AuthenticatedContainer,
  RequestClient,
  getRequestCookie,
  getRequestViewerID,
  useAuthentication,
  useCore,
  usePublicRecord,
  useViewerID,
  useViewerRecord,
} from '@self.id/react'
export type {
  AuthenticatedContainerProps,
  AuthenticationState,
  RequestState,
  PublicRecord,
  ViewerRecord,
} from '@self.id/react'
export { EthereumAuthProvider, SelfID } from '@self.id/web'
export type { ConnectNetwork, EthereumProvider } from '@self.id/web'

// Local exports
export { Provider } from './components/Provider'
export type { ProviderProps } from './components/Provider'
export { theme } from './theme'
