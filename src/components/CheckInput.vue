<script setup>
import { ref } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  read: { type: Boolean }
})

const value = ref(false)
if (props.read) {
  value.value = props.read
}
</script>

<template>
  <div class="form-control">
    <label class="label cursor-pointer">
      <span class="label-text font-medium">{{ label }}</span>
      <input type="checkbox" class="checkbox" v-model="value" @change="$emit('input', value)" />
    </label>
  </div>
</template>

<style scoped></style>
