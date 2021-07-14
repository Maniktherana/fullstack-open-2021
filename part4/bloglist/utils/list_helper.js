/* eslint-disable no-unused-vars */
const _ = require('lodash')

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
	return blogs.length === 0 ? 0 : tLikes
}

const favouriteBlog = (blogs) => {
	let maxLikes = blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)
	
	let favBlog = {}
	favBlog.title = maxLikes.title
	favBlog.author = maxLikes.author
	favBlog.likes = maxLikes.likes
	
	return blogs.length === 0 ? 0 : favBlog
}

//Helper function for mostBlogs
const mostFrequent = arr =>
	Object.entries(
		arr.reduce((a, v) => {
			a[v] = a[v] ? a[v] + 1 : 1
			return a
		}, {})
	).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0]

const mostBlogs = (blogs) => {
	let blogsCount = 0
	const blogsArr = blogs.map(blog => blog.author)

	for (let i = 0; i < blogsArr.length; i++) {
		if (blogsArr[i] === mostFrequent(blogsArr)) {
			blogsCount += 1
		}
	}

	let mostBlog = {}
	mostBlog.author = mostFrequent(blogsArr)
	mostBlog.blogs = blogsCount

	return blogs.length === 0 ? 0 : mostBlog
}

const mostLikes = (blogs) => {
	const blogsArr = blogs.map(blog => ({author: blog.author, likes: blog.likes}))
	const newResults = blogsArr.reduce((acc, item) => ({
		...acc,
		[item.author]: (acc[item.author] || 0) + item.likes
	}) , {})
	const finalResult = Object.keys(newResults).map(key => ({author: key, likes: newResults[key]}))

	let maxLikes = finalResult.reduce((max, blog) => max.likes > blog.likes ? max : blog)
	
	let favBlog = {}
	favBlog.author = maxLikes.author
	favBlog.likes = maxLikes.likes

	return blogs.length === 0 ? 0 : favBlog
}

module.exports = {
	dummy,
	totalLikes,
	favouriteBlog,
	mostBlogs,
	mostLikes
}