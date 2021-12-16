import React, {useState} from 'react'
import PropTypes from 'prop-types'

const Blog = ({blog, like, remove, user}) => {
  const [hidden, setHidden] = useState(false)
  const showWhenHidden = {display: hidden? '' : 'none'}

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  return (
  <div style = {blogStyle} >
    {blog.title} {blog.author}
    <div style = {showWhenHidden}>
      <p>likes: {blog.likes} <button onClick={(event) => like(blog)}> like </button></p> 
      {blog.user.name}
      {(blog.user.username === user.username) &&
      <button onClick = {(event) => remove(blog)}>remove</button>
    }
    </div>
    
    <button onClick = {(event)=> setHidden(!hidden)}>{hidden? 'Hide' : 'View'}</button>
    
  </div>
  )
}

Blog.propTypes = {
  like: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}
export default Blog