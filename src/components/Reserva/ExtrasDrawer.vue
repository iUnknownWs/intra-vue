<script setup>
import axios from 'axios'
import { ref } from 'vue'
import options from '@/js/filterOptions'
defineProps({
  toggle: { type: Function, required: true }
})

const extraCategory = ref(null)
const extraValue = ref(null)
const extrasType = ref([])
</script>

<template>
  <div>
    <DrawerTitle title="Añadir Extra" @toggle="toggle" />
    <SelectInput
      label="Categoria:"
      :options="options.extraType"
      v-model="extraCategory"
      @selected="extraSelected"
    />
    <SelectInput
      label="Tipo:"
      :options="extrasType"
      v-model="extraValue"
      :disabled="!extraCategory"
    />
  </div>
  <DrawerActions
    secondary="Cancelar"
    primary="Guardar"
    :disabled="!extraValue"
    @click-secondary="toggle"
    @click-primary="addExtra"
  />
</template>
