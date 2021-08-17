# Class: Core<ModelTypes, Alias\>

[core](../modules/core.md).Core

```sh
import { Core } from '@self.id/core'
```

## Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends [`CoreModelTypes`](../modules/core.md#coremodeltypes)[`CoreModelTypes`](../modules/core.md#coremodeltypes) |
| `Alias` | extends keyof `ModelTypes`[``"definitions"``]keyof `ModelTypes`[``"definitions"``] |

## Constructors

### constructor

• **new Core**<`ModelTypes`, `Alias`\>(`params`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends [`CoreModelTypes`](../modules/core.md#coremodeltypes)[`CoreModelTypes`](../modules/core.md#coremodeltypes) |
| `Alias` | extends `string` \| `number` \| `symbol`keyof `ModelTypes`[``"definitions"``] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`CoreParams`](../modules/core.md#coreparams)<`ModelTypes`\> |

## Accessors

### ceramic

• `get` **ceramic**(): `default`

#### Returns

`default`

___

### config

• `get` **config**(): [`ConfigURLs`](../modules/core.md#configurls)

#### Returns

[`ConfigURLs`](../modules/core.md#configurls)

___

### dataModel

• `get` **dataModel**(): `DataModel`<`ModelTypes`, `ModelTypesToAliases`<`ModelTypes`\>\>

#### Returns

`DataModel`<`ModelTypes`, `ModelTypesToAliases`<`ModelTypes`\>\>

___

### dataStore

• `get` **dataStore**(): `DIDDataStore`<`ModelTypes`, keyof `ModelTypes`[``"definitions"``]\>

#### Returns

`DIDDataStore`<`ModelTypes`, keyof `ModelTypes`[``"definitions"``]\>

___

### resolver

• `get` **resolver**(): `Resolver`

#### Returns

`Resolver`

## Methods

### get

▸ **get**<`Key`, `ContentType`\>(`id`, `key`): `Promise`<``null`` \| `ContentType`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Key` | extends `string` \| `number` \| `symbol` |
| `ContentType` | `DefinitionContentType`<`ModelTypes`, `Key`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `key` | `Key` |

#### Returns

`Promise`<``null`` \| `ContentType`\>

___

### getAccountDID

▸ **getAccountDID**(`account`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `account` | `string` |

#### Returns

`Promise`<`string`\>

___

### toDID

▸ **toDID**(`accountOrDID`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `accountOrDID` | `string` |

#### Returns

`Promise`<`string`\>
