# Module: multiauth

Multiauth APIs

```sh
npm install @self.id/multiauth
```

## Type aliases

### AuthAccount

Ƭ **AuthAccount**<`Key`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Key` | extends [`ProviderKey`](multiauth.md#providerkey)[`ProviderKey`](multiauth.md#providerkey) |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `accountID` | `AccountID` |
| `method` | [`AuthMethod`](multiauth.md#authmethod) |
| `state` | [`AuthenticatedState`](multiauth.md#authenticatedstate)<`Key`\> |

___

### AuthMethod

Ƭ **AuthMethod**<`Key`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Key` | extends [`NetworkKey`](multiauth.md#networkkey)[`NetworkKey`](multiauth.md#networkkey) |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `connector` | [`ConnectorConfig`](multiauth.md#connectorconfig) |
| `key` | `Key` |

___

### AuthState

Ƭ **AuthState**<`Key`, `Provider`\>: { `status`: ``"idle"``  } \| { `method?`: [`AuthMethod`](multiauth.md#authmethod)<`Key`\> ; `modal`: `boolean` ; `promise`: `Deferred`<[`AuthAccount`](multiauth.md#authaccount)<`Provider`\> \| ``null``\> ; `status`: ``"authenticating"``  } \| { `auth`: [`AuthAccount`](multiauth.md#authaccount)<`Provider`\> ; `status`: ``"authenticated"``  } \| { `error?`: `Error` ; `status`: ``"failed"``  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Key` | extends [`NetworkKey`](multiauth.md#networkkey)[`NetworkKey`](multiauth.md#networkkey) |
| `Provider` | extends [`NetworkProvider`](multiauth.md#networkprovider)<`Key`\>[`NetworkProvider`](multiauth.md#networkprovider)<`Key`\> |

___

### AuthenticateMode

Ƭ **AuthenticateMode**: ``"force"`` \| ``"select"`` \| ``"use"``

___

### AuthenticateOptions

Ƭ **AuthenticateOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `mode?` | [`AuthenticateMode`](multiauth.md#authenticatemode) |
| `showModal?` | `boolean` |

___

### AuthenticatedState

Ƭ **AuthenticatedState**<`Key`\>: [`NetworkState`](multiauth.md#networkstate)<`Key`\> & { `account`: `string`  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Key` | extends [`ProviderKey`](multiauth.md#providerkey)[`ProviderKey`](multiauth.md#providerkey) |

___

### Config

Ƭ **Config**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `networks` | [`NetworkConfig`](multiauth.md#networkconfig)[] |

___

### ConnectorConfig

Ƭ **ConnectorConfig**<`Key`\>: [`ConnectorConfigDefaults`](multiauth.md#connectorconfigdefaults) & { `key`: `Key` ; `providerKey`: [`ProviderKey`](multiauth.md#providerkey)  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Key` | extends [`ConnectorKey`](multiauth.md#connectorkey)[`ConnectorKey`](multiauth.md#connectorkey) |

___

### ConnectorConfigDefaults

Ƭ **ConnectorConfigDefaults**: [`DisplayDefaults`](multiauth.md#displaydefaults) & { `params?`: `unknown` ; `getNetworkProvider`: <Key\>(`network`: `Key`, `params?`: `unknown`) => ``null`` \| [`NetworkProvider`](multiauth.md#networkprovider)<`Key`\> ; `getProvider`: <Key\>(`key`: `Key`, `params?`: `unknown`) => `Promise`<[`ProviderTypes`](multiauth.md#providertypes)[`Key`]\>  }

___

### ConnectorKey

Ƭ **ConnectorKey**: ``"fortmatic"`` \| ``"injected"`` \| ``"portis"`` \| ``"torus"`` \| ``"walletConnect"``

___

### DisplayDefaults

Ƭ **DisplayDefaults**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `label` | `string` |
| `logo` | `string` |

___

### EIP1193Provider

Ƭ **EIP1193Provider**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `request` | <Result\>(`req`: [`RequestArguments`](multiauth.md#requestarguments)) => `Promise`<`Result`\> |

___

### GetNetworkState

Ƭ **GetNetworkState**<`Key`\>: (`providerKey`: `Key`, `provider`: [`ProviderType`](multiauth.md#providertype)<`Key`\>, `params?`: [`NetworkStateParams`](multiauth.md#networkstateparams)) => `Promise`<[`NetworkState`](multiauth.md#networkstate)<`Key`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Key` | extends [`ProviderKey`](multiauth.md#providerkey)[`ProviderKey`](multiauth.md#providerkey) |

#### Type declaration

▸ (`providerKey`, `provider`, `params?`): `Promise`<[`NetworkState`](multiauth.md#networkstate)<`Key`\>\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `providerKey` | `Key` |
| `provider` | [`ProviderType`](multiauth.md#providertype)<`Key`\> |
| `params?` | [`NetworkStateParams`](multiauth.md#networkstateparams) |

##### Returns

`Promise`<[`NetworkState`](multiauth.md#networkstate)<`Key`\>\>

___

### JSONRPCResponse

Ƭ **JSONRPCResponse**<`Result`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Result` | `unknown` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `error?` | `Error` |
| `id` | `string` \| `undefined` |
| `jsonrpc` | ``"2.0"`` |
| `method` | `string` |
| `result?` | `Result` |

___

### ModalConfig

Ƭ **ModalConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `closeIcon?` | `string` \| `ReactElement` |
| `selectedIcon?` | `string` \| `ReactElement` |
| `text?` | `string` |
| `title?` | `string` |

___

### MultiAuthProviderConfig

Ƭ **MultiAuthProviderConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `modal?` | [`ModalConfig`](multiauth.md#modalconfig) |
| `networks?` | [`PartialNetworkConfig`](multiauth.md#partialnetworkconfig)[] |

___

### NetworkConfig

Ƭ **NetworkConfig**<`Key`\>: [`DisplayDefaults`](multiauth.md#displaydefaults) & { `connectors`: [`ConnectorConfig`](multiauth.md#connectorconfig)[] ; `getState`: [`GetNetworkState`](multiauth.md#getnetworkstate)<[`NetworkProvider`](multiauth.md#networkprovider)<`Key`\>\> ; `key`: `Key`  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Key` | extends [`NetworkKey`](multiauth.md#networkkey)[`NetworkKey`](multiauth.md#networkkey) |

___

### NetworkConfigDefaults

Ƭ **NetworkConfigDefaults**: [`DisplayDefaults`](multiauth.md#displaydefaults) & { `connectors`: [`ConnectorKey`](multiauth.md#connectorkey)[] ; `getState`: [`GetNetworkState`](multiauth.md#getnetworkstate)<[`ProviderKey`](multiauth.md#providerkey)\>  }

___

### NetworkKey

Ƭ **NetworkKey**: keyof [`Networks`](multiauth.md#networks)

___

### NetworkProvider

Ƭ **NetworkProvider**<`Key`\>: [`Networks`](multiauth.md#networks)[`Key`]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Key` | extends [`NetworkKey`](multiauth.md#networkkey) |

___

### NetworkState

Ƭ **NetworkState**<`Key`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Key` | extends [`ProviderKey`](multiauth.md#providerkey) |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `account` | `string` \| ``null`` |
| `chainID` | `ChainID` |
| `provider` | [`ProviderType`](multiauth.md#providertype)<`Key`\> |
| `providerKey` | `Key` |

___

### NetworkStateParams

Ƭ **NetworkStateParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `account?` | `string` |
| `chainID?` | `ChainID` \| `ChainIDParams` \| `string` \| `number` |

___

### Networks

Ƭ **Networks**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ethereum` | ``"eip1193"`` \| ``"web3"`` |

___

### PartialConfig

Ƭ **PartialConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `networks?` | [`PartialNetworkConfig`](multiauth.md#partialnetworkconfig)[] |

___

### PartialConnectorConfig

Ƭ **PartialConnectorConfig**<`Key`\>: `Key` \| `Partial`<[`ConnectorConfigDefaults`](multiauth.md#connectorconfigdefaults)\> & { `key`: `Key`  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Key` | extends [`ConnectorKey`](multiauth.md#connectorkey)[`ConnectorKey`](multiauth.md#connectorkey) |

___

### PartialNetworkConfig

Ƭ **PartialNetworkConfig**<`Key`\>: `Key` \| `Partial`<[`DisplayDefaults`](multiauth.md#displaydefaults)\> & { `connectors?`: [`PartialConnectorConfig`](multiauth.md#partialconnectorconfig)[] ; `key`: `Key`  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Key` | extends [`NetworkKey`](multiauth.md#networkkey)[`NetworkKey`](multiauth.md#networkkey) |

___

### ProviderKey

Ƭ **ProviderKey**: keyof [`ProviderTypes`](multiauth.md#providertypes)

___

### ProviderProps

Ƭ **ProviderProps**: [`MultiAuthProviderConfig`](multiauth.md#multiauthproviderconfig) & { `children`: `ReactNode`  }

___

### ProviderType

Ƭ **ProviderType**<`Key`\>: [`ProviderTypes`](multiauth.md#providertypes)[`Key`]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Key` | extends [`ProviderKey`](multiauth.md#providerkey) |

___

### ProviderTypes

Ƭ **ProviderTypes**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `eip1193` | [`EIP1193Provider`](multiauth.md#eip1193provider) |
| `web3` | [`Web3Provider`](multiauth.md#web3provider) |

___

### RequestArguments

Ƭ **RequestArguments**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `method` | `string` |
| `params?` | `unknown`[] \| `Record`<`string`, `any`\> |

___

### Web3Provider

Ƭ **Web3Provider**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `enable` | () => `Promise`<`string`[]\> |
| `sendAsync` | <Result\>(`req`: [`RequestArguments`](multiauth.md#requestarguments), `callback`: [`Web3ProviderSendCallback`](multiauth.md#web3providersendcallback)<`Result`\>) => `void` |

___

### Web3ProviderSendCallback

Ƭ **Web3ProviderSendCallback**<`Result`\>: (`err?`: `Error`, `response?`: [`JSONRPCResponse`](multiauth.md#jsonrpcresponse)<`Result`\>) => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Result` | `unknown` |

#### Type declaration

▸ (`err?`, `response?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `err?` | `Error` |
| `response?` | [`JSONRPCResponse`](multiauth.md#jsonrpcresponse)<`Result`\> |

##### Returns

`void`

## Functions

### Provider

▸ **Provider**(`props`): `ReactElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`ProviderProps`](multiauth.md#providerprops) |

#### Returns

`ReactElement`

___

### getConnectorConfig

▸ **getConnectorConfig**<`Key`\>(`network`, `connector`): [`ConnectorConfig`](multiauth.md#connectorconfig)<`Key`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Key` | extends [`ConnectorKey`](multiauth.md#connectorkey) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `network` | ``"ethereum"`` |
| `connector` | [`PartialConnectorConfig`](multiauth.md#partialconnectorconfig)<`Key`\> |

#### Returns

[`ConnectorConfig`](multiauth.md#connectorconfig)<`Key`\>

___

### getConnectorsConfig

▸ **getConnectorsConfig**(`network`, `connectors`): [`ConnectorConfig`](multiauth.md#connectorconfig)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `network` | ``"ethereum"`` |
| `connectors` | [`PartialConnectorConfig`](multiauth.md#partialconnectorconfig)<[`ConnectorKey`](multiauth.md#connectorkey)\>[] |

#### Returns

[`ConnectorConfig`](multiauth.md#connectorconfig)[]

___

### getNetworkConfig

▸ **getNetworkConfig**<`Key`\>(`network`): [`NetworkConfig`](multiauth.md#networkconfig)<`Key`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Key` | extends ``"ethereum"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `network` | [`PartialNetworkConfig`](multiauth.md#partialnetworkconfig)<`Key`\> |

#### Returns

[`NetworkConfig`](multiauth.md#networkconfig)<`Key`\>

___

### getNetworksConfig

▸ **getNetworksConfig**(`providers`): [`NetworkConfig`](multiauth.md#networkconfig)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `providers` | [`PartialNetworkConfig`](multiauth.md#partialnetworkconfig)<``"ethereum"``\>[] |

#### Returns

[`NetworkConfig`](multiauth.md#networkconfig)[]

___

### useMultiAuth

▸ **useMultiAuth**(): [[`AuthState`](multiauth.md#authstate), (`options?`: [`AuthenticateOptions`](multiauth.md#authenticateoptions)) => `Promise`<[`AuthAccount`](multiauth.md#authaccount) \| ``null``\>, () => `void`]

#### Returns

[[`AuthState`](multiauth.md#authstate), (`options?`: [`AuthenticateOptions`](multiauth.md#authenticateoptions)) => `Promise`<[`AuthAccount`](multiauth.md#authaccount) \| ``null``\>, () => `void`]
