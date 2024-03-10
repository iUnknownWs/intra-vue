<script setup>
defineProps({
  label: { type: String, required: true },
  placeholder: { type: String }
})
const value = defineModel()
</script>

<template>
  <label class="form-control">
    <div class="label">
      <span class="label-text">{{ label }}</span>
    </div>
    <textarea
      class="textarea textarea-bordered h-24"
      :placeholder="placeholder"
      v-model="value"
    ></textarea>
  </label>
</template>

<style scoped></style>
