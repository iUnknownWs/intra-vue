<script setup>
defineEmits(['changed'])
defineProps({
  label: { type: String, required: true },
  option: { type: String }
})
const value = defineModel({ default: false })
</script>

<template>
  <div class="form-control">
    <label class="label cursor-pointer">
      <span class="label-text mr-4 text-base font-medium">{{ label }}</span>
      <input type="checkbox" class="toggle" v-model="value" @change="$emit('changed')" />
      <span v-if="option" class="label-text ml-4 text-base font-medium">{{ option }}</span>
    </label>
  </div>
</template>

 scoped></style>
