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

## Functions

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

### getConfig

▸ **getConfig**(`network`): [`ConfigURLs`](core.md#configurls)

#### Parameters

| Name | Type |
| :------ | :------ |
| `network` | [`AppNetwork`](core.md#appnetwork) |

#### Returns

[`ConfigURLs`](core.md#configurls)

#### Defined in

[self.id/packages/core/src/config.ts:26](https://github.com/ceramicstudio/self.id/blob/356cc44/packages/core/src/config.ts#L26)

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

[self.id/packages/core/src/utils.ts:5](https://github.com/ceramicstudio/self.id/blob/356cc44/packages/core/src/utils.ts#L5)

## Type aliases

### CoreModelTypes

Ƭ **CoreModelTypes**: `ModelTypeAliases`<`Object`, `Object`\>

#### Defined in

[self.id/packages/core/src/__generated__/model.ts:7](https://github.com/ceramicstudio/self.id/blob/356cc44/packages/core/src/__generated__/model.ts#L7)

___

### CoreParams

Ƭ **CoreParams**<`ModelTypes`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends [`CoreModelTypes`](core.md#coremodeltypes)[`CoreModelTypes`](core.md#coremodeltypes) |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `network` | [`AppNetwork`](core.md#appnetwork) |
| `model?` | `ModelTypes` |

#### Defined in

[self.id/packages/core/src/core.ts:15](https://github.com/ceramicstudio/self.id/blob/356cc44/packages/core/src/core.ts#L15)

___

### PublicIDParams

Ƭ **PublicIDParams**<`ModelTypes`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends [`CoreModelTypes`](core.md#coremodeltypes)[`CoreModelTypes`](core.md#coremodeltypes) |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `core` | [`Core`](../classes/core.Core.md)<`ModelTypes`\> |
| `id` | `string` |

#### Defined in

[self.id/packages/core/src/public.ts:6](https://github.com/ceramicstudio/self.id/blob/356cc44/packages/core/src/public.ts#L6)

___

### ConnectNetwork

Ƭ **ConnectNetwork**: ``"local"`` \| ``"dev-unstable"`` \| ``"testnet-clay"`` \| ``"mainnet"``

#### Defined in

[self.id/packages/core/src/types.ts:3](https://github.com/ceramicstudio/self.id/blob/356cc44/packages/core/src/types.ts#L3)

___

### AppNetwork

Ƭ **AppNetwork**: [`ConnectNetwork`](core.md#connectnetwork) \| ``"local-clay"``

#### Defined in

[self.id/packages/core/src/types.ts:5](https://github.com/ceramicstudio/self.id/blob/356cc44/packages/core/src/types.ts#L5)

___

### ConfigURLs

Ƭ **ConfigURLs**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ceramic` | `string` |
| `connectNetwork` | [`ConnectNetwork`](core.md#connectnetwork) |

#### Defined in

[self.id/packages/core/src/types.ts:7](https://github.com/ceramicstudio/self.id/blob/356cc44/packages/core/src/types.ts#L7)
