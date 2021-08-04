export type { ImageMetadata, ImageSources } from '@datamodels/self.id-profile'

export type Dimensions = { height: number; width: number }

export type SizedImage = Dimensions & { blob: Blob }

export type SizeMode = 'contain' | 'cover'
