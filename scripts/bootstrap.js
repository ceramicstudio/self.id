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
    name: 'Basic Profile',
    schema: schemas.BasicProfile,
  })
  console.log('// definitions')
  console.log(JSON.stringify({ basicProfile: docID }, null, 2))

  await idx.set(docID, {
    name: 'Bob Ceramic',
    emoji: '👻',
    description:
      'Curabitur vel aliquet mauris, ac varius dolor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum feugiat massa vel odio molestie posuere. Praesent aliquam velit dui. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur accumsan eros et pulvinar auctor. Nunc sapien lorem, ultricies id mauris a, bibendum accumsan sapien.',
    background: 'http://localhost:3000/temp/test-background.jpg',
    image: 'http://localhost:3000/temp/test-avatar.jpg',
    homeLocation: 'New York City',
    residenceCountry: 'US',
    url: 'https://ceramic.network',
  })
  console.log('// DID with IDX')
  console.log(idx.id)

  process.exit(0)
}

run().catch(console.error)
