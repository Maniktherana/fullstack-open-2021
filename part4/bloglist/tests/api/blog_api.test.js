/* eslint-disable no-mixed-spaces-and-tabs */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../../models/blog')

beforeEach(async () => {
	await Blog.deleteMany({})
  
	for (let blog of helper.initialBlogs) {
	  let blogObject = new Blog(blog)
	  await blogObject.save()
	}
})
  
test('blogs are returned as json', async () => {
	await api
	  .get('/api/blogs')
	  .expect(200)
	  .expect('Content-Type', /application\/json/)
}, 100000)

test('verify if a blog has id or _id ', async () => {
	const singleBlog = await helper.blogsInDb()

	expect(singleBlog[0].id).toBeDefined()
	expect(singleBlog[0]._id).toBe(undefined)
})
  
afterAll(() => {
	mongoose.connection.close
}) 