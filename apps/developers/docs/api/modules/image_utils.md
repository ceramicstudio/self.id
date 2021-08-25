---
id: "image_utils"
title: "Module: image-utils"
sidebar_label: "image-utils"
sidebar_position: 0
custom_edit_url: null
---

Image utilities APIs

```sh
npm install @self.id/image-utils
```

## Type aliases

### LinkData

Ƭ **LinkData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Name` | `string` |
| `Hash` | `string` |
| `Size` | `number` |

___

### Dimensions

Ƭ **Dimensions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `height` | `number` |
| `width` | `number` |

___

### SizedImage

Ƭ **SizedImage**: [`Dimensions`](image_utils.md#dimensions) & { `blob`: `Blob`  }

___

### SizeMode

Ƭ **SizeMode**: ``"contain"`` \| ``"cover"``

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
