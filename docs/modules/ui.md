# Module: ui

React UI theme and components.

## Purpose

This module provides a shared theme and basic components based on the
[Grommet library](https://v2.grommet.io/). It is used by other modules of the SDK as well as
the [Self.ID reference application](https://self.id), and can be used by other applications to
implement a similar UI.

## Installation

```sh
npm install @self.id/ui
```

## Common use-cases

### Configure the Provider

The [`Provider`](ui.md#provider) component must be added at the root of the
application tree in order to use the other component described below.

```ts
import { Provider } from '@self.id/ui'

function App({ children }) {
  return <Provider>{children}</Provider>
}
```

### Avatar placeholder

The [`AvatarPlaceholder`](ui.md#avatarplaceholder) component is based on
[Boring Avatars](https://github.com/boringdesigners/boring-avatars) and used in the
[Self.ID application](https://self.id) to display a fallback placeholder for profiles without
a defined image.

```ts
import { AvatarPlaceholder } from '@self.id/ui'

export function Avatar({ did }) {
  return <AvatarPlaceholder did={did} size={40} />
}
```

## Type aliases

### AvatarPlaceholderProps

Ƭ **AvatarPlaceholderProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `did?` | `string` \| ``null`` |
| `size` | `number` \| `string` |

___

### ColorType

Ƭ **ColorType**: `string` \| { `dark?`: `string` ; `light?`: `string`  } \| `undefined`

___

### Colors

Ƭ **Colors**: `Record`<`string`, [`ColorType`](ui.md#colortype)\>

___

### ProviderProps

Ƭ **ProviderProps**: `GrommetExtendedProps`

## Variables

### colors

• **colors**: [`Colors`](ui.md#colors)

___

### theme

• **theme**: `ThemeType`

## Functions

### AvatarPlaceholder

▸ **AvatarPlaceholder**(`props`): `JSX.Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`AvatarPlaceholderProps`](ui.md#avatarplaceholderprops) |

#### Returns

`JSX.Element`

___

### Provider

▸ **Provider**(`props`): `JSX.Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `GrommetExtendedProps` |

#### Returns

`JSX.Element`
