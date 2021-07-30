---
id: "core"
title: "Module: core"
sidebar_label: "core"
sidebar_position: 0
custom_edit_url: null
---

Core APIs

```sh
npm install @self.id/core
```

## Classes

- [Core](../classes/core.Core.md)
- [PublicID](../classes/core.PublicID.md)

## Interfaces

- [AlsoKnownAs](../interfaces/core.AlsoKnownAs.md)
- [AlsoKnownAsAccount](../interfaces/core.AlsoKnownAsAccount.md)
- [BasicProfile](../interfaces/core.BasicProfile.md)
- [ImageMetadata](../interfaces/core.ImageMetadata.md)
- [ImageSources](../interfaces/core.ImageSources.md)

## Type aliases

### AppNetwork

Ƭ **AppNetwork**: [`ConnectNetwork`](core.md#connectnetwork) \| ``"local-clay"``

#### Defined in

[self.id/packages/core/src/config.ts:3](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/core/src/config.ts#L3)

___

### ConfigURLs

Ƭ **ConfigURLs**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ceramic` | `string` |
| `connectNetwork` | [`ConnectNetwork`](core.md#connectnetwork) |
| `verificationsServer?` | `string` |

#### Defined in

[self.id/packages/core/src/config.ts:5](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/core/src/config.ts#L5)

___

### ConnectNetwork

Ƭ **ConnectNetwork**: ``"local"`` \| ``"dev-unstable"`` \| ``"testnet-clay"`` \| ``"mainnet"``

#### Defined in

[self.id/packages/core/src/config.ts:1](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/core/src/config.ts#L1)

___

### Dimensions

Ƭ **Dimensions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `height` | `number` |
| `width` | `number` |

#### Defined in

[self.id/packages/core/src/images.ts:4](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/core/src/images.ts#L4)

___

### Identifyable

Ƭ **Identifyable**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `getProfile` | () => `Promise`<``null`` \| [`BasicProfile`](../interfaces/core.BasicProfile.md)\> |
| `getSocialAccounts` | () => `Promise`<[`AlsoKnownAsAccount`](../interfaces/core.AlsoKnownAsAccount.md)[]\> |

#### Defined in

[self.id/packages/core/src/types.ts:10](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/core/src/types.ts#L10)

___

### SizeMode

Ƭ **SizeMode**: ``"contain"`` \| ``"cover"``

#### Defined in

[self.id/packages/core/src/images.ts:5](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/core/src/images.ts#L5)

## Variables

### GITHUB\_HOST

• `Const` **GITHUB\_HOST**: ``"github.com"``

#### Defined in

[self.id/packages/core/src/constants.ts:5](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/core/src/constants.ts#L5)

___

### IPFS\_API\_URL

• `Const` **IPFS\_API\_URL**: ``"https://ipfs.infura.io:5001/api/v0"``

#### Defined in

[self.id/packages/core/src/constants.ts:1](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/core/src/constants.ts#L1)

___

### IPFS\_PREFIX

• `Const` **IPFS\_PREFIX**: ``"ipfs://"``

#### Defined in

[self.id/packages/core/src/constants.ts:3](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/core/src/constants.ts#L3)

___

### IPFS\_URL

• `Const` **IPFS\_URL**: ``"https://ipfs.infura.io/ipfs/"``

#### Defined in

[self.id/packages/core/src/constants.ts:2](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/core/src/constants.ts#L2)

___

### TWITTER\_HOST

• `Const` **TWITTER\_HOST**: ``"twitter.com"``

#### Defined in

[self.id/packages/core/src/constants.ts:6](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/core/src/constants.ts#L6)

## Functions

### getConfig

▸ **getConfig**(`network`): [`ConfigURLs`](core.md#configurls)

#### Parameters

| Name | Type |
| :------ | :------ |
| `network` | [`AppNetwork`](core.md#appnetwork) |

#### Returns

[`ConfigURLs`](core.md#configurls)

#### Defined in

[self.id/packages/core/src/config.ts:37](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/core/src/config.ts#L37)

___

### getImageSrc

▸ **getImageSrc**(`sources`, `dimensions`, `mode?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `sources` | [`ImageSources`](../interfaces/core.ImageSources.md) |
| `dimensions` | [`Dimensions`](core.md#dimensions) |
| `mode?` | [`SizeMode`](core.md#sizemode) |

#### Returns

`string`

#### Defined in

[self.id/packages/core/src/images.ts:64](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/core/src/images.ts#L64)

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

[self.id/packages/core/src/utils.ts:5](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/core/src/utils.ts#L5)

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

▸ **selectImageSource**(`sources`, `dimensions`, `mode?`): [`ImageMetadata`](../interfaces/core.ImageMetadata.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `sources` | [`ImageSources`](../interfaces/core.ImageSources.md) | `undefined` |
| `dimensions` | [`Dimensions`](core.md#dimensions) | `undefined` |
| `mode` | [`SizeMode`](core.md#sizemode) | `'cover'` |

#### Returns

[`ImageMetadata`](../interfaces/core.ImageMetadata.md)

#### Defined in

[self.id/packages/core/src/images.ts:45](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/core/src/images.ts#L45)

___

### toImageSrc

▸ **toImageSrc**(`image`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `image` | [`ImageMetadata`](../interfaces/core.ImageMetadata.md) |

#### Returns

`string`

#### Defined in

[self.id/packages/core/src/images.ts:60](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/core/src/images.ts#L60)
