/* eslint-disable no-unused-vars */
const dummy = (blogs) => {
	if (blogs) {
		return 1
	}
}
  
const totalLikes = (blogs) => {
	let tLikes = 0
	blogs.forEach(blog => {
		tLikes = tLikes + blog.likes
	})
	return tLikes
}

const favouriteBlog = (blogs) => {
	let maxLikes = blogs.reduce((max, game) => max.likes > game.likes ? max : game)
	let favBlog = {}
	favBlog.title = maxLikes.title
	favBlog.author = maxLikes.author
	favBlog.likes = maxLikes.likes
	return favBlog
}

module.exports = {
	dummy,
	totalLikes,
	favouriteBlog
}