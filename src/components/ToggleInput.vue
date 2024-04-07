<script setup>
defineEmits(['changed'])
defineProps({
  label: { type: String, required: true },
  option: { type: String}
})
const value = defineModel()
</script>

<template>
  <div class="form-control">
    <label class="label cursor-pointer">
      <span class="label-text text-base font-medium mr-4">{{ label }}</span>
      <input type="checkbox" class="toggle" v-model="value" @change="$emit('changed')" />
      <span v-if="option" class="label-text text-base font-medium ml-4">{{ option }}</span>
    </label>
  </div>
</template>

<style scoped></style>
