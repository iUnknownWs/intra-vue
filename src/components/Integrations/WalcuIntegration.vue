<script setup>
import { Icon } from '@iconify/vue'
defineEmits(['return'])
</script>

<template>
  <div class="mb-4">
    <div class="flex items-center">
      <button class="btn btn-square btn-ghost mr-2" @click="$emit('return')">
        <Icon icon="mdi:arrow-left" width="25" />
      </button>
      <h2 class="text-xl font-medium">Walcu</h2>
    </div>
    <div class="divider m-0"></div>
  </div>
</template>

<style scoped></style>
