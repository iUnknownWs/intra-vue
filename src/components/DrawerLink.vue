<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  label: { type: String, required: true },
  href: { type: String, required: true },
  toggleDrawer: Function
})
</script>

<template>
  <li @click="toggleDrawer">
    <RouterLink :to="href" class="font-medium hover:bg-white hover:text-black focus:border-white">
      <slot />
      {{ label }}
    </RouterLink>
  </li>
</template>
