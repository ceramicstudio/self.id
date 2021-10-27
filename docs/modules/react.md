# Module: react

React APIs

```sh
npm install @self.id/react
```

## Classes

- [RequestClient](../classes/react.RequestClient.md)

## Type aliases

### ProviderConfig

Ƭ **ProviderConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `client?` | `WebClientParams` |
| `queryOptions?` | `QueryObserverOptions` |
| `state?` | [`RequestState`](react.md#requeststate) |

___

### ProviderProps

Ƭ **ProviderProps**: [`ProviderConfig`](react.md#providerconfig) & { `children`: `ReactNode`  }

___

### PublicRecord

Ƭ **PublicRecord**<`ContentType`\>: `Object`

#### Type parameters

| Name |
| :------ |
| `ContentType` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `content?` | `ContentType` |
| `error?` | `unknown` |
| `isError` | `boolean` |
| `isLoading` | `boolean` |

___

### RequestClientParams

Ƭ **RequestClientParams**<`ModelTypes`\>: `CoreParams`<`ModelTypes`\> & { `cookie?`: `string`  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `CoreModelTypes``CoreModelTypes` |

___

### RequestState

Ƭ **RequestState**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `hydrate?` | `DehydratedState` |
| `viewerID?` | `string` \| ``null`` |

___

### ViewerConnectedContainerProps

Ƭ **ViewerConnectedContainerProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `children` | `ReactNode` |
| `renderFallback?` | (`connectionState`: [`ViewerConnectionState`](react.md#viewerconnectionstate)) => ``null`` \| `Element` |

___

### ViewerConnectionState

Ƭ **ViewerConnectionState**: { `status`: ``"idle"``  } \| { `promise`: `Abortable`<`SelfID` \| ``null``\> ; `provider`: `EthereumAuthProvider` ; `status`: ``"connecting"``  } \| { `selfID`: `SelfID` ; `status`: ``"connected"``  } \| { `error`: `Error` ; `status`: ``"failed"``  }

___

### ViewerID

Ƭ **ViewerID**<`ModelTypes`\>: `PublicID`<`ModelTypes`\> \| `SelfID`<`ModelTypes`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `CoreModelTypes` |

___

### ViewerRecord

Ƭ **ViewerRecord**<`ContentType`\>: { `content?`: `never` ; `error?`: `never` ; `isError`: ``false`` ; `isLoadable`: ``false`` ; `isLoading`: ``false`` ; `isMutable`: ``false`` ; `isMutating`: ``false`` ; `merge?`: `never` ; `set?`: `never`  } \| { `content?`: `ContentType` ; `error?`: `unknown` ; `isError`: `boolean` ; `isLoadable`: ``true`` ; `isLoading`: `boolean`  } & { `isMutable`: ``false`` ; `isMutating`: ``false``  } \| { `isMutable`: ``true`` ; `isMutating`: `boolean` ; `merge`: (`content`: `ContentType`) => `Promise`<`void`\> ; `set`: (`content`: `ContentType`) => `Promise`<`void`\>  }

#### Type parameters

| Name |
| :------ |
| `ContentType` |

## Functions

### Provider

▸ **Provider**(`props`): `JSX.Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`ProviderProps`](react.md#providerprops) |

#### Returns

`JSX.Element`

___

### ViewerConnectedContainer

▸ **ViewerConnectedContainer**(`props`): `JSX.Element` \| ``null``

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`ViewerConnectedContainerProps`](react.md#viewerconnectedcontainerprops) |

#### Returns

`JSX.Element` \| ``null``

___

### getCookieViewerID

▸ **getCookieViewerID**(`cookie?`): `string` \| ``null``

#### Parameters

| Name | Type |
| :------ | :------ |
| `cookie?` | `string` |

#### Returns

`string` \| ``null``

___

### useCore

▸ **useCore**<`ModelTypes`\>(): `Core`<`ModelTypes`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `ModelTypes``ModelTypes` |

#### Returns

`Core`<`ModelTypes`\>

___

### usePublicRecord

▸ **usePublicRecord**<`ModelTypes`, `Alias`, `ContentType`\>(`alias`, `id`): [`PublicRecord`](react.md#publicrecord)<`ContentType` \| ``null``\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `ModelTypes``ModelTypes` |
| `Alias` | extends `string` \| `number` \| `symbol`keyof `ModelTypes`[``"definitions"``] |
| `ContentType` | `DefinitionContentType`<`ModelTypes`, `Alias`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `alias` | `Alias` |
| `id` | `string` |

#### Returns

[`PublicRecord`](react.md#publicrecord)<`ContentType` \| ``null``\>

___

### useViewerConnection

▸ **useViewerConnection**(): [[`ViewerConnectionState`](react.md#viewerconnectionstate), (`provider`: `EthereumAuthProvider`) => `Promise`<`SelfID` \| ``null``\>, () => `void`]

#### Returns

[[`ViewerConnectionState`](react.md#viewerconnectionstate), (`provider`: `EthereumAuthProvider`) => `Promise`<`SelfID` \| ``null``\>, () => `void`]

___

### useViewerID

▸ **useViewerID**<`ModelTypes`\>(): [`ViewerID`](react.md#viewerid)<`ModelTypes`\> \| ``null``

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `ModelTypes``ModelTypes` |

#### Returns

[`ViewerID`](react.md#viewerid)<`ModelTypes`\> \| ``null``

___

### useViewerRecord

▸ **useViewerRecord**<`ModelTypes`, `Alias`, `ContentType`\>(`alias`): [`ViewerRecord`](react.md#viewerrecord)<`ContentType` \| ``null``\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `ModelTypes``ModelTypes` |
| `Alias` | extends `string` \| `number` \| `symbol`keyof `ModelTypes`[``"definitions"``] |
| `ContentType` | `DefinitionContentType`<`ModelTypes`, `Alias`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `alias` | `Alias` |

#### Returns

[`ViewerRecord`](react.md#viewerrecord)<`ContentType` \| ``null``\>
