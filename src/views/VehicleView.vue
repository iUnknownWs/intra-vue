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
            <a>Admin</a>
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
            <a>Equipamiento</a>
            <ul>
              <li><a>Equipamiento</a></li>
            </ul>
            <ul>
              <li><a>Equipamiento sin coste</a></li>
              <li><a>Equipamiento con coste</a></li>
            </ul>
          </li>
          <li><a>PT</a></li>
        </ul>
      </aside>
      <section class="w-full bg-base-100">
        <h1>Información del vehículo</h1>
      </section>
    </main>
  </HeaderMain>
</template>

<style scoped></style>
