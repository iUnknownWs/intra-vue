<script setup>
defineProps({
  label: { type: String, required: true },
  options: { type: Object, required: true },
  disabled: { type: Boolean },
  optionLabel: { type: String, default: 'title' },
  optionValue: { type: String, default: 'id' },
  initialValue: { type: String || null, default: '0' }
})
defineEmits(['selected'])
const value = defineModel()
</script>

<template>
  <label class="form-control w-full">
    <div class="label">
      <span class="label-text font-medium">{{ label }}</span>
    </div>
    <select
      class="select select-bordered"
      v-model="value"
      @change="$emit('selected')"
      :disabled="disabled"
    >
      <option disabled selected :value="initialValue">Seleccione una opción</option>
      <option v-for="(option, index) in options" :key="index" :value="option[optionValue]">
        {{ option[optionLabel] }}
      </option>
    </select>
  </label>
</template>