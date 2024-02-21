<script setup>
defineProps({
  label: { type: String, required: true },
  href: { type: String, required: true }
})
</script>

<template>
  <li>
    <RouterLink
      :to=href
      class="border-b-2 border-black font-medium hover:bg-white hover:text-black focus:border-white focus:text-white hover:focus:text-black"
    >
      {{ label }}
    </RouterLink>
  </li>
</template>
