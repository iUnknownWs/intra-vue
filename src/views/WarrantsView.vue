<script lang="ts" setup>
import CheckInput from '@/components/CheckInput.vue'
import SelectInput from '@/components/SelectInput.vue'
import SettingTable from '@/components/SettingTable.vue'
import TextInput from '@/components/TextInput.vue'
import type { Header, Item } from 'vue3-easy-data-table'
const headers: Header[] = [
  { text: 'TÍTULO', value: 'title' },
  { text: 'DESCRIPCIÓN', value: 'description' },
  { text: 'PRECIO', value: 'price' },
  { text: 'ACCIONES', value: 'actions' }
]

const items: Item[] = [
  {
    title: 'Oferta 1',
    description: 'Oferta de descuento de prueba',
    price: 100
  }
]
</script>
<template>
  <SettingTable title="Lista de garantías" :add="true" drawerTitle="Añadir Nueva Garantía">
    <template #content>
      <EasyDataTable
        :headers="headers"
        :items="items"
        buttons-pagination
        table-class-name="customize-table"
        header-text-direction="center"
        body-text-direction="center"
      >
      </EasyDataTable>
    </template>
    <template #drawer>
      <TextInput label="Título" placeholder="Introducir" />
      <SelectInput label="Duración" />
      <TextInput label="Precio" placeholder="Introducir" />
      <TextInput label="Descripción" placeholder="Introducir" />
      <div class="mt-3 font-medium">
        <CheckInput label="Sin Garantía" />
        <CheckInput label="¿Agregar al vehículo automáticamente?" />
      </div>
    </template>
  </SettingTable>
</template>
