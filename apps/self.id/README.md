# Self.ID website

## Local development

The Self.ID website uses [Next.js](https://nextjs.org/) and the Self.ID SDK.

1. Make sure the Ceramic daemon is running locally on port 7007.
1. Create or edit a `.env.local` file with the following contents: `NEXT_PUBLIC_APP_NETWORK=local-clay`.
1. Run `yarn dev` to start the Next.js development server.
