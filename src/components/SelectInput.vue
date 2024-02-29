<script setup>
defineProps({
  label: { type: String, required: true },
  options: { type: Object, required: true },
  disabled: { type: Boolean }
})
defineEmits(['selected'])

const value = defineModel()
</script>

<template>
  <label class="form-control mb-4 w-full">
    <div class="label">
      <span class="label-text font-medium">{{ label }}</span>
    </div>
    <select class="select select-bordered" v-model="value" @change="$emit('selected')" :disabled="disabled">
      <option disabled selected value="0">Seleccione una opción</option>
      <option v-for="(option, index) in options" :key="index" :value="option.id">
        {{ option.title }}
      </option>
    </select>
  </label>
</template>

<style scoped></style>
