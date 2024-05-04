<script setup>
defineProps({
  label: { type: String, required: true },
  options: { type: Object, required: true },
  optionLabel: { type: String, default: 'label' },
  optionValue: { type: String, default: 'value' },
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
      v-if="optionValue !== 'value'"
      v-model="brand"
      :label="optionLabel"
      :options="options"
      :reduce="(option) => option[optionValue]"
      :disabled="disabled"
      @option:selected="$emit('selected')"
    />
    <VueSelect
      v-else
      v-model="brand"
      :label="optionLabel"
      :disabled="disabled"
      :options="options"
      @option:selected="$emit('selected')"
    />
  </label>
</template>
