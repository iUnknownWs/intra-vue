<script setup>
import { ref } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  placeholder: { type: String, required: true },
  disabled: { type: Boolean },
  type: { type: String, default: 'text' },
  modelValue: { type: String }
})
defineEmits(['update:modelValue'])


</script>

<template>
  <label class="form-control w-full">
    <div class="label">
      <span class="label-text font-medium">{{ label }}</span>
    </div>
    <input
      :type="type"
      :placeholder="placeholder"
      class="input input-bordered w-full"
      :disabled="disabled"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </label>
</template>
