# Module: core

Core APIs

```sh
npm install @self.id/core
```

## Classes

- [Core](../classes/core.Core.md)
- [PublicID](../classes/core.PublicID.md)

## Type aliases

### AppNetwork

Ƭ **AppNetwork**: [`ConnectNetwork`](core.md#connectnetwork) \| ``"local-clay"``

___

### ConfigURLs

Ƭ **ConfigURLs**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ceramic` | `string` |
| `connectNetwork` | [`ConnectNetwork`](core.md#connectnetwork) |

___

### ConnectNetwork

Ƭ **ConnectNetwork**: ``"local"`` \| ``"dev-unstable"`` \| ``"testnet-clay"`` \| ``"mainnet"``

___

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
| `model?` | `ModelTypes` |
| `network` | [`AppNetwork`](core.md#appnetwork) |

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

## Functions

### getConfig

▸ **getConfig**(`network`): [`ConfigURLs`](core.md#configurls)

#### Parameters

| Name | Type |
| :------ | :------ |
| `network` | [`AppNetwork`](core.md#appnetwork) |

#### Returns

[`ConfigURLs`](core.md#configurls)

___

### isCAIP10string

▸ **isCAIP10string**(`account`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `account` | `string` |

#### Returns

`boolean`

___

### isDIDstring

▸ **isDIDstring**(`did`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |

#### Returns

`boolean`
