import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import TodoApp from '../components/TodoApp'

describe('TodoApp', () => {
  it('renders without crashing', () => {
    const { container } = render(<TodoApp />)
    expect(container).toBeTruthy()
  })
})