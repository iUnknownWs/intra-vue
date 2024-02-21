<script setup>
defineProps({
    placeholder: { type: String }
})
</script>

<template>
  <label class="input input-bordered flex w-52 items-center gap-2 lg:w-96">
    <slot />
    <input type="text" class="grow" :placeholder=placeholder />
  </label>
</template>

<style scoped></style>
