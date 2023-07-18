<template lang="">
  <div class="flex items-center gap-4 ml-auto">
    <router-link v-for="item in menuItems" :key="item.path" :to="item.path">
      <span
        class="antialiased text-zinc-950 font-medium flex items-center whitespace-nowrap relative after:content-[''] after:absolute after:left-0 after:-bottom-[2px] after:w-0 after:duration-500 after:transition-all after:ease-in-out hover:after:w-full after:h-[2px] after:bg-rose-500"
        >{{ item.label }}</span
      >
    </router-link>
  </div>
</template>
<script>
import menuItems from './menuItems'

export default {
  name: 'MenuLinks',
  data() {
    return {
      menuItems: menuItems,
    }
  },
}
</script>
<style lang=""></style>
