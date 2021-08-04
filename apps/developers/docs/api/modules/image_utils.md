---
id: "image_utils"
title: "Module: image-utils"
sidebar_label: "image-utils"
sidebar_position: 0
custom_edit_url: null
---

Image utils APIs

```sh
npm install @self.id/image-utils
```

## Interfaces

- [ImageSources](../interfaces/image_utils.ImageSources.md)
- [ImageMetadata](../interfaces/image_utils.ImageMetadata.md)

## Type aliases

### LinkData

Ƭ **LinkData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Name` | `string` |
| `Hash` | `string` |
| `Size` | `number` |

#### Defined in

self.id/packages/image-utils/src/ipfs.ts:1

___

### Dimensions

Ƭ **Dimensions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `height` | `number` |
| `width` | `number` |

#### Defined in

self.id/packages/image-utils/src/types.ts:3

___

### SizedImage

Ƭ **SizedImage**: [`Dimensions`](image_utils.md#dimensions) & { `blob`: `Blob`  }

#### Defined in

self.id/packages/image-utils/src/types.ts:5

___

### SizeMode

Ƭ **SizeMode**: ``"contain"`` \| ``"cover"``

#### Defined in

self.id/packages/image-utils/src/types.ts:7

## Functions

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

#### Defined in

self.id/packages/image-utils/src/ipfs.ts:7

___

### loadImage

▸ **loadImage**(`blob`): `Promise`<`HTMLImageElement`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `blob` | `Blob` |

#### Returns

`Promise`<`HTMLImageElement`\>

#### Defined in

self.id/packages/image-utils/src/loading.ts:9

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

#### Defined in

self.id/packages/image-utils/src/loading.ts:34

___

### uploadResizedImage

▸ **uploadResizedImage**(`url`, `type`, `image`, `dimensions?`): `Promise`<[`ImageMetadata`](../interfaces/image_utils.ImageMetadata.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `type` | `string` |
| `image` | `HTMLImageElement` |
| `dimensions?` | [`Dimensions`](image_utils.md#dimensions) |

#### Returns

`Promise`<[`ImageMetadata`](../interfaces/image_utils.ImageMetadata.md)\>

#### Defined in

self.id/packages/image-utils/src/loading.ts:50

___

### uploadImage

▸ **uploadImage**(`url`, `file`, `sizes?`): `Promise`<[`ImageSources`](../interfaces/image_utils.ImageSources.md)\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `url` | `string` | `undefined` |
| `file` | `File` | `undefined` |
| `sizes` | [`Dimensions`](image_utils.md#dimensions)[] | `[]` |

#### Returns

`Promise`<[`ImageSources`](../interfaces/image_utils.ImageSources.md)\>

#### Defined in

self.id/packages/image-utils/src/loading.ts:67

___

### selectImageSource

▸ **selectImageSource**(`sources`, `dimensions`, `mode?`): [`ImageMetadata`](../interfaces/image_utils.ImageMetadata.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `sources` | [`ImageSources`](../interfaces/image_utils.ImageSources.md) | `undefined` |
| `dimensions` | [`Dimensions`](image_utils.md#dimensions) | `undefined` |
| `mode` | [`SizeMode`](image_utils.md#sizemode) | `'cover'` |

#### Returns

[`ImageMetadata`](../interfaces/image_utils.ImageMetadata.md)

#### Defined in

self.id/packages/image-utils/src/selection.ts:46

___

### getDimensions

▸ **getDimensions**(`image`, `dimensions?`, `mode?`): [`Dimensions`](image_utils.md#dimensions)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `image` | `HTMLImageElement` | `undefined` |
| `dimensions` | [`Dimensions`](image_utils.md#dimensions) | `undefined` |
| `mode` | [`SizeMode`](image_utils.md#sizemode) | `'cover'` |

#### Returns

[`Dimensions`](image_utils.md#dimensions)

#### Defined in

self.id/packages/image-utils/src/selection.ts:61
