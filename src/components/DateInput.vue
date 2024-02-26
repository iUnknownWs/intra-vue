<script setup>
import { ref } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  modelValue: { type: String }
})
defineEmits(["update:modelValue"])

</script>

<template>
  <label class="form-control mb-4 w-full">
    <div class="label">
      <span class="label-text font-medium">{{ label }}</span>
    </div>
    <input :value="modelValue" 
    type="date" 
    class="input input-bordered w-full" 
    @input="$emit('update:modelValue', $event.target.value)" />
  </label>
</template>

<style scoped></style>
