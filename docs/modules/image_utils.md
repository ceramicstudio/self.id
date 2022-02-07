# Module: image-utils

Image utilities for Self.ID profiles.

## Purpose

The `image-utils` module provides various utility functions for images, such as selecting the
most suitable format among sources, resizing and uploading, and is mostly meant to be used in a Web
browser context.

## Installation

```sh
npm install @self.id/image-utils
```

## Common use-cases

### Resize and upload an image to multiple dimensions

Using a [`SelfID`](../classes/web.SelfID.md) instance from the [`web`](web.md) module.

```ts
import { uploadImage } from '@self.id/image-utils'

// The `file` argument must implement the File interface from
// https://developer.mozilla.org/en-US/docs/Web/API/File
async function setProfileImage(selfID, file) {
  const imageSources = await uploadFile(
    'https://ipfs.infura.io:5001/api/v0',
    file,
    [{ width: 60, height: 60 }, { width: 200, height: 200 }],
  )
  // Here `selfID` must be an instance of `SelfID` from the `web` module
  await selfID.merge({ image: imageSources })
}
```

### Get the most suitable image source for given dimensions

Using a [`Core`](../classes/core.Core.md) instance from the [`core`](core.md) module.

```ts
import { Core } from '@self.id/core'
import { selectImageSource } from '@self.id/image-utils'

const core = new Core({ ceramic: 'testnet-clay' })

async function getAvatarSource(did) {
  const profile = await core.get('basicProfile', did)
  return profile?.image ? selectImageSource(profile.image, { width: 60, height: 60 }) : null
}
```

## Type aliases

### Dimensions

Ƭ **Dimensions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `height` | `number` |
| `width` | `number` |

___

### LinkData

Ƭ **LinkData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Hash` | `string` |
| `Name` | `string` |
| `Size` | `number` |

___

### SizeMode

Ƭ **SizeMode**: ``"contain"`` \| ``"cover"``

___

### SizedImage

Ƭ **SizedImage**: [`Dimensions`](image_utils.md#dimensions) & { `blob`: `Blob`  }

## Functions

### getDimensions

▸ **getDimensions**(`image`, `dimensions?`, `mode?`): [`Dimensions`](image_utils.md#dimensions)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `image` | `HTMLImageElement` | `undefined` |
| `dimensions` | [`Dimensions`](image_utils.md#dimensions) | `DEFAULT_DIMENSIONS` |
| `mode` | [`SizeMode`](image_utils.md#sizemode) | `'cover'` |

#### Returns

[`Dimensions`](image_utils.md#dimensions)

___

### loadImage

▸ **loadImage**(`blob`): `Promise`<`HTMLImageElement`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `blob` | `Blob` |

#### Returns

`Promise`<`HTMLImageElement`\>

___

### resizeImageElement

▸ **resizeImageElement**(`type`, `image`, `dimensions?`, `mode?`): `Promise`<[`SizedImage`](image_utils.md#sizedimage)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `image` | `HTMLImageElement` |
| `dimensions?` | [`Dimensions`](image_utils.md#dimensions) |
| `mode?` | [`SizeMode`](image_utils.md#sizemode) |

#### Returns

`Promise`<[`SizedImage`](image_utils.md#sizedimage)\>

___

### selectImageSource

▸ **selectImageSource**(`sources`, `dimensions`, `mode?`): `ImageMetadata`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `sources` | `ImageSources` | `undefined` |
| `dimensions` | [`Dimensions`](image_utils.md#dimensions) | `undefined` |
| `mode` | [`SizeMode`](image_utils.md#sizemode) | `'cover'` |

#### Returns

`ImageMetadata`

___

### uploadFile

▸ **uploadFile**(`url`, `blob`, `fileName?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `blob` | `Blob` |
| `fileName?` | `string` |

#### Returns

`Promise`<`string`\>

___

### uploadImage

▸ **uploadImage**(`url`, `file`, `sizes?`): `Promise`<`ImageSources`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `url` | `string` | `undefined` |
| `file` | `File` | `undefined` |
| `sizes` | [`Dimensions`](image_utils.md#dimensions)[] | `[]` |

#### Returns

`Promise`<`ImageSources`\>

___

### uploadResizedImage

▸ **uploadResizedImage**(`url`, `type`, `image`, `dimensions?`): `Promise`<`ImageMetadata`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `type` | `string` |
| `image` | `HTMLImageElement` |
| `dimensions?` | [`Dimensions`](image_utils.md#dimensions) |

#### Returns

`Promise`<`ImageMetadata`\>
