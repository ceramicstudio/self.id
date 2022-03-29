export type { ImageMetadata, ImageSources } from '@datamodels/identity-profile-basic'

export type Dimensions = { height: number; width: number }

export type SizedImage = Dimensions & { blob: Blob }

/**
 * Image size modes:
 *
 * - "contain" = the image fits in the container
 * - "cover" = the image fills the container
 */
export type SizeMode = 'contain' | 'cover'
