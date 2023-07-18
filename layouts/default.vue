<template>
  <div class="container mx-auto">
    <navbar-menu />
    <Nuxt />
    <Footer />
  </div>
</template>
<script>
import NavbarMenu from '../components/Header/NavbarMenu.vue'
import Footer from '../components/Footer/Footer.vue'
export default {
  components: { NavbarMenu, Footer },
}
</script>
