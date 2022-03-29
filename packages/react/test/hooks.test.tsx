/**
 * @jest-environment ./jest-environment-jsdom-fix
 */

import type { DIDDataStore } from '@glazed/did-datastore'
import { jest } from '@jest/globals'
import { PublicID } from '@self.id/core'
import type { EthereumAuthProvider, SelfID, WebClientParams } from '@self.id/web'
import { act, renderHook } from '@testing-library/react-hooks'
import { Provider as JotaiProvider } from 'jotai'
import React from 'react'
import type { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import {
  Provider,
  ReactClient,
  connectionAtom,
  stateScope,
  useClient,
  usePublicRecord,
  useViewerConnection,
  useViewerID,
  useViewerRecord,
} from '../src'

type ChildrenProps = { children: ReactNode }

describe('hooks', () => {
  const wrapper = ({ children }: ChildrenProps) => <Provider>{children}</Provider>

  test('useClient() returns the ReactClient instance', () => {
    const { result } = renderHook(() => useClient(), { wrapper })
    expect(result.current).toBeInstanceOf(ReactClient)
  })

  describe('useViewerID()', () => {
    test('returns null if there is no known viewer', () => {
      const { result } = renderHook(() => useViewerID(), { wrapper })
      expect(result.current).toBeNull()
    })

    test('returns a PublicID of the known viewer', () => {
      const stateWrapper = ({ children }: ChildrenProps) => (
        <Provider state={{ viewerID: 'did:test:123' }}>{children}</Provider>
      )
      const { result } = renderHook(() => useViewerID(), { wrapper: stateWrapper })
      expect(result.current).toBeInstanceOf(PublicID)
      expect(result.current?.id).toBe('did:test:123')
    })
  })

  describe('useViewerConnection()', () => {
    test('with successful connection', async () => {
      const selfID = { id: 'did:test:123' }
      const authenticate = jest.fn(() => Promise.resolve(selfID as SelfID))
      const client = new ReactClient({} as WebClientParams)
      client.authenticate = authenticate

      const clientWrapper = ({ children }: ChildrenProps) => (
        <Provider client={client}>{children}</Provider>
      )
      const { result, waitForValueToChange } = renderHook(() => useViewerConnection(), {
        wrapper: clientWrapper,
      })
      expect(result.current[0]).toEqual({ status: 'idle' })

      act(() => {
        void result.current[1]({} as EthereumAuthProvider)
      })
      await waitForValueToChange(() => result.current[0].status === 'connected')

      expect(authenticate).toBeCalledTimes(1)
      expect(result.current[0]).toEqual({ status: 'connected', selfID })
    })

    test('with authentication error', async () => {
      const error = new Error('Failed')
      const authenticate = jest.fn(() => Promise.reject(error))
      const client = new ReactClient({} as WebClientParams)
      client.authenticate = authenticate

      const clientWrapper = ({ children }: ChildrenProps) => (
        <Provider client={client}>{children}</Provider>
      )
      const { result, waitForValueToChange } = renderHook(() => useViewerConnection(), {
        wrapper: clientWrapper,
      })
      expect(result.current[0]).toEqual({ status: 'idle' })

      act(() => {
        void result.current[1]({} as EthereumAuthProvider)
      })
      await waitForValueToChange(() => result.current[0].status === 'failed')

      expect(result.current[0]).toEqual({ status: 'failed', error })
    })
  })

  describe('useViewerRecord()', () => {
    test('with no viewer', () => {
      const { result } = renderHook(() => useViewerRecord('basicProfile'), { wrapper })
      expect(result.current).toEqual({
        isLoadable: false,
        isLoading: false,
        isError: false,
        isMutable: false,
        isMutating: false,
      })
    })

    test('with PublicID viewer', async () => {
      const profile = { name: 'Alice' }
      const get = jest.fn(() => profile)
      const client = new ReactClient({} as WebClientParams)
      client._dataStore = { get } as unknown as DIDDataStore

      const stateWrapper = ({ children }: ChildrenProps) => (
        <Provider client={client} state={{ viewerID: 'did:test:123' }}>
          {children}
        </Provider>
      )
      const { result, waitForValueToChange } = renderHook(() => useViewerRecord('basicProfile'), {
        wrapper: stateWrapper,
      })
      expect(result.current).toEqual({
        content: undefined,
        error: null,
        isLoadable: true,
        isLoading: true,
        isError: false,
        isMutable: false,
        isMutating: false,
        set: expect.any(Function),
        merge: expect.any(Function),
      })

      await waitForValueToChange(() => !result.current.isLoading)
      expect(result.current).toEqual({
        content: profile,
        error: null,
        isLoadable: true,
        isLoading: false,
        isError: false,
        isMutable: false,
        isMutating: false,
        set: expect.any(Function),
        merge: expect.any(Function),
      })
    })

    test('with SelfID viewer', async () => {
      const profile = { name: 'Alice' }
      const get = jest.fn(() => profile)
      const set = jest.fn()

      const client = new QueryClient()
      const stateWrapper = ({ children }: ChildrenProps) => (
        <JotaiProvider
          initialValues={[[connectionAtom, { status: 'connected', selfID: { get, set } }]]}
          scope={stateScope}>
          <QueryClientProvider client={client}>{children}</QueryClientProvider>
        </JotaiProvider>
      )

      const { result, waitForValueToChange } = renderHook(() => useViewerRecord('basicProfile'), {
        wrapper: stateWrapper,
      })
      expect(result.current).toEqual({
        content: undefined,
        error: null,
        isLoadable: true,
        isLoading: true,
        isError: false,
        isMutable: true,
        isMutating: false,
        set: expect.any(Function),
        merge: expect.any(Function),
      })

      await waitForValueToChange(() => !result.current.isLoading)
      expect(result.current).toEqual({
        content: profile,
        error: null,
        isLoadable: true,
        isLoading: false,
        isError: false,
        isMutable: true,
        isMutating: false,
        set: expect.any(Function),
        merge: expect.any(Function),
      })

      act(() => {
        if (result.current.isMutable) {
          void result.current.set({ name: 'Bob' })
        }
      })
      await waitForValueToChange(() => !result.current.isMutating)

      expect(set).toBeCalledTimes(1)
      expect(result.current).toEqual({
        content: { name: 'Bob' },
        error: null,
        isLoadable: true,
        isLoading: false,
        isError: false,
        isMutable: true,
        isMutating: false,
        set: expect.any(Function),
        merge: expect.any(Function),
      })
    })
  })

  test('usePublicRecord()', async () => {
    const profile = { name: 'Alice' }
    const get = jest.fn(() => profile)
    const client = new ReactClient({} as WebClientParams)
    client._dataStore = { get } as unknown as DIDDataStore

    const clientWrapper = ({ children }: ChildrenProps) => (
      <Provider client={client}>{children}</Provider>
    )
    const { result, waitForValueToChange } = renderHook(
      () => usePublicRecord('basicProfile', 'did:test:123'),
      { wrapper: clientWrapper }
    )
    expect(result.current).toEqual({
      content: undefined,
      isLoading: true,
      isError: false,
      error: null,
    })

    await waitForValueToChange(() => !result.current.isLoading)
    expect(result.current).toEqual({
      content: profile,
      isLoading: false,
      isError: false,
      error: null,
    })
  })
})
