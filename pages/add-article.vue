<template>
  <div class="add-article">
    <div class="container mx-auto !max-w-2xl p-7 card mt-10 ">
      <h1 class="font-bold text-xl capitalize mb-5">Add Article</h1>
      <form @submit.prevent="saveArticle" class="space-y-5">
        <div class="grid grid-cols-3 gap-4 items-center">
          <label for="title" class="col-span-1">Title:</label>
          <input
            v-model="article.title"
            type="text"
            id="title"
            placeholder="Title.."
            class="rounded-xl border border-rose-500 p-1 col-span-2 shadow-md"
            required
          />
        </div>
        <div class="grid grid-cols-3 gap-4 items-center">
          <label for="date" class="col-span-1">Date:</label>
          <input
            v-model="article.date"
            type="date"
            class="rounded-xl border border-rose-500 p-1 col-span-2 shadow-md"
            id="date"
            required
          />
        </div>
        <div class="grid grid-cols-3 gap-4 items-center">
          <label for="content" class="col-span-1">Content:</label>
          <textarea
            v-model="article.content"
            class="rounded-xl border border-rose-500 p-1 col-span-2 shadow-md"
            id="content"
            required
          ></textarea>
        </div>
        <div class="flex justify-center items-center">
          <button
            type="submit"
            class="transition-colors ease-in-out hover:bg-rose-500/80 bg-rose-500 text-zinc-50 py-2 px-6 rounded-full text-sm"
          >
            Save
          </button>
          <div v-if="successMessage">{{ successMessage }}</div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns'
import { useBlogStore } from '@/store/blogStore'

export default {
  data() {
    return {
      article: {
        title: '',
        date: '',
        content: '',
      },
      successMessage: null,
    }
  },
  methods: {
    async saveArticle() {
      try {
        const date = new Date(this.article.date)
        if (isNaN(date)) {
          throw new Error('Invalid date.')
        }

        const createdAt = format(date, 'yyyy-MM-dd')
        const newBlog = {
          title: this.article.title,
          content: this.article.content,
          createdAt: createdAt,
        }
        await useBlogStore().addBlog(newBlog)
        this.article.title = ''
        this.article.date = ''
        this.article.content = ''
        this.successMessage = 'Successfully added'
        setTimeout(() => {
          this.successMessage = null
        }, 3000)
      } catch (error) {
        alert(error)
        console.log(error)
      }
    },
  },
}
</script>

<style scoped>
.card {
  box-shadow: 0 3px 12px -1px rgba(7, 10, 25, 0.1),
    0 22px 27px -30px rgba(7, 10, 25, 0.1);
}
.add-article {
min-height: 100vh;
}
</style>
