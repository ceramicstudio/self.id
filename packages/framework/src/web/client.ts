import type { CoreModelTypes } from '@self.id/core'
import type {
  AuthenticateParams,
  EthereumAuthProvider,
  EthereumProvider,
  SelfID,
  SelfIDParams,
  WebClient,
  WebClientParams,
} from '@self.id/web'

export async function createEthereumAuthProvider(
  ethereumProvider: EthereumProvider
): Promise<EthereumAuthProvider> {
  const [{ EthereumAuthProvider }, accounts] = await Promise.all([
    import('@self.id/web'),
    ethereumProvider.request({ method: 'eth_requestAccounts' }),
  ])
  return new EthereumAuthProvider(ethereumProvider, (accounts as Array<string>)[0])
}

export async function createWebClient<ModelTypes extends CoreModelTypes = CoreModelTypes>(
  params: WebClientParams<ModelTypes>
): Promise<WebClient<ModelTypes>> {
  const { WebClient } = await import('@self.id/web')
  return new WebClient<ModelTypes>(params)
}

export async function createSelfID<ModelTypes extends CoreModelTypes = CoreModelTypes>(
  params: SelfIDParams
): Promise<SelfID<ModelTypes>> {
  const { SelfID } = await import('@self.id/web')
  return new SelfID<ModelTypes>(params)
}

export async function authenticateSelfID<ModelTypes extends CoreModelTypes = CoreModelTypes>(
  params: AuthenticateParams<ModelTypes>
): Promise<SelfID<ModelTypes>> {
  const { SelfID } = await import('@self.id/web')
  return await SelfID.authenticate<ModelTypes>(params)
}
