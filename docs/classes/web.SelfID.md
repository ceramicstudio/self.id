# Class: SelfID<ModelTypes, Alias\>

[web](../modules/web.md).SelfID

A SelfID instance provides a client for an authenticated DID. Beyond loading records, it also
allows to mutate them.

It is exported by the [`web`](../modules/web.md) module.

```sh
import { SelfID } from '@self.id/web'
```

## Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `ModelTypeAliases` = `CoreModelTypes` |
| `Alias` | extends keyof `ModelTypes`[``"definitions"``] = keyof `ModelTypes`[``"definitions"``] |

## Constructors

### constructor

• **new SelfID**<`ModelTypes`, `Alias`\>(`params`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `ModelTypeAliases`<`Record`<`string`, `any`\>, `Record`<`string`, `string`\>, `Record`<`string`, `string`\>\> = `ModelTypes` |
| `Alias` | extends `string` \| `number` \| `symbol` = keyof `ModelTypes`[``"definitions"``] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`SelfIDParams`](../modules/web.md#selfidparams)<`ModelTypes`\> |

## Accessors

### client

• `get` **client**(): [`WebClient`](web.WebClient.md)<`ModelTypes`\>

WebClient instance used internally.

#### Returns

[`WebClient`](web.WebClient.md)<`ModelTypes`\>

___

### did

• `get` **did**(): `DID`

DID instance used internally.

#### Returns

`DID`

___

### id

• `get` **id**(): `string`

DID string associated to the SelfID instance.

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

___

### merge

▸ **merge**<`Key`, `ContentType`\>(`key`, `content`): `Promise`<`StreamID`\>

Merge the record contents for a given definition alias. If no content exists, the record will
be created.

⚠️ This method only performs a shallow (one level) merge using [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign).
For a deep merge or a specific merging strategy, you will need to implement custom logic.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Key` | extends `string` \| `number` \| `symbol` |
| `ContentType` | `DefinitionContentType`<`ModelTypes`, `Key`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `Key` |
| `content` | `ContentType` |

#### Returns

`Promise`<`StreamID`\>

___

### set

▸ **set**<`Key`, `ContentType`\>(`key`, `content`): `Promise`<`StreamID`\>

Set the record contents for a given definition alias.

⚠️ Using this method will **replace any existing content**. If you only want to write some
fields and leave existing ones unchanged, you can use the [`merge`](web.SelfID.md#merge) method instead.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Key` | extends `string` \| `number` \| `symbol` |
| `ContentType` | `DefinitionContentType`<`ModelTypes`, `Key`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `Key` |
| `content` | `ContentType` |

#### Returns

`Promise`<`StreamID`\>

___

### authenticate

▸ `Static` **authenticate**<`ModelTypes`\>(`params`): `Promise`<[`SelfID`](web.SelfID.md)<`ModelTypes`, keyof `ModelTypes`[``"definitions"``]\>\>

Create a SelfID instance by authenticating using the given provider.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `ModelTypeAliases`<`Record`<`string`, `any`\>, `Record`<`string`, `string`\>, `Record`<`string`, `string`\>\> = `ModelTypes` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`AuthenticateParams`](../modules/web.md#authenticateparams)<`ModelTypes`\> |

#### Returns

`Promise`<[`SelfID`](web.SelfID.md)<`ModelTypes`, keyof `ModelTypes`[``"definitions"``]\>\>
