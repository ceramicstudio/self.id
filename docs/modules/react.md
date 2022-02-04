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

The [`Provider`](framework.md#provider) component must be added at the root of the
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

The [`useViewerRecord`](framework.md#useviewerrecord) hook loads the record for a given
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

The [`usePublicRecord`](framework.md#usepublicrecord) hook is similar to the
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

- [RequestClient](../classes/react.RequestClient.md)

## Type aliases

### ProviderConfig

Ƭ **ProviderConfig**<`ModelTypes`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `ModelTypeAliases` = `CoreModelTypes` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `client?` | `WebClientParams`<`ModelTypes`\> |
| `queryOptions?` | `QueryObserverOptions` |
| `state?` | [`RequestState`](react.md#requeststate) |

___

### ProviderProps

Ƭ **ProviderProps**<`ModelTypes`\>: [`ProviderConfig`](react.md#providerconfig)<`ModelTypes`\> & { `children`: `ReactNode`  }

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
| `renderFallback?` | (`connectionState`: [`ViewerConnectionState`](react.md#viewerconnectionstate)<`ModelTypes`\>) => ``null`` \| `Element` |

___

### ViewerConnectionState

Ƭ **ViewerConnectionState**<`ModelTypes`\>: { `status`: ``"idle"``  } \| { `promise`: `Abortable`<`SelfID`<`ModelTypes`\> \| ``null``\> ; `provider`: `EthereumAuthProvider` ; `status`: ``"connecting"``  } \| { `selfID`: `SelfID`<`ModelTypes`\> ; `status`: ``"connected"``  } \| { `error`: `Error` ; `status`: ``"failed"``  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `ModelTypeAliases` = `CoreModelTypes` |

___

### ViewerID

Ƭ **ViewerID**<`ModelTypes`\>: `PublicID`<`ModelTypes`\> \| `SelfID`<`ModelTypes`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `ModelTypeAliases` |

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
| `props` | [`ProviderProps`](react.md#providerprops)<`ModelTypes`\> |

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
| `ModelTypes` | extends `ModelTypeAliases`<`Record`<`string`, `any`\>, `Record`<`string`, `string`\>, `Record`<`string`, `string`\>\> = `ModelTypes` |

#### Returns

`Core`<`ModelTypes`\>

___

### usePublicRecord

▸ **usePublicRecord**<`ModelTypes`, `Alias`, `ContentType`\>(`alias`, `id`): [`PublicRecord`](react.md#publicrecord)<`ContentType` \| ``null``\>

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

▸ **useViewerConnection**<`ModelTypes`\>(): [[`ViewerConnectionState`](react.md#viewerconnectionstate), (`provider`: `EthereumAuthProvider`) => `Promise`<`SelfID`<`ModelTypes`\> \| ``null``\>, () => `void`]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `ModelTypeAliases`<`Record`<`string`, `any`\>, `Record`<`string`, `string`\>, `Record`<`string`, `string`\>\> = `ModelTypes` |

#### Returns

[[`ViewerConnectionState`](react.md#viewerconnectionstate), (`provider`: `EthereumAuthProvider`) => `Promise`<`SelfID`<`ModelTypes`\> \| ``null``\>, () => `void`]

___

### useViewerID

▸ **useViewerID**<`ModelTypes`\>(): [`ViewerID`](react.md#viewerid)<`ModelTypes`\> \| ``null``

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `ModelTypeAliases`<`Record`<`string`, `any`\>, `Record`<`string`, `string`\>, `Record`<`string`, `string`\>\> = `ModelTypes` |

#### Returns

[`ViewerID`](react.md#viewerid)<`ModelTypes`\> \| ``null``

___

### useViewerRecord

▸ **useViewerRecord**<`ModelTypes`, `Alias`, `ContentType`\>(`alias`): [`ViewerRecord`](react.md#viewerrecord)<`ContentType` \| ``null``\>

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
