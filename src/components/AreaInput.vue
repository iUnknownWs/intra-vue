<script setup>
defineProps({
  label: { type: String },
  placeholder: { type: String }
})
const value = defineModel()
</script>

<template>
  <label class="form-control">
    <div class="label">
      <span class="label-text font-medium">{{ label }}</span>
    </div>
    <textarea
      class="textarea textarea-bordered h-36"
      :placeholder="placeholder"
      v-model="value"
    ></textarea>
  </label>
</template>

<style scoped></style>
