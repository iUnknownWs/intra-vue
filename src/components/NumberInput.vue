<script setup>
defineProps({
  label: { type: String, required: true },
  max: { type: Number }
})

const value = defineModel()
</script>

<template>
  <label class="form-control mb-4 w-full">
    <div class="label">
      <span class="label-text font-medium">{{ label }}</span>
    </div>
    <input type="number" class="input input-bordered w-full" :max="max" min="0" v-model="value" />
  </label>
</template>
