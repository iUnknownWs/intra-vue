<script setup>
defineProps({
  img: { type: String, required: true }
})
</script>

<template>
  <div class="card w-[80vw] bg-base-100 shadow-xl lg:w-96">
    <figure class="px-10 pt-10">
      <img :src="img" alt="Logo" class="rounded-xl" />
    </figure>
    <div class="card-body items-center text-center">
      <div class="card-actions w-full flex-col">
        <button class="btn btn-outline btn-primary w-full">Configurar</button>
        <button class="btn btn-error w-full text-white">Desactivar</button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
