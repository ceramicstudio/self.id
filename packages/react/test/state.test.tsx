/**
 * @jest-environment ./jest-environment-jsdom-fix
 */

import type { WebClientParams } from '@self.id/web'
import { renderHook } from '@testing-library/react-hooks'
import { useAtom } from 'jotai'
import React from 'react'
import type { ReactNode } from 'react'

import {
  Provider,
  ReactClient,
  clientAtom,
  connectionAtom,
  localViewerIDAtom,
  requestViewerIDAtom,
  stateScope,
} from '../src'

type ChildrenProps = { children: ReactNode }

describe('state', () => {
  const wrapper = ({ children }: ChildrenProps) => <Provider>{children}</Provider>

  test('clientAtom has a default value', () => {
    const { result } = renderHook(() => useAtom(clientAtom, stateScope), { wrapper })
    expect(result.current[0]).toBeInstanceOf(ReactClient)
  })

  test('clientAtom instance can be injected in provider', () => {
    const client = new ReactClient({} as WebClientParams)
    const stateWrapper = ({ children }: ChildrenProps) => (
      <Provider client={client}>{children}</Provider>
    )
    const { result } = renderHook(() => useAtom(clientAtom, stateScope), {
      wrapper: stateWrapper,
    })
    expect(result.current[0]).toBe(client)
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
