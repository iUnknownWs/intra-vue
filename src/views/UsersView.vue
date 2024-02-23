<script lang="ts" setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import type { Header, Item } from 'vue3-easy-data-table'
import HeaderMain from '@/components/HeaderMain.vue'
import TextInput from '@/components/TextInput.vue'
import CheckInput from '@/components/CheckInput.vue'
import SettingTable from '@/components/SettingTable.vue'
import axios from 'axios'
const url = `${import.meta.env.VITE_USER}`
let data = ref([])
axios.get(url).then((response) => {
  data.value = response.data.results
  return data
})

const headers: Header[] = [
  { text: 'EMAIL', value: 'email' },
  { text: 'NOMBRE', value: 'first_name' },
  { text: 'APELLIDO', value: 'last_name' },
  { text: 'ADMIN', value: 'is_admin', width: 30 },
  { text: 'ELIMINAR', value: 'id' }
]
</script>
<template>
  <HeaderMain>
    <SettingTable title="Lista de Usuarios" :add="true" drawerTitle="Añadir Nuevo usuario">
      <template #content>
        <EasyDataTable
          :headers="headers"
          :items="data"
          buttons-pagination
          table-class-name="customize-table"
          header-text-direction="center"
          body-text-direction="center"
        >
          <template #item-admin="{ admin }">
            <Icon icon="mdi:check" v-if="admin" color="green" width="30" />
            <Icon icon="mdi:close" v-if="!admin" color="red" width="30" />
          </template>
          <template #item-delete="{}">
            <button class="btn btn-error btn-xs text-white">Eliminar</button>
          </template>
        </EasyDataTable>
      </template>
      <template #drawer>
        <TextInput label="Nombre" placeholder="Introducir" />
        <TextInput label="Apellidos" placeholder="Introducir" />
        <TextInput label="Email" placeholder="Introducir" />
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
          <CheckInput label="Administrador" />
          <span class="text-center text-xs text-gray-600"
            >(Dispone de acceso total a la plataforma)</span
          >
        </div>
      </template>
    </SettingTable>
  </HeaderMain>
</template>
