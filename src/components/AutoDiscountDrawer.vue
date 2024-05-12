<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { Icon } from '@iconify/vue'

defineProps({
  toggle: { type: Function, required: true }
})

const tab = ref('today')
const loading = ref(false)

const headersDiscounts = [
  { text: 'Matrícula', value: 'vehicle_details.license_plate' },
  { text: 'Marca + Modelo', value: 'vehicle_details' },
  { text: 'Descuento', value: 'discount_details' },
  { text: 'Precio Venta', value: 'vehicle_details.price.sale_price' },
  { text: 'Acciones', value: 'id', width: 40 }
]

const startDate = ref(new Date().toISOString().split('T')[0])
const endDate = ref(new Date().toISOString().split('T')[0])

const discounts = ref([])
const getDiscounts = (tabSelected) => {
  loading.value = true
  tab.value = tabSelected
  axios
    .get(`${import.meta.env.VITE_API}/vehicle-automated-discount/?period=${tab.value}`)
    .then((response) => {
      discounts.value = response.data.results
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      loading.value = false
    })
}
const dateDiscounts = () => {
  loading.value = true
  axios
    .get(
      `${import.meta.env.VITE_API}/vehicle-automated-discount/?custom_period_start=${startDate.value}&custom_period_end=${endDate.value}`
    )
    .then((response) => {
      discounts.value = response.data.results
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      loading.value = false
    })
}

const removeDiscount = (id) => {
  loading.value = true
  axios
    .delete(`${import.meta.env.VITE_API}/vehicle-automated-discount/${id}/`)
    .then(() => {
      getDiscounts(tab.value)
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      loading.value = false
    })
}

onMounted(() => {
  getDiscounts('today')
})
</script>

<template>
  <div>
    <DrawerTitle title="Descuento Automático" @toggle="toggle" />
    <div role="tablist" class="tabs tabs-bordered mt-4">
      <a
        role="tab"
        class="tab"
        :class="{ 'tab-active font-semibold': tab === 'yesterday' }"
        @click="getDiscounts('yesterday')"
        >Ayer</a
      >
      <a
        role="tab"
        class="tab"
        :class="{ 'tab-active font-semibold': tab === 'today' }"
        @click="getDiscounts('today')"
        >Hoy</a
      >
      <a
        role="tab"
        class="tab"
        :class="{ 'tab-active font-semibold': tab === 'tomorrow' }"
        @click="getDiscounts('tomorrow')"
        >Mañana</a
      >
      <a
        role="tab"
        class="tab"
        :class="{ 'tab-active font-semibold': tab === 'week' }"
        @click="getDiscounts('week')"
      >
        Esta Semana
      </a>
    </div>
    <div class="my-4 flex flex-row gap-24">
      <DateInput label="Inicio:" v-model="startDate" @change="dateDiscounts" />
      <DateInput label="Fin:" v-model="endDate" @change="dateDiscounts" />
    </div>
    <VehicleTable>
      <template #content>
        <EasyDataTable
          class="table-dark table-striped"
          table-class-name="z-0"
          header-class-name="z-0"
          hide-footer
          :items="discounts"
          :headers="headersDiscounts"
          :loading="loading"
        >
          <template v-slot:item-vehicle_details="{ vehicle_details }">
            {{ vehicle_details.brand_web.title }} {{ vehicle_details.model_web.title }}
          </template>
          <template v-slot:item-id="{ id }">
            <button class="btn btn-square btn-error btn-sm" @click="removeDiscount(id)">
              <Icon icon="mdi:trash-can-outline" width="20" />
            </button>
          </template>
        </EasyDataTable>
      </template>
    </VehicleTable>
  </div>
</template>
