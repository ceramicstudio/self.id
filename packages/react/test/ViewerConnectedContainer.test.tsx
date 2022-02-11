/**
 * @jest-environment ./jest-environment-jsdom-fix
 */

import { jest } from '@jest/globals'
import { render } from '@testing-library/react'
import { Provider as JotaiProvider } from 'jotai'
import React from 'react'

import { ViewerConnectedContainer, connectionAtom, stateScope } from '../src'

describe('ViewerConnectedContainer', () => {
  test('renders children when connected', () => {
    const renderFallback = jest.fn(() => null)

    function Child() {
      return <p data-testid="test">OK!</p>
    }

    const { getByTestId } = render(
      <JotaiProvider
        initialValues={[[connectionAtom, { status: 'connected', selfID: {} }]]}
        scope={stateScope}>
        <ViewerConnectedContainer renderFallback={renderFallback}>
          <Child />
        </ViewerConnectedContainer>
      </JotaiProvider>
    )

    expect(renderFallback).not.toBeCalled()
    expect(getByTestId('test')).toBeDefined()
  })

  test('renders fallback when not connected', () => {
    const renderFallback = jest.fn(() => <p data-testid="fallback">connect</p>)

    function Child() {
      return <p data-testid="test">OK!</p>
    }

    const { getByTestId, queryByTestId } = render(
      <JotaiProvider initialValues={[[connectionAtom, { status: 'idle' }]]} scope={stateScope}>
        <ViewerConnectedContainer renderFallback={renderFallback}>
          <Child />
        </ViewerConnectedContainer>
      </JotaiProvider>
    )

    expect(renderFallback).toBeCalledWith({ status: 'idle' })
    expect(getByTestId('fallback')).toBeDefined()
    expect(queryByTestId('test')).toBeNull()
  })
})
