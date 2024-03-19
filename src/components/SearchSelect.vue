<script setup>
defineProps({
  label: { type: String, required: true },
  options: { type: Object, required: true },
  disabled: { type: Boolean }
})
defineEmits(['selected'])
const brand = defineModel()
</script>

<template>
  <label class="form-control w-full">
    <div class="label">
      <span class="label-text font-medium">{{ label }}</span>
    </div>
    <VueSelect
      v-model="brand"
      :options="options"
      :disabled="disabled"
      @option:selected="$emit('selected')"
    />
  </label>
</template>

<style scoped></style>
