<script setup>
import { ref } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  options: { type: Object, required: true },
  read: { type: Number }
})

const value = ref(0)
if (props.read) {
  value.value = props.read
}
</script>

<template>
  <label class="form-control mb-4 w-full">
    <div class="label">
      <span class="label-text font-medium">{{ label }}</span>
    </div>
    <select class="select select-bordered" v-model="value" @change="$emit('input', value)">
      <option disabled selected>Pick one</option>
      <option v-for="(option, index) in options" :key="index" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </label>
</template>

<style scoped></style>
