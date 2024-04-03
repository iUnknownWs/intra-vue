<script setup>
import { Icon } from '@iconify/vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import options from '@/js/filterOptions'
import CardDesktop from '@/components/Reserva/CardDesktop.vue'

axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('token')}`

const url = `${import.meta.env.VITE_SALES}/bookings/`
const loading = ref(null)
const loadingNext = ref(false)
const drawer = ref(false)
const drawerSection = ref(false)
const vehicleNext = ref(false)
const vehicleNext2 = ref(false)
const nextUrl = ref('')
const toggleDrawer = () => {
  drawer.value = !drawer.value
}

const bookings = ref([])

const getVehicles = () => {
  loading.value = true
  axios.get(url).then((response) => {
    bookings.value = response.data.results
    nextUrl.value = response.data.next
    loading.value = false
  })
}

const search = ref(null)
const disSearch = ref(true)
const source = ref(null)
const warranty = ref(null)
const delivery = ref(null)

const searchReact = () => {
  if (search.value !== '') {
    disSearch.value = false
  } else {
    disSearch.value = true
  }
}

const getVehiclesFilter = () => {
  loading.value = true
  let filterParams = {}
  if (search.value) {
    filterParams.search = search.value
  }
  if (warranty.value) {
    filterParams.vehicle__extras__object_id = warranty.value
  }
  if (delivery.value) {
    filterParams.delivery_province = delivery.value
  }
  if (source.value) {
    filterParams.source__iexact = source.value
  }
  const filterUrl = `${url}?${new URLSearchParams(filterParams)}`
  axios.get(filterUrl).then((response) => {
    bookings.value = response.data.results
    nextUrl.value = response.data.next
    loading.value = false
  })
}

const reset = () => {
  search.value = null
  source.value = null
  warranty.value = null
  delivery.value = null
  getVehicles()
}

const getVehiclesTabs = (status) => {
  loading.value = true
  axios.get(url + 'status=' + status).then((response) => {
    bookings.value = response.data.results
    nextUrl.value = response.data.next
    loading.value = false
  })
}

const fillBookings = () => {
  loadingNext.value = true
  axios
    .get(nextUrl.value)
    .then((response) => {
      nextUrl.value = response.data.next
      bookings.value = [...bookings.value, ...response.data.results]
    })
    .then(() => {
      loadingNext.value = false
    })
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      fillBookings()
    }
  })
})

onMounted(() => {
  getVehicles()
  observer.observe(vehicleNext.value)
})
</script>

<template>
  <HeaderMain>
    <div class="drawer drawer-end">
      <input v-model="drawer" id="filterDrawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content">
        <header class="flex flex-row items-center justify-between">
          <TextBtn
            class="max-w-[400px] lg:ml-4"
            placeholder="Buscar"
            v-model="search"
            :disabled="disSearch"
            @btn-click="getVehiclesFilter"
            @change="searchReact"
          >
            <Icon icon="mdi:magnify" width="25" />
          </TextBtn>
        </header>
        <div class="lg:hidden">
          <SelectTab label="Pestaña:" />
        </div>
        <div class="hidden flex-row items-start lg:flex">
          <aside class="my-4 ml-4 min-h-full w-80 bg-white text-base-content">
            <div class="menu-title flex flex-row justify-between">Filtros</div>
            <div class="divider m-0"></div>
            <SelectInput
              label="Origen:"
              :options="options.sources"
              v-model="source"
              :initialValue="null"
            />
            <SelectInput
              label="Tipo de entrega:"
              :options="options.delivery"
              v-model="delivery"
              :initialValue="null"
            />
            <SelectInput
              label="Tipo de garantia:"
              :options="options.warrantyBookings"
              v-model="warranty"
              :initialValue="null"
            />
            <div class="mt-8 flex flex-row justify-between">
              <button class="btn btn-outline" @click="reset">
                <Icon icon="mdi:arrow-u-left-top" />
                Reset
              </button>
              <button class="btn btn-primary text-white" @click="getVehiclesFilter">
                <Icon icon="mdi:check" />
                Filtrar
              </button>
            </div>
          </aside>
          <div class="flex flex-col items-start justify-center px-8">
            <div
              role="tablist"
              class="tabs tabs-bordered ml-20 mt-7 hidden justify-items-start bg-white font-medium lg:grid"
            >
              <input
                type="radio"
                name="class"
                role="tab"
                class="tab"
                aria-label="Todas"
                checked
                @change="getVehicles"
              />
              <input
                type="radio"
                name="class"
                role="tab"
                class="tab"
                aria-label="Pendientes"
                @change="getVehiclesTabs(0)"
              />
              <input
                type="radio"
                name="class"
                role="tab"
                class="tab"
                aria-label="Confirmadas"
                @change="getVehiclesTabs(1)"
              />
              <input
                type="radio"
                name="class"
                role="tab"
                class="tab"
                aria-label="Canceladas"
                @change="getVehiclesTabs(2)"
              />
              <input
                type="radio"
                name="class"
                role="tab"
                class="tab"
                aria-label="Entregadas"
                @change="getVehiclesTabs(3)"
              />
            </div>
            <div class="flex min-h-[150vh] w-full flex-col items-center justify-between">
              <LoadingSpinner v-if="loading" class="loading-lg mt-4" />
              <CardDesktop
                v-for="(vehicle, index) in bookings"
                :key="index"
                v-else
                :reserve="vehicle"
              />
              <div ref="vehicleNext" class="my-8 flex w-full items-center justify-center">
                <LoadingSpinner v-if="loadingNext" class="loading-lg" />
              </div>
            </div>
          </div>
        </div>
        <div class="mt-4 flex min-h-[150vh] flex-col items-center justify-center lg:hidden">
          <LoadingSpinner v-if="loading" class="loading-lg" />
          <div ref="vehicleNext2" class="mx-auto w-full">
            <LoadingSpinner v-if="loadingNext" class="loading-lg" />
          </div>
        </div>
      </div>
      <div class="drawer-side z-50">
        <label for="filterDrawer" aria-label="close sidebar" class="drawer-overlay"></label>
        <ul
          v-if="drawerSection === 'filter'"
          class="menu min-h-full w-screen bg-white p-4 text-base-content lg:w-[50vw]"
        >
          <DrawerTitle title="Filtros" @toggle="toggle" />

          <DrawerActions
            secondary="Reset"
            primary="Filtrar"
            @click-secondary="reset"
            @click-primary="filter"
          />
        </ul>
      </div>
    </div>
  </HeaderMain>
</template>
