# Basic Vite template for Self.ID

Using the [Self.ID Framework](https://developers.ceramic.network/tools/self-id/framework/) with [Vite](https://vitejs.dev/).

## ⚠️ dependency issue

This template is currently not supported, compilation fails [due to the `caip` dependency](https://github.com/ChainAgnostic/caip-js/issues/22).

## Getting Started

### 1. Copy this template

```sh
npx degit ceramicstudio/self.id/templates/vite-basic my-selfid-app
```

Replace `my-selfid-app` by the folder name you want and access it once installed.

### 2. Install dependencies

In your application folder:

```sh
npm install
# or
yarn install
```

### 3. Run scripts

Use `npm run` or `yarn run` with one of the following scripts:

- `dev`: compile and run a development server
- `build`: compile for production
- `serve`: run a local server for production build

## Learn More

Learn more about the [Self.ID SDK](https://developers.ceramic.network/tools/self-id/overview/) and [framework](https://developers.ceramic.network/tools/self-id/framework/) in the [Ceramic documentation](https://developers.ceramic.network/).

## License

Dual licensed under [MIT](https://github.com/ceramicstudio/self.id/blob/main/LICENSE-MIT) and [Apache 2](https://github.com/ceramicstudio/self.id/blob/main/LICENSE-APACHE).
