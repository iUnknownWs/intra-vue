<script setup>
defineProps({
  id: { type: String, required: true }
})

const drawer = defineModel()
</script>

<template>
  <div class="drawer drawer-end">
    <input :id="id" type="checkbox" class="drawer-toggle" v-model="drawer" />
    <div class="drawer-content w-full">
      <slot name="content" />
    </div>
    <div class="drawer-side z-50">
      <label :for="id" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul
        class="menu min-h-full w-screen justify-between bg-white px-8 py-4 text-base-content lg:w-1/3"
      >
        <slot name="drawer" />
      </ul>
    </div>
  </div>
</template>
