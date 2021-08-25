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

## Type aliases

### CoreModelTypes

Ƭ **CoreModelTypes**: `ModelTypeAliases`<`Object`, `Object`\>

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
| `ceramic` | [`CeramicNetwork`](core.md#ceramicnetwork) \| `string` |
| `model?` | `ModelTypes` |

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

___

### CeramicNetwork

Ƭ **CeramicNetwork**: ``"local"`` \| ``"mainnet-gateway"`` \| ``"testnet-clay"`` \| ``"testnet-clay-gateway"``

## Variables

### CERAMIC\_URLS

• `Const` **CERAMIC\_URLS**: `Record`<[`CeramicNetwork`](core.md#ceramicnetwork), `string`\>

## Functions

### isCAIP10string

▸ **isCAIP10string**(`account`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `account` | `string` |

#### Returns

`boolean`
