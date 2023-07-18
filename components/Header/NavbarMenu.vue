<template lang="html">
  <div class="menu-wrapper w-full px-5 py-2">
    <div class="social-media-icons fixed left-5 bottom-4">
      <social-media-icon />
    </div>
    <div
      class="menu-container container max-w-5xl mx-auto flex flex-wrap gap-x-5 gap-y-2 md:justify-between items-center"
    >
      <a href="/" class="flex mx-auto sm:mx-[revert]">
        <h1 id="title" class="text-[#4b4870] text-2xl cursor-pointer font-bold">
          Maktap
        </h1></a
      >
      <div class="searchbar max-w-md flex justify-center items-center grow">
        <input
          type="text"
          class="border border-zinc-200 rounded-md px-2 py-1 w-full bg-zinc-100 focus:bg-zinc-50 focus-visible:!outline-none outline-none transition ease-in-out"
          placeholder="Search.."
        />
      </div>
      <menu-links />
    </div>
  </div>
</template>
<script>
import MenuLinks from './MenuLinks.vue'
import SocialMediaIcon from './SocialMediaIcon.vue'
export default {
  name: 'NavbarMenu',
  components: { MenuLinks, SocialMediaIcon },
  data() {
    return {
    }
  },
  methods: {
    redirectToHome() {
      this.$router.push('/')
    },
  },
}
</script>
<style scoped>
#title::first-letter {
  color: #ff4c60;
}
</style>
