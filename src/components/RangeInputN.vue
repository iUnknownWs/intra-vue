<script setup>
defineProps({
  label: { type: String, required: true },
  max: { type: Number, required: true }
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
    <div class="flex flex-row justify-between gap-2">
      <input
        type="number"
        name="from"
        id="from"
        class="input input-bordered w-full"
        :max="max"
        min="0"
        v-model="gte"
        @change="$emit('change-gte')"
      />
      <input
        type="number"
        name="to"
        id="to"
        class="input input-bordered w-full"
        :max="max"
        min="0"
        v-model="lte"
        @change="$emit('change-lte')"
      />
    </div>
  </label>
</template>
