<script lang="ts" setup>
import { ref } from 'vue'
import CheckInput from '@/components/CheckInput.vue'
import SelectInput from '@/components/SelectInput.vue'
import HeaderMain from '@/components/HeaderMain.vue'
import SettingTable from '@/components/SettingTable.vue'
import TextInput from '@/components/TextInput.vue'
import type { Header, Item } from 'vue3-easy-data-table'
import axios from 'axios'
const url = `${import.meta.env.VITE_SALES}/warranty-types/`
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
    <SettingTable title="Lista de garantías" :add="true" drawerTitle="Añadir Nueva Garantía">
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
        <SelectInput label="Duración" />
        <TextInput label="Precio" placeholder="Introducir" />
        <TextInput label="Descripción" placeholder="Introducir" />
        <div class="mt-3 font-medium">
          <CheckInput label="Sin Garantía" />
          <CheckInput label="¿Agregar al vehículo automáticamente?" />
        </div>
      </template>
    </SettingTable>
  </HeaderMain>
</template>
