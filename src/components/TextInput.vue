<script setup>
import { ref } from 'vue'

defineProps({
  label: { type: String, required: true },
  placeholder: { type: String, required: true },
  disabled: { type: Boolean },
  type: { type: String, default: 'text' }
})

const value = ref('')

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
      v-model="value"
      @change="$emit('input', value)"
    />
  </label>
</template>
