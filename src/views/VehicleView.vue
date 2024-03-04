<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import axios from 'axios'
import VehicleCard from '@/components/VehicleCard.vue'

const route = useRoute()
const id = ref(route.params.id)
const url = `${import.meta.env.VITE_VEHICLES}/${id.value}`
const loading = ref(true)
const vehicle = ref({})

axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('token')}`

axios
  .get(url)
  .then((response) => {
    vehicle.value = response.data
  })
  .then(() => {
    loading.value = false
  })
</script>

<template>
  <HeaderMain>
    <header class="flex flex-col items-center">
      <LoadingSpinner v-if="loading" class="loading-lg" />
      <VehicleCard v-else :vehicle="vehicle" />
    </header>
    <main class="flex flex-col gap-6 lg:flex-row">
      <aside class="max-w-64 rounded bg-base-100">
        <ul class="menu menu-sm w-56 rounded-box bg-base-100">
          <li>
            <a class="font-bold">Admin</a>
            <ul>
              <li><a>Información del vehículo</a></li>
              <li><a>Portales web</a></li>
              <li><a>Historia y Mantenimiento</a></li>
              <li><a>Configuración del precio</a></li>
              <li><a>Comentarios</a></li>
              <li><a>Extras</a></li>
              <li><a>Descuentos</a></li>
            </ul>
          </li>
          <li>
            <a class="font-bold">Equipamiento</a>
            <ul>
              <li><a>Equipamiento sin coste</a></li>
              <li><a>Equipamiento con coste</a></li>
            </ul>
          </li>
          <li><a class="font-bold">PT</a></li>
        </ul>
      </aside>
      <section class="flex w-full flex-col gap-4 rounded bg-base-100 p-4">
        <h1 class="text-xl font-medium">Información del vehículo</h1>
        <div class="grid grid-cols-2 gap-x-10">
          <SelectInput label="Categoria web:" />
          <SelectInput label="Carrocería:" />
          <SelectInput label="Marca Web:" />
          <SelectInput label="Modelo Web:" />
          <SelectInput label="Matricula:" />
          <SelectInput label="1º Matriculación:" />
          <SelectInput label="1º Matricula:" />
          <SelectInput label="Km Actuales:" />
          <SelectInput label="Procedencia:" />
        </div>
      </section>
      <aside class="flex w-full max-w-md flex-col gap-4 rounded bg-base-100 p-4">
        <h2 class="text-xl font-medium">Galería Multimedia</h2>
        <div role="tablist" class="tabs tabs-bordered tabs-md">
          <input type="radio" name="galeria" role="tab" class="tab" aria-label="Galería" />
          <div role="tabpanel" class="tab-content p-8">
            <div class="grid grid-cols-3 gap-4">
              <div class="skeleton h-24 w-24"></div>
              <div class="skeleton h-24 w-24"></div>
              <div class="skeleton h-24 w-24"></div>
              <div class="skeleton h-24 w-24"></div>
              <div class="skeleton h-24 w-24"></div>
              <div class="skeleton h-24 w-24"></div>
              <div class="skeleton h-24 w-24"></div>
              <div class="skeleton h-24 w-24"></div>
              <div class="skeleton h-24 w-24"></div>
            </div>
          </div>

          <input
            type="radio"
            name="galeria"
            role="tab"
            class="tab"
            aria-label="Documentos"
            checked
          />
          <div role="tabpanel" class="tab-content p-8">Documentos</div>
        </div>
      </aside>
    </main>
  </HeaderMain>
</template>

<style scoped></style>
