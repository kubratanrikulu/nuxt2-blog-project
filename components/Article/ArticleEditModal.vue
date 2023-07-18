<template>
  <div
    class="fixed inset-0 backdrop-blur-sm bg-zinc-50/50 flex items-center justify-center"
  >
    <div
      class="p-8 max-w-md flex flex-col gap-y-4 bg-white rounded-lg w-full shadow-md"
    >
      <header class="flex items-center justify-between">
        <h1 class="text-zinc-950 text-xl antialiased font-semibold">
          Edit Blog
        </h1>
      </header>
      <label class="flex flex-col gap-y-1">
        <div class="antialiased font-semibold">Title</div>
        <input
          v-model="editedBlog.title"
          type="text"
          class="border border-zinc-200 rounded-md p-2 w-full"
        />
      </label>

      <label class="flex flex-col gap-y-1">
        <div class="antialiased font-semibold">Content</div>
        <textarea
          v-model="editedBlog.content"
          class="border border-zinc-200 rounded-md p-2 w-full resize-none"
        ></textarea>
      </label>

      <label class="flex flex-col gap-y-1">
        <div class="antialiased font-semibold">Created At</div>
        <input
          v-model="editedBlog.createdAt"
          class="border border-zinc-200 rounded-md p-2 w-full"
          type="text"
        />
      </label>

      <div class="flex justify-end items-center gap-6 my-8">
        <button
          @click="cancelEdit"
          class="bg-transparent border border-rose-500 text-rose-500 py-1 px-2 rounded-full min-w-[5rem] hover:bg-rose-500 hover:text-zinc-50 transition-colors ease-in-out"
        >
          Cancel
        </button>

        <button
          @click="saveChanges"
          class="bg-rose-500 border border-rose-500 text-zinc-50 py-1 px-2 rounded-full min-w-[5rem] hover:text-rose-500 hover:bg-zinc-50 transition-colors ease-in-out"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    blog: {
      type: Object,
      required: true,
    },
    editedBlog: {
      type: Object,
      required: true,
    },
  },
  methods: {
    saveChanges() {
      const payload = {
        id: this.blog.id,
        title: this.editedBlog.title,
        content: this.editedBlog.content,
        createdAt: this.editedBlog.createdAt,
      }
      this.$emit('saveChanges', payload)
    },
    cancelEdit() {
      this.$emit('cancelEditing')
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
