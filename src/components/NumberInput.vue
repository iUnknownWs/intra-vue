<script setup>
import { ref } from 'vue'

defineProps({
  label: { type: String, required: true },
  max: { type: Number, required: true },
  modelValue: {type:String, required:true}
})
defineEmits(["update:modelValue"])

</script>

<template>
  <label class="form-control mb-4 w-full">
    <div class="label">
      <span class="label-text font-medium">{{ label }}</span>
    </div>
    <input
      type="number"
      class="input input-bordered w-full"
      :max="max"
      min="0"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    
  </label>
</template>

<style scoped></style>
