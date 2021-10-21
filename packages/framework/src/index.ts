/**
 * Framework APIs
 *
 * ```sh
 * npm install @self.id/framework
 * ```
 *
 * ## Re-exported classes
 *
 * - {@linkcode core.Core}
 * - {@linkcode core.PublicID}
 * - {@linkcode react.RequestClient}
 * - {@linkcode web.SelfID}
 * - `web.EthereumAuthProvider`
 *
 * ## Re-exported components
 *
 * - {@linkcode ui.AvatarPlaceholder}
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
export { RequestClient } from '@self.id/react'
/** @ignore */
export { AvatarPlaceholder } from '@self.id/ui'
/** @ignore */
export type { AvatarPlaceholderProps } from '@self.id/ui'
/** @ignore */
export { EthereumAuthProvider, SelfID } from '@self.id/web'

// Documented SDK re-exports
export { isCAIP10string, isDIDstring } from '@self.id/core'
export { selectImageSource, uploadImage } from '@self.id/image-utils'
export type { Dimensions, ImageSources } from '@self.id/image-utils'
export { useCore, usePublicRecord, useViewerID, useViewerRecord } from '@self.id/react'
export type { RequestClientParams, RequestState, PublicRecord, ViewerRecord } from '@self.id/react'
export { colors, theme } from '@self.id/ui'
export type { Colors, ColorType, ThemeType } from '@self.id/ui'
export type { ConnectNetwork, EthereumProvider } from '@self.id/web'

// Local exports
export { ConnectedContainer } from './components/ConnectedContainer'
export type { ConnectedContainerProps } from './components/ConnectedContainer'
export { Provider } from './components/Provider'
export type { ProviderProps } from './components/Provider'
export { useConnection } from './hooks'
export type { ConnectOptions } from './hooks'
export type { ConnectionState } from './types'
