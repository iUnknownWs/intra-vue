<script setup>
import { Icon } from '@iconify/vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'

const loading = ref(null)
const info = ref(null)
const modalTitle = ref('')
const modalMessage = ref('')

const finRatesUrl = `${import.meta.env.VITE_API}/vehicles-financing-rates/`
const finProdUrl = `${import.meta.env.VITE_API}/vehicles-financing-products/`

const finRate = ref(null)
const finProd = ref(null)
const finRateOptions = ref([])
const finProdOptions = ref([])

defineEmits(['return'])

const updateDefault = () => {
  loading.value = true
  axios
    .patch(`${finRatesUrl}${finRate.value}/`, {
      default: true
    })
    .then(() => {
      loading.value = false
    })

  axios
    .patch(`${finProdUrl}${finProd.value}/`, {
      default: true
    })
    .then(() => {
      modalTitle.value = 'Cofidis actualizado'
      modalMessage.value = 'Las configuraciones se han actualizado correctamente'
      info.value.modal.showModal()
    }).catch((err) => {
      console.error(err)
      modalTitle.value = 'Error'
      modalMessage.value = 'No se pudo actualizar la configuración'
      info.value.modal.showModal()
    }).finally(() => {
      loading.value = false
    })
}

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
  <ModalInfo ref="info" :title="modalTitle" :message="modalMessage" />
  <div class="mx-auto w-full max-w-5xl mt-8 rounded-md bg-base-100 p-4">
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
      <button class="btn btn-primary self-end" @click="updateDefault">
        <LoadingSpinner v-if="loading" />
        <span v-else class="font-semibold text-white">Guardar</span>
      </button>
    </div>
  </div>
</template>
