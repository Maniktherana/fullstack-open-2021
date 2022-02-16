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

test('blog can be deleted', async () => {
	const deleteblog = {
		_id: '5a422ba71b54a676234d17fb',
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 7,
	}

	await api
		.delete(`/api/blogs/${deleteblog._id}`)
		.expect(204)
	const blogsAtEnd = await helper.blogsInDb()
	expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1)
})

test('number of likes on a blog can be updated', async () => {
	const allBlogs = await helper.blogsInDb()
	const blogToBeUpdated = allBlogs[0]

	const updatedLikes = {
		likes: 100,
	}

	const updatedBlog = await api
		.put(`/api/blogs/${blogToBeUpdated.id}`)
		.send(updatedLikes)
		.expect(200)

	expect(updatedBlog.body.likes).toBe(updatedLikes.likes)

})

test('verify if the likes property is missing', async () => {
	const newBlog = {
	  title: 'Test an app',
	  author: 'Miko Kaveric',
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

test('verify if the title is missing', async () => {
	const newBlogNoTitle = {
		author: 'Jojo Beans',
		url: 'https://fullstackopen.com/',
		likes: 2
	  }

	await api
	  .post('/api/blogs')
	  .send(newBlogNoTitle)
	  .expect(400)

	const endBlog = await helper.blogsInDb()
	expect(endBlog).toHaveLength(helper.initialBlogs.length)
	
}, 100000)

test('verify if the url is missing', async () => {
	const newBlogNoUrl = {
		title: 'Test an app',
		author: 'Jojo Beans',
		likes: 2
	  }

	await api
	  .post('/api/blogs')
	  .send(newBlogNoUrl)
	  .expect(400)

	const endBlog = await helper.blogsInDb()
	expect(endBlog).toHaveLength(helper.initialBlogs.length)
	
}, 100000)
  

afterAll(() => {
	mongoose.connection.close
}) 