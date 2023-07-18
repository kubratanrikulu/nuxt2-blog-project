<template>
  <article
    class="flex flex-col card gap-2 py-5 max-w-2xl w-full mx-auto cursor-pointer p-5"
  >
    <header class="article-header flex items-center w-full gap-1">
      <img :src="blog.personImg" alt="" class="rounded-full w-6 h-6" />
      <div class="flex items-center gap-1 text-sm subpixel-antialiased">
        <p class="text-zinc-950">{{ blog.name }}</p>
        <span class="flex items-center justify-center">·</span>
        <p class="text-zinc-500 italic">{{ blog.personJob }}</p>
      </div>
      <span class="flex items-center justify-center">·</span>
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
    </header>
    <div class="flex w-full gap-5">
      <div class="grow flex flex-col gap-1">
        <h1 class="font-bold text-xl capitalize">
          <span v-if="!isEditing">{{ blog.title }}</span>
          <input
            v-else
            type="text"
            v-model="editedBlog.title"
            class="border border-gray-300 rounded p-2"
          />
        </h1>

        <div v-if="!isEditing">
          <p class="text-zinc-500 leading-6 line-clamp-3">{{ blog.content }}</p>
        </div>
        <div v-else>
          <ArticleEditModal
            :blog="blog"
            :editedBlog="editedBlog"
            @saveChanges="saveChanges"
            @cancelEditing="cancelEditing"
          />
        </div>
      </div>

      <div class="min-w-[80px] max-w-[112px]">
        <img :src="blog.avatar" alt="" class="w-full aspect-square" />
      </div>
    </div>

    <div class="card-header flex space-x-5">
      <div class="card-header-right text-[#454360] space-y-3">
        <button
          class="transition-colors ease-in-out hover:bg-rose-500/80 bg-rose-500 text-zinc-50 py-2 px-3 rounded-full text-sm"
          @click="goToDetailPage"
        >
          Continue
        </button>
      </div>
    </div>

    <div class="flex justify-between items-center ml-auto">
      <div class="space-x-2">
        <button
          v-if="!isEditing && !isInReadingList"
          @click.stop="addToReadingList"
          class="transition-colors ease-in-out hover:bg-rose-500/80 bg-rose-500 text-zinc-50 py-2 px-3 rounded-full text-sm"
        >
          Add To Reading List
        </button>
        <button
          class="transition-colors ease-in-out hover:bg-rose-500/80 bg-rose-500 text-zinc-50 py-2 px-3 rounded-full text-sm"
          v-if="!isEditing && isInReadingList"
          @click.stop="removeFromReadingList"
        >
          Remove From Reading List
        </button>
        <button
          v-if="!isEditing"
          @click.stop="startEditing"
          class="transition-colors ease-in-out hover:bg-rose-500/80 bg-rose-500 text-zinc-50 py-2 px-3 rounded-full text-sm"
        >
          Edit Blog
        </button>
        <button
          v-if="!isEditing"
          @click.stop="deleteBlog"
          class="transition-colors ease-in-out hover:bg-rose-500/80 bg-rose-500 text-zinc-50 py-2 px-3 rounded-full text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  </article>
</template>

<script>
import { useBlogStore } from '~/store/blogStore'
import { useReadingListStore } from '~/store/readingListStore'
import { format } from 'date-fns'
import ArticleEditModal from './ArticleEditModal.vue'

export default {
  components: {
    ArticleEditModal,
  },
  props: {
    blog: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isEditing: false,
      editedBlog: {
        title: '',
        content: '',
        createdAt: '',
      },
    }
  },
  computed: {
    isInReadingList() {
      return useReadingListStore().contains(this.blog.id)
    },
  },
  methods: {
    addToReadingList() {
      useReadingListStore().addToReadingList(this.blog)
    },
    removeFromReadingList() {
      useReadingListStore().removeFromReadingList(this.blog.id)
    },
    startEditing() {
      this.isEditing = true
      this.editedBlog = this.blog
    },
    cancelEditing() {
      this.isEditing = false
      this.editedBlog = ''
    },
    async saveChanges() {
      try {
        const editedBlog = {
          id: this.blog.id,
          title: this.editedBlog.title,
          content: this.editedBlog.content,
          createdAt: this.editedBlog.createdAt,
        }

        await useBlogStore().updateBlogContent(editedBlog)

        this.isEditing = false
        this.blog.title = editedBlog.title
        this.blog.content = editedBlog.content
        this.blog.createdAt = editedBlog.createdAt
      } catch (error) {
        alert(error)
        console.log(error)
      }
    },
    async deleteBlog() {
      try {
        await useBlogStore().deleteBlog(this.blog.id)
        useReadingListStore().removeBlogFromList(this.blog.id)
      } catch (error) {
        alert(error)
        console.log(error)
      }
    },
    formatDate(date) {
      return format(new Date(date), 'dd.MM.yyyy')
    },
    goToDetailPage() {
      this.$router.push({
        path: '/articles/' + this.blog.id,
      })
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
