<script setup>
defineProps({
  img: { type: [String, null] },
  name: { type: String },
  published: { type: Number },
  pending: { type: Number },
  state: { type: Boolean },
  loading: { type: Boolean },
  toggle: { type: Boolean, default: false },
  btnLabel: { type: String, default: 'Configurar' },
})

defineEmits(['settingClick', 'primaryClick'])
</script>

<template>
  <div class="card bg-white shadow-xl lg:w-full lg:max-w-56">
    <figure class="h-28 px-4 pt-10">
      <img v-if="img" :src="img" alt="Logo" />
      <span v-else class="text-3xl">{{ name }}</span>
    </figure>
    <div class="card-body items-center p-4 text-center">
      <span v-if="published || published === 0">Vehiculos publicados: {{ published }}</span>
      <span v-if="pending || pending === 0">Vehiculos por publicar: {{ pending }}</span>
      <button class="btn btn-outline btn-sm" @click="$emit('settingClick')">{{ btnLabel }}</button>
      <template v-if="toggle">
        <button v-if="state" class="btn btn-error btn-sm" @click="$emit('primaryClick')">
          <LoadingSpinner v-if="loading" />
          <span v-else class="font-semibold">Desactivar</span>
        </button>
        <button v-else class="btn btn-primary btn-sm" @click="$emit('primaryClick')">
          <LoadingSpinner v-if="loading" />
          <span v-else class="font-semibold">Activar</span>
        </button>
      </template>
      <template v-else>
        <button
          class="btn btn-error btn-sm text-white"
          :disabled="!state"
          @click="$emit('primaryClick')"
        >
          <LoadingSpinner v-if="loading" />
          <span v-else class="font-semibold">Desactivar</span>
        </button>
      </template>
    </div>
  </div>
</template>
