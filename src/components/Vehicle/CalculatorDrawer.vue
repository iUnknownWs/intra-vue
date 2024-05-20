<script setup>
import { ref, onMounted } from 'vue'
import options from '@/js/filterOptions.js'
import axios from 'axios'
import { Icon } from '@iconify/vue'

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
const ratesOptions = ref([])
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

let filters = {}

const selectedRate = () => {
  filters.rate = ratesFilter.value
  getData()
}

const selectedProduct = () => {
  filters.product = productFilter.value
  getData()
}

const selectedMonths = () => {
  filters.months = timeFilter.value
  getData()
}

const getData = () => {
  loading.value = true
  imported.value = price.value - inputs.value
  axios
    .post(
      `${import.meta.env.VITE_VEHICLES}/${props.id}/financing_table/`,
      {
        financing_amount: imported.value
      },
      {
        params: filters
      }
    )
    .then((response) => {
      tableItems.value = response.data.table
      ratesOptions.value = response.data.rates
    })
    .finally(() => {
      loading.value = false
    })
}

const resetFilters = () => {
  filters = {}
  ratesFilter.value = null
  productFilter.value = null
  timeFilter.value = ''
  getData()
}

const state = ref(false)

onMounted(() => {
  getData()
})
</script>

<template>
  <div>
    <DrawerTitle title="Calculadora financiación" @toggle="toggle" />
    <div class="mb-1">
      <span class="text-lg font-semibold">Parámetros</span>
      <div class="divider m-0"></div>
    </div>
    <TextInput label="Precio financiado:" v-model="price" />
    <TextInput label="Entrada:" v-model="inputs" @change="getData()" />
    <TextInput label="Importe financiado:" v-model="imported" />
    <div class="collapse mb-1 mt-4" @click="state = !state">
      <input type="checkbox" />
      <div class="collapse-title p-0 text-xl font-medium">
        <div class="flex flex-row justify-between">
          <span class="text-lg font-semibold">Filtros</span>
          <label class="swap text-6xl" :class="state ? 'swap-active' : ''">
            <Icon class="swap-on" icon="mdi:chevron-down" width="24" />
            <Icon class="swap-off" icon="mdi:chevron-up" width="24" />
          </label>
        </div>
        <div class="divider m-0"></div>
      </div>
      <div class="collapse-content p-0">
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
            :options="ratesOptions"
            :initialValue="null"
            optionLabel="label"
            @selected="selectedRate"
          />
          <SelectInput
            label="Producto:"
            v-model="productFilter"
            :options="products"
            :initialValue="null"
            optionLabel="label"
            @selected="selectedProduct"
          />
        </div>
        <SelectInput
          label="Meses:"
          v-model="timeFilter"
          :options="options.financingMonths"
          :initialValue="null"
          @selected="selectedMonths"
        />
        <button class="btn btn-primary btn-sm mt-4 w-full" @click="resetFilters">
          Limpiar filtros
        </button>
      </div>
    </div>
    <div class="mb-1 mt-4">
      <span class="text-lg font-semibold">Opciones</span>
      <div class="divider m-0"></div>
    </div>
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
