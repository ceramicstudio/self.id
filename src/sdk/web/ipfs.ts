import { IPFS_API_URL } from '../constants'

export type LinkData = {
  Name: string
  Hash: string
  Size: number
}

export async function uploadFile(blob: Blob, fileName?: string): Promise<string> {
  const body = new FormData()
  body.append('path', blob, fileName)
  const res = await fetch(`${IPFS_API_URL}/add`, { method: 'POST', body })
  if (res.ok) {
    const { Hash } = (await res.json()) as LinkData
    return Hash
  }
  throw new Error(`Upload failed: ${res.statusText}`)
}
