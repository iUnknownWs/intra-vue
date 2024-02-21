<script setup>
import { ref } from 'vue'
defineProps({
  label: { type: String, required: true }
})

const tab = ref(0)
</script>

<template>
  <label class="form-control w-full">
    <div class="label">
      <span class="label-text font-medium">{{ label }}</span>
    </div>
    <select class="select select-primary" v-model="tab">
      <option value="0">Todos</option>
      <option value="1">Recepción</option>
      <option value="2">Publicación</option>
      <option value="3">En venta</option>
      <option value="4">Reservados</option>
      <option value="5">Pte. de PT</option>
      <option value="6">Validar PT</option>
      <option value="7">No web</option>
      <option value="8">Entrega inmediata</option>
      <option value="9">No disponible</option>
    </select>
  </label>
</template>

<style scoped></style>
