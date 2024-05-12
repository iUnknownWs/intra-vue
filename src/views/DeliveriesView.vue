<script setup>
import { ref, watch, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import router from '@/router'
import axios from 'axios'
import HeaderMain from '@/components/HeaderMain.vue'
import SettingTable from '@/components/SettingTable.vue'
import TextInput from '@/components/TextInput.vue'
import CheckInput from '@/components/CheckInput.vue'

const url = `${import.meta.env.VITE_SALES}/delivery-types/`
const items = ref([])
const serverItemsLength = ref(0)
const loading = ref(false)
const loadingSpinner = ref(false)
const users = ref([])
const isFetching = ref(false)
const title = ref('')
const price = ref(0)
const description = ref('')
const delivery = ref(false)
const auto = ref(false)
const edit = ref(null)
const data = ref({})
const serverOptions = ref({
  page: 1,
  rowsPerPage: 20
})
const headers = [
  { text: 'TÍTULO', value: 'title' },
  { text: 'DESCRIPCIÓN', value: 'description' },
  { text: 'ENTREGA A DOMICILIO', value: 'is_home_delivery' },
  { text: 'PRECIO', value: 'price' },
  { text: 'ACCIONES', value: 'id', width: 60 }
]

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

const editModal = (id) => {
  axios
    .get(`${url}${id}/`)
    .then((response) => {
      data.value = response.data
    })
    .then(() => {
      title.value = data.value.title
      price.value = data.value.price
      description.value = data.value.description
      auto.value = data.value.auto_add_vehicle
      delivery.value = data.value.is_home_delivery
      edit.value.showModal()
    })
}

const reset = () => {
  title.value = ''
  price.value = 0
  description.value = ''
  auto.value = false
  delivery.value = false
}

const editData = () => {
  loadingSpinner.value = true
  axios
    .put(`${url}${data.value.id}/`, {
      title: title.value,
      price: price.value,
      description: description.value,
      auto_add_vehicle: auto.value,
      is_home_delivery: delivery.value
    })
    .then(() => {
      reset()
      fetching()
      edit.value.close()
      loadingSpinner.value = false
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
        <TextInput label="Precio" placeholder="Introducir" v-model="price" />
        <div class="mt-3 font-medium">
          <CheckInput label="Entrega a domicilio" v-model="delivery" />
          <CheckInput label="¿Agregar al vehículo automáticamente?" v-model="auto" />
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
      title="Lista de tipos de entregas"
      :add="false"
      drawerTitle="Añadir Nuevo Tipo de Entrega"
    >
      <template #content>
        <div class="mt-3">
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
        </div>
      </template>
      <template #drawer> </template>
    </SettingTable>
  </HeaderMain>
</template>
