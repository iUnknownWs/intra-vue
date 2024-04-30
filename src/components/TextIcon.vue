<script setup>
defineProps({
  placeholder: { type: String }
})

const value = defineModel()
</script>

<template>
  <label class="input input-bordered flex w-52 items-center gap-2 lg:w-96">
    <slot />
    <input type="text" class="grow" :placeholder="placeholder" v-model="value" />
  </label>
</template>

 scoped></style>
