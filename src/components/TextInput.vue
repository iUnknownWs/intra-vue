<script setup>
defineProps({
  label: { type: String, required: true },
  placeholder: { type: String, required: true },
  disabled: { type: Boolean }
})
</script>

<template>
  <label class="form-control w-full">
    <div class="label">
      <span class="label-text">{{ label }}</span>
    </div>
    <input
      type="text"
      :placeholder="placeholder"
      class="input input-bordered w-full"
      :disabled="disabled"
    />
  </label>
</template>
