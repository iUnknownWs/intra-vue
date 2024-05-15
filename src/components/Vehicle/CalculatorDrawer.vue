<script setup>
import { ref } from 'vue'
import options from '@/js/filterOptions.js'

defineProps({
  toggle: { type: Function, required: true }
})

const price = ref(0)
const inputs = ref(0)
const imported = ref(0)

const financingFilter = ref(0)
const interestFilter = ref(null)
const productFilter = ref(null)
const timeFilter = ref(null)

const financiers = ref([{ id: 0, title: 'Cofidis' }])
</script>

<template>
  <div>
    <DrawerTitle title="Calculadora financiación" @toggle="toggle" />
    <div class="mb-2">
      <span class="text-lg font-semibold">Parámetros</span>
      <div class="divider m-0"></div>
    </div>
    <TextInput label="Precio financiado:" v-model="price" />
    <TextInput label="Entrada:" v-model="inputs" />
    <TextInput label="Importe financiado:" v-model="imported" />
    <div class="mb-2 mt-8">
      <span class="text-lg font-semibold">Filtros</span>
      <div class="divider m-0"></div>
    </div>
    <SelectInput label="Financiera:" v-model="financingFilter" :options="financiers" :initialValue="null" />
    <div class="flex flex-row gap-4">
      <SelectInput
        label="Interés:"
        v-model="interestFilter"
        :options="options.intereses"
        :initialValue="null"
      />
      <SelectInput
        label="Producto:"
        v-model="productFilter"
        :options="options.productos"
        :initialValue="null"
      />
    </div>
    <SelectInput
      label="Plazos:"
      v-model="timeFilter"
      :options="options.plazos"
      :initialValue="null"
    />
  </div>
</template>
