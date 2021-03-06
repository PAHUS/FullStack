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

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {}
  const grouped = _.groupBy(blogs, (blog) => blog.author)
  const groupedLists = Object.values(grouped)

  const subListReducer = (res, item) => {
    return {author: res.author || item?.author,
            likes: res.likes + item?.likes || item?.likes}
  }

  const likesListing = _.map(groupedLists, (list) => _.reduce(list, subListReducer, {}))
  const max = _.maxBy(likesListing, (item) => item?.likes)
  return max

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}

