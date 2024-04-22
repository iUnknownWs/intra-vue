<script setup>
defineProps({
  label: { type: String, required: true }
})
defineEmits(['change'])
const value = defineModel()
</script>

<template>
  <label class="form-control mb-4 w-full">
    <div class="label">
      <span class="label-text font-medium">{{ label }}</span>
    </div>
    <input type="date" class="input input-bordered w-full" v-model="value" @change="$emit('change')" />
  </label>
</template>