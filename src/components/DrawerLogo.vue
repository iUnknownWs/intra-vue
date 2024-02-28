<script setup>
defineProps({
  label: { type: String }
})
</script>

<template>
  <li class="disabled focus:bg-white">
    <slot />
    {{ label }}
  </li>
</template>