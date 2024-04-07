<script setup>
import { Icon } from '@iconify/vue'
defineProps({
  placeholder: { type: String, default: 'Introducir' },
  disabled: { type: Boolean }
})
defineEmits(['btn-click', 'change', 'icon-click'])
const value = defineModel()
</script>

class="input join-item input-bordered w-full"
<template>
  <div class="join w-full">
    <label class="input join-item input-bordered flex items-center gap-2">
      <input
        type="text"
        placeholder="Buscar"
        class="w-full"
        v-model="value"
        @input="$emit('change')"
      />
      <a @click="$emit('icon-click')" class="btn btn-square btn-ghost btn-xs">
        <Icon icon="mdi:times" width="25" />
      </a>
    </label>
    <button
      class="btn btn-primary join-item text-white"
      @click="$emit('btn-click')"
      :disabled="disabled"
    >
      <slot />
    </button>
  </div>
</template>

<style scoped></style>
