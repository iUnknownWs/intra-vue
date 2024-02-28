<script setup>
import { Icon } from '@iconify/vue'
defineProps({
  title: { type: String, required: true }
})

defineEmits(['toggle'])
</script>

<template>
  <li class="menu-title flex flex-row justify-between">
    {{ title }}
    <button @click="$emit('toggle')" class="btn btn-square btn-xs">
      <Icon icon="mdi:close" width="20" />
    </button>
  </li>
  <div class="divider m-0"></div>
</template>