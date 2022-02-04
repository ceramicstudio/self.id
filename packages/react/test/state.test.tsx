/**
 * @jest-environment ./jest-environment-jsdom-fix
 */

import { CeramicClient } from '@ceramicnetwork/http-client'
import { renderHook } from '@testing-library/react-hooks'
import { useAtom } from 'jotai'
import type { ReactNode } from 'react'

import {
  DEFAULT_CLIENT_CONFIG,
  Provider,
  clientConfigAtom,
  connectionAtom,
  coreAtom,
  localViewerIDAtom,
  requestViewerIDAtom,
  stateScope,
} from '../src'

const CeramicMock = CeramicClient as jest.MockedClass<typeof CeramicClient>

jest.mock('@ceramicnetwork/http-client')

type ChildrenProps = { children: ReactNode }

describe('state', () => {
  const wrapper = ({ children }: ChildrenProps) => <Provider>{children}</Provider>

  test('clientConfigAtom has a default value', () => {
    const { result } = renderHook(() => useAtom(clientConfigAtom, stateScope), { wrapper })
    expect(result.current[0]).toBe(DEFAULT_CLIENT_CONFIG)
  })

  test('coreAtom derives its value from clientConfigAtom', () => {
    CeramicMock.mockImplementation(
      (url: string | undefined) => ({ url } as unknown as CeramicClient)
    )
    const stateWrapper = ({ children }: ChildrenProps) => (
      <Provider client={{ ceramic: 'foo' }}>{children}</Provider>
    )
    const { result: config } = renderHook(() => useAtom(clientConfigAtom, stateScope), {
      wrapper: stateWrapper,
    })
    const { result: core } = renderHook(() => useAtom(coreAtom, stateScope), {
      wrapper: stateWrapper,
    })

    expect(config.current[0]).toEqual({ ceramic: 'foo' })
    expect(core.current[0].ceramic).toEqual({ url: 'foo' })
  })

  test('connectionAtom has a default value', () => {
    const { result } = renderHook(() => useAtom(connectionAtom, stateScope), { wrapper })
    expect(result.current[0]).toEqual({ status: 'idle' })
  })

  test('requestViewerIDAtom has a value injected by the provider', () => {
    const stateWrapper = ({ children }: ChildrenProps) => (
      <Provider state={{ viewerID: 'did:test:123' }}>{children}</Provider>
    )
    const { result } = renderHook(() => useAtom(requestViewerIDAtom, stateScope), {
      wrapper: stateWrapper,
    })
    expect(result.current[0]).toBe('did:test:123')
  })

  test('localViewerIDAtom value defaults to null', () => {
    const { result } = renderHook(() => useAtom(localViewerIDAtom, stateScope), { wrapper })
    expect(result.current[0]).toBeNull()
  })
})
