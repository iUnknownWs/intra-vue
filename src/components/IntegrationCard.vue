<script setup>
defineProps({
  img: { type: String, required: true }
})
</script>

<template>
  <div class="card w-[80vw] bg-base-100 shadow-xl lg:w-60">
    <figure class="h-28 px-10 pt-10">
      <img :src="img" alt="Logo" class="rounded-xl" />
    </figure>
    <div class="card-body items-center text-center">
      <div class="card-actions w-full flex-col">
        <button class="btn btn-outline w-full" @click="$emit('settingClick')">Configurar</button>
        <button class="btn btn-error w-full text-white" @click="$emit('primaryClick')">Desactivar</button>
      </div>
    </div>
  </div>
</template>
