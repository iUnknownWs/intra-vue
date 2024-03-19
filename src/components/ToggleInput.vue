<script setup>
defineEmits(['changed'])
defineProps({
  label: { type: String, required: true }
})
const value = defineModel()
</script>

<template>
  <div class="form-control">
    <label class="label cursor-pointer">
      <span class="label-text text-lg font-medium mr-4">{{ label }}</span>
      <input type="checkbox" class="toggle" v-model="value" @change="$emit('changed')" />
    </label>
  </div>
</template>

<style scoped></style>
