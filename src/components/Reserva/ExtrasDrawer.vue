<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import options from '@/js/filterOptions'
const props = defineProps({
  toggle: { type: Function, required: true },
  extras: { type: Array, required: true },
  id: { type: String, required: true }
})

const extraCategory = ref(null)
const extraValue = ref(null)
const extrasType = ref([])
const extrasDocsOptions = ref([])
const extrasDeliveryOptions = ref([])
const extrasAnyOptions = ref([])
const extrasWarrantyOptions = ref([])

for (const item of props.extras) {
  if (item.category == 'DocumentManagement') {
    extrasDocsOptions.value.push({
      id: item.id,
      title: item.title
    })
  }
  if (item.category == 'DeliveryType') {
    extrasDeliveryOptions.value.push({
      id: item.id,
      title: item.title
    })
  }
  if (item.category == 'AnyExtra') {
    extrasAnyOptions.value.push({
      id: item.id,
      title: item.title
    })
  }
  if (item.category == 'WarrantyType') {
    extrasWarrantyOptions.value.push({
      id: item.id,
      title: item.title
    })
  }
}

const extraSelected = () => {
  if (extraCategory.value == 'WarrantyType') {
    extrasType.value = extrasWarrantyOptions.value
  }
  if (extraCategory.value == 'DeliveryType') {
    extrasType.value = extrasDeliveryOptions.value
  }
  if (extraCategory.value == 'DocumentManagement') {
    extrasType.value = extrasDocsOptions.value
  }
  if (extraCategory.value == 'AnyExtra') {
    extrasType.value = extrasAnyOptions.value
  }
}

const addExtra = () => {
  axios
    .post(`${import.meta.env.VITE_SALES}/booking-extras/`, {
      booking: props.id,
      extra: extraValue.value
    })
    .then(() => {
      props.toggle()
    })
}
</script>

<template>
  <div>
    <DrawerTitle title="Añadir Extra" @toggle="toggle" />
    <SelectInput
      label="Categoria:"
      v-model="extraCategory"
      :options="options.extraType"
      :initialValue="null"
      @selected="extraSelected"
    />
    <SelectInput
      label="Tipo:"
      v-model="extraValue"
      :options="extrasType"
      :initialValue="null"
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
