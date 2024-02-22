<script setup>
// eslint-disable-next-line no-unused-vars
import { Icon } from '@iconify/vue'
</script>
<template>
  <div class="dropdown dropdown-end ">
    <slot name="btn" />
    <ul
      tabindex="0"
      class="menu dropdown-content menu-sm z-10 mt-3 min-w-56 rounded-box bg-base-100 p-2 font-medium shadow"
    >
      <slot name="content" />
    </ul>
  </div>
</template>
