# Module: framework

React framework for decentralized apps.

## Purpose

The `framework` module is the highest-level abstraction provided by the Self.ID SDK, aimed at
helping developers to quickly get started with building decentralized apps using Ceramic with
React.

The framework is built on top of the [`core`](core.md), [`web`](web.md) and [`react`](react.md)
modules to provide APIs to easily authenticate users, keep track of the current user and
interact with both public (read-only) and user-owned (mutable) records.

## Installation

```sh
npm install @self.id/framework
```

## Common use-cases

### Configure the Provider

The [`Provider`](react.md#provider) component must be added at the root of the
application tree in order to use the hooks described below. It can be used to provide a custom
configuration for the Self.ID clients, authentication, state and UI options.

```ts
import { Provider } from '@self.id/framework'

function App({ children }) {
  return <Provider client={{ ceramic: 'testnet-clay' }}>{children}</Provider>
}
```

### Authenticate the user

The framework provides a React hook to easily initiate an authentication flow for the Viewer
(the "current user" of the app). This flow is made of the following steps:

The user authentication flow consists of the following steps:

1. An [Ethereum authentication provider](https://developers.ceramic.network/reference/typescript/classes/_ceramicnetwork_blockchain_utils_linking.ethereumauthprovider-1.html) is created using the Ethereum provider.
1. The auth flow with 3ID Connect starts, using the [Ethereum authentication provider](https://developers.ceramic.network/reference/typescript/classes/_ceramicnetwork_blockchain_utils_linking.ethereumauthprovider-1.html).
1. A [`SelfID`](../classes/web.SelfID.md) instance is created and stored in application state.

Once this flow is successfully applied, the Viewer's cookie is set to the authenticated DID and
writing records associated to the Viewer becomes possible.

```ts
import { useViewerConnection } from '@self.id/framework'

// A simple button to initiate the connection flow. A Provider must be present at a higher level
// in the component tree for the `useViewerConnection()` hook to work.
function ConnectButton() {
  const [connection, connect, disconnect] = useViewerConnection()

  return connection.status === 'connected' ? (
    <button
      onClick={() => {
        disconnect()
      }}>
      Disconnect ({connection.selfID.id})
    </button>
  ) : 'ethereum' in window ? (
    <button
      disabled={connection.status === 'connecting'}
      onClick={async () => {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        await connect(new EthereumAuthProvider(window.ethereum, accounts[0]))
      }}>
      Connect
    </button>
  ) : (
    <p>
      An injected Ethereum provider such as{' '}
      <a href="https://metamask.io/">MetaMask</a> is needed to authenticate.
    </p>
  )
}
```

### Interact with a viewer record

The [`useViewerRecord`](react.md#useviewerrecord) hook loads the record for a given
definition in the index of the current viewer, with the following variants:

- If no viewer is set, no record can be loaded
- If the viewer is not authenticated, the record gets loaded but cannot be mutated
- If the viewer is authenticated, the record gets loaded and be mutated

```ts
import { useViewerRecord } from '@self.id/framework'

// Load and display the record contents
function ShowViewerName() {
  const record = useViewerRecord('basicProfile')

  const text = record.isLoading
    ? 'Loading...'
    : record.content
    ? `Hello ${record.content.name || 'stranger'}`
    : 'No profile to load'
  return <p>{text}</p>
}

// Mutate the record
function SetViewerName() {
  const record = useViewerRecord('basicProfile')

  return (
    <button
      disabled={!record.isMutable || record.isMutating}
      onClick={async () => {
        await record.merge({ name: 'Alice' })
      }}>
      Set name
    </button>
  )
}
```

### Read a public record

The [`usePublicRecord`](react.md#usepublicrecord) hook is similar to the
`useViewerRecord` hook described above, but reading from the index of an explicitly provided
account rather than the viewer. Public records are read-only, `useViewerRecord` must be used in
 case mutations are needed.

```ts
import { usePublicRecord } from '@self.id/framework'

function ShowProfileName({ did }) {
  const record = usePublicRecord('basicProfile', did)

  const text = record.isLoading
    ? 'Loading...'
    : record.content
    ? `Hello ${record.content.name || 'stranger'}`
    : 'No profile to load'
  return <p>{text}</p>
}
```

### Server-side prefetching

Server-side rendering can be used to improve the user experience for the first load of an app or
page. The framework exports a [`RequestClient`](../classes/react.RequestClient.md) class from the
[`@self.id/react`](react.md) package that can be used to fetch wanted records on the server
in order to have them immediately available by the `usePublicRecord` and `useViewerRecord`
hooks.

The following example shows how this can be used in a [Next.js](https://nextjs.org/) page, using
the `ShowViewerName` component created in the previous example:

```ts
import { Provider, RequestClient } from '@self.id/framework'

export const getServerSideProps = async (ctx) => {
  const client = new RequestClient({
    ceramic: 'testnet-clay',
    // Inject the cookie from the request headers to parse the viewerID
    cookie: ctx.req.headers.cookie,
  })
  if (client.viewerID != null) {
    // If the viewerID is set, fetch its profile
    await client.prefetch('basicProfile', client.viewerID)
  }
  return { props: { state: client.getState() } }
}

// Use the state prop injected by the server
export default function Home({ state }) {
  return (
    <Provider state={state}>
      <ShowViewerName />
    </Provider>
  )
}
```

## Re-exported classes

- [`core.Core`](../classes/core.Core.md)
- [`core.PublicID`](../classes/core.PublicID.md)
- [`react.ReactClient`](../classes/react.ReactClient.md)
- [`react.RequestClient`](../classes/react.RequestClient.md)
- [`web.SelfID`](../classes/web.SelfID.md)
- `EthereumAuthProvider` from 3ID Connect

## Type aliases

### ConnectNetwork

Ƭ **ConnectNetwork**: ``"dev-unstable"`` \| ``"mainnet"`` \| ``"testnet-clay"``

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

Ƭ **ProviderProps**<`ModelTypes`\>: `ProviderConfig`<`ModelTypes`\> & { `children`: `ReactNode`  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `ModelTypeAliases` = `CoreModelTypes` |

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
| `ModelTypes` | extends `ModelTypeAliases` = `CoreModelTypes` |

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
| `renderFallback?` | (`connectionState`: [`ViewerConnectionState`](framework.md#viewerconnectionstate)<`ModelTypes`\>) => ``null`` \| `Element` |

___

### ViewerConnectionState

Ƭ **ViewerConnectionState**<`ModelTypes`\>: { `status`: ``"idle"``  } \| { `promise`: `Abortable`<`SelfID`<`ModelTypes`\> \| ``null``\> ; `provider`: `EthereumAuthProvider` ; `status`: ``"connecting"``  } \| { `selfID`: `SelfID`<`ModelTypes`\> ; `status`: ``"connected"``  } \| { `error`: `Error` ; `status`: ``"failed"``  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `ModelTypeAliases` = `CoreModelTypes` |

___

### ViewerRecord

Ƭ **ViewerRecord**<`ContentType`\>: { `content?`: `never` ; `error?`: `never` ; `isError`: ``false`` ; `isLoadable`: ``false`` ; `isLoading`: ``false`` ; `isMutable`: ``false`` ; `isMutating`: ``false`` ; `merge?`: `never` ; `set?`: `never`  } \| { `content?`: `ContentType` ; `error?`: `unknown` ; `isError`: `boolean` ; `isLoadable`: ``true`` ; `isLoading`: `boolean` ; `isMutable`: `boolean` ; `isMutating`: `boolean` ; `merge`: (`content`: `ContentType`) => `Promise`<`void`\> ; `set`: (`content`: `ContentType`) => `Promise`<`void`\>  }

#### Type parameters

| Name |
| :------ |
| `ContentType` |

## Functions

### Provider

▸ **Provider**<`ModelTypes`\>(`props`): `JSX.Element`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `ModelTypeAliases`<`Record`<`string`, `any`\>, `Record`<`string`, `string`\>, `Record`<`string`, `string`\>\> = `ModelTypes` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`ProviderProps`](framework.md#providerprops)<`ModelTypes`\> |

#### Returns

`JSX.Element`

___

### ViewerConnectedContainer

▸ **ViewerConnectedContainer**(`props`): `JSX.Element` \| ``null``

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`ViewerConnectedContainerProps`](framework.md#viewerconnectedcontainerprops) |

#### Returns

`JSX.Element` \| ``null``

___

### formatDID

▸ **formatDID**(`did`, `maxLength?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `did` | `string` | `undefined` |
| `maxLength` | `number` | `20` |

#### Returns

`string`

___

### getImageURL

▸ **getImageURL**(`ipfsPrefix`, `sources`, `dimensions`): `string` \| `undefined`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ipfsPrefix` | `string` |
| `sources` | `undefined` \| `ImageSources` |
| `dimensions` | [`Dimensions`](framework.md#dimensions) |

#### Returns

`string` \| `undefined`

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

### useClient

▸ **useClient**<`ModelTypes`\>(): `ReactClient`<`ModelTypes`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `ModelTypeAliases`<`Record`<`string`, `any`\>, `Record`<`string`, `string`\>, `Record`<`string`, `string`\>\> = `ModelTypes` |

#### Returns

`ReactClient`<`ModelTypes`\>

___

### usePublicRecord

▸ **usePublicRecord**<`ModelTypes`, `Alias`, `ContentType`\>(`alias`, `id`): [`PublicRecord`](framework.md#publicrecord)<`ContentType` \| ``null``\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `ModelTypeAliases`<`Record`<`string`, `any`\>, `Record`<`string`, `string`\>, `Record`<`string`, `string`\>\> = `ModelTypes` |
| `Alias` | extends `string` \| `number` \| `symbol` = keyof `ModelTypes`[``"definitions"``] |
| `ContentType` | `DefinitionContentType`<`ModelTypes`, `Alias`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `alias` | `Alias` |
| `id` | `string` |

#### Returns

[`PublicRecord`](framework.md#publicrecord)<`ContentType` \| ``null``\>

___

### useViewerConnection

▸ **useViewerConnection**<`ModelTypes`\>(): [[`ViewerConnectionState`](framework.md#viewerconnectionstate)<`ModelTypes`\>, (`provider`: `EthereumAuthProvider`) => `Promise`<`SelfID`<`ModelTypes`\> \| ``null``\>, () => `void`]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `ModelTypeAliases`<`Record`<`string`, `any`\>, `Record`<`string`, `string`\>, `Record`<`string`, `string`\>\> = `ModelTypes` |

#### Returns

[[`ViewerConnectionState`](framework.md#viewerconnectionstate)<`ModelTypes`\>, (`provider`: `EthereumAuthProvider`) => `Promise`<`SelfID`<`ModelTypes`\> \| ``null``\>, () => `void`]

___

### useViewerID

▸ **useViewerID**<`ModelTypes`\>(): `ViewerID`<`ModelTypes`\> \| ``null``

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `ModelTypeAliases`<`Record`<`string`, `any`\>, `Record`<`string`, `string`\>, `Record`<`string`, `string`\>\> = `ModelTypes` |

#### Returns

`ViewerID`<`ModelTypes`\> \| ``null``

___

### useViewerRecord

▸ **useViewerRecord**<`ModelTypes`, `Alias`, `ContentType`\>(`alias`): [`ViewerRecord`](framework.md#viewerrecord)<`ContentType` \| ``null``\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `ModelTypeAliases`<`Record`<`string`, `any`\>, `Record`<`string`, `string`\>, `Record`<`string`, `string`\>\> = `ModelTypes` |
| `Alias` | extends `string` \| `number` \| `symbol` = keyof `ModelTypes`[``"definitions"``] |
| `ContentType` | `DefinitionContentType`<`ModelTypes`, `Alias`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `alias` | `Alias` |

#### Returns

[`ViewerRecord`](framework.md#viewerrecord)<`ContentType` \| ``null``\>
