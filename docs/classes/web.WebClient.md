# Class: WebClient<ModelTypes\>

[web](../modules/web.md).WebClient

```sh
import { WebClient } from '@self.id/web'
```

## Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `CoreModelTypes``CoreModelTypes` |

## Hierarchy

- `Core`<`ModelTypes`\>

  ↳ **`WebClient`**

## Constructors

### constructor

• **new WebClient**<`ModelTypes`\>(`params`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `ModelTypes``ModelTypes` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`WebClientParams`](../modules/web.md#webclientparams)<`ModelTypes`\> |

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

___

### threeId

• `get` **threeId**(): `ThreeIdConnect`

#### Returns

`ThreeIdConnect`

## Methods

### authenticate

▸ **authenticate**(`authProvider`, `attachToCeramic?`): `Promise`<`DID`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `authProvider` | `EthereumAuthProvider` | `undefined` |
| `attachToCeramic` | `boolean` | `false` |

#### Returns

`Promise`<`DID`\>

___

### connect

▸ **connect**(`authProvider`): `Promise`<`DID`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `authProvider` | `EthereumAuthProvider` |

#### Returns

`Promise`<`DID`\>

___

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
