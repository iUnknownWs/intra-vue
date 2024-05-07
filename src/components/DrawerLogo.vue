<script setup>
import { Icon } from '@iconify/vue'
defineProps({
  label: { type: String }
})
</script>

<template>
  <li class="disabled flex flex-row items-center justify-between pb-4 focus:bg-white">
    <slot />
    {{ label }}
    <a @click="$emit('toggle')">
      <Icon icon="mdi:close" width="24" color="black" />
    </a>
  </li>
</template>
