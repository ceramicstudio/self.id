# Module: framework

Framework APIs

```sh
npm install @self.id/framework
```

## Re-exported classes

- [`core.Core`](../classes/core.Core.md)
- [`core.PublicID`](../classes/core.PublicID.md)
- [`react.RequestClient`](../classes/react.RequestClient.md)
- [`web.SelfID`](../classes/web.SelfID.md)
- `web.EthereumAuthProvider`

## Re-exported components

- [`ui.AvatarPlaceholder`](ui.md#avatarplaceholder)

## Type aliases

### ColorType

Ƭ **ColorType**: `string` \| { `dark?`: `string` ; `light?`: `string`  } \| `undefined`

___

### Colors

Ƭ **Colors**: `Record`<`string`, [`ColorType`](framework.md#colortype)\>

___

### ConnectNetwork

Ƭ **ConnectNetwork**: ``"dev-unstable"`` \| ``"mainnet"`` \| ``"testnet-clay"``

___

### ConnectOptions

Ƭ **ConnectOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `switchAccount?` | `boolean` |

___

### ConnectedContainerProps

Ƭ **ConnectedContainerProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `children` | `ReactNode` |
| `renderFallback?` | (`connectionState`: [`ConnectionState`](framework.md#connectionstate)) => ``null`` \| `Element` |

___

### ConnectionState

Ƭ **ConnectionState**: { `status`: ``"disconnected"``  } \| { `status`: ``"connecting"``  } \| { `selfID`: `SelfID` ; `status`: ``"connected"``  } \| { `error?`: `Error` ; `status`: ``"failed"``  }

___

### Dimensions

Ƭ **Dimensions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `height` | `number` |
| `width` | `number` |

___

### ProviderProps

Ƭ **ProviderProps**: `ReactProviderProps` & { `auth?`: `MultiAuthProviderConfig` ; `ui?`: `UIProviderProps`  }

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

### ViewerRecord

Ƭ **ViewerRecord**<`ContentType`\>: { `content?`: `never` ; `error?`: `never` ; `isError`: ``false`` ; `isLoadable`: ``false`` ; `isLoading`: ``false`` ; `isMutable`: ``false`` ; `isMutating`: ``false`` ; `merge?`: `never` ; `set?`: `never`  } \| { `content?`: `ContentType` ; `error?`: `unknown` ; `isError`: `boolean` ; `isLoadable`: ``true`` ; `isLoading`: `boolean`  } & { `isMutable`: ``false`` ; `isMutating`: ``false``  } \| { `isMutable`: ``true`` ; `isMutating`: `boolean` ; `merge`: (`content`: `ContentType`) => `Promise`<`void`\> ; `set`: (`content`: `ContentType`) => `Promise`<`void`\>  }

#### Type parameters

| Name |
| :------ |
| `ContentType` |

## Variables

### colors

• **colors**: [`Colors`](framework.md#colors)

___

### theme

• **theme**: `ThemeType`

## Functions

### AvatarPlaceholder

▸ **AvatarPlaceholder**(`props`): `JSX.Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `AvatarPlaceholderProps` |

#### Returns

`JSX.Element`

___

### ConnectedContainer

▸ **ConnectedContainer**(`props`): `JSX.Element` \| ``null``

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`ConnectedContainerProps`](framework.md#connectedcontainerprops) |

#### Returns

`JSX.Element` \| ``null``

___

### Provider

▸ **Provider**(`props`): `JSX.Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`ProviderProps`](framework.md#providerprops) |

#### Returns

`JSX.Element`

___

### isCAIP10string

▸ **isCAIP10string**(`account`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `account` | `string` |

#### Returns

`boolean`

___

### selectImageSource

▸ **selectImageSource**(`sources`, `dimensions`, `mode?`): `ImageMetadata`

#### Parameters

| Name | Type |
| :------ | :------ |
| `sources` | `ImageSources` |
| `dimensions` | [`Dimensions`](framework.md#dimensions) |
| `mode?` | `SizeMode` |

#### Returns

`ImageMetadata`

___

### uploadImage

▸ **uploadImage**(`url`, `file`, `sizes?`): `Promise`<`ImageSources`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `file` | `File` |
| `sizes?` | [`Dimensions`](framework.md#dimensions)[] |

#### Returns

`Promise`<`ImageSources`\>

___

### useConnection

▸ **useConnection**(): [[`ConnectionState`](framework.md#connectionstate), (`options?`: [`ConnectOptions`](framework.md#connectoptions)) => `Promise`<`SelfID` \| ``null``\>, () => `void`]

#### Returns

[[`ConnectionState`](framework.md#connectionstate), (`options?`: [`ConnectOptions`](framework.md#connectoptions)) => `Promise`<`SelfID` \| ``null``\>, () => `void`]

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

▸ **usePublicRecord**<`ModelTypes`, `Alias`, `ContentType`\>(`alias`, `id`): [`PublicRecord`](framework.md#publicrecord)<`ContentType` \| ``null``\>

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

[`PublicRecord`](framework.md#publicrecord)<`ContentType` \| ``null``\>

___

### useViewerID

▸ **useViewerID**<`ModelTypes`\>(): `ViewerID`<`ModelTypes`\> \| ``null``

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `ModelTypes``ModelTypes` |

#### Returns

`ViewerID`<`ModelTypes`\> \| ``null``

___

### useViewerRecord

▸ **useViewerRecord**<`ModelTypes`, `Alias`, `ContentType`\>(`alias`): [`ViewerRecord`](framework.md#viewerrecord)<`ContentType` \| ``null``\>

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

[`ViewerRecord`](framework.md#viewerrecord)<`ContentType` \| ``null``\>
