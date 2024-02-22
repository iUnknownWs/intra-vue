<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import type { Header, Item } from 'vue3-easy-data-table'
import DrawerTitle from '@/components/DrawerTitle.vue'
import TextInput from '@/components/TextInput.vue'
import CheckInput from '@/components/CheckInput.vue'
import SettingTable from '@/components/SettingTable.vue'

const headers: Header[] = [
  { text: 'EMAIL', value: 'email' },
  { text: 'NOMBRE', value: 'name' },
  { text: 'APELLIDO', value: 'last' },
  { text: 'ADMIN', value: 'admin', width: 30 },
  { text: 'ELIMINAR', value: 'delete' }
]

const items: Item[] = [
  {
    email: 'willders.carvajal@gmail.com',
    name: 'Willders Daviel',
    last: 'Carvajal Peña',
    admin: true,
    delete: true
  }
]
</script>
<template>
  <SettingTable title="Lista de Usuarios" :add="true" drawerTitle="Añadir Nuevo usuario">
    <template #content>
      <EasyDataTable
        :headers="headers"
        :items="items"
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
</template>
