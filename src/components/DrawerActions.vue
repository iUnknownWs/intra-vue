<script setup>
defineProps({
  primary: { type: String, required: true },
  secondary: { type: String, required: true }
})

defineEmits(['click-primary', 'click-secondary'])
</script>

<template>
  <li class="mt-8 flex flex-row justify-around">
    <button @click="$emit('click-secondary')" class="btn btn-outline w-28">{{ secondary }}</button>
    <button @click="$emit('click-primary')" class="btn btn-primary w-24 text-white">
      {{ primary }}
    </button>
  </li>
</template>