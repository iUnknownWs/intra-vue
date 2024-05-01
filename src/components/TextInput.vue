<script setup>
defineProps({
  label: { type: String, required: true },
  placeholder: { type: String },
  disabled: { type: Boolean },
  type: { type: String, default: 'text' },
  required: { type: Boolean, default: false },
  modelValue: { type: String }
})

const value = defineModel()
defineEmits(['input', 'focus', 'change'])
</script>

<template>
  <label class="form-control w-full">
    <div class="label">
      <span class="label-text font-medium">{{ label }}</span>
    </div>
    <input
      :type="type"
      :placeholder="placeholder"
      class="input input-bordered w-full"
      :disabled="disabled"
      v-model="value"
      @input="$emit('input')"
      @focus="$emit('focus')"
      @change="$emit('change')"
      :required="required"
    />
  </label>
</template>