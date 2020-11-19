import { IPFS_ADD_URL } from '../constants'

interface AddResponse {
  Name: string
  Hash: string
  Size: string
}

export async function uploadImage(data: FormData): Promise<string> {
  const res = await fetch(IPFS_ADD_URL, { method: 'POST', body: data })
  if (res.ok) {
    const { Hash } = (await res.json()) as AddResponse
    return Hash
  }
  throw new Error(`Upload failed: ${res.statusText}`)
}
