<script setup>
import { ref } from 'vue'
defineProps({
  label: { type: String, required: true },
  max: { type: Number, required: true }
})
const from = ref(0)
</script>

<template>
  <label class="form-control mb-4 w-full">
    <div class="label">
      <span class="label-text font-medium">{{ label }}</span>
    </div>
    <input
      type="number"
      name="from"
      id="from"
      class="input input-bordered w-full"
      :max="max"
      min="0"
      :value="from"
    />
  </label>
</template>

<style scoped></style>
