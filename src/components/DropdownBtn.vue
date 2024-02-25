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
      :class="`menu dropdown-content menu-xs z-[999999999999999999999999999999] mt-3 rounded-box bg-base-100 p-2 font-medium shadow ${width}`"
    >
      <slot name="content" />
    </ul>
  </div>
</template>
