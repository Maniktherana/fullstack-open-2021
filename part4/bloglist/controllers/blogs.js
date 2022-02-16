/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const blogsRouter = require('express').Router()
const { response } = require('../app')
const Blog = require('../models/blog')

blogsRouter.get('/:id', async (request, response) => {
	const blog = await Blog.findById(request.params.id)
	if (blog) {
		response.json(blog)
	} else {
		response.status(404).end()
	}
})

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', { blogs: 0 })
	response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
	const blog = new Blog(request.body)
	const savedBlog = await blog.save()
	response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response, next) => {
	await Blog.findByIdAndRemove(request.params.id)
	response.status(204).end()

})

blogsRouter.put('/:id', async (request, response) => {
	const body = request.body
	const updatedLikes = {
		likes: body.likes,
	}

	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, updatedLikes, {	new: true })
	response.json(updatedBlog)
})

module.exports = blogsRouter