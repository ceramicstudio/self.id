# Class: PublicID<ModelTypes, Alias\>

[core](../modules/core.md).PublicID

```sh
import { PublicID } from '@self.id/core'
```

## Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends [`CoreModelTypes`](../modules/core.md#coremodeltypes)[`CoreModelTypes`](../modules/core.md#coremodeltypes) |
| `Alias` | extends keyof `ModelTypes`[``"definitions"``]keyof `ModelTypes`[``"definitions"``] |

## Constructors

### constructor

• **new PublicID**<`ModelTypes`, `Alias`\>(`params`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends [`CoreModelTypes`](../modules/core.md#coremodeltypes)[`CoreModelTypes`](../modules/core.md#coremodeltypes) |
| `Alias` | extends `string` \| `number` \| `symbol`keyof `ModelTypes`[``"definitions"``] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`PublicIDParams`](../modules/core.md#publicidparams)<`ModelTypes`\> |

## Accessors

### id

• `get` **id**(): `string`

#### Returns

`string`

## Methods

### get

▸ **get**<`Key`, `ContentType`\>(`key`): `Promise`<``null`` \| `ContentType`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Key` | extends `string` \| `number` \| `symbol` |
| `ContentType` | `DefinitionContentType`<`ModelTypes`, `Key`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `Key` |

#### Returns

`Promise`<``null`` \| `ContentType`\>
