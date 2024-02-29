<script setup>
import { ref } from 'vue'

defineProps({
    title: { type: String, required: true },
    message: { type: String, required: true }
})
const modal = ref(null)
defineExpose({ modal })
</script>

<template>
  <dialog ref="modal" class="modal">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">✕</button>
      </form>
      <h3 class="text-lg font-bold">{{title}}</h3>
      <p class="py-4">{{ message }}</p>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
