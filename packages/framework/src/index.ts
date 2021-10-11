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
  RequestClient,
  useCore,
  usePublicRecord,
  useViewerID,
  useViewerRecord,
} from '@self.id/react'
export type { RequestClientParams, RequestState, PublicRecord, ViewerRecord } from '@self.id/react'
export { AvatarPlaceholder, colors, theme } from '@self.id/ui'
export type { AvatarPlaceholderProps, Colors, ColorType, ThemeType } from '@self.id/ui'
export { EthereumAuthProvider, SelfID } from '@self.id/web'
export type { ConnectNetwork, EthereumProvider } from '@self.id/web'

// Local exports
export { ConnectedContainer } from './components/ConnectedContainer'
export type { ConnectedContainerProps } from './components/ConnectedContainer'
export { Provider } from './components/Provider'
export type { ProviderProps } from './components/Provider'
export { useConnection } from './hooks'
export type { ConnectOptions } from './hooks'
export type { ConnectionState } from './types'
