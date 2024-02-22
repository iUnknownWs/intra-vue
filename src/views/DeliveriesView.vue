<script lang="ts" setup>
import SettingTable from '@/components/SettingTable.vue'
import type { Header, Item } from 'vue3-easy-data-table'
const headers: Header[] = [
  { text: 'TÍTULO', value: 'title' },
  { text: 'DESCRIPCIÓN', value: 'description' },
  { text: 'ENTREGA A DOMICILIO', value: 'delivered' },
  { text: 'PRECIO', value: 'price' },
  { text: 'ACCIONES', value: 'actions' }
]

const items: Item[] = [
  {
    title: 'Oferta 1',
    description: 'Oferta de descuento de prueba',
    delivered: true,
    price: 100
  }
]
</script>
<template>
  <SettingTable
    title="Lista de tipos de entregas"
    :add="false"
    drawerTitle="Añadir Nuevo Tipo de Entrega"
  >
    <template #content>
      <div class="mt-3">
        <EasyDataTable
          :headers="headers"
          :items="items"
          buttons-pagination
          table-class-name="customize-table"
          header-text-direction="center"
          body-text-direction="center"
        >
        </EasyDataTable>
      </div>
    </template>
    <template #drawer> </template>
  </SettingTable>
</template>
