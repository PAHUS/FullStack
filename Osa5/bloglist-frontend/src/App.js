import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login' 

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')   
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)



  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])  
  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload(false)
  }

  
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
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    blogService
      .create(blogObject)
        .then(returnedNote => {
        setBlogs(blogs.concat(returnedNote))
        setNewAuthor('')
        setNewUrl('')
        setNewTitle('')
      })
      setMessage(
        `Blog titled '${blogObject.title}' added`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        
      <Notification message={errorMessage} className='error' />
      <Notification message={message} className='notification' /> 
        <form onSubmit={handleLogin}>
          <div>
              username
                <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
                />
          </div>
          <div>
              password
                <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
                />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <button onClick={handleLogout}>log out</button>
      
      <Notification message={errorMessage} className='error' />
      <Notification message={message} className='notification' /> 

      <h2>blogs</h2>
      <p>{user.name} has logged in</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

      <form onSubmit={addBlog}>
        <div>title: <input
          value={newTitle}
          onChange={handleTitleChange}
        /> </div>

        <div>author: <input
          value={newAuthor}
          onChange={handleAuthorChange}
        /></div>
         <div>url: <input
          value={newUrl}
          onChange={handleUrlChange}
        /></div>
        <button type="submit">save</button>
      </form>  
    </div>
  )
}

export default App