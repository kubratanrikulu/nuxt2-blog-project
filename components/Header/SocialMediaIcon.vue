<template lang="">
  <ul class="hidden md:flex flex-col gap-4">
     <li v-for="icon in iconList" :key="icon">
         <a href="">
             <i :class="['fa-brands hover:scale-125 transition ease-in-out text-2xl', icon]"></i>
             </i>
         </a>
     </li>
  </ul>
 </template>
 <script>
 export default {
     data() {
         return {
             iconList: [
                 "fa-facebook-f text-[#2962af]",
                 "fa-twitter text-[#00a7e7]",
                 "fa-instagram text-[#ed1993]",
                 "fa-linkedin text-[#0a63bc]",
             ]
         }
     }
 }
 </script>
 <style lang=""></style>
 