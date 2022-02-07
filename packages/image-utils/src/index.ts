/**
 * Image utilities for Self.ID profiles.
 *
 * ## Purpose
 *
 * The `image-utils` module provides various utility functions for images, such as selecting the
 * most suitable format among sources, resizing and uploading, and is mostly meant to be used in a
 * Web browser context.
 *
 * ## Installation
 *
 * ```sh
 * npm install @self.id/image-utils
 * ```
 *
 * ## Common use-cases
 *
 * ### Resize and upload an image to multiple dimensions
 *
 * Using a {@linkcode web.SelfID SelfID} instance from the {@linkcode web} module.
 *
 * ```ts
 * import { uploadImage } from '@self.id/image-utils'
 *
 * // The `file` argument must implement the File interface from
 * // https://developer.mozilla.org/en-US/docs/Web/API/File
 * async function setProfileImage(selfID, file) {
 *   const imageSources = await uploadFile(
 *     'https://ipfs.infura.io:5001/api/v0',
 *     file,
 *     [{ width: 60, height: 60 }, { width: 200, height: 200 }],
 *   )
 *   // Here `selfID` must be an instance of `SelfID` from the `web` module
 *   await selfID.merge({ image: imageSources })
 * }
 * ```
 *
 * ### Get the most suitable image source for given dimensions
 *
 * Using a {@linkcode core.Core Core} instance from the {@linkcode core} module.
 *
 * ```ts
 * import { Core } from '@self.id/core'
 * import { selectImageSource } from '@self.id/image-utils'
 *
 * const core = new Core({ ceramic: 'testnet-clay' })
 *
 * async function getAvatarSource(did) {
 *   const profile = await core.get('basicProfile', did)
 *   return profile?.image ? selectImageSource(profile.image, { width: 60, height: 60 }) : null
 * }
 * ```
 *
 * @module image-utils
 */

export * from './ipfs.js'
export * from './loading.js'
export * from './selection.js'
export * from './types.js'
