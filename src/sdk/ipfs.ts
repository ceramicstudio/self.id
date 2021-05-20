export const IPFS_API_URL = 'https://ipfs.infura.io:5001/api/v0'
export const IPFS_URL = 'https://ipfs.infura.io/ipfs/'
export const IPFS_PREFIX = 'ipfs://'

export type LinkData = {
  Name: string
  Hash: string
  Size: number
}

export async function addFile(blob: Blob, fileName?: string): Promise<string> {
  const body = new FormData()
  body.append('path', blob, fileName)
  const res = await fetch(`${IPFS_API_URL}/add`, { method: 'POST', body })
  if (res.ok) {
    const { Hash } = (await res.json()) as LinkData
    return Hash
  }
  throw new Error(`Upload failed: ${res.statusText}`)
}
