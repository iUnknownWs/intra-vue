<script setup>
import { ref } from 'vue'

defineProps({
  label: { type: String, required: true }
})

const value = ref(false)
</script>

<template>
  <div class="form-control">
    <label class="label cursor-pointer">
      <span class="label-text font-medium">{{ label }}</span>
      <input type="checkbox" class="checkbox" v-model="value" @change="$emit('input', value)" />
    </label>
  </div>
</template>

<style scoped></style>
