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

module.exports = {
	dummy,
	totalLikes
}