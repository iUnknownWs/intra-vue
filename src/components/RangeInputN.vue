<script setup>
import { ref } from 'vue'
defineProps({
  label: { type: String, required: true },
  max: { type: Number, required: true }
})
const from = ref(0)
const to = ref(200000)
</script>

<template>
  <label class="form-control mb-4 w-full">
    <div class="label">
      <span class="label-text font-medium">{{ label }}</span>
    </div>
    <div class="flex flex-row justify-between">
      <input
        type="number"
        name="from"
        id="from"
        class="input input-bordered w-32"
        :max="max"
        min="0"
        :value="from"
      />
      <input
        type="number"
        name="to"
        id="to"
        class="input input-bordered w-32"
        :max="max"
        min="0"
        :value="to"
      />
    </div>
  </label>
</template>

<style scoped></style>
