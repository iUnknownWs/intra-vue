<script setup>
defineProps({
  label: { type: String, required: true }
})
</script>

<template>
  <div class="form-control mt-4">
    <label class="label cursor-pointer">
      <span class="label-text">{{ label }}</span>
      <input type="checkbox" checked="checked" class="checkbox" />
    </label>
  </div>
</template>

<style scoped></style>
