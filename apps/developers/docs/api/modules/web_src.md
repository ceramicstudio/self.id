---
id: "web_src"
title: "Module: web/src"
sidebar_label: "web/src"
sidebar_position: 0
custom_edit_url: null
---

## Classes

- [Core](../classes/web_src.Core.md)
- [EthereumAuthProvider](../classes/web_src.EthereumAuthProvider.md)
- [IdentityLink](../classes/web_src.IdentityLink.md)
- [PublicID](../classes/web_src.PublicID.md)
- [SelfID](../classes/web_src.SelfID.md)
- [WebClient](../classes/web_src.WebClient.md)

## Interfaces

- [EthereumProvider](../interfaces/web_src.EthereumProvider.md)

## References

### AlsoKnownAs

Re-exports: [AlsoKnownAs](../interfaces/universal_src.AlsoKnownAs.md)

___

### AlsoKnownAsAccount

Re-exports: [AlsoKnownAsAccount](../interfaces/universal_src.AlsoKnownAsAccount.md)

___

### BasicProfile

Re-exports: [BasicProfile](../interfaces/universal_src.BasicProfile.md)

___

### ImageMetadata

Re-exports: [ImageMetadata](../interfaces/universal_src.ImageMetadata.md)

___

### ImageSources

Re-exports: [ImageSources](../interfaces/universal_src.ImageSources.md)

___

### isDIDstring

