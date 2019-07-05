import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

describe('renders content', () => {
  test('renders title author and likes', () => {
    const blog = {
      title: 'best blog',
      author: 'mluukkainen',
      likes: 5
    }

    const component = render(
      <SimpleBlog blog={blog} />
    )

    const div1 = component.container.querySelector('.heading')
    expect(div1).toHaveTextContent(
      'best blog mluukkainen'
    )

    const div2 = component.container.querySelector('.content')
    expect(div2).toHaveTextContent(
      'blog has 5 likes'
    )
  })
})

describe('button works', () => {
  test('clicking button twice calls eventhandler twice', () => {
    const blog = {
      title: 'best blog',
      author: 'mluukkainen',
      likes: 5
    }

    const mockHandler = jest.fn()

    const { getByText } = render(
      <SimpleBlog blog={blog} onClick={mockHandler} />
    )

    const button = getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})