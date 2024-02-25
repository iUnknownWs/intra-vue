<script setup>
import { ref } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  read: { type: String }
})

const date = ref('')
if (props.read) {
  date.value = props.read
}
</script>

<template>
  <label class="form-control mb-4 w-full">
    <div class="label">
      <span class="label-text font-medium">{{ label }}</span>
    </div>
    <input v-model="date" type="date" class="input input-bordered w-full" @change="$emit('input', date)" />
  </label>
</template>

<style scoped></style>
