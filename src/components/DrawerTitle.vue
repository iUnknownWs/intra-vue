<script setup>
import { Icon } from '@iconify/vue'
defineProps({
  title: { type: String, required: true }
})

defineEmits(['toggle'])
</script>

<template>
  <div class="mb-8 flex flex-row items-center justify-between">
    <span class="text-xl font-bold">{{ title }}</span>
    <a @click="$emit('toggle')">
      <Icon icon="mdi:close" width="24" />
    </a>
  </div>
</template>
