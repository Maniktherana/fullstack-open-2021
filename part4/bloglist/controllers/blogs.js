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
	const blog = await Blog(request.body)
	if (blog) {
		response.json(blog)
	} else {
		response.status(404).end()
	}
})

blogsRouter.post('/', async (request, response) => {
	const blog = new Blog(request.body)
	const savedBlog = await blog.save()
	response.status(201).json(savedBlog)
})

module.exports = blogsRouter