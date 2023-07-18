import { defineStore } from 'pinia'

export const useReadingListStore = defineStore('readingList', {
  state: () => ({
    readingList: [],
  }),
  getters: {
    contains: (state) => (blogId) => {
      return state.readingList.some((blog) => blog.id === blogId)
    },
  },
  actions: {
    addToReadingList(blog) {
      this.readingList.push(blog)
      this.saveReadingList()
    },
    removeBlogFromList(blogId) {
      this.removeFromReadingList(blogId)
    },
    removeFromReadingList(blogId) {
      console.log('removeFromReadingList readingList', this.readingList)

      this.readingList = this.readingList.filter((blog) => {
        return blog.id !== blogId
      })
      console.log('removeFromReadingList readingList', this.readingList)

      this.saveReadingList()
    },
    fetchReadingList() {
      const savedReadingList = localStorage.getItem('readingList')
      if (savedReadingList) {
        this.readingList = JSON.parse(savedReadingList)
      }
    },
    saveReadingList() {
      localStorage.setItem('readingList', JSON.stringify(this.readingList))
    },
  },
})