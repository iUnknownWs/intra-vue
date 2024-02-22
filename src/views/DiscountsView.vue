<script lang="ts" setup>
import SettingTable from '@/components/SettingTable.vue'
import NumberInput from '@/components/NumberInput.vue'
import TextInput from '@/components/TextInput.vue'
import DateInput from '@/components/DateInput.vue'
import type { Header, Item } from 'vue3-easy-data-table'
const headers: Header[] = [
  { text: 'TÍTULO', value: 'titulo' },
  { text: 'INICIO', value: 'inicio' },
  { text: 'FIN', value: 'fin' },
  { text: 'VALOR (%)', value: 'valor' },
  { text: 'VALOR FIJO', value: 'fijo' },
  { text: 'ACCIONES', value: 'actions' }
]

const items: Item[] = [
  {
    titulo: 'Oferta 1',
    inicio: '2022-01-01',
    fin: '2022-01-31',
    valor: 10,
    fijo: 500
  }
]
</script>
<template>
  <SettingTable title="Lista de Descuentos" :add="true" drawerTitle="Añadir Nuevo descuento">
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
      <DateInput label="Inicio" />
      <DateInput label="Fin" />
      <NumberInput label="Valor (%)" :max="100" />
      <NumberInput label="Valor Fijo" :max="200000" />
    </template>
  </SettingTable>
</template>
