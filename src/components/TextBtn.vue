<script setup>
defineProps({
  placeholder: { type: String, default: 'Introducir' },
  disabled: { type: Boolean }
})
defineEmits(['btn-click'], ['change'])
const value = defineModel()
</script>

<template>
  <div class="join w-full">
    <input
      class="input join-item input-bordered w-full"
      :placeholder="placeholder"
      v-model="value"
      @input="$emit('change')"
    />
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
