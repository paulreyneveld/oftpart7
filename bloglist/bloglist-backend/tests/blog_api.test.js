const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
    {
        "title": "test1", 
        "author": "post",
        "url": "test",
        "likes": 123
    },
    {
        "title": "test2", 
        "author": "post",
        "url": "test",
        "likes": 123
    }

]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

test('notes are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are two posts', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(2)
})

test('api posts new data', async () => {
    const blog = {
        "title": "third entry", 
        "author": "post",
        "url": "test",
        "likes": 123
    }

    await api
        .post('/api/blogs')
        .send(blog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.content)
    expect(response.body).toHaveLength(initialBlogs.length + 1)
})

afterAll(() => {
    mongoose.connection.close()
})