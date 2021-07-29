---
id: "universal_src"
title: "Module: universal/src"
sidebar_label: "universal/src"
sidebar_position: 0
custom_edit_url: null
---

## Classes

- [Core](../classes/universal_src.Core.md)
- [PublicID](../classes/universal_src.PublicID.md)

## Interfaces

- [AlsoKnownAs](../interfaces/universal_src.AlsoKnownAs.md)
- [AlsoKnownAsAccount](../interfaces/universal_src.AlsoKnownAsAccount.md)
- [BasicProfile](../interfaces/universal_src.BasicProfile.md)
- [ImageMetadata](../interfaces/universal_src.ImageMetadata.md)
- [ImageSources](../interfaces/universal_src.ImageSources.md)

## Type aliases

### AppNetwork

Ƭ **AppNetwork**: [`ConnectNetwork`](universal_src.md#connectnetwork) \| ``"local-clay"``

#### Defined in

[self.id/packages/universal/src/config.ts:3](https://github.com/ceramicstudio/self.id/blob/ba95ea3/packages/universal/src/config.ts#L3)

___

### ConfigURLs

Ƭ **ConfigURLs**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ceramic` | `string` |
| `connectNetwork` | [`ConnectNetwork`](universal_src.md#connectnetwork) |
| `verificationsServer?` | `string` |

#### Defined in

[self.id/packages/universal/src/config.ts:5](https://github.com/ceramicstudio/self.id/blob/ba95ea3/packages/universal/src/config.ts#L5)

___

### ConnectNetwork

Ƭ **ConnectNetwork**: ``"local"`` \| ``"dev-unstable"`` \| ``"testnet-clay"`` \| ``"mainnet"``

#### Defined in

[self.id/packages/universal/src/config.ts:1](https://github.com/ceramicstudio/self.id/blob/ba95ea3/packages/universal/src/config.ts#L1)

___

### Dimensions

Ƭ **Dimensions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `height` | `number` |
| `width` | `number` |

#### Defined in

[self.id/packages/universal/src/images.ts:4](https://github.com/ceramicstudio/self.id/blob/ba95ea3/packages/universal/src/images.ts#L4)

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

[self.id/packages/universal/src/types.ts:10](https://github.com/ceramicstudio/self.id/blob/ba95ea3/packages/universal/src/types.ts#L10)

___

### SizeMode

Ƭ **SizeMode**: ``"contain"`` \| ``"cover"``

#### Defined in

[self.id/packages/universal/src/images.ts:5](https://github.com/ceramicstudio/self.id/blob/ba95ea3/packages/universal/src/images.ts#L5)

## Variables

### GITHUB\_HOST

• `Const` **GITHUB\_HOST**: ``"github.com"``

#### Defined in

[self.id/packages/universal/src/constants.ts:5](https://github.com/ceramicstudio/self.id/blob/ba95ea3/packages/universal/src/constants.ts#L5)

___

### IPFS\_API\_URL

• `Const` **IPFS\_API\_URL**: ``"https://ipfs.infura.io:5001/api/v0"``

#### Defined in

[self.id/packages/universal/src/constants.ts:1](https://github.com/ceramicstudio/self.id/blob/ba95ea3/packages/universal/src/constants.ts#L1)

___

### IPFS\_PREFIX

• `Const` **IPFS\_PREFIX**: ``"ipfs://"``

#### Defined in

[self.id/packages/universal/src/constants.ts:3](https://github.com/ceramicstudio/self.id/blob/ba95ea3/packages/universal/src/constants.ts#L3)

___

### IPFS\_URL

• `Const` **IPFS\_URL**: ``"https://ipfs.infura.io/ipfs/"``

#### Defined in

[self.id/packages/universal/src/constants.ts:2](https://github.com/ceramicstudio/self.id/blob/ba95ea3/packages/universal/src/constants.ts#L2)

___

### TWITTER\_HOST

• `Const` **TWITTER\_HOST**: ``"twitter.com"``

#### Defined in

[self.id/packages/universal/src/constants.ts:6](https://github.com/ceramicstudio/self.id/blob/ba95ea3/packages/universal/src/constants.ts#L6)

## Functions

### getConfig

▸ **getConfig**(`network`): [`ConfigURLs`](universal_src.md#configurls)

#### Parameters

| Name | Type |
| :------ | :------ |
| `network` | [`AppNetwork`](universal_src.md#appnetwork) |

#### Returns

[`ConfigURLs`](universal_src.md#configurls)

#### Defined in

[self.id/packages/universal/src/config.ts:37](https://github.com/ceramicstudio/self.id/blob/ba95ea3/packages/universal/src/config.ts#L37)

___

### getImageSrc

▸ **getImageSrc**(`sources`, `dimensions`, `mode?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `sources` | [`ImageSources`](../interfaces/universal_src.ImageSources.md) |
| `dimensions` | [`Dimensions`](universal_src.md#dimensions) |
| `mode?` | [`SizeMode`](universal_src.md#sizemode) |

#### Returns

`string`

#### Defined in

[self.id/packages/universal/src/images.ts:64](https://github.com/ceramicstudio/self.id/blob/ba95ea3/packages/universal/src/images.ts#L64)

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

self.id/packages/universal/src/utils.ts:5

___

### isDIDstring

▸ **isDIDstring**(`did`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |

#### Returns

`boolean`

#### Defined in

js-idx/packages/did-datastore/dist/utils.d.ts:1

___

### selectImageSource

▸ **selectImageSource**(`sources`, `dimensions`, `mode?`): [`ImageMetadata`](../interfaces/universal_src.ImageMetadata.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `sources` | [`ImageSources`](../interfaces/universal_src.ImageSources.md) | `undefined` |
| `dimensions` | [`Dimensions`](universal_src.md#dimensions) | `undefined` |
| `mode` | [`SizeMode`](universal_src.md#sizemode) | `'cover'` |

#### Returns

[`ImageMetadata`](../interfaces/universal_src.ImageMetadata.md)

#### Defined in

[self.id/packages/universal/src/images.ts:45](https://github.com/ceramicstudio/self.id/blob/ba95ea3/packages/universal/src/images.ts#L45)

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

[self.id/packages/universal/src/images.ts:60](https://github.com/ceramicstudio/self.id/blob/ba95ea3/packages/universal/src/images.ts#L60)
