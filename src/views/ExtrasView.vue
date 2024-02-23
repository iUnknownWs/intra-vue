<script lang="ts" setup>
import { ref } from 'vue'
import SettingTable from '@/components/SettingTable.vue'
import TextInput from '@/components/TextInput.vue'
import HeaderMain from '@/components/HeaderMain.vue'
import CheckInput from '@/components/CheckInput.vue'
import NumberInput from '@/components/NumberInput.vue'
import type { Header, Item } from 'vue3-easy-data-table'
import axios from 'axios'
const url = `${import.meta.env.VITE_SALES}/any-extra/`
let data = ref([])
axios.get(url).then((response) => {
  data.value = response.data.results
  return data
})
const headers: Header[] = [
  { text: 'TÍTULO', value: 'title' },
  { text: 'DESCRIPCIÓN', value: 'description' },
  { text: 'PRECIO', value: 'price' },
  { text: 'ACCIONES', value: 'id' }
]
</script>
<template>
  <HeaderMain>
    <SettingTable title="Lista de Extras" :add="true" drawerTitle="Añadir Nuevo Extra">
      <template #content>
        <EasyDataTable
          :headers="headers"
          :items="data"
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
  </HeaderMain>
</template>
