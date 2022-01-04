import React, { useState} from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({createBlog}) => {

    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')


    const handleTitleChange = (event) => {
        console.log(event.target.value)
        setNewTitle(event.target.value)
    }
    
    const handleAuthorChange = (event) => {
        console.log(event.target.value)
        setNewAuthor(event.target.value)
    }

    const handleUrlChange = (event) => {
        console.log(event.target.value)
        setNewUrl(event.target.value)
    }

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: newTitle,
            author: newAuthor,
            url: newUrl
        })
        setNewAuthor('')
        setNewUrl('')
        setNewTitle('')
    }
    

    return(
        <form onSubmit={addBlog}>
            <div>title: <input
            id='title'
            value={newTitle}
            onChange={handleTitleChange}
            /> </div>
    
            <div>author: <input
            id='author'
            value={newAuthor}
            onChange={handleAuthorChange}
            /></div>
            <div>url: <input
            id='url'
            value={newUrl}
            onChange={handleUrlChange}
            /></div>
            <button id='save' type="submit">save</button>
        </form> )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired,
    
  }
    
export default BlogForm



