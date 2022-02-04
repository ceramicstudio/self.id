/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react'

import { AvatarPlaceholder } from '../src'

describe('AvatarPlaceholder', () => {
  test('uses the provided did and size props', () => {
    const { asFragment } = render(<AvatarPlaceholder did="did:test:123" size={32} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('uses a default value when the did prop is not provided', () => {
    const { asFragment } = render(<AvatarPlaceholder size={20} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
