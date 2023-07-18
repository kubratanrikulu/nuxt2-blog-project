<template>
  <div class="blog-list flex flex-col space-y-8 justify-center">
    <ArticleCard v-for="blog in blogs" :key="blog.id" :blog="blog" />
  </div>
</template>

<script>
import ArticleCard from './ArticleCard.vue';
import { useBlogStore } from '~/store/blogStore';
export default {
  components: {
    ArticleCard
  },
  computed: {
    blogs() {
      console.log('computed blogs')

      return useBlogStore().blogs 
    }
  },
  mounted() {
    useBlogStore().fetchBlogs() 
  }
}
</script>

<style scoped>