<script setup>
defineProps({
  label: { type: String, required: true },
  name: { type: String, required: true },
  value: { type: String, required: true }
})
defineEmits(['changed'])
const modelValue = defineModel()
</script>

<template>
  <div class="form-control">
    <label class="label cursor-pointer justify-start gap-3">
      <input type="radio" :name="name" class="radio" :value="value" v-model="modelValue" @change="$emit('changed')" />
      <span class="label-text">{{ label }}</span>
    </label>
  </div>
</template>
