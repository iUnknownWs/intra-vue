<script setup>
import { Icon } from '@iconify/vue'

defineProps({
  message: { type: String, required: true }
})

defineEmits(['btn'])
</script>

<template>
  <div role="alert" class="alert alert-warning mb-4">
    <Icon icon="mdi:alert-circle" />
    <span>{{ message }}</span>
    <button class="btn btn-xs" @click="$emit('btn')">cerrar</button>
  </div>
</template>