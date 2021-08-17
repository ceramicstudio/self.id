# Class: SelfID<ModelTypes, Alias\>

[web](../modules/web.md).SelfID

```sh
import { SelfID } from '@self.id/web'
```

## Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `CoreModelTypes``CoreModelTypes` |
| `Alias` | extends keyof `ModelTypes`[``"definitions"``]keyof `ModelTypes`[``"definitions"``] |

## Constructors

### constructor

• **new SelfID**<`ModelTypes`, `Alias`\>(`params`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `ModelTypes``ModelTypes` |
| `Alias` | extends `string` \| `number` \| `symbol`keyof `ModelTypes`[``"definitions"``] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`SelfIDParams`](../modules/web.md#selfidparams) |

## Accessors

### client

• `get` **client**(): [`WebClient`](web.WebClient.md)<`ModelTypes`\>

#### Returns

[`WebClient`](web.WebClient.md)<`ModelTypes`\>

___

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

___

### set

▸ **set**<`Key`, `ContentType`\>(`key`, `content`): `Promise`<`StreamID`\>

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

▸ `Static` **authenticate**<`ModelTypes`\>(`params`): `Promise`<[`SelfID`](web.SelfID.md)<`ModelTypes`, ``"alsoKnownAs"`` \| ``"basicProfile"``\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `ModelTypes``ModelTypes` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`AuthenticateParams`](../modules/web.md#authenticateparams)<`ModelTypes`\> |

#### Returns

`Promise`<[`SelfID`](web.SelfID.md)<`ModelTypes`, ``"alsoKnownAs"`` \| ``"basicProfile"``\>\>
