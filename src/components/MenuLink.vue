<script setup>
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