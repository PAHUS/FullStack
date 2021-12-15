import React, {useState} from 'react'

const Blog = ({blog, like}) => {
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
    </div>
    
    <button onClick = {(event)=> setHidden(!hidden)}>{hidden? 'Hide' : 'View'}</button>
  </div>)
}

export default Blog