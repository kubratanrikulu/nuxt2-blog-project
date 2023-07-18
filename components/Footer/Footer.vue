<template>
  <div
    class="container mx-auto justify-center text-lg mt-5 grid grid-cols-1 md:grid-cols-3 p-5 gap-4 space-y-3"
  >
    <div class="md:border-r-2 border-gray-500 flex justify-center">
      <a href="/" class="flex mx-auto sm:mx-[revert]">
        <h1 id="title" class="text-[#4b4870] text-2xl cursor-pointer font-bold">
          Maktap
        </h1></a
      >
    </div>
    <ul
      class="space-y-3 md:border-r-2 border-gray-500 flex flex-col justify-center"
    >
      <li>About Us</li>
      <li>Movies</li>
      <li>Contact</li>
    </ul>

    <ul
      class="space-y-3 md:border-r-2 border-gray-500 flex flex-col justify-center text-zinc-600"
    >
      <li class="space-x-2">
        <a href=""><i class="fa-brands fa-twitter text-[#00a7e7]"></i></a
        ><span>Twitter</span>
      </li>
      <li class="space-x-2">
        <a href=""><i class="fa-brands fa-medium"></i></a><span>Medium</span>
      </li>
      <li class="space-x-2">
        <a href=""><i class="fa-brands fa-linkedin text-[#0a63bc]"></i></a
        ><span>Linkedln</span>
      </li>
      <li class="space-x-2">
        <a href=""
          ><i class="fa-brands fa-square-instagram text-[#ed1993]"></i></a
        ><span>Instagram</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
}
</script>
<style scoped>
#title::first-letter {
  color: #ff4c60;
}</style>
