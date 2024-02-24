<script setup>
import { ref, watch, onMounted } from 'vue'
import HeaderMain from '@/components/HeaderMain.vue'
import TextInput from '@/components/TextInput.vue'
import CheckInput from '@/components/CheckInput.vue'
import SettingTable from '@/components/SettingTable.vue'
import axios from 'axios'
import router from '@/router'

axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('token')}`

const headers = [
  { text: 'EMAIL', value: 'email' },
  { text: 'NOMBRE', value: 'first_name' },
  { text: 'APELLIDO', value: 'last_name' },
  { text: 'ADMIN', value: 'is_admin', width: 30 },
  { text: 'ELIMINAR', value: 'id' }
]

const items = ref([])
const serverItemsLength = ref(0)
const loading = ref(false)
const users = ref([])
const isFetching = ref(false)
const serverOptions = ref({
  page: 1,
  rowsPerPage: 20
})

const fetchUsers = () => {
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
  fetchUsers()
})

watch(
  serverOptions,
  () => {
    fetchUsers()
  },
  { deep: true }
)

const url = `${import.meta.env.VITE_USER}/`
let data = ref([])
axios.get(url).then((response) => {
  data.value = response.data.results
  return data
})

const addUser = () => {
  axios
    .post(url, {
      first_name: name.value,
      last_name: lastName.value,
      email: email.value,
      is_admin: admin.value
    })
    .then((response) => {
      if (response.status === 201) {
        router.push('/users')
      }
    })
}

const name = ref('')
const updateName = (value) => {
  name.value = value
}
const lastName = ref('')
const updateLastName = (value) => {
  lastName.value = value
}
const email = ref('')
const updateEmail = (value) => {
  email.value = value
}

const admin = ref(false)
const updateAdmin = (value) => {
  admin.value = value
}
</script>
<template>
  <HeaderMain>
    <SettingTable
      title="Lista de Usuarios"
      :add="true"
      drawerTitle="Añadir Nuevo usuario"
      @toggle="addUser"
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
        </EasyDataTable>
      </template>
      <template #drawer>
        <TextInput label="Nombre" placeholder="Introducir" @input="updateName" />
        <TextInput label="Apellidos" placeholder="Introducir" @input="updateLastName" />
        <TextInput label="Email" placeholder="Introducir" @input="updateEmail" />
        <div class="mt-3"><span class="label-text font-bold">Permisos:</span></div>
        <div class="m-0 grid grid-cols-2 justify-between gap-1 p-0 font-semibold">
          <CheckInput label="Vehículos" />
          <CheckInput label="Reservas" />
          <CheckInput label="Tasaciones" />
          <CheckInput label="Ajustes Generales" />
          <CheckInput label="Extras" />
          <CheckInput label="Estatus de Vehículos" />
          <CheckInput label="Coches.net" />
          <CheckInput label="Wallapop" />
          <CheckInput label="Administrador" @input="updateAdmin" />
          <span class="text-center text-xs text-gray-600"
            >(Dispone de acceso total a la plataforma)</span
          >
        </div>
      </template>
    </SettingTable>
  </HeaderMain>
</template>
