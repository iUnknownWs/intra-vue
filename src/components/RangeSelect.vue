<script setup>
defineProps({
  label: { type: String, required: true },
  from: { type: Array, required: true },
  to: { type: Array, required: true }
})
defineEmits(['change-gte', 'change-lte'])

const gte = defineModel('gte')
const lte = defineModel('lte')
</script>

<template>
  <label class="form-control w-full">
    <div class="label">
      <span class="label-text font-medium">{{ label }}</span>
    </div>
    <div class="flex flex-row gap-2 justify-between">
      <select class="select select-bordered w-full" v-model="gte" @change="$emit('change-gte')">
        <option disabled selected>Desde</option>
        <option v-for="option in from" :key="option">{{ option }}</option>
      </select>
      <select class="select select-bordered w-full" v-model="lte" @change="$emit('change-lte')">
        <option disabled selected>Hasta</option>
        <option v-for="option in to" :key="option">{{ option }}</option>
      </select>
    </div>
  </label>
</template>
