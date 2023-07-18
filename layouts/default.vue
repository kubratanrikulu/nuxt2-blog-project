<template>
  <div class="container mx-auto">
    <navbar-menu />
    <Nuxt />
  </div>
</template>
<script>
import NavbarMenu from '../components/Header/NavbarMenu.vue'
export default {
  components: { NavbarMenu },
}
</script>
