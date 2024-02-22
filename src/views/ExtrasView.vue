<script lang="ts" setup>
import SettingTable from '@/components/SettingTable.vue'
import TextInput from '@/components/TextInput.vue'
import CheckInput from '@/components/CheckInput.vue'
import NumberInput from '@/components/NumberInput.vue';
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
  <SettingTable title="Lista de Extras" :add="true" drawerTitle="Añadir Nuevo Extra">
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
      <TextInput label="Descripción" placeholder="Introducir" />
      <NumberInput label="Precio" placeholder="Introducir" />
      <CheckInput label="¿Agregar al vehículo automáticamente?" class="mt-3" />
    </template>
  </SettingTable>
</template>
