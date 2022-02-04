/**
 * React UI theme and components.
 *
 * ## Purpose
 *
 * This module provides a shared theme and basic components based on the
 * [Grommet library](https://v2.grommet.io/). It is used by other modules of the SDK as well as
 * the [Self.ID reference application](https://self.id), and can be used by other applications to
 * implement a similar UI.
 *
 * ## Installation
 *
 * ```sh
 * npm install @self.id/ui
 * ```
 *
 * ## Common use-cases
 *
 * ### Configure the Provider
 *
 * The {@linkcode ui.Provider Provider} component must be added at the root of the
 * application tree in order to use the other component described below.
 *
 * ```ts
 * import { Provider } from '@self.id/ui'
 *
 * function App({ children }) {
 *   return <Provider>{children}</Provider>
 * }
 * ```
 *
 * ### Avatar placeholder
 *
 * The {@linkcode ui.AvatarPlaceholder AvatarPlaceholder} component is based on
 * [Boring Avatars](https://github.com/boringdesigners/boring-avatars) and used in the
 * [Self.ID application](https://self.id) to display a fallback placeholder for profiles without
 * a defined image.
 *
 * ```ts
 * import { AvatarPlaceholder } from '@self.id/ui'
 *
 * export function Avatar({ did }) {
 *   return <AvatarPlaceholder did={did} size={40} />
 * }
 * ```
 *
 * @module ui
 */

export { AvatarPlaceholder } from './components/AvatarPlaceholder.js'
export type { AvatarPlaceholderProps } from './components/AvatarPlaceholder.js'
export { Provider } from './components/Provider.js'
export type { ProviderProps } from './components/Provider.js'
export { colors, theme } from './theme.js'
export type { Colors, ColorType, ThemeType } from './theme.js'
