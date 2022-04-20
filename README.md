# SelfID

Monorepo for the SelfID [SDK](#sdk) and [reference application](#application).

## Installation

This monorepo uses Yarn workspaces, make sure to install it first if you don't already have it.

1. `yarn install` to install the dependencies
1. `yarn build` to build all the packages

### Additional scripts

- `yarn lint` to run the linter in all packages
- `yarn test` to run tests in all packages
- `yarn docs` to generate API documentation

## Application

The SelfID application is available using Ceramic's mainnet on [self.id](https://self.id) and the Clay testnet on [clay.self.id](https://clay.self.id).

## SDK

### [Documentation](https://developers.ceramic.network/tools/self-id/overview/#sdk)

### Packages

Self.ID packages are organized in the following stack:

```sh
┌─────────────────────────────┐ ┌─────────────┐
│          framework          │ │ 3box-legacy │
├─────────────┬─┬─────────────┤ └─────────────┘
├─────────────┤ ├─────────────┤
│    react    │ │ image-utils │
├─────────────┤ └─────────────┘
├─────────────┤
│     web     │
├─────────────┤
├─────────────┤
│    core     │
└─────────────┘
```

| Name                                             | Description                                                                                                                                  | Version                                                               |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [`@self.id/core`](./packages/core)               | [Read public records in Node and browsers environments](https://developers.ceramic.network/reference/self-id/modules/core/)                  | ![npm version](https://img.shields.io/npm/v/@self.id/core.svg)        |
| [`@self.id/web`](./packages/web)                 | [Read and write records in browsers environments](https://developers.ceramic.network/reference/self-id/modules/web/)                         | ![npm version](https://img.shields.io/npm/v/@self.id/web.svg)         |
| [`@self.id/react`](./packages/react)             | [React hooks and utilities for authentication and records interactions](https://developers.ceramic.network/reference/self-id/modules/react/) | ![npm version](https://img.shields.io/npm/v/@self.id/react.svg)       |
| [`@self.id/image-utils`](./packages/image-utils) | [Image utilities for Self.ID profiles](https://developers.ceramic.network/reference/self-id/modules/image_utils/)                            | ![npm version](https://img.shields.io/npm/v/@self.id/image-utils.svg) |
| [`@self.id/framework`](./packages/framework)     | [React framework for decentralized apps](https://developers.ceramic.network/reference/self-id/modules/framework/)                            | ![npm version](https://img.shields.io/npm/v/@self.id/framework.svg)   |
| [`@self.id/3box-legacy`](./packages/3box-legacy) | [Load legacy 3Box profiles](https://developers.ceramic.network/reference/self-id/modules/3box_legacy/)                                       | ![npm version](https://img.shields.io/npm/v/@self.id/3box-legacy.svg) |

## Templates

Predefined setups using common technologies to build applications using the Self.ID SDK.

| Name                                                               | Description                                                                                                           |
| ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| [`next-notes-typescript`](./templates/next-notes-typescript)       | Notes taking application setup using [Next.js](https://nextjs.org/) and [TypeScript](https://www.typescriptlang.org/) |
| [`webpack-basic`](./templates/webpack-basic)                       | Basic [Webpack](https://webpack.js.org/) setup                                                                        |
| [`webpack-basic-typescript`](./templates/webpack-basic-typescript) | Basic [Webpack](https://webpack.js.org/) setup using [TypeScript](https://www.typescriptlang.org/)                    |

<!-- | [`vite-basic`](./templates/vite-basic)                             | Basic [Vite](https://vitejs.dev/) setup                                                                               | -->

## Maintainers

- Paul Le Cam ([@paullecam](http://github.com/paullecam))

## License

The SDK packages, templates and apps are dual licensed under [MIT](LICENSE-MIT) and [Apache 2](LICENSE-APACHE).
