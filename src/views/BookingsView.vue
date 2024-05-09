<script setup>
import { Icon } from '@iconify/vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import options from '@/js/filterOptions'
import CardDesktop from '@/components/Reserva/CardDesktop.vue'
import CardMobile from '@/components/Reserva/CardMobile.vue'

axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('token')}`

let url = `${import.meta.env.VITE_SALES}/bookings/`
const loading = ref(null)
const drawer = ref(false)
const drawerSection = ref(false)
const vehicleNext = ref(false)
const nextUrl = ref('')
const toggleDrawer = () => {
  drawer.value = !drawer.value
}

const bookings = ref([])

const getVehicles = () => {
  loading.value = true
  if (filterParams.status || filterParams.status === 0) {
    delete filterParams.status
  }
  axios.get(url, { params: filterParams }).then((response) => {
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

let filterParams = {}

const searchReact = () => {
  if (search.value.length > 2) {
    disSearch.value = false
  } else {
    disSearch.value = true
  }
}

const searchReset = () => {
  search.value = null
  disSearch.value = true
  delete filterParams.search
  getVehiclesFilter()
}

const filterDrawer = () => {
  drawerSection.value = 'filter'
  drawer.value = !drawer.value
}

const getVehiclesFilter = () => {
  loading.value = true
  if (search.value) {
    filterParams.search = search.value
    disSearch.value = true
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
  axios.get(url, { params: filterParams }).then((response) => {
    bookings.value = response.data.results
    nextUrl.value = response.data.next
    loading.value = false
  })
}

const reset = () => {
  if (filterParams.status || filterParams.status === 0) {
    let status = filterParams.status
    filterParams = {}
    filterParams.status = status
  } else {
    filterParams = {}
  }
  search.value = null
  source.value = null
  warranty.value = null
  delivery.value = null
  getVehiclesFilter()
}

const getVehiclesTabs = (status) => {
  loading.value = true
  filterParams.status = status
  axios.get(url, { params: filterParams }).then((response) => {
    bookings.value = response.data.results
    nextUrl.value = response.data.next
    loading.value = false
  })
}

const fillBookings = () => {
  axios.get(nextUrl.value).then((response) => {
    nextUrl.value = response.data.next
    bookings.value = [...bookings.value, ...response.data.results]
  })
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      fillBookings()
    }
  })
})

const tabContainer = ref(null)
const horizontalScroll = (evt) => {
  tabContainer.value.scrollLeft += evt.deltaY * 1
}

onMounted(() => {
  getVehicles()
  observer.observe(vehicleNext.value)
})
</script>

<template>
  <HeaderMain>
    <DrawerComponent v-model="drawer" id="bookingsDrawer" @toggleDrawer="toggleDrawer">
      <template #content>
        <div class="flex flex-row gap-8">
          <aside class="hidden min-h-full w-80 bg-white p-8 text-base-content lg:block">
            <span class="text-xl font-bold">Filtros</span>
            <SelectInput
              label="Origen:"
              :options="options.sources"
              v-model="source"
              :initialValue="null"
              class="mt-4"
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
            <li class="mt-6 grid grid-cols-2 gap-2">
              <button class="btn btn-outline w-full" @click="reset">Reset</button>
              <button class="btn btn-primary w-full text-white" @click="getVehiclesFilter">
                Filtrar
              </button>
            </li>
          </aside>
          <div class="mx-auto w-full min-w-[910px] xl:w-fit">
            <header class="flex flex-row items-center justify-between gap-2 p-4 xl:max-w-[400px]">
              <form @submit.prevent="getVehiclesFilter" class="w-full">
                <label class="input input-bordered flex items-center gap-2">
                  <Icon icon="mdi:magnify" width="24" />
                  <input
                    type="text"
                    placeholder="Buscar"
                    v-model="search"
                    @change="searchReact"
                    class="w-full"
                  />
                  <Icon class="cursor-pointer" icon="mdi:times" width="24" @click="searchReset" />
                </label>
              </form>
              <button class="btn btn-square btn-outline lg:hidden" @click="filterDrawer">
                <Icon icon="heroicons:adjustments-vertical" width="24" />
              </button>
            </header>
            <section class="flex flex-col justify-between lg:p-4">
              <div class="hidden min-h-[150vh] flex-row xl:flex">
                <div class="mb-8 hidden w-full xl:flex">
                  <div class="flex flex-col items-start">
                    <div
                      role="tablist"
                      class="no-scrollbar tabs tabs-bordered hidden justify-items-start font-medium xl:grid [&_input]:text-base-200 focus:[&_input]:text-black"
                    >
                      <input
                        type="radio"
                        name="tabs-desktop"
                        role="tab"
                        class="tab"
                        aria-label="Todas"
                        checked
                        @change="getVehicles"
                      />
                      <input
                        type="radio"
                        name="tabs-desktop"
                        role="tab"
                        class="tab"
                        aria-label="Pendientes"
                        @change="getVehiclesTabs(0)"
                      />
                      <input
                        type="radio"
                        name="tabs-desktop"
                        role="tab"
                        class="tab"
                        aria-label="Confirmadas"
                        @change="getVehiclesTabs(1)"
                      />
                      <input
                        type="radio"
                        name="tabs-desktop"
                        role="tab"
                        class="tab"
                        aria-label="Canceladas"
                        @change="getVehiclesTabs(2)"
                      />
                      <input
                        type="radio"
                        name="tabs-desktop"
                        role="tab"
                        class="tab"
                        aria-label="Entregadas"
                        @change="getVehiclesTabs(3)"
                      />
                    </div>
                    <div class="flex min-h-[150vh] w-full flex-col items-center justify-between">
                      <LoadingSpinner v-if="loading" class="loading-lg mt-32" />
                      <div v-else>
                        <CardDesktop
                          v-for="(vehicle, index) in bookings"
                          :key="index"
                          :reserve="vehicle"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex min-h-[150vh] w-full flex-col items-center px-4 xl:hidden">
                <div
                  role="tablist"
                  ref="tabContainer"
                  @wheel.prevent="horizontalScroll"
                  class="no-scrollbar tabs tabs-bordered w-full overflow-x-scroll font-medium [&_input]:text-base-200 focus:[&_input]:text-black"
                >
                  <input
                    type="radio"
                    name="tabs-mobile"
                    role="tab"
                    class="tab"
                    aria-label="Todas"
                    checked
                    @change="getVehicles"
                  />
                  <input
                    type="radio"
                    name="tabs-mobile"
                    role="tab"
                    class="tab"
                    aria-label="Pendientes"
                    @change="getVehiclesTabs(0)"
                  />
                  <input
                    type="radio"
                    name="tabs-mobile"
                    role="tab"
                    class="tab"
                    aria-label="Confirmadas"
                    @change="getVehiclesTabs(1)"
                  />
                  <input
                    type="radio"
                    name="tabs-mobile"
                    role="tab"
                    class="tab"
                    aria-label="Canceladas"
                    @change="getVehiclesTabs(2)"
                  />
                  <input
                    type="radio"
                    name="tabs-mobile"
                    role="tab"
                    class="tab"
                    aria-label="Entregadas"
                    @change="getVehiclesTabs(3)"
                  />
                </div>
                <template v-if="!loading">
                  <CardMobile
                    v-for="(vehicle, index) in bookings"
                    :key="index"
                    :reserve="vehicle"
                  />
                </template>
                <LoadingSpinner v-else class="loading-lg mt-32" />
              </div>
              <div ref="vehicleNext" class="self-center text-center">
                <LoadingSpinner v-if="nextUrl" class="loading-lg" />
              </div>
            </section>
          </div>
        </div>
      </template>
      <template #drawer>
        <div>
          <DrawerTitle title="Filtros" @toggle="toggleDrawer" />
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
        </div>
        <DrawerActions
          secondary="Reset"
          primary="Filtrar"
          @click-secondary="reset"
          @click-primary="getVehiclesFilter"
        />
      </template>
    </DrawerComponent>
  </HeaderMain>
</template>
