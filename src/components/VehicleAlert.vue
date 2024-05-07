<script setup>
import { Icon } from '@iconify/vue'

defineProps({
  message: { type: String, required: true }
})

defineEmits(['btn'])
</script>

<template>
  <div role="alert" class="alert alert-warning flex">
    <div class="flex flex-row w-full items-center justify-between gap-2">
      <div class="flex flex-row items-center gap-2">
        <Icon icon="mdi:alert-circle" width="24" />
        <span class="w-fit">{{ message }}</span>
      </div>
      <button class="btn btn-square btn-ghost btn-xs" @click="$emit('btn')">
        <Icon icon="mdi:close" width="24" />
      </button>
    </div>
  </div>
</template>
