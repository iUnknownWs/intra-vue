<script setup>
import { ref, watch, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import HeaderMain from '@/components/HeaderMain.vue'
import SettingTable from '@/components/SettingTable.vue'
import router from '@/router'
import axios from 'axios'

const url = `${import.meta.env.VITE_SALES}/delivery-types/`
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
  axios.delete(`${url}/${id}/`).then(() => router.go(0))
}

const headers = [
  { text: 'TÍTULO', value: 'title' },
  { text: 'DESCRIPCIÓN', value: 'description' },
  { text: 'ENTREGA A DOMICILIO', value: 'is_home_delivery' },
  { text: 'PRECIO', value: 'price' },
  { text: 'ACCIONES', value: 'id', width: 60 }
]
</script>
<template>
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
            cell
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
