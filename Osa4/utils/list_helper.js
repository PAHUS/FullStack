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
  if (blogs.length === 1) {
    return blogs[0]
  }
  return blogs.sort((a, z) => z.likes - a.likes)[0]
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}

