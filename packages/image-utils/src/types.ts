export type { ImageMetadata, ImageSources } from '@datamodels/identity-profile-basic'

export type Dimensions = { height: number; width: number }

export type SizedImage = Dimensions & { blob: Blob }

export type SizeMode = 'contain' | 'cover'
