import type { RequestArguments, Web3Provider } from './types'

export async function web3ProviderRequest<Result = unknown>(
  provider: Web3Provider,
  request: RequestArguments
): Promise<Result> {
  return new Promise((resolve, reject) => {
    provider.sendAsync(request, (err, response) => {
      if (err == null) {
        if (response == null) {
          reject(new Error('Missing response'))
        } else if (response.error == null) {
          resolve(response.result as Result)
        } else {
          reject(response.error)
        }
      } else {
        reject(err)
      }
    })
  })
}
