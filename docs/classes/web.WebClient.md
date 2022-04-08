# Class: WebClient<ModelTypes\>

[web](../modules/web.md).WebClient

WebClient extends the [`Core class`](core.Core.md) with authentication support in browser
environments.

It is exported by the [`web`](../modules/web.md) module.

```sh
import { WebClient } from '@self.id/web'
```

## Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `ModelTypeAliases` = `CoreModelTypes` |

## Hierarchy

- `Core`<`ModelTypes`\>

  ↳ **`WebClient`**

## Constructors

### constructor

• **new WebClient**<`ModelTypes`\>(`params`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `ModelTypeAliases`<`Record`<`string`, `any`\>, `Record`<`string`, `string`\>, `Record`<`string`, `string`\>\> = `ModelTypes` |

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

#### Inherited from

Core.ceramic

___

### dataModel

• `get` **dataModel**(): `DataModel`<`ModelTypes`, `ModelTypesToAliases`<`ModelTypes`\>\>

#### Returns

`DataModel`<`ModelTypes`, `ModelTypesToAliases`<`ModelTypes`\>\>

#### Inherited from

Core.dataModel

___

### dataStore

• `get` **dataStore**(): `DIDDataStore`<`ModelTypes`, keyof `ModelTypes`[``"definitions"``]\>

#### Returns

`DIDDataStore`<`ModelTypes`, keyof `ModelTypes`[``"definitions"``]\>

#### Inherited from

Core.dataStore

___

### resolver

• `get` **resolver**(): `Resolver`

#### Returns

`Resolver`

#### Inherited from

Core.resolver

___

### threeId

• `get` **threeId**(): `ThreeIdConnect`

3ID Connect instance used internally.

#### Returns

`ThreeIdConnect`

___

### tileLoader

• `get` **tileLoader**(): `TileLoader`

#### Returns

`TileLoader`

#### Inherited from

Core.tileLoader

## Methods

### authenticate

▸ **authenticate**(`authProvider`, `attachToCeramic?`): `Promise`<`DID`\>

Create and authenticate a DID instance using the given `authProvider`.

By default, this also attaches the created DID instance to the internal Ceramic client
instance. This behavior can be disabled by setting `attachToCeramic` to `false`.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `authProvider` | `EthereumAuthProvider` | `undefined` |
| `attachToCeramic` | `boolean` | `true` |

#### Returns

`Promise`<`DID`\>

___

### connect

▸ **connect**(`authProvider`): `Promise`<`DID`\>

Create a DID instance using the given `authProvider`.

⚠️ This method does **not** attempt to authenticate immediately, use [`authenticate`](web.WebClient.md#authenticate)
instead if this is the wanted behavior.

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
