# Class: RequestClient<ModelTypes, Alias\>

[react](../modules/react.md).RequestClient

## Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `CoreModelTypes``CoreModelTypes` |
| `Alias` | extends keyof `ModelTypes`[``"definitions"``]keyof `ModelTypes`[``"definitions"``] |

## Hierarchy

- `Core`<`ModelTypes`\>

  ↳ **`RequestClient`**

## Constructors

### constructor

• **new RequestClient**<`ModelTypes`, `Alias`\>(`params`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `ModelTypes``ModelTypes` |
| `Alias` | extends `string` \| `number` \| `symbol`keyof `ModelTypes`[``"definitions"``] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `CoreParams`<`ModelTypes`\> |

#### Overrides

Core&lt;ModelTypes\&gt;.constructor

## Accessors

### ceramic

• `get` **ceramic**(): `CeramicClient`

#### Returns

`CeramicClient`

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

▸ **get**<`Key`, `ContentType`\>(`key`, `id`): `Promise`<``null`` \| `ContentType`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Key` | extends `string` \| `number` \| `symbol` |
| `ContentType` | `DefinitionContentType`<`ModelTypes`, `Key`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `Key` |
| `id` | `string` |

#### Returns

`Promise`<``null`` \| `ContentType`\>

#### Inherited from

Core.get

___

### getAccountDID

▸ **getAccountDID**(`account`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `account` | `string` |

#### Returns

`Promise`<`string`\>

#### Inherited from

Core.getAccountDID

___

### getState

▸ **getState**(): `DehydratedState`

#### Returns

`DehydratedState`

___

### prefetch

▸ **prefetch**<`Key`\>(`key`, `id`): `Promise`<`void`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Key` | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `Key` |
| `id` | `string` |

#### Returns

`Promise`<`void`\>

___

### toDID

▸ **toDID**(`accountOrDID`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `accountOrDID` | `string` |

#### Returns

`Promise`<`string`\>

#### Inherited from

Core.toDID
