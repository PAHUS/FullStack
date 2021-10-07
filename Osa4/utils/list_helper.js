const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
      return sum + item.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {}
  const blog = (blogs.length === 1) ? blogs[0]
             : blogs.sort((a, z) => z.likes - a.likes)[0]
  return {title: blog.title, author: blog.author, likes: blog.likes}
}


const mostBlogs = (blogs) => {
  const grouped = _.groupBy(blogs, (blog) => blog.author)
  const groupedLists = Object.values(grouped)
  
  const authList = _.maxBy(groupedLists, (coll)=> coll.length)
  const head = _.head(authList)
  const author = head?.author
 
  return {author: author, blogs: authList?.length}
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}

