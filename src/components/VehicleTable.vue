<script setup>
import { Icon } from '@iconify/vue'
defineProps({
  title: { type: String, required: true }
})
defineEmits(['addBtn'])
</script>

<template>
  <div class="flex flex-col">
    <div class="flex flex-row justify-between">
      <span class="text-xl font-semibold">{{ title }}</span>
      <label
        for="vehicle-drawer"
        class="btn btn-outline btn-sm mb-2 self-end"
        @click="$emit('addBtn')"
      >
        <Icon icon="mdi:plus" width="25" />
        Nuevo
      </label>
    </div>
    <slot name="content" />
  </div>
</template>
