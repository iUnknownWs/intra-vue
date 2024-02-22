<script setup>
defineProps({
  label: { type: String, required: true },
  from: { type: Array, required: true },
  to: { type: Array, required: true }
})
</script>

<template>
  <label class="form-control mb-4 w-full">
    <div class="label">
      <span class="label-text font-medium">{{ label }}</span>
    </div>
    <div class="flex flex-row justify-between">
      <select class="select select-bordered w-32">
        <option disabled selected>Desde</option>
        <option v-for="option in from" :key="option">{{ option }}</option>
      </select>
      <select class="select select-bordered w-32">
        <option disabled selected>Hasta</option>
        <option v-for="option in to" :key="option">{{ option }}</option>
      </select>
    </div>
  </label>
</template>

<style scoped></style>
