<script setup>
import { Icon } from '@iconify/vue'
defineProps({
  title: { type: String, required: true },
  add: { type: Boolean }
})
defineEmits(['addBtn'])
</script>

<template>
  <div class="flex flex-col">
    <div class="flex flex-row justify-between">
      <span class="mb-4 text-xl font-semibold">{{ title }}</span>
      <label
        v-if="add"
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
