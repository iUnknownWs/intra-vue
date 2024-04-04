<script setup>
defineProps({
  img: { type: String, required: true },
  published: { type: Number },
  pending: { type: Number },
  state: { type: Boolean },
  loading: { type: Boolean }
})

defineEmits(['settingClick', 'primaryClick'])
</script>

<template>
  <div class="card w-[80vw] bg-base-100 shadow-xl lg:w-full lg:max-w-56">
    <figure class="h-28 px-4 pt-10">
      <img :src="img" alt="Logo" class="rounded-xl" />
    </figure>
    <div class="card-body items-center p-4 text-center">
      <span v-if="published || published === 0">Vehiculos publicados: {{ published }}</span>
      <span v-if="pending || pending === 0">Vehiculos por publicar: {{ pending }}</span>
      <button class="btn btn-outline btn-sm" @click="$emit('settingClick')">Configurar</button>
      <button
        class="btn btn-error btn-sm text-white"
        :disabled="!state"
        @click="$emit('primaryClick')"
      >
        <LoadingSpinner v-if="loading" />
        <span v-else class="font-semibold">Desactivar</span>
      </button>
    </div>
  </div>
</template>
