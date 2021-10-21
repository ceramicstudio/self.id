/**
 * @jest-environment jsdom
 */

import { act, renderHook } from '@testing-library/react-hooks'
import React from 'react'
import type { ReactNode } from 'react'

// Use compiled files for tests as Jest doesn't support ESM/import.meta
import { Provider, useMultiAuth } from '..'

type ChildrenProps = { children: ReactNode }

describe('hooks', () => {
  const wrapper = ({ children }: ChildrenProps) => <Provider>{children}</Provider>

  describe('useMultiAuth()', () => {
    test('connection flow', () => {
      const { result } = renderHook(() => useMultiAuth(), { wrapper })
      expect(result.current[0]).toEqual({ status: 'idle' })

      act(() => {
        void result.current[1]()
      })

      expect(result.current[0]).toEqual({
        status: 'authenticating',
        modal: true,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        promise: expect.any(Promise),
      })
    })
  })
})
