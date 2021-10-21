# Module: ui

UI theme and React components

```sh
npm install @self.id/ui
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
