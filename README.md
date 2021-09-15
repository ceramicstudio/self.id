# SelfID

Monorepo for the SelfID [application](#application) and [SDK](#sdk).

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

| Name                                             | Description                                                                                                                 | Version                                                               |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [`@self.id/core`](./packages/core)               | [Read public records in Node and browsers environments](https://developers.ceramic.network/reference/self-id/modules/core/) | ![npm version](https://img.shields.io/npm/v/@self.id/core.svg)        |
| [`@self.id/web`](./packages/web)                 | [Read and write records in browsers environments](https://developers.ceramic.network/reference/self-id/modules/web/)        | ![npm version](https://img.shields.io/npm/v/@self.id/web.svg)         |
| [`@self.id/image-utils`](./packages/image-utils) | [Image utilities for Self.ID profiles](https://developers.ceramic.network/reference/self-id/modules/image_utils/)           | ![npm version](https://img.shields.io/npm/v/@self.id/image-utils.svg) |
| [`@self.id/3box-legacy`](./packages/3box-legacy) | [Load legacy 3Box profiles](https://developers.ceramic.network/reference/self-id/modules/3box_legacy/)                      | ![npm version](https://img.shields.io/npm/v/@self.id/3box-legacy.svg) |

## Maintainers

- Paul Le Cam ([@paullecam](http://github.com/paullecam))

## License

The SDK packages are dual licensed under [MIT](LICENSE-MIT) and [Apache 2](LICENSE-APACHE), while the application is licensed under [GPL 3](apps/self.id/LICENSE).
