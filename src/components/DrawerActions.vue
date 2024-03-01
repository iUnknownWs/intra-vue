<script setup>
defineProps({
  primary: { type: String, required: true },
  secondary: { type: String, required: true },
  disabled: { type: Boolean, default: false }
})

defineEmits(['click-primary', 'click-secondary'])
</script>

<template>
  <li class="mt-8 flex flex-row justify-end gap-4">
    <button @click="$emit('click-secondary')" class="btn btn-outline w-28">{{ secondary }}</button>
    <button @click="$emit('click-primary')" class="btn btn-primary w-24 text-white" :disabled="disabled">
      {{ primary }}
    </button>
  </li>
</template>