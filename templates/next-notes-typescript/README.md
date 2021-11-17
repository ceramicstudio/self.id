# Notes application Next.js template for Self.ID with TypeScript

Using the [Self.ID Framework](https://developers.ceramic.network/tools/self-id/framework/) with [Next.js](https://nextjs.org/) and [TypeScript](https://www.typescriptlang.org/).

## Getting Started

### 1. Copy this template

```sh
npx degit ceramicstudio/self.id/templates/next-notes-typescript my-selfid-app
```

Replace `my-selfid-app` by the folder name you want and access it once installed.

### 2. Install dependencies

In your application folder:

```sh
npm install
# or
yarn install
```

### 3. Publish the data model

This application uses a custom [data model](https://developers.ceramic.network/tools/glaze/datamodel/) created by the [`create-model` script](./scripts/create-model.mjs). This model needs to be published to the Ceramic node before running the app.

```sh
npm run publish-model
# or
yarn run publish-model
```

### 4. Start the development server

```sh
npm run dev
# or
yarn run dev
```

## Scripts

Use `npm run` or `yarn run` with one of the following scripts:

### `dev`

Compile and run a development server.

### `build`

Compile for production.

### `lint`

Lint the source code.

### `start`

Run a local server for production build.

### `publish-model`

Run the [`publish-model` script](./scripts/publish-model.mjs).

### `create-model`

Run the [`create-model` script](./scripts/create-model.mjs).

This is only needed to make changes to the model used by the app.
A hex-encoded 32-byte `SEED` environment variable must be present to create a key DID for the model when running the script.

## Learn More

Learn more about [data models](https://developers.ceramic.network/tools/glaze/datamodel/), the [Self.ID SDK](https://developers.ceramic.network/tools/self-id/overview/) and [framework](https://developers.ceramic.network/tools/self-id/framework/) in the [Ceramic documentation](https://developers.ceramic.network/).

## License

Dual licensed under [MIT](https://github.com/ceramicstudio/self.id/blob/main/LICENSE-MIT) and [Apache 2](https://github.com/ceramicstudio/self.id/blob/main/LICENSE-APACHE).
