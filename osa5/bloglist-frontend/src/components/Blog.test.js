import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  beforeEach(() => {
    const blog = {
      title: 'best blog',
      author: 'mluukkainen',
      likes: 5,
      url: 'www.luukka.fi',
      user: {
        name: 'Matti Luukkainen',
        username: 'mluukkai'
      }
    }

    component = render(
      <Blog blog={blog} user={{ username: 'miika' }} />
    )
  })

  test('at start title and author div is shown', () => {
    component.container.querySelector('.heading')
  })

  test('at start content is not shown', () => {
    expect(component.container).not.toHaveTextContent('www.luukka.fi')
  })

  test('after clicking heading, content div are shown', () => {
    const heading = component.container.querySelector('.heading')
    fireEvent.click(heading)

    component.container.querySelector('.content')
  })

  test('after clicking heading, content is shown', () => {
    const heading = component.container.querySelector('.heading')
    fireEvent.click(heading)

    expect(component.container).toHaveTextContent('www.luukka.fi')
  })

  test('after clicking heading, heading are still shown', () => {
    const heading = component.container.querySelector('.heading')
    fireEvent.click(heading)

    expect(component.container).toHaveTextContent('best blog mluukkainen')
  })
})