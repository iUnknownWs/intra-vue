<script lang="ts" setup>
import { ref } from 'vue'
import HeaderMain from '@/components/HeaderMain.vue'
import SettingTable from '@/components/SettingTable.vue'
import NumberInput from '@/components/NumberInput.vue'
import TextInput from '@/components/TextInput.vue'
import DateInput from '@/components/DateInput.vue'
import type { Header, Item } from 'vue3-easy-data-table'
import axios from 'axios'
const url = `${import.meta.env.VITE_SALES}/discounts/`
let data = ref([])
axios.get(url).then((response) => {
  data.value = response.data.results
  return data
})
const headers: Header[] = [
  { text: 'TÍTULO', value: 'title' },
  { text: 'INICIO', value: 'from_date' },
  { text: 'FIN', value: 'to_date' },
  { text: 'VALOR (%)', value: 'amount_percent' },
  { text: 'VALOR FIJO', value: 'amount_fix' },
  { text: 'ACCIONES', value: 'id' }
]
</script>
<template>
  <HeaderMain>
    <SettingTable title="Lista de Descuentos" :add="true" drawerTitle="Añadir Nuevo descuento">
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
        <DateInput label="Inicio" />
        <DateInput label="Fin" />
        <NumberInput label="Valor (%)" :max="100" />
        <NumberInput label="Valor Fijo" :max="200000" />
      </template>
    </SettingTable>
  </HeaderMain>
</template>
