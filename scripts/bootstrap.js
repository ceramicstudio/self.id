const Ceramic = require('@ceramicnetwork/ceramic-http-client').default
const { IDX } = require('@ceramicstudio/idx')
const { publishSchemas, schemasList } = require('@ceramicstudio/idx-schemas')
const Wallet = require('identity-wallet').default

const SEED = '0x08b2e655d239e24e3ca9aa17bc1d05c1dee289d6ebf0b3542fd9536912d51ee0'

const ceramic = new Ceramic('http://localhost:7007')

async function run() {
  const wallet = await Wallet.create({
    ceramic,
    seed: SEED,
    getPermission() {
      return Promise.resolve([])
    },
  })
  await ceramic.setDIDProvider(wallet.getDidProvider())

  const schemas = await publishSchemas({ ceramic, schemas: schemasList })
  console.log('// schemas')
  console.log(JSON.stringify(schemas, null, 2))

  const idx = new IDX({ ceramic, schemas })
  const docID = await idx.createDefinition({
    name: 'idxBasicProfile',
    schema: schemas.BasicProfile,
  })
  console.log('// definitions')
  console.log(JSON.stringify({ 'idx:basicProfile': docID }, null, 2))

  await idx.set(docID, { name: 'Bob' })
  console.log('// DID with IDX')
  console.log(idx.id)

  process.exit(0)
}

run().catch(console.error)
