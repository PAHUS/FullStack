import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login' 

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [formVisible, setFormVisible] = useState(false)
  const [username, setUsername] = useState('')   
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)



  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a,b) => b.likes - a.likes) )

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


  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
        .then(returnedNote => {
          setBlogs(blogs.concat(returnedNote))
        
        setFormVisible(false)
      })
      setMessage(
        `Blog titled '${blogObject.title}' added`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
  }

  const likeBlog = (blog) => {
    blogService.update(blog.id, {user: user.id, likes: blog.likes +1, author: blog.author, title: blog.title, url: blog.url})
    .then(returnedBlog => {
      setBlogs(blogs.map((blog2) => (blog.id === blog2.id ? returnedBlog : blog2)).sort((a,b) => b.likes - a.likes))
    })
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

  const blogForm = () => {

      const hideWhenVisible = { display: formVisible ? 'none' : '' }
      const showWhenVisible = { display: formVisible ? '' : 'none' }
  
      return (
        <div>
          <div style={hideWhenVisible}>
            <button onClick={() => setFormVisible(true)}>create</button>
          </div>
          <div style={showWhenVisible}>
            <BlogForm 
              createBlog={addBlog}
            />
            <button onClick={() => setFormVisible(false)}>cancel</button>
          </div>
        </div>
      )

  }

  return (
    <div>
      <button onClick={handleLogout}>log out</button>
      
      <Notification message={errorMessage} className='error' />
      <Notification message={message} className='notification' /> 

      {blogForm()}


      <h2>blogs</h2>
      <p>{user.name} has logged in </p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} like ={likeBlog} />
      )}

       
    </div>
  )
}

export default App