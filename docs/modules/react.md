# Module: react

React

```sh
npm install @self.id/react
```

## Classes

- [RequestClient](../classes/react.RequestClient.md)

## Type aliases

### AuthenticatedContainerProps

Ƭ **AuthenticatedContainerProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `children` | `ReactNode` |
| `renderFallback` | (`authState`: [`AuthenticationState`](react.md#authenticationstate)) => ``null`` \| `Element` |

___

### AuthenticationState

Ƭ **AuthenticationState**: { `status`: ``"pending"``  } \| { `promise`: `Abortable`<`SelfID` \| ``null``\> ; `provider`: `EthereumAuthProvider` ; `status`: ``"authenticating"``  } \| { `selfID`: `SelfID` ; `status`: ``"authenticated"``  } \| { `error`: `Error` ; `status`: ``"error"``  }

___

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

### RequestState

Ƭ **RequestState**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `hydrate?` | `DehydratedState` |
| `viewerID?` | `string` \| ``null`` |

___

### ViewerID

Ƭ **ViewerID**<`ModelTypes`\>: `PublicID`<`ModelTypes`\> \| `SelfID`<`ModelTypes`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `CoreModelTypes` |

___

### ViewerRecord

Ƭ **ViewerRecord**<`ContentType`\>: { `content?`: `never` ; `error?`: `never` ; `isError`: ``false`` ; `isLoadable`: ``false`` ; `isLoading`: ``false`` ; `isMutable`: ``false`` ; `isMutating`: ``false`` ; `set?`: `never`  } \| { `content?`: `ContentType` ; `error?`: `unknown` ; `isError`: `boolean` ; `isLoadable`: ``true`` ; `isLoading`: `boolean`  } & { `isMutable`: ``false`` ; `isMutating`: ``false``  } \| { `isMutable`: ``true`` ; `isMutating`: `boolean` ; `set`: (`content`: `ContentType`) => `Promise`<`void`\>  }

#### Type parameters

| Name |
| :------ |
| `ContentType` |

## Functions

### AuthenticatedContainer

▸ **AuthenticatedContainer**(`__namedParameters`): `JSX.Element` \| ``null``

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`AuthenticatedContainerProps`](react.md#authenticatedcontainerprops) |

#### Returns

`JSX.Element` \| ``null``

___

### Provider

▸ **Provider**(`__namedParameters`): `JSX.Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`ProviderProps`](react.md#providerprops) |

#### Returns

`JSX.Element`

___

### getRequestViewerID

▸ **getRequestViewerID**(`req`): `string` \| ``null``

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `IncomingMessage` |

#### Returns

`string` \| ``null``

___

### useAuthentication

▸ **useAuthentication**(): [[`AuthenticationState`](react.md#authenticationstate), (`provider`: `EthereumAuthProvider`) => `Promise`<`SelfID` \| ``null``\>, () => `void`]

#### Returns

[[`AuthenticationState`](react.md#authenticationstate), (`provider`: `EthereumAuthProvider`) => `Promise`<`SelfID` \| ``null``\>, () => `void`]

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
