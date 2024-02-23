<script lang="ts" setup>
import { ref } from 'vue'
import HeaderMain from '@/components/HeaderMain.vue'
import SettingTable from '@/components/SettingTable.vue'
import type { Header, Item } from 'vue3-easy-data-table'
import axios from 'axios'
const url = `${import.meta.env.VITE_SALES}/delivery-types/`
let data = ref([])
axios.get(url).then((response) => {
  data.value = response.data.results
  return data
})
const headers: Header[] = [
  { text: 'TÍTULO', value: 'title' },
  { text: 'DESCRIPCIÓN', value: 'description' },
  { text: 'ENTREGA A DOMICILIO', value: 'is_home_delivery' },
  { text: 'PRECIO', value: 'price' },
  { text: 'ACCIONES', value: 'id' }
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
            :headers="headers"
            :items="data"
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
  </HeaderMain>
</template>
