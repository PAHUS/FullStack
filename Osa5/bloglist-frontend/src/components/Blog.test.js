import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog/>', () =>{
    let component

    const mockLike = jest.fn()
    const mockRemove = jest.fn()
    const user = {id: 1, name: 'TestName', username:'TestUsername'}
    const blog = {title: 'TestTitle', author: 'TestAuthor', url: 'TestUrl', likes: 10, user}
    
    beforeEach(()=> {component = render(<Blog blog= {blog} like= {mockLike} remove = {mockRemove} user = {user}/>)})

    test('renders title', () => {
        expect(component.container).toHaveTextContent('TestTitle')
    })
    test('renders author', () => {
        expect(component.container).toHaveTextContent('TestAuthor')
    })
    test('does not show togglable content', () => {
        const div = component.container.querySelector('.togglableContent')
        
        expect(div).toHaveStyle('display: none')
    })

    test('after pressing the button shows likes', () => {
        const button = component.getByText('View')
        fireEvent.click(button)
        expect(component.container).toHaveTextContent('likes:')
    })
    test('after pressing the button shows url', () => {
        const button = component.getByText('View')
        fireEvent.click(button)
        console.log(prettyDOM(component.container))
        expect(component.container).toHaveTextContent('TestUrl')
    })
    test('pressing like activates handler twice', () => {
        const button = component.getByText('View')
        fireEvent.click(button)
        const button2 = component.getByText('like')
        fireEvent.click(button2)
        fireEvent.click(button2)
        expect(mockLike.mock.calls).toHaveLength(2)
    })

}



)
