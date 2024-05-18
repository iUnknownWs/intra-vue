<script setup>
import { ref, onMounted } from 'vue'
import options from '@/js/filterOptions.js'
import axios from 'axios'

const props = defineProps({
  id: { type: String, required: true },
  toggle: { type: Function, required: true },
  financed: { type: String, required: true },
  products: { type: Array, required: true },
  rates: { type: Array, required: true }
})

const loading = ref(false)

const price = ref(props.financed)
const inputs = ref(0)
const imported = ref(0)

const financingFilter = ref(0)
const ratesFilter = ref(null)
const productFilter = ref(null)
const timeFilter = ref('')

const financiers = ref([{ id: 0, title: 'Cofidis' }])

const serverItemsLength = ref(0)

const serverOptions = ref({
  page: 1,
  rowsPerPage: 20
})

const headers = [
  { text: 'Financiera', value: 'financing_company' },
  { text: 'Interes', value: 'rate' },
  { text: 'Producto', value: 'product' },
  { text: 'Meses', value: 'months' },
  { text: 'Cuotas', value: 'price' }
]

const tableItems = ref([])

const getData = () => {
  loading.value = true
  imported.value = price.value - inputs.value
  axios
    .post(`${import.meta.env.VITE_VEHICLES}/${props.id}/financing_table/`, {
      financing_amount: imported.value
    })
    .then((response) => {
      tableItems.value = response.data
    })
    .finally(() => {
      loading.value = false
    })
}

onMounted(() => {
  getData()
})
</script>

<template>
  <div>
    <DrawerTitle title="Calculadora financiación" @toggle="toggle" />
    <div class="mb-2">
      <span class="text-lg font-semibold">Parámetros</span>
      <div class="divider m-0"></div>
    </div>
    <TextInput label="Precio financiado:" v-model="price" />
    <TextInput label="Entrada:" v-model="inputs" @change="getData()" />
    <TextInput label="Importe financiado:" v-model="imported" />
    <div class="mb-2 mt-8">
      <span class="text-lg font-semibold">Filtros</span>
      <div class="divider m-0"></div>
    </div>
    <SelectInput
      label="Financiera:"
      v-model="financingFilter"
      :options="financiers"
      :initialValue="null"
    />
    <div class="flex flex-row gap-4">
      <SelectInput
        label="Interés:"
        v-model="ratesFilter"
        :options="rates"
        :initialValue="null"
        optionLabel="label"
      />
      <SelectInput
        label="Producto:"
        v-model="productFilter"
        :options="products"
        :initialValue="null"
        optionLabel="label"
      />
    </div>
    <SelectInput
      label="Meses:"
      v-model="timeFilter"
      :options="options.financingMonths"
      :initialValue="null"
    />
    <span class="mt-8 text-lg font-semibold">Opciones</span>
    <div class="divider m-0"></div>
    <VehicleTable>
      <template #content>
        <EasyDataTable
          class="table-dark table-striped"
          table-class-name="z-0"
          header-class-name="z-0"
          hide-footer
          :headers="headers"
          :items="tableItems"
          v-model:server-options="serverOptions"
          :server-items-length="serverItemsLength"
          :loading="loading"
        >
        </EasyDataTable>
      </template>
    </VehicleTable>
  </div>
</template>
