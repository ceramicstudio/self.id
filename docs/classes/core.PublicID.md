# Class: PublicID<ModelTypes, Alias\>

[core](../modules/core.md).PublicID

A PublicID instance provides a client associated to a specific DID.

It is exported by the [`core`](../modules/core.md) module.

```sh
import { PublicID } from '@self.id/core'
```

## Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `ModelTypeAliases` = [`CoreModelTypes`](../modules/core.md#coremodeltypes) |
| `Alias` | extends keyof `ModelTypes`[``"definitions"``] = keyof `ModelTypes`[``"definitions"``] |

## Constructors

### constructor

• **new PublicID**<`ModelTypes`, `Alias`\>(`params`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `ModelTypeAliases`<`Record`<`string`, `any`\>, `Record`<`string`, `string`\>, `Record`<`string`, `string`\>\> = [`CoreModelTypes`](../modules/core.md#coremodeltypes) |
| `Alias` | extends `string` \| `number` \| `symbol` = keyof `ModelTypes`[``"definitions"``] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`PublicIDParams`](../modules/core.md#publicidparams)<`ModelTypes`\> |

## Accessors

### id

• `get` **id**(): `string`

DID string associated to the PublicID instance.

#### Returns

`string`

## Methods

### get

▸ **get**<`Key`, `ContentType`\>(`key`): `Promise`<``null`` \| `ContentType`\>

Load the record contents for a given definition alias.

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
