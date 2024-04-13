<script setup>
import { Icon } from '@iconify/vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'

const finRatesUrl = `${import.meta.env.VITE_API}/vehicles-financing-rates/`
const finProdUrl = `${import.meta.env.VITE_API}/vehicles-financing-products/`

const finRate = ref(null)
const finProd = ref(null)
const finRateOptions = ref([])
const finProdOptions = ref([])

defineEmits(['return'])

onMounted(() => {
  axios.get(finProdUrl).then((response) => {
    finProdOptions.value = response.data.results
  })

  axios.get(finRatesUrl).then((response) => {
    finRateOptions.value = response.data.results
  })
})
</script>

<template>
  <div class="mb-4">
    <div class="flex items-center">
      <button class="btn btn-square btn-ghost mr-2" @click="$emit('return')">
        <Icon icon="mdi:arrow-left" width="25" />
      </button>
      <h2 class="text-xl font-medium">COFIDIS</h2>
    </div>
    <div class="divider m-0"></div>
    <div class="flex flex-col">
      <div class="my-4 flex flex-col items-center gap-4 lg:flex-row">
        <SelectInput
          label="Interés por defecto:"
          v-model="finRate"
          :options="finRateOptions"
          optionLabel="label"
          :initialValue="null"
        />
        <SelectInput
          label="Producto por defecto:"
          v-model="finProd"
          :options="finProdOptions"
          optionLabel="label"
          :initialValue="null"
        />
      </div>
      <button class="btn btn-primary self-end">Guardar</button>
    </div>
  </div>
</template>
