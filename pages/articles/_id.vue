<template>
  <div class="container mx-auto !max-w-2xl h-full p-5">
    <div class="flex flex-col gap-4 w-full">
      <h1 class="font-bold text-5xl text-zinc-900 capitalize">
        {{ blog.title }}
      </h1>

      <div class="flex items-center justify-end space-x-3 text-md">
        <time
          :date-time="new Date(blog.createdAt).toISOString()"
          class="text-sm subpixel-antialiased text-zinc-400"
        >
          {{ formatDate(blog.createdAt) }}
        </time>
        <span class="flex items-center justify-center">·</span>
        <span
          class="flex gap-1 items-center text-sm subpixel-antialiased text-zinc-400"
        >
          <i class="fa-solid fa-highlighter text-rose-500/80"></i>
          {{ blog.readingNumber }}
        </span>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <img :src="blog.personImg" alt="" class="rounded-full w-11 h-11" />
          <div>
            <p class="font-bold text-zinc-900">{{ blog.name }}</p>
            <p class="text-gray-500 text-sm italic">{{ blog.personJob }}</p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <button
            class="transition-colors ease-in-out hover:bg-rose-500/80 bg-rose-500 text-zinc-50 py-1.5 px-3 rounded text-sm inline-flex items-baseline justify-center gap-2"
            @click="deleteBlog"
          >
            <i class="fa-regular fa-trash-can text-sm"></i>
            <span class="inline-flex items-center justify-center">Delete</span>
          </button>
          <button
            class="transition-colors ease-in-out hover:bg-rose-500/80 bg-rose-500 text-zinc-50 py-1.5 px-3 rounded text-sm inline-flex items-baseline justify-center gap-2"
            @click="openEditModal"
          >
            <i class="fa-solid fa-pencil text-sm"></i>
            <span class="inline-flex items-center justify-center">Edit</span>
          </button>
        </div>
      </div>

      <div class="card-header space-x-5">
        <img :src="blog.avatar" alt="" class="w-full my-5" />
        <div></div>
      </div>

      <p class="text-[#596172] leading-8 mb-10">{{ blog.content }}</p>

      <ArticleEditModal
        v-if="isEditModalOpen"
        :blog="blog"
        :editedBlog="editedBlog"
        @saveChanges="saveChanges"
        @cancelEditing="closeEditModal"
      />
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns'
import { useBlogStore } from '~/store/blogStore'
import ArticleEditModal from '~/components/Article/ArticleEditModal.vue'

export default {
  components: {
    ArticleEditModal,
  },
  data() {
    return {
      blog: { title: '', content: '', createdAt: new Date() },
      editedBlog: { title: '', content: '', createdAt: '' },
      isEditModalOpen: false,
    }
  },
  async created() {
    await this.getArticleDetail()
  },
  methods: {
    formatDate(date) {
      return format(new Date(date), 'dd.MM.yyyy')
    },
    async deleteBlog() {
      try {
        await useBlogStore().deleteBlog(this.blog.id)
        alert('Successfully deleted')
        this.$router.push('/')
      } catch (error) {
        alert(error)
        console.log(error)
      }
    },
    async getArticleDetail() {
      try {
        const { data } = await this.$axios.get(
          'https://64b268c238e74e386d551327.mockapi.io/api/blogs/' +
            this.$route.params.id
        )
        this.blog = data
        this.editedBlog = { ...data }
      } catch (error) {
        alert(error)
        console.log(error)
      }
    },
    openEditModal() {
      this.isEditModalOpen = true
    },
    closeEditModal() {
      this.isEditModalOpen = false
    },
    async saveChanges(payload) {
      try {
        await useBlogStore().updateBlogContent(payload)
        this.blog.title = payload.title
        this.blog.content = payload.content
        this.blog.createdAt = payload.createdAt
        this.isEditModalOpen = false
      } catch (error) {
        alert(error)
        console.log(error)
      }
    },
  },
}
</script>

<style scoped></style>
