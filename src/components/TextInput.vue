<script setup>
defineProps({
  label: { type: String, required: true },
  placeholder: { type: String, required: true },
  disabled: { type: Boolean },
  type: { type: String, default: 'text' },
  modelValue: { type: String }
})

const value = defineModel()
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
    />
  </label>
</template>
