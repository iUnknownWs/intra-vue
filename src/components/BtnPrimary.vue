<script setup>
// eslint-disable-next-line no-unused-vars
defineProps({
  label: { type: String, required: true },
  prop: { type: Function, required: true }
})
</script>

<template>
  <button @click="prop" class="btn btn-primary text-white">
    <slot />
    {{ label }}
  </button>
</template>

<style scoped></style>
