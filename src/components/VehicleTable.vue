<script setup>
import { Icon } from '@iconify/vue'
defineProps({
  title: { type: String },
  add: { type: Boolean }
})
defineEmits(['addBtn'])
</script>

<template>
  <div class="flex flex-col">
    <div class="flex flex-row items-center justify-between">
      <div class="flex w-full flex-col">
        <div class="text-b flex flex-row items-center justify-between">
          <span class="text-base font-bold lg:text-xl">{{ title }}</span>
          <button v-if="add" class="btn btn-outline btn-sm self-end" @click="$emit('addBtn')">
            <Icon icon="mdi:plus" width="24" />
            <span class="hidden lg:inline"> Nuevo </span>
          </button>
        </div>
        <div v-if="add" class="divider m-0"></div>
      </div>
    </div>
    <slot name="content" />
  </div>
</template>
