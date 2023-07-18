<template>
  <div class="container mx-auto p-4 favorite-films">
    <h2 class="font-bold text-4xl tracking-wide text-[#454360]">
      Reading List
    </h2>
    <div v-if="readingList.length > 0">
      <ul class="grid grid-cols-1 gap-6 justify-center">
        <ArticleCard v-for="blog in readingList" :key="blog.id" :blog="blog" />
      </ul>
    </div>
    <div v-else>
      <p class="text-white text-md">
        You haven't added any favorite movies yet
      </p>
    </div>
  </div>
</template>

<script>
import { useReadingListStore } from '~/store/readingListStore'
import ArticleCard from '~/components/Article/ArticleCard.vue'

export default {
  components: { ArticleCard },
  computed: {
    readingList() {
      return useReadingListStore().readingList
    },
  },
  created() {
    useReadingListStore().fetchReadingList()
  },
  methods: {
    addToReadingList(blog) {
      useReadingListStore().addToReadingList(blog)
      this.saveReadingList()
    },
    removeFromReadingList(blogId) {
      useReadingListStore().removeFromReadingList(blogId)
      this.saveReadingList()
    },
    saveReadingList() {
      useReadingListStore().saveReadingList()
    },
  },
}
</script>

<style scoped>
</style>