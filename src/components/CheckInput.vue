<script setup>
defineProps({
  label: { type: String, required: true },
  value: { type: [String, Number] }
})

const check = defineModel()
</script>

<template>
  <div class="form-control">
    <label class="label cursor-pointer">
      <span class="label-text mr-4 font-medium">{{ label }}</span>
      <input
        v-if="value"
        type="checkbox"
        class="checkbox"
        :value="value"
        v-model="check"
        @change="$emit('changed')"
      />
      <input v-else type="checkbox" class="checkbox" v-model="check" @change="$emit('changed')" />
    </label>
  </div>
</template>
