import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content in hide mode', () => {
  const blog = {
    title: "test",
    author: "hello",
    url: "test.com",
    likes: 123
  }

    const component = render(
    <Blog blog={blog} />
    )

  expect(component.container).toHaveTextContent(
    'test'
  )

  const span1 = component.container.querySelector('.title')
  expect(span1).toHaveTextContent('test')

  const span2 = component.container.querySelector('.author')
  expect(span2).toHaveTextContent('hello')

  const span3 = component.container.querySelector('.url')
  expect(span3).not.toBeVisible()

  const span4 = component.container.querySelector('.likes')
  expect(span4).not.toBeVisible()

})

test('render content in show mode', () => {
    const blog = {
        title: "test",
        author: "hello",
        url: "test.com",
        likes: 123
    }
  
    const component = render(
        <Blog blog={blog} />
      )
  
    const button = component.getByText('view')
    fireEvent.click(button)
  
    const span1 = component.container.querySelector('.title')
    expect(span1).toHaveTextContent('test')
  
    const span2 = component.container.querySelector('.author')
    expect(span2).toHaveTextContent('hello')
  
    const span3 = component.container.querySelector('.url')
    expect(span3).toBeVisible()
  
    const span4 = component.container.querySelector('.likes')
    expect(span4).toBeVisible()
  })

  test('clicking the button calls event handler twice', () => {
    const blog = {
        title: "test",
        author: "hello",
        url: "test.com",
        likes: 123
    }
  
    const mockHandler = jest.fn()
  
    const component = render(
        <Blog blog={blog} updateBlogLikes={mockHandler} />
    )
  
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)
    const button = component.getByText('Like')
    fireEvent.click(button)
    fireEvent.click(button)

  
    expect(mockHandler.mock.calls).toHaveLength(2)
  })