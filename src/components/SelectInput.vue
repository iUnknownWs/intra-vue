<script setup>
defineProps({
  label: { type: String, required: true }
  // options: { type: Object, required: true }
})

const options = [
  {
    id: 1,
    name: 'Option 1'
  },
  {
    id: 2,
    name: 'Option 2'
  },
  {
    id: 3,
    name: 'Option 3'
  }
]
</script>

<template>
  <label class="form-control mb-4 w-full">
    <div class="label">
      <span class="label-text font-medium">{{ label }}</span>
    </div>
    <select class="select select-bordered">
      <option disabled selected>Pick one</option>
      <option v-for="option in options" :key="option.id">{{ option.name }}</option>
    </select>
  </label>
</template>

<style scoped></style>
