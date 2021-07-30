---
id: "web"
title: "Module: web"
sidebar_label: "web"
sidebar_position: 0
custom_edit_url: null
---

Web-only APIs

```sh
npm install @self.id/web
```

## Classes

- [EthereumAuthProvider](../classes/web.EthereumAuthProvider.md)
- [IdentityLink](../classes/web.IdentityLink.md)
- [SelfID](../classes/web.SelfID.md)
- [WebClient](../classes/web.WebClient.md)

## Interfaces

- [EthereumProvider](../interfaces/web.EthereumProvider.md)

## Type aliases

### AttestationResponse

Ƭ **AttestationResponse**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | `Object` |
| `data.attestation` | `string` |
| `status` | `string` |

#### Defined in

[self.id/packages/web/src/identity-link.ts:49](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/web/src/identity-link.ts#L49)

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

[self.id/packages/web/src/identity-link.ts:56](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/web/src/identity-link.ts#L56)

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

[self.id/packages/web/src/ipfs.ts:3](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/web/src/ipfs.ts#L3)

___

### SizedImage

Ƭ **SizedImage**: `Dimensions` & { `blob`: `Blob`  }

#### Defined in

[self.id/packages/web/src/image-utils.ts:9](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/web/src/image-utils.ts#L9)

## Functions

### getDimensions

▸ **getDimensions**(`image`, `dimensions?`, `mode?`): `Dimensions`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `image` | `HTMLImageElement` | `undefined` |
| `dimensions` | `Dimensions` | `undefined` |
| `mode` | `SizeMode` | `'cover'` |

#### Returns

`Dimensions`

#### Defined in

[self.id/packages/web/src/image-utils.ts:16](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/web/src/image-utils.ts#L16)

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

[self.id/packages/web/src/image-utils.ts:37](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/web/src/image-utils.ts#L37)

___

### resizeImageElement

▸ **resizeImageElement**(`type`, `image`, `dimensions?`, `mode?`): `Promise`<[`SizedImage`](web.md#sizedimage)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `image` | `HTMLImageElement` |
| `dimensions?` | `Dimensions` |
| `mode?` | `SizeMode` |

#### Returns

`Promise`<[`SizedImage`](web.md#sizedimage)\>

#### Defined in

[self.id/packages/web/src/image-utils.ts:62](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/web/src/image-utils.ts#L62)

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

[self.id/packages/web/src/ipfs.ts:9](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/web/src/ipfs.ts#L9)

___

### uploadImage

▸ **uploadImage**(`file`, `sizes?`): `Promise`<[`ImageSources`](../interfaces/core.ImageSources.md)\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `file` | `File` | `undefined` |
| `sizes` | `Dimensions`[] | `[]` |

#### Returns

`Promise`<[`ImageSources`](../interfaces/core.ImageSources.md)\>

#### Defined in

[self.id/packages/web/src/image-utils.ts:94](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/web/src/image-utils.ts#L94)

___

### uploadResizedImage

▸ **uploadResizedImage**(`type`, `image`, `dimensions?`): `Promise`<[`ImageMetadata`](../interfaces/core.ImageMetadata.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `image` | `HTMLImageElement` |
| `dimensions?` | `Dimensions` |

#### Returns

`Promise`<[`ImageMetadata`](../interfaces/core.ImageMetadata.md)\>

#### Defined in

[self.id/packages/web/src/image-utils.ts:78](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/web/src/image-utils.ts#L78)
