import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('<BlogForm/> calls the callback function with correct props', () => {

    const createBlog = jest.fn()
    const component = render(
        <BlogForm createBlog={createBlog} /> 
    )

        
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form') 

    fireEvent.change(title, { 
        target: { value: 'Title is correct' } 
    })
    fireEvent.change(author, { 
        target: { value: 'Author is correct' } 
    })
    fireEvent.change(url, { 
        target: { value: 'Url is correct' } 
    })
    fireEvent.submit(form)


    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog).toBeCalledWith(
        expect.objectContaining({
            title: 'Title is correct',
            author: 'Author is correct',
            url: 'Url is correct'
        }),
    )
    

})