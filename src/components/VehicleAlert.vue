<script setup>
import { Icon } from '@iconify/vue'

defineProps({
  message: { type: String, required: true }
})

defineEmits(['btn'])
</script>

<template>
  <div role="alert" class="alert w-[98%] alert-warning my-6 mx-4 flex">
    <div class="flex flex-row w-full items-center justify-between gap-2">
      <Icon icon="mdi:alert-circle" />
      <span>{{ message }}</span>
      <button class="btn btn-square btn-ghost btn-xs" @click="$emit('btn')">
        <Icon icon="mdi:close" width="24" />
      </button>
    </div>
  </div>
</template>
