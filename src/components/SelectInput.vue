<script setup>
import { ref } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  options: { type: Object, required: true },
  modelValue: { type: String }
})


</script>

<template>
  <label class="form-control mb-4 w-full">
    <div class="label">
      <span class="label-text font-medium">{{ label }}</span>
    </div>
    <select class="select select-bordered" :value="modelValue" @change="$emit('update:modelValue', $event.target.value)">
      <option disabled selected>Pick one</option>
      <option v-for="(option, index) in options" :key="index" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </label>
</template>

<style scoped></style>
