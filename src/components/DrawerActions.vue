<script setup>
defineProps({
  primary: { type: String, required: true },
  secondary: { type: String, required: true },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean }
})

defineEmits(['click-primary', 'click-secondary'])
</script>

<template>
  <li class="mt-6 grid grid-cols-2 gap-2">
    <button @click="$emit('click-secondary')" class="btn btn-outline w-full">
      {{ secondary }}
    </button>
    <button
      @click="$emit('click-primary')"
      class="btn btn-primary w-full text-white"
      :disabled="disabled"
    >
      <LoadingSpinner v-if="loading" />
      <span v-else class="font-semibold text-white">{{ primary }}</span>
    </button>
  </li>
</template>
