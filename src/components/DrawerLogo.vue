<script setup>
import { Icon } from '@iconify/vue'
defineProps({
  label: { type: String }
})
</script>

<template>
  <li class="disabled flex flex-row justify-between focus:bg-white">
    <slot />
    {{ label }}
    <button @click="$emit('toggle')" class="btn btn-square btn-xs">
      <Icon icon="mdi:close" width="20" />
    </button>
  </li>
</template>
