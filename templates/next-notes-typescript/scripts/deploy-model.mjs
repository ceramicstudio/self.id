import { readFile, writeFile } from 'node:fs/promises'
import { CeramicClient } from '@ceramicnetwork/http-client'
import { ModelManager } from '@glazed/devtools'

const CERAMIC_URL = process.env.CERAMIC_URL || 'https://ceramic-clay.3boxlabs.com'

// Connect to the Ceramic node
const ceramic = new CeramicClient(CERAMIC_URL)

// Load and create a manager for the model
const bytes = await readFile(new URL('model.json', import.meta.url))
const manager = ModelManager.fromJSON({ ceramic, model: JSON.parse(bytes.toString()) })

// Write deployed model aliases to file
const aliases = await manager.deploy()
await writeFile(
  new URL('../src/__generated__/aliases.ts', import.meta.url),
  `export const aliases = ${JSON.stringify(aliases)}`
)

console.log('Deployed model aliases written to src/__generated__/aliases.ts file:', aliases)
