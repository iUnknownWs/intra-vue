<script setup>
import { ref } from 'vue'

const modal = ref(null)

defineExpose({ modal })
</script>

<template>
  <dialog ref="modal" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <slot />
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>