<script setup>
defineProps({
  placeholder: { type: String, default: 'Introducir' }
})
defineEmits(['btn-click'])
const value = defineModel()
</script>

<template>
  <div class="join w-full">
    <input
      class="input join-item input-bordered w-full"
      :placeholder="placeholder"
      v-model="value"
    />
    <button class="btn btn-primary join-item text-white" @click="$emit('btn-click')">
      <slot />
    </button>
  </div>
</template>

<style scoped></style>
