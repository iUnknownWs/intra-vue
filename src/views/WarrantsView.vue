<script setup>
import { ref, watch, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import CheckInput from '@/components/CheckInput.vue'
import SelectInput from '@/components/SelectInput.vue'
import HeaderMain from '@/components/HeaderMain.vue'
import SettingTable from '@/components/SettingTable.vue'
import TextInput from '@/components/TextInput.vue'
import router from '@/router'
import axios from 'axios'

const url = `${import.meta.env.VITE_SALES}/warranty-types/`
const items = ref([])
const serverItemsLength = ref(0)
const loading = ref(false)
const users = ref([])
const isFetching = ref(false)
const serverOptions = ref({
  page: 1,
  rowsPerPage: 20
})

const fetching = () => {
  if (isFetching.value) {
    return
  }

  isFetching.value = true
  loading.value = true

  const fetchData = async () => {
    try {
      const params = {
        limit: serverOptions.value.rowsPerPage,
        pager: 'number',
        page: serverOptions.value.page
      }
      const API_URL = `${url}/?${new URLSearchParams(params)}`
      const response = await axios.get(API_URL)
      users.value = response.data.results
      items.value = response.data.results
      serverItemsLength.value = response.data.count
      loading.value = false
    } catch (error) {
      console.error(error)
    } finally {
      isFetching.value = false
    }
  }

  fetchData()
}

onMounted(() => {
  fetching()
})

watch(
  serverOptions,
  () => {
    fetching()
  },
  { deep: true }
)

const remove = (id) => {
  axios.delete(`${url}${id}/`).then(() => router.go(0))
}

const addDiscount = () => {
  axios.post(url, {
    title: title.value,
    warranty_period: options.value,
    price: price.value,
    description: description.value,
    auto_add_vehicle: auto.value,
    without_warranty: garantia.value
  }).then(() => router.go(0))
}

const title = ref('')
const updateTitle = (value) => {
  title.value = value
}
const duration = ref(0)
const updateDuration = (value) => {
  duration.value = value
}
const price = ref(0)
const updatePrice = (value) => {
  price.value = value
}
const description = ref('')
const updateDescription = (value) => {
  description.value = value
}
const garantia = ref(false)
const updateGarantia = (value) => {
  garantia.value = value
}
const auto = ref(false)
const updateAuto = (value) => {
  auto.value = value
}

const headers = [
  { text: 'TÍTULO', value: 'title' },
  { text: 'DESCRIPCIÓN', value: 'description' },
  { text: 'PRECIO', value: 'price' },
  { text: 'ACCIONES', value: 'id', width: 60 }
]

const options = [
  {
    value: 0,
    name: '0 Meses'
  },
  {
    value: 12,
    name: '12 Meses'
  },
  {
    value: 24,
    name: '24 Meses'
  },
  {
    value: 36,
    name: '36 Meses'
  }
]
</script>
<template>
  <HeaderMain>
    <SettingTable
      title="Lista de garantías"
      :add="true"
      drawerTitle="Añadir Nueva Garantía"
      @toggle="addDiscount"
    >
      <template #content>
        <EasyDataTable
          class="table-dark table-striped"
          buttons-pagination
          :headers="headers"
          :items="items"
          v-model:server-options="serverOptions"
          :server-items-length="serverItemsLength"
          :loading="loading"
          rows-per-page-message="Filas por pestaña"
        >
          <template v-slot:item-id="{ id }">
            <div class="w-20">
              <button class="btn btn-square btn-xs mr-2" @click="remove(id)">
                <Icon icon="mdi:pencil" />
              </button>
              <button class="btn btn-square btn-error btn-xs" @click="remove(id)">
                <Icon icon="mdi:trash-can-outline" />
              </button>
            </div>
          </template>
        </EasyDataTable>
      </template>
      <template #drawer>
        <TextInput label="Título" placeholder="Introducir" @input="updateTitle" />
        <SelectInput label="Duración" :options="options" @input="updateDuration" />
        <TextInput label="Precio" placeholder="Introducir" @input="updatePrice" />
        <TextInput label="Descripción" placeholder="Introducir" @input="updateDescription" />
        <div class="mt-3 font-medium">
          <CheckInput label="Sin Garantía" @input="updateGarantia" />
          <CheckInput label="¿Agregar al vehículo automáticamente?" @input="updateAuto" />
        </div>
      </template>
    </SettingTable>
  </HeaderMain>
</template>