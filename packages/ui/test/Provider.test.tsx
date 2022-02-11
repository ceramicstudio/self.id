/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react'
import { defaultProps } from 'grommet'
import { deepMerge } from 'grommet/utils'
import React, { type Context, useContext } from 'react'
import { ThemeContext } from 'styled-components'

import { Provider, theme } from '../src'
import type { ThemeType } from '../src'

describe('AvatarPlaceholder', () => {
  test('uses the provided theme prop', () => {
    const injectedTheme = { global: { colors: { brand: 'test-color' } } }

    function Child() {
      const providedTheme = useContext<ThemeType>(ThemeContext as Context<ThemeType>)
      expect(providedTheme).toEqual(deepMerge({}, defaultProps.theme, injectedTheme))
      return null
    }

    render(
      <Provider theme={injectedTheme}>
        <Child />
      </Provider>
    )
  })

  test('uses the default theme', () => {
    function Child() {
      const providedTheme = useContext<ThemeType>(ThemeContext as Context<ThemeType>)
      expect(providedTheme).toEqual(deepMerge({}, defaultProps.theme, theme))
      return null
    }

    render(
      <Provider>
        <Child />
      </Provider>
    )
  })
})
