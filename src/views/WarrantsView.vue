<script setup>
import { ref, watch, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import router from '@/router'
import axios from 'axios'

const url = `${import.meta.env.VITE_SALES}/warranty-types/`
const items = ref([])
const serverItemsLength = ref(0)
const loading = ref(false)
const loadingSpinner = ref(false)
const users = ref([])
const isFetching = ref(false)
const title = ref('')
const duration = ref(0)
const price = ref(0)
const description = ref('')
const garantia = ref(false)
const auto = ref(false)
const edit = ref(null)
const data = ref({})
const headers = [
  { text: 'TÍTULO', value: 'title' },
  { text: 'DESCRIPCIÓN', value: 'description' },
  { text: 'PRECIO', value: 'price' },
  { text: 'ACCIONES', value: 'id', width: 60 }
]
const options = [
  {
    id: 0,
    title: '0 Meses'
  },
  {
    id: 12,
    title: '12 Meses'
  },
  {
    id: 24,
    title: '24 Meses'
  },
  {
    id: 36,
    title: '36 Meses'
  }
]
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

const reset = () => {
  title.value = ''
  duration.value = 0
  price.value = 0
  description.value = ''
  auto.value = false
  garantia.value = false
}

const editModal = (id) => {
  axios
    .get(`${url}${id}/`)
    .then((response) => {
      data.value = response.data
      title.value = data.value.title
      duration.value = data.value.warranty_period
      price.value = data.value.price
      description.value = data.value.description
      auto.value = data.value.auto_add_vehicle
      garantia.value = data.value.without_warranty
    })
    .then(() => {
      edit.value.showModal()
    })
}

const editData = () => {
  loadingSpinner.value = true
  axios
    .put(`${url}${data.value.id}/`, {
      title: title.value,
      warranty_period: duration.value,
      price: price.value,
      description: description.value,
      auto_add_vehicle: auto.value,
      without_warranty: garantia.value
    })
    .then(() => {
      reset()
      fetching()
      edit.value.close()
      loadingSpinner.value = false
    })
}

const addWarrant = () => {
  axios
    .post(url, {
      title: title.value,
      warranty_period: duration.value,
      price: price.value,
      description: description.value,
      auto_add_vehicle: auto.value,
      without_warranty: garantia.value
    })
    .then(() => {
      reset()
      fetching()
    })
}
</script>

<template>
  <dialog ref="edit" id="edit" class="modal">
    <div class="modal-box flex flex-col">
      <form method="dialog flex flex-col" @submit.prevent="edit.close(); reset()">
        <button class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">✕</button>
      </form>
      <h3 class="text-lg font-bold">Editar Descuento</h3>
      <div class="divider m-0"></div>
      <form @submit.prevent="editData" class="flex flex-col">
        <TextInput label="Título" placeholder="Introducir" v-model="title" />
        <SelectInput label="Duración" :options="options" v-model="duration" />
        <NumberInput label="Precio" placeholder="Introducir" v-model="price" :max="200000" />
        <TextInput label="Descripción" placeholder="Introducir" v-model="description" />
        <div class="mt-3 font-medium">
          <CheckInput label="Sin Garantía" :read="data.without_warranty" v-model="garantia" />
          <CheckInput
            label="¿Agregar al vehículo automáticamente?"
            :read="data.auto_add_vehicle"
            v-model="auto"
          />
        </div>
        <button type="submit" class="btn btn-primary mt-4 self-end text-white">
          <LoadingSpinner v-if="loadingSpinner" />
          Guardar
        </button>
      </form>
    </div>
  </dialog>
  <HeaderMain>
    <SettingTable
      title="Lista de garantías"
      :add="true"
      drawerTitle="Añadir Nueva Garantía"
      @toggle="addWarrant"
    >
      <template #content>
        <EasyDataTable
          class="table-dark table-striped"
          border-cell
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
              <button class="btn btn-square btn-xs mr-2" @click="editModal(id)">
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
        <TextInput label="Título" placeholder="Introducir" v-model="title" />
        <SelectInput label="Duración" :options="options" v-model="duration" />
        <NumberInput label="Precio" placeholder="Introducir" v-model="price" :max="200000" />
        <TextInput label="Descripción" placeholder="Introducir" v-model="description" />
        <div class="mt-3 font-medium">
          <CheckInput label="Sin Garantía" v-model="garantia" />
          <CheckInput label="¿Agregar al vehículo automáticamente?" v-model="auto" />
        </div>
      </template>
    </SettingTable>
  </HeaderMain>
</template>
