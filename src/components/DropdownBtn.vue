<script setup>
defineProps({
  width: { type: String, default: 'w-52' }
})
</script>
<template>
  <div class="dropdown dropdown-end">
    <slot name="btn" />
    <ul
      tabindex="0"
      :class="`menu dropdown-content menu-xs z-50 rounded-box bg-white p-2 font-medium shadow gap-1 ${width}`"
    >
      <slot name="content" />
    </ul>
  </div>
</template>
