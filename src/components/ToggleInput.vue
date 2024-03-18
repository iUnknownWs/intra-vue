<script setup>
defineProps({
  label: { type: String, required: true }
})
const value = defineModel()
</script>

<template>
  <div class="form-control">
    <label class="label cursor-pointer">
      <span class="label-text text-lg font-medium">{{ label }}</span>
      <input type="checkbox" class="toggle" v-model="value" />
    </label>
  </div>
</template>

<style scoped></style>
