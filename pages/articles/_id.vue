<template>
  <div class="card p-5">
    <div class="card-header space-x-5">
      <img :src="blog.avatar" alt="" class="w-4/12 mb-5" />
      <div>
        <h1 class="font-bold text-4xl text-[#454360] tracking-wide capitalize">
          {{ blog.title }}
        </h1>
        <div class="flex space-x-3 text-md">
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
      </div>
    </div>

    <p class="text-[#596172] leading-8 mb-10">{{ blog.content }}</p>
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <img :src="blog.personImg" alt="" class="rounded-full w-12 h-12" />
        <div>
          <p class="font-bold text-lg text-[#454360]">{{ blog.name }}</p>
          <p class="text-[#596172] italic">{{ blog.personJob }}</p>
        </div>
      </div>
      <div>
        <button
          class="transition-colors ease-in-out hover:bg-rose-500/80 bg-rose-500 text-zinc-50 py-2 px-3 rounded-full text-sm"
          @click="deleteBlog"
        >
          Delete
        </button>
        <button
          class="transition-colors ease-in-out hover:bg-rose-500/80 bg-rose-500 text-zinc-50 py-2 px-3 rounded-full text-sm"
          @click="openEditModal"
        >
          Edit
        </button>
      </div>
    </div>

    <ArticleEditModal
      v-if="isEditModalOpen"
      :blog="blog"
      :editedBlog="editedBlog"
      @saveChanges="saveChanges"
      @cancelEditing="closeEditModal"
    />
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

<style scoped>
.card {
  box-shadow: 0 3px 12px -1px rgba(7, 10, 25, 0.1),
    0 22px 27px -30px rgba(7, 10, 25, 0.1);
}
</style>
