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
  
test('new blog can be added', async () => {
	const newBlog = {
		title: 'Test Blog',
		author: 'Joko Balvin',
		url:'https://fullstackopen.com',
		likes:5
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const endBlog = await helper.blogsInDb()
	expect(endBlog).toHaveLength(helper.initialBlogs.length + 1)
	  
	const titles = endBlog.map(t => t.title)
	expect(titles[titles.length - 1]).toContain('Test Blog')
})

test('verify if the likes property is missing', async () => {
	const newBlog = {
	  title: 'Test an app',
	  author: 'Kiko Maveric',
	  url: 'https://fullstackopen.com/'
	}
  
	const response = await api
	  .post('/api/blogs')
	  .send(newBlog)
	  .expect(201)
	  .expect('Content-Type', /application\/json/)
  
	expect(response.body.likes).toBeDefined()
	expect(response.body.likes).toBe(0)
})
  

afterAll(() => {
	mongoose.connection.close
}) 