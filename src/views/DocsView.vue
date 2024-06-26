<script setup>
import { ref, watch, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import router from '@/router'
import axios from 'axios'
const url = `${import.meta.env.VITE_SALES}/documents-managements/`
const items = ref([])
const serverItemsLength = ref(0)
const loading = ref(false)
const loadingSpinner = ref(false)
const users = ref([])
const isFetching = ref(false)
const edit = ref(null)
const data = ref({})
const title = ref('')
const description = ref('')
const price = ref(0)
const auto = ref(false)
const headers = [
  { text: 'TÍTULO', value: 'title' },
  { text: 'DESCRIPCIÓN', value: 'description' },
  { text: 'PRECIO', value: 'price' },
  { text: 'ACCIONES', value: 'id', width: 60 }
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
  axios.delete(`${url}/${id}/`).then(() => router.go(0))
}

const reset = () => {
  title.value = ''
  description.value = ''
  price.value = 0
  auto.value = false
}

const editModal = (id) => {
  axios
    .get(`${url}${id}/`)
    .then((response) => {
      data.value = response.data
      title.value = data.value.title
      price.value = data.value.price
      description.value = data.value.description
      auto.value = data.value.auto_add_vehicle
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
      price: price.value,
      description: description.value,
      auto_add_vehicle: auto.value
    })
    .then(() => {
      reset()
      fetching()
      edit.value.close()
      loadingSpinner.value = false
    })
}

const addDocs = () => {
  axios
    .post(url, {
      title: title.value,
      description: description.value,
      price: price.value,
      auto_add_vehicle: auto.value
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
      <form method="dialog flex flex-col" @submit.prevent="edit.close(), reset()">
        <button class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">✕</button>
      </form>
      <h3 class="text-lg font-bold">Editar Tipo de Entrega</h3>
      <div class="divider m-0"></div>
      <form @submit.prevent="editData" class="flex flex-col">
        <TextInput label="Título" placeholder="Introducir" v-model="title" />
        <TextInput label="Descripción" placeholder="Introducir" v-model="description" />
        <NumberInput label="Precio" :max="200000" v-model="price" />
        <CheckInput label="¿Agregar al vehículo automáticamente?" class="mt-3" v-model="auto" />
        <button type="submit" class="btn btn-primary mt-4 self-end text-white">
          <LoadingSpinner v-if="loadingSpinner" />
          Guardar
        </button>
      </form>
    </div>
  </dialog>
  <HeaderMain>
    <div class="mx-auto my-8 max-w-5xl rounded-lg bg-white p-4 sm:p-6 lg:p-8">
      <SettingTable
        title="Gestión de documentos"
        :add="true"
        drawerTitle="Añadir Gestión de Documentos"
        @toggle="addDocs"
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
                <button class="btn btn-square btn-secondary btn-xs mr-2" @click="editModal(id)">
                  <Icon icon="mdi:pencil" />
                </button>
                <button class="btn btn-square btn-error btn-xs" @click="remove(id)">
                  <Icon icon="mdi:trash-can-outline" />
                </button>
              </div>
            </template>
            <template v-slot:item-is_home_delivery="{ is_home_delivery }">
              <Icon icon="mdi:check" v-if="is_home_delivery" color="green" width="30" />
              <Icon icon="mdi:close" v-if="!is_home_delivery" color="red" width="30" />
            </template>
          </EasyDataTable>
        </template>
        <template #drawer>
          <TextInput label="Título" placeholder="Introducir" v-model="title" />
          <TextInput label="Descripción" placeholder="Introducir" v-model="description" />
          <NumberInput label="Precio" placeholder="Introducir" v-model="price" :max="200000" />
          <CheckInput label="¿Agregar al vehículo automáticamente?" class="mt-3" v-model="auto" />
        </template>
      </SettingTable>
    </div>
  </HeaderMain>
</template>
