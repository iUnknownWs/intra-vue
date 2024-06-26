<script setup>
import { ref, watch, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import HeaderMain from '@/components/HeaderMain.vue'
import TextInput from '@/components/TextInput.vue'
import CheckInput from '@/components/CheckInput.vue'
import SettingTable from '@/components/SettingTable.vue'
import axios from 'axios'
import router from '@/router'
import { useUserStore } from '@/stores/user'

axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('token')}`

const userStore = useUserStore()

axios.get(`${import.meta.env.VITE_API}/permissions/`).then((response) => {
  permissions.value = response.data.results
})

const items = ref([])
const serverItemsLength = ref(0)
const isFetching = ref(false)
const serverOptions = ref({
  page: 1,
  rowsPerPage: 20
})
const permissions = ref([])
const perms = ref([])
const url = `${import.meta.env.VITE_USER}/`
const name = ref('')
const lastName = ref('')
const email = ref('')
const admin = ref(false)
const headers = [
  { text: 'EMAIL', value: 'email' },
  { text: 'NOMBRE', value: 'first_name' },
  { text: 'APELLIDO', value: 'last_name' },
  { text: 'ADMIN', value: 'is_admin', width: 30 },
  { text: 'ELIMINAR', value: 'id', width: 30 }
]

const fetching = () => {
  if (isFetching.value) {
    return
  }

  isFetching.value = true

  const fetchData = async () => {
    try {
      const params = {
        limit: serverOptions.value.rowsPerPage,
        pager: 'number',
        page: serverOptions.value.page
      }
      const API_URL = `${url}/?${new URLSearchParams(params)}`
      const response = await axios.get(API_URL)
      items.value = response.data.results
      serverItemsLength.value = response.data.count
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

const addUser = () => {
  axios
    .post(url, {
      first_name: name.value,
      last_name: lastName.value,
      email: email.value,
      is_admin: admin.value,
      permissions: perms.value
    })
    .then((response) => {
      if (response.status === 201) {
        fetching()
        reset()
      }
    })
}

const reset = () => {
  name.value = ''
  lastName.value = ''
  email.value = ''
  admin.value = false
  perms.value = []
}
</script>

<template>
  <HeaderMain>
    <div class="mx-auto my-8 max-w-5xl rounded-lg bg-white p-4 sm:p-6 lg:p-8">
      <SettingTable
        title="Lista de Usuarios"
        :add="true"
        drawerTitle="Añadir Nuevo usuario"
        @toggle="addUser"
      >
        <template #content>
          <EasyDataTable
            class="z-0"
            table-class-name="z-0"
            buttons-pagination
            :headers="headers"
            :items="items"
            v-model:server-options="serverOptions"
            :server-items-length="serverItemsLength"
            :loading="isFetching"
            rows-per-page-message="Filas por pestaña"
          >
            <template v-slot:item-is_admin="{ is_admin }">
              <Icon icon="mdi:check" v-if="is_admin" color="green" width="30" />
              <Icon icon="mdi:close" v-if="!is_admin" color="red" width="30" />
            </template>
            <template v-slot:item-id="{ id }">
              <button
                class="btn btn-error btn-xs text-white"
                @click="axios.delete(`${url}/${id}/`).then(() => router.go(0))"
              >
                Eliminar
              </button>
            </template>
            <template v-if="userStore.isAdmin" v-slot:item-email="{ id, email }">
              <RouterLink :to="`/usuario/${id}`">{{ email }}</RouterLink>
            </template>
          </EasyDataTable>
        </template>
        <template #drawer>
          <TextInput label="Nombre" placeholder="Introducir" v-model="name" />
          <TextInput label="Apellidos" placeholder="Introducir" v-model="lastName" />
          <TextInput label="Email" placeholder="Introducir" v-model="email" />
          <div class="mt-3"><span class="label-text font-bold">Permisos:</span></div>
          <div class="m-0 grid grid-cols-2 justify-between gap-1 p-0 font-semibold">
            <CheckInput
              v-for="(permission, index) in permissions"
              :key="index"
              :label="permission.name"
              :value="permission.id"
              v-model="perms"
            />
            <CheckInput label="Administrador" v-model="admin" />
            <span class="text-center text-xs text-gray-600"
              >(Dispone de acceso total a la plataforma)</span
            >
          </div>
        </template>
      </SettingTable>
    </div>
  </HeaderMain>
</template>
