<script setup>
import { ref } from 'vue'

defineProps({
  title: { type: String, required: true },
  message: { type: String, required: true },
  loading: { type: Boolean, default: false }
})
const modal = ref(null)
defineEmits(['confirm'])
defineExpose({ modal })
</script>

<template>
  <dialog ref="modal" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <h3 class="text-lg font-bold">{{ title }}</h3>
      <p class="py-4">{{ message }}</p>
      <div class="modal-action mt-1">
        <form method="dialog">
          <button class="btn btn-sm mr-2">Cancelar</button>
          <button class="btn btn-sm" @click="$emit('confirm')">Confirmar</button>
        </form>
      </div>
    </div>
  </dialog>
</template>