Re-exports: [isDIDstring](universal_src.md#isdidstring)

## Type aliases

### AppNetwork

Ƭ **AppNetwork**: [`ConnectNetwork`](web_src.md#connectnetwork) \| ``"local-clay"``

#### Defined in

self.id/packages/universal/dist/config.d.ts:2

___

### AttestationResponse

Ƭ **AttestationResponse**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | `Object` |
| `data.attestation` | `string` |
| `status` | `string` |

#### Defined in

[self.id/packages/web/src/identity-link.ts:49](https://github.com/ceramicstudio/self.id/blob/ba95ea3/packages/web/src/identity-link.ts#L49)

___

### ChallengeResponse

Ƭ **ChallengeResponse**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | `Object` |
| `data.challengeCode` | `string` |
| `status` | `string` |

#### Defined in

[self.id/packages/web/src/identity-link.ts:56](https://github.com/ceramicstudio/self.id/blob/ba95ea3/packages/web/src/identity-link.ts#L56)

___

### ConfigURLs

Ƭ **ConfigURLs**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ceramic` | `string` |
| `connectNetwork` | [`ConnectNetwork`](web_src.md#connectnetwork) |
| `verificationsServer?` | `string` |

#### Defined in

self.id/packages/universal/dist/config.d.ts:3

___

### ConnectNetwork

Ƭ **ConnectNetwork**: ``"local"`` \| ``"dev-unstable"`` \| ``"testnet-clay"`` \| ``"mainnet"``

#### Defined in

self.id/packages/universal/dist/config.d.ts:1

___

### Dimensions

Ƭ **Dimensions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `height` | `number` |
| `width` | `number` |

#### Defined in

self.id/packages/universal/dist/images.d.ts:2

___

### Identifyable

Ƭ **Identifyable**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `getProfile` | () => `Promise`<``null`` \| [`BasicProfile`](../interfaces/universal_src.BasicProfile.md)\> |
| `getSocialAccounts` | () => `Promise`<[`AlsoKnownAsAccount`](../interfaces/universal_src.AlsoKnownAsAccount.md)[]\> |

#### Defined in

self.id/packages/universal/dist/types.d.ts:5

___

### LinkData

Ƭ **LinkData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Hash` | `string` |
| `Name` | `string` |
| `Size` | `number` |

#### Defined in

[self.id/packages/web/src/ipfs.ts:3](https://github.com/ceramicstudio/self.id/blob/ba95ea3/packages/web/src/ipfs.ts#L3)

___

### SizeMode

Ƭ **SizeMode**: ``"contain"`` \| ``"cover"``

#### Defined in

self.id/packages/universal/dist/images.d.ts:6

___

### SizedImage

Ƭ **SizedImage**: [`Dimensions`](web_src.md#dimensions) & { `blob`: `Blob`  }

#### Defined in

[self.id/packages/web/src/image-utils.ts:9](https://github.com/ceramicstudio/self.id/blob/ba95ea3/packages/web/src/image-utils.ts#L9)

## Variables

### GITHUB\_HOST

• `Const` **GITHUB\_HOST**: ``"github.com"``

#### Defined in

self.id/packages/universal/dist/constants.d.ts:4

___

### IPFS\_API\_URL

• `Const` **IPFS\_API\_URL**: ``"https://ipfs.infura.io:5001/api/v0"``

#### Defined in

self.id/packages/universal/dist/constants.d.ts:1

___

### IPFS\_PREFIX

• `Const` **IPFS\_PREFIX**: ``"ipfs://"``

#### Defined in

self.id/packages/universal/dist/constants.d.ts:3

___

### IPFS\_URL

• `Const` **IPFS\_URL**: ``"https://ipfs.infura.io/ipfs/"``

#### Defined in

self.id/packages/universal/dist/constants.d.ts:2

___

### TWITTER\_HOST

• `Const` **TWITTER\_HOST**: ``"twitter.com"``

#### Defined in

self.id/packages/universal/dist/constants.d.ts:5

## Functions

### getConfig

▸ **getConfig**(`network`): [`ConfigURLs`](web_src.md#configurls)

#### Parameters

| Name | Type |
| :------ | :------ |
| `network` | [`AppNetwork`](web_src.md#appnetwork) |

#### Returns

[`ConfigURLs`](web_src.md#configurls)

#### Defined in

self.id/packages/universal/dist/config.d.ts:8

___

### getDimensions

▸ **getDimensions**(`image`, `dimensions?`, `mode?`): [`Dimensions`](web_src.md#dimensions)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `image` | `HTMLImageElement` | `undefined` |
| `dimensions` | [`Dimensions`](web_src.md#dimensions) | `undefined` |
| `mode` | [`SizeMode`](web_src.md#sizemode) | `'cover'` |

#### Returns

[`Dimensions`](web_src.md#dimensions)

#### Defined in

[self.id/packages/web/src/image-utils.ts:16](https://github.com/ceramicstudio/self.id/blob/ba95ea3/packages/web/src/image-utils.ts#L16)

___

### getImageSrc

▸ **getImageSrc**(`sources`, `dimensions`, `mode?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `sources` | [`ImageSources`](../interfaces/universal_src.ImageSources.md) |
| `dimensions` | [`Dimensions`](web_src.md#dimensions) |
| `mode?` | [`SizeMode`](web_src.md#sizemode) |

#### Returns

`string`

#### Defined in

self.id/packages/universal/dist/images.d.ts:9

___

### isCAIP10string

▸ **isCAIP10string**(`account`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `account` | `string` |

#### Returns

`boolean`

#### Defined in

self.id/packages/universal/dist/utils.d.ts:2

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

[self.id/packages/web/src/image-utils.ts:37](https://github.com/ceramicstudio/self.id/blob/ba95ea3/packages/web/src/image-utils.ts#L37)

___

### resizeImageElement

▸ **resizeImageElement**(`type`, `image`, `dimensions?`, `mode?`): `Promise`<[`SizedImage`](web_src.md#sizedimage)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `image` | `HTMLImageElement` |
| `dimensions?` | [`Dimensions`](web_src.md#dimensions) |
| `mode?` | [`SizeMode`](web_src.md#sizemode) |

#### Returns

`Promise`<[`SizedImage`](web_src.md#sizedimage)\>

#### Defined in

[self.id/packages/web/src/image-utils.ts:62](https://github.com/ceramicstudio/self.id/blob/ba95ea3/packages/web/src/image-utils.ts#L62)

___

### selectImageSource

▸ **selectImageSource**(`sources`, `dimensions`, `mode?`): [`ImageMetadata`](../interfaces/universal_src.ImageMetadata.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `sources` | [`ImageSources`](../interfaces/universal_src.ImageSources.md) |
| `dimensions` | [`Dimensions`](web_src.md#dimensions) |
| `mode?` | [`SizeMode`](web_src.md#sizemode) |

#### Returns

[`ImageMetadata`](../interfaces/universal_src.ImageMetadata.md)

#### Defined in

self.id/packages/universal/dist/images.d.ts:7

___

### toImageSrc

▸ **toImageSrc**(`image`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `image` | [`ImageMetadata`](../interfaces/universal_src.ImageMetadata.md) |

#### Returns

`string`

#### Defined in

self.id/packages/universal/dist/images.d.ts:8

___

### uploadFile

▸ **uploadFile**(`blob`, `fileName?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `blob` | `Blob` |
| `fileName?` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[self.id/packages/web/src/ipfs.ts:9](https://github.com/ceramicstudio/self.id/blob/ba95ea3/packages/web/src/ipfs.ts#L9)

___

### uploadImage

▸ **uploadImage**(`file`, `sizes?`): `Promise`<[`ImageSources`](../interfaces/universal_src.ImageSources.md)\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `file` | `File` | `undefined` |
| `sizes` | [`Dimensions`](web_src.md#dimensions)[] | `[]` |

#### Returns

`Promise`<[`ImageSources`](../interfaces/universal_src.ImageSources.md)\>

#### Defined in

[self.id/packages/web/src/image-utils.ts:94](https://github.com/ceramicstudio/self.id/blob/ba95ea3/packages/web/src/image-utils.ts#L94)

___

### uploadResizedImage

▸ **uploadResizedImage**(`type`, `image`, `dimensions?`): `Promise`<[`ImageMetadata`](../interfaces/universal_src.ImageMetadata.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `image` | `HTMLImageElement` |
| `dimensions?` | [`Dimensions`](web_src.md#dimensions) |

#### Returns

`Promise`<[`ImageMetadata`](../interfaces/universal_src.ImageMetadata.md)\>

#### Defined in

[self.id/packages/web/src/image-utils.ts:78](https://github.com/ceramicstudio/self.id/blob/ba95ea3/packages/web/src/image-utils.ts#L78)
