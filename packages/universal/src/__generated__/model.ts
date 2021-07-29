// This is a file generated by the publish-model.mjs script, do not edit manually

import type { BasicProfile } from '@datamodels/self.id-profile'
import type { AlsoKnownAs } from '@datamodels/self.id-social-accounts'
import type { Definition, IdentityIndex } from '@glazed/did-datastore-model'
import type { ModelTypeAliases, PublishedModel } from '@glazed/types'

export type ModelTypes = ModelTypeAliases<
  {
    AlsoKnownAs: AlsoKnownAs
    BasicProfile: BasicProfile
    DataStoreDefinition: Definition
    DataStoreIdentityIndex: IdentityIndex
  },
  {
    alsoKnownAs: 'AlsoKnownAs'
    basicProfile: 'BasicProfile'
  }
>

export const model: PublishedModel<ModelTypes> = {
  definitions: {
    basicProfile: 'kjzl6cwe1jw145cjbeko9kil8g9bxszjhyde21ob8epxuxkaon1izyqsu8wgcic',
    alsoKnownAs: 'kjzl6cwe1jw146zfmqa10a5x1vry6au3t362p44uttz4l0k4hi88o41zplhmxnf',
  },
  schemas: {
    DataStoreDefinition:
      'ceramic://k3y52l7qbv1fry1fp4s0nwdarh0vahusarpposgevy0pemiykymd2ord6swtharcw',
    DataStoreIdentityIndex:
      'ceramic://k3y52l7qbv1fryjn62sggjh1lpn11c56qfofzmty190d62hwk1cal1c7qc5he54ow',
    BasicProfile: 'ceramic://k3y52l7qbv1frxt706gqfzmq6cbqdkptzk8uudaryhlkf6ly9vx21hqu4r6k1jqio',
    AlsoKnownAs: 'ceramic://k3y52l7qbv1fryojt8n8cw2k04p9wp67ly59iwqs65dejso566fij5wsdrb871yio',
  },
  tiles: {},
}
