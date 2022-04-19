# Module: react

React hooks and utilities for authentication and records interactions.

## Purpose

The `react` module provides React components, hooks and related utility functions to help manage
authentication and interactions with records, similar to the [`web`](web.md) module but designed
specifically to be used with React.

## Installation

```sh
npm install @self.id/react
```

## Common use-cases

### Configure the Provider

The [`Provider`](react.md#provider) component must be added at the root of the
application tree in order to use the hooks described below. It can be used to provide a custom
configuration for the Self.ID clients and queries, as well as initial state.

```ts
import { Provider } from '@self.id/react'

function App({ children }) {
  return <Provider client={{ ceramic: 'testnet-clay' }}>{children}</Provider>
}
```

### Authenticate the user

The module provides a React hook to easily initiate an authentication flow for the Viewer
(the "current user" of the app) using an `EthereumAuthProvider` instance, notably exported by
the [`web`](web.md) module. Once authenticated, the Viewer's cookie is set to the authenticated
DID and writing records associated to the Viewer becomes possible.

```ts
import { useViewerConnection } from '@self.id/react'
import { EthereumAuthProvider } from '@self.id/web'

async function createAuthProvider() {
  // The following assumes there is an injected `window.ethereum` provider
  const addresses = await window.ethereum.request({ method: 'eth_requestAccounts' })
  return new EthereumAuthProvider(window.ethereum, addresses[0])
}

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
      onClick={() => {
        createAuthProvider().then(connect)
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

### Read a viewer record

The [`useViewerRecord`](react.md#useviewerrecord) hook loads the record for a given
definition in the index of the current viewer, with the following variants:

- If no viewer is set, no record can be loaded
- If the viewer is not authenticated, the record gets loaded but cannot be mutated
- If the viewer is authenticated, the record gets loaded and be mutated

```ts
import { useViewerRecord } from '@self.id/react'

function ShowViewerName() {
  const record = useViewerRecord('basicProfile')

  const text = record.isLoading
    ? 'Loading...'
    : record.content
    ? `Hello ${record.content.name || 'stranger'}`
    : 'No profile to load'
  return <p>{text}</p>
}
```

### Read a public record

The [`usePublicRecord`](react.md#usepublicrecord) hook is similar to the
`useViewerRecord` hook described above, but reading from the index of an explicitly provided
account rather than the viewer. Public records are read-only, `useViewerRecord` must be used in
 case mutations are needed.

```ts
import { usePublicRecord } from '@self.id/react'

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
page. The module exports a [`RequestClient`](../classes/react.RequestClient.md) class that can be used
to fetch wanted records on the server in order to have them immediately available by the
`usePublicRecord` and `useViewerRecord` hooks.

The following example shows how this can be used in a [Next.js](https://nextjs.org/) page, using
the `ShowViewerName` component created in the previous example:

```ts
import { Provider, RequestClient } from '@self.id/react'

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

## Classes

- [ReactClient](../classes/react.ReactClient.md)
- [RequestClient](../classes/react.RequestClient.md)

## Type aliases

### ProviderProps

Ƭ **ProviderProps**<`ModelTypes`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `ModelTypeAliases` = `CoreModelTypes` |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `children` | `ReactNode` | - |
| `client?` | [`ReactClient`](../classes/react.ReactClient.md)<`ModelTypes`\> \| `WebClientParams`<`ModelTypes`\> | An instance of [`ReactClient`](../classes/react.ReactClient.md) or [`client configuration parameters`](web.md#webclientparams). |
| `queryOptions?` | `QueryObserverOptions` | Custom options for the internal [react-query](https://react-query.tanstack.com/) configuration. |
| `state?` | [`RequestState`](react.md#requeststate) | [`RequestState`](react.md#requeststate) emitted by a [`RequestClient`](../classes/react.RequestClient.md) instance. |

___

### PublicRecord

Ƭ **PublicRecord**<`ContentType`\>: `Object`

A PublicRecord provides an interface for interacting with record stored on Ceramic, associated
to a given DID string.

#### Type parameters

| Name |
| :------ |
| `ContentType` |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `content?` | `ContentType` | Record contents, if loaded. |
| `error?` | `unknown` | Possible error raised when attempting to load the record. |
| `isError` | `boolean` | `true` when the record failed to load, `false` otherwise. |
| `isLoading` | `boolean` | `true` when the record is being loaded, `false` otherwise. |

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

| Name | Type | Description |
| :------ | :------ | :------ |
| `hydrate?` | `DehydratedState` | Serialized records to hydrate. |
| `viewerID?` | `string` \| ``null`` | Viewer ID extracted from cookie value. |

___

### ViewerConnectedContainerProps

Ƭ **ViewerConnectedContainerProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `children` | `ReactNode` |
| `renderFallback?` | (`connectionState`: [`ViewerConnectionState`](react.md#viewerconnectionstate)<`ModelTypes`\>) => ``null`` \| `Element` |

___

### ViewerConnectionState

Ƭ **ViewerConnectionState**<`ModelTypes`\>: { `status`: ``"idle"``  } \| { `promise`: `Abortable`<`SelfID`<`ModelTypes`\> \| ``null``\> ; `provider`: `EthereumAuthProvider` ; `status`: ``"connecting"``  } \| { `selfID`: `SelfID`<`ModelTypes`\> ; `status`: ``"connected"``  } \| { `error`: `Error` ; `status`: ``"failed"``  }

The viewer connection can be in one of the following states, identified by `status`:

- `idle`: no connection has been attempted.
- `connecting`: attempting to connect using the attached `provider`. The attached `promise` can
be used to track the connection attempt.
- `connected`: successfully connected with the attached [`selfID`](../classes/web.SelfID.md).
- `failed`: connection attempted failed with the attached `error`.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `ModelTypeAliases` = `CoreModelTypes` |

___

### ViewerID

Ƭ **ViewerID**<`ModelTypes`\>: `PublicID`<`ModelTypes`\> \| `SelfID`<`ModelTypes`\>

A ViewerID can be either a [`SelfID`](../classes/web.SelfID.md) or [`PublicID`](../classes/core.PublicID.md)
instance depending on the current [`ViewerConnectionState`](react.md#viewerconnectionstate).

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `ModelTypeAliases` |

___

### ViewerRecord

Ƭ **ViewerRecord**<`ContentType`\>: { `content?`: `never` ; `error?`: `never` ; `isError`: ``false`` ; `isLoadable`: ``false`` ; `isLoading`: ``false`` ; `isMutable`: ``false`` ; `isMutating`: ``false`` ; `merge?`: `never` ; `set?`: `never`  } \| { `content?`: `ContentType` ; `error?`: `unknown` ; `isError`: `boolean` ; `isLoadable`: ``true`` ; `isLoading`: `boolean` ; `isMutable`: `boolean` ; `isMutating`: `boolean` ; `merge`: (`content`: `ContentType`) => `Promise`<`void`\> ; `set`: (`content`: `ContentType`) => `Promise`<`void`\>  }

A ViewerRecord provides an interface for interacting with record stored on Ceramic, depending on
the current [`ViewerID`](react.md#viewerid-1) value:

- If `null`, no interaction is possible with the record.
- If it is an instance of [`PublicID`](../classes/core.PublicID.md), only reads are possible.
- If it is an instance of [`SelfID`](../classes/web.SelfID.md), all interactions (reads and mutations)
are possible.

The ViewerRecord object contains the following properties:

- `isLoadable`: `false` if the viewer ID is `null`, `true` otherwise.
- `isLoading`: `true` when the record is being loaded, `false` otherwise.
- `content`: the record contents, if loaded.
- `isError`: `true` when the record failed to load, `false` otherwise.
- `error`: possible error raised when attempting to load the record.
- `isMutable`: `true` if the viewer ID is an instance of [`SelfID`](../classes/web.SelfID.md),
`false` otherwise.
- `isMutating`: `true` when the record is being mutated as the result of calling the
ViewerRecord object `merge` or `set` function, `false` otherwise.
- `set`: function used to replace the record contents using the [`set`](../classes/web.SelfID.md#set)
method, only available if `isMutating` is `true`.
- `merge`: function used to merge the record contents using the
[`merge`](../classes/web.SelfID.md#merge) method, only available if `isMutating` is `true`.

#### Type parameters

| Name |
| :------ |
| `ContentType` |

## Functions

### Provider

▸ **Provider**<`ModelTypes`\>(`props`): `JSX.Element`

Top-level provider component for using Self.ID's React APIs.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `ModelTypeAliases`<`Record`<`string`, `any`\>, `Record`<`string`, `string`\>, `Record`<`string`, `string`\>\> = `ModelTypes` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`ProviderProps`](react.md#providerprops)<`ModelTypes`\> |

#### Returns

`JSX.Element`

___

### ViewerConnectedContainer

▸ **ViewerConnectedContainer**(`props`): `JSX.Element` \| ``null``

Container component for only rendering `children` when the viewer is connected.

A `renderFallback` function can be provided to render elements when the viewer is not connected.
The current [`ViewerConnectionState`](react.md#viewerconnectionstate) is injected as function argument.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`ViewerConnectedContainerProps`](react.md#viewerconnectedcontainerprops) |

#### Returns

`JSX.Element` \| ``null``

___

### getCookieViewerID

▸ **getCookieViewerID**(`cookie?`): `string` \| ``null``

Extract the possible viewer ID value from the given cookie string value.

#### Parameters

| Name | Type |
| :------ | :------ |
| `cookie?` | `string` |

#### Returns

`string` \| ``null``

___

### useClient

▸ **useClient**<`ModelTypes`\>(): [`ReactClient`](../classes/react.ReactClient.md)<`ModelTypes`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `ModelTypeAliases`<`Record`<`string`, `any`\>, `Record`<`string`, `string`\>, `Record`<`string`, `string`\>\> = `ModelTypes` |

#### Returns

[`ReactClient`](../classes/react.ReactClient.md)<`ModelTypes`\>

___

### usePublicRecord

▸ **usePublicRecord**<`ModelTypes`, `Alias`, `ContentType`\>(`alias`, `id`): [`PublicRecord`](react.md#publicrecord)<`ContentType` \| ``null``\>

Hook for accessing the [`PublicRecord`](react.md#publicrecord) for a given alias and account (DID or CAIP-10).

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

[`PublicRecord`](react.md#publicrecord)<`ContentType` \| ``null``\>

___

### useViewerConnection

▸ **useViewerConnection**<`ModelTypes`\>(): [[`ViewerConnectionState`](react.md#viewerconnectionstate)<`ModelTypes`\>, (`provider`: `EthereumAuthProvider`) => `Promise`<`SelfID`<`ModelTypes`\> \| ``null``\>, () => `void`]

Hook for handling the viewer's connection lifecycle, returning the following elements:

1. The current [`ViewerConnectionState`](react.md#viewerconnectionstate) object.
2. A connection attempt function, taking an `EthereumAuthProvider` argument.
3. A reset function, clearing the current [`ViewerID`](react.md#viewerid-1).

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `ModelTypeAliases`<`Record`<`string`, `any`\>, `Record`<`string`, `string`\>, `Record`<`string`, `string`\>\> = `ModelTypes` |

#### Returns

[[`ViewerConnectionState`](react.md#viewerconnectionstate)<`ModelTypes`\>, (`provider`: `EthereumAuthProvider`) => `Promise`<`SelfID`<`ModelTypes`\> \| ``null``\>, () => `void`]

___

### useViewerID

▸ **useViewerID**<`ModelTypes`\>(): [`ViewerID`](react.md#viewerid-1)<`ModelTypes`\> \| ``null``

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `ModelTypeAliases`<`Record`<`string`, `any`\>, `Record`<`string`, `string`\>, `Record`<`string`, `string`\>\> = `ModelTypes` |

#### Returns

[`ViewerID`](react.md#viewerid-1)<`ModelTypes`\> \| ``null``

___

### useViewerRecord

▸ **useViewerRecord**<`ModelTypes`, `Alias`, `ContentType`\>(`alias`): [`ViewerRecord`](react.md#viewerrecord)<`ContentType` \| ``null``\>

Hook for accessing the [`ViewerRecord`](react.md#viewerrecord) for a given alias.

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

[`ViewerRecord`](react.md#viewerrecord)<`ContentType` \| ``null``\>
