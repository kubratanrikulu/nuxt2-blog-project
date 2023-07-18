import { defineStore } from 'pinia'
import axios from 'axios'

export const useBlogStore = defineStore('blog', {
  state: () => ({
    blogs: [],
    successMessage: null,
  }),
  getters: {
    getBlogs(state) {
      return state.blogs
    },
    getSuccessMessage(state) {
      return state.successMessage
    },
  },
  actions: {
    async fetchBlogs(searchQuery) {
      try {
        let url = 'https://64b268c238e74e386d551327.mockapi.io/api/blogs'
        searchQuery ? (url = url + '?title=' + searchQuery) : null
        const { data } = await axios.get(url)
        this.SET_BLOGS(data.reverse())
      } catch (error) {
        alert(error)
        console.log(error)
      }
    },

    async addBlog(newBlog) {
      try {
        const { data } = await axios.post(
          'https://64b268c238e74e386d551327.mockapi.io/api/blogs',
          newBlog
        )
        this.addBlogToList(data)
        this.setSuccessMessage('Başarıyla eklendi')
        setTimeout(() => {
          this.setSuccessMessage(null)
        }, 3000)
      } catch (error) {
        alert(error)
        console.log(error)
      }
    },
    SET_BLOGS(blogs) {
      this.blogs = blogs
    },
    async deleteBlog(blogId) {
      try {
        await axios.delete(
          `https://64b268c238e74e386d551327.mockapi.io/api/blogs/${blogId}`
        )
  
        this.blogs = this.getBlogs.filter((blog) => {
          return blog.id !== blogId
        })
        
        this.removeBlogFromList(blogId)
      } catch (error) {
        alert(error)
        console.log(error)
      }
    },
    removeBlogFromList(blogId) {
      console.log({
        blogs: this.blogs,
        blogId,
      })
      const index = this.blogs.findIndex((blog) => blog.id === blogId)
      if (index !== -1) {
        this.blogs.splice(index, 1)
      }
    },
    async updateBlogContent(payload) {
      try {
        const { data } = await axios.put(
          `https://64b268c238e74e386d551327.mockapi.io/api/blogs/${payload.id}`,
          {
            title: payload.title,
            content: payload.content,
            createdAt: payload.createdAt,
          }
        )
        this.SET_BLOG_CONTENT(payload)
        const localItems = JSON.parse(localStorage.getItem('readingList'))
        const index = localItems?.findIndex((x) => x.id === payload.id)
        if (index!==-1) {
          localItems[index] = data
          localStorage.setItem('readingList', JSON.stringify(localItems))
        }
      } catch (error) {
        alert(error)
        console.log(error)
      }
    },
    SET_BLOG_CONTENT(payload) {
      const blog = this.blogs.find((blog) => blog.id === payload.id)
      if (blog) {
        blog.title = payload.title
        blog.content = payload.content
        blog.createdAt = payload.createdAt
      }
    },
    addBlogToList(blog) {
      this.blogs.unshift(blog)
    },
    setSuccessMessage(message) {
      this.successMessage = message
    },
  },
})