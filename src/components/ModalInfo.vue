<script setup>
import { ref } from 'vue'

defineProps({
  title: { type: String, required: true },
  message: { type: String, required: true },
  loading: { type: Boolean, default: false }
})
const modal = ref(null)
defineExpose({ modal })
defineEmits(['close'])

</script>

<template>
  <dialog ref="modal" class="modal">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2" @click="$emit('close')">✕</button>
      </form>
      <h3 class="text-lg font-bold">{{ title }}</h3>
      <p class="py-4">{{ message }}</p>
      <div v-if="loading" class="flex w-full items-center justify-center">
        <LoadingSpinner class="loading-lg" />
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button @click="$emit('close')">close</button>
    </form>
  </dialog>
</template>
