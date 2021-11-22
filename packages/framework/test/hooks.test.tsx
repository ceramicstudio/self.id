/**
 * @jest-environment ./jest-environment-jsdom-fix
 */

import { act, renderHook } from '@testing-library/react-hooks'
import React from 'react'
import type { ReactNode } from 'react'

import { Provider, useConnection } from '../src'

type ChildrenProps = { children: ReactNode }

describe('hooks', () => {
  const wrapper = ({ children }: ChildrenProps) => <Provider>{children}</Provider>

  test('useConnection() connection flow', () => {
    const { result } = renderHook(() => useConnection(), { wrapper })
    expect(result.current[0]).toEqual({ status: 'disconnected' })

    act(() => {
      void result.current[1]()
    })

    expect(result.current[0]).toEqual({ status: 'connecting' })
  })
})
