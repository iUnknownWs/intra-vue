<script setup>
defineProps({
  label: { type: String, required: true },
  href: { type: String, required: true }
})
</script>

<template>
  <li>
    <RouterLink :to="href">{{ label }}</RouterLink>
  </li>
</template>

<style scoped></style>
