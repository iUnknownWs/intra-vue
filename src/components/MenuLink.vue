<script setup>
// eslint-disable-next-line no-unused-vars
import { Icon } from '@iconify/vue'
defineProps({
  label: { type: String, required: true },
  href: { type: String, required: true }
})
</script>

<template>
  <li>
    <RouterLink :to="href">
      <slot />
      {{ label }}
    </RouterLink>
  </li>
</template>

<style scoped></style>
