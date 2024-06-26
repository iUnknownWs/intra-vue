<script setup>
import { Icon } from '@iconify/vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import options from '@/js/filterOptions.js'
import CardDesktop from '@/components/CardDesktop.vue'
import CardMobile from '@/components/CardMobile.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { useUserStore } from '@/stores/user'
import AutoDiscountDrawer from '@/components/AutoDiscountDrawer.vue'
import CochesnetDrawer from '@/components/CochesnetDrawer.vue'
import WallapopDrawer from '@/components/WallapopDrawer.vue'
import SumautoDrawer from '@/components/SumautoDrawer.vue'

axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('token')}`

const url = `${import.meta.env.VITE_VEHICLES}/`
const userUrl = `${import.meta.env.VITE_USER}/${localStorage.getItem('userid')}`
const filterCountsUrl = `${import.meta.env.VITE_VEHICLES}/counts-filters/`
const brandUrl = `${import.meta.env.VITE_API}/vehicles-brands/?limit=500`
const bodyUrl = `${import.meta.env.VITE_API}/vehicles-types/`
let scrollNextUrl = ''
const drawer = ref(false)
const drawerSection = ref('')
const vehiclesFilter = ref([])
let filterParams = {}
const refresh = ref(0)
const tab = ref('0')
const yearGte = ref('1970')
const yearLte = ref('2024')
const priceGte = ref(0)
const priceLte = ref(200000)
const kmsGte = ref(0)
const kmsLte = ref(200000)
const combustible = ref('0')
const cambio = ref('0')
const vehiculo = ref('0')
const medioambiental = ref(null)
const categoria = ref('0')
const itv = ref(false)
const pitv = ref(false)
const pVideo = ref(false)
const searchValue = ref('')
const menu = ref(null)
const info = ref(null)
const id = ref(0)
const slug = ref('')
const vin = ref('')
const brandOptions = ref([])
const bodyOptions = ref([])
const brand = ref({ id: '', label: '' })
const body = ref('')
const typeList = ref([])
const versionList = ref([])
const typeOptions = []
const disModel = ref(true)
const disVersion = ref(true)
const model = ref({ id: '', label: '' })
const versionOptions = []
const version = ref({ id: '', label: '' })
const eurotax = ref([])
const modalTitle = ref('')
const modalMessage = ref('')
const stepBtn = ref(null)
const loading = ref(false)
const loadingBtn = ref(false)
const disAdd = ref(true)
const loadingInfo = ref(true)
const header = ref(null)
const disSearch = ref(true)
const vehicleNext = ref(null)

const userStore = useUserStore()

const searchReact = () => {
  if (searchValue.value.length > 2) {
    disSearch.value = false
  } else {
    disSearch.value = true
  }
}

const resetDrawer = () => {
  brand.value = { id: '', label: '' }
  body.value = ''
  model.value = { id: '', label: '' }
  version.value = { id: '', label: '' }
  typeList.value = []
  versionList.value = []
  eurotax.value = []
  disModel.value = true
  disVersion.value = true
}

const toggle = () => {
  drawer.value = !drawer.value
  resetDrawer()
}

const filterDrawer = () => {
  drawerSection.value = 'filter'
}

const autoDrawer = () => {
  drawerSection.value = 'auto'
}

const semiDrawer = () => {
  drawerSection.value = 'semi'
  axios.get(brandUrl).then((response) => {
    for (let option of response.data.results) {
      brandOptions.value.push({
        id: option.id,
        label: option.title
      })
    }
  })
  axios.get(bodyUrl).then((response) => {
    bodyOptions.value = response.data.results
  })
}

const manualDrawer = () => {
  drawerSection.value = 'manual'
}

const yearFilter = () => {
  filterParams.year__gte = yearGte.value
  filterParams.year__lte = yearLte.value
}

const kmsFilter = () => {
  filterParams.kms__gte = kmsGte.value
  filterParams.kms__lte = kmsLte.value
}

const priceFilter = () => {
  filterParams.price__sale_price__gte = priceGte.value
  filterParams.price__sale_price__lte = priceLte.value
}

const combustibleFilter = () => {
  filterParams.fuel = combustible.value
}

const cambioFilter = () => {
  filterParams.gear_box = cambio.value
}

const vehiculoFilter = () => {
  filterParams.body_type = vehiculo.value
}

const medioambientalFilter = () => {
  filterParams.maintenance__distinctive = medioambiental.value
}

const categoriaFilter = () => {
  filterParams.web_categories = categoria.value
}

const discountDrawer = () => {
  drawerSection.value = 'discount'
  toggle()
}

const filter = () => {
  loading.value = true
  if (itv.value) {
    filterParams.maintenance__itv_expiration__gte = '2024-02-26'
  }
  if (pitv.value) {
    filterParams.maintenance__itv_expiration__lt = '2024-02-26'
  }
  if (pVideo.value) {
    filterParams.pvideo = 'true'
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
  axios.get(url, { params: filterParams }).then((response) => {
    vehiclesFilter.value = response.data.results
    loading.value = false
  })
  axios.get(filterCountsUrl, { params: filterParams }).then((response) => {
    filtersCounters.value = response.data
  })
  drawer.value = ref(false)
}

const reset = () => {
  yearGte.value = '1970'
  yearLte.value = '2024'
  priceGte.value = 0
  priceLte.value = 200000
  kmsGte.value = 0
  kmsLte.value = 200000
  combustible.value = '0'
  cambio.value = '0'
  vehiculo.value = '0'
  medioambiental.value = null
  categoria.value = '0'
  itv.value = false
  pitv.value = false
  pVideo.value = false
  filterParams = {}
  drawer.value = ref(false)
  filter()
}

const search = () => {
  loading.value = true
  disSearch.value = true
  filterParams.search = searchValue.value
  axios.get(url, { params: filterParams }).then((response) => {
    scrollNextUrl = response.data.next
    vehiclesFilter.value = response.data.results
    loading.value = false
  })
  axios.get(filterCountsUrl, { params: filterParams }).then((response) => {
    filtersCounters.value = response.data
  })
}

const searchReset = () => {
  searchValue.value = null
  disSearch.value = true
  delete filterParams.search
  filter()
}

const selected = () => {
  if (tab.value === '0') {
    all()
  }
  if (tab.value === '1') {
    vehicleStatus(0)
  }
  if (tab.value === '2') {
    vehicleStatus(3)
  }
  if (tab.value === '3') {
    vehicleStatus(4)
  }
  if (tab.value === '4') {
    vehicleStatus(5)
  }
  if (tab.value === '5') {
    ppt()
  }
  if (tab.value === '6') {
    vpt()
  }
  if (tab.value === '7') {
    web()
  }
  if (tab.value === '8') {
    entrega()
  }
  if (tab.value === '9') {
    vehicleStatus(10)
  }
}

const filtersCounters = ref({})

const all = () => {
  loading.value = true
  tab.value = '0'
  if (filterParams.status || filterParams.status === 0) {
    delete filterParams.status
  }
  if (filterParams.ppt) {
    delete filterParams.ppt
  }
  if (filterParams.vpt) {
    delete filterParams.vpt
  }
  if (filterParams.no_web) {
    delete filterParams.no_web
  }
  if (filterParams.inmediate_delivery) {
    delete filterParams.inmediate_delivery
  }
  axios.get(url, { params: filterParams }).then((response) => {
    scrollNextUrl = response.data.next
    vehiclesFilter.value = response.data.results
    loading.value = false
  })
  axios.get(filterCountsUrl, { params: filterParams }).then((response) => {
    filtersCounters.value = response.data
  })
}

const vehicleStatus = (status) => {
  loading.value = true
  if (filterParams.ppt) {
    delete filterParams.ppt
  }
  if (filterParams.vpt) {
    delete filterParams.vpt
  }
  if (filterParams.no_web) {
    delete filterParams.no_web
  }
  if (filterParams.inmediate_delivery) {
    delete filterParams.inmediate_delivery
  }

  if (status === 0) {
    tab.value = '1'
  }
  if (status === 3) {
    tab.value = '2'
  }
  if (status === 4) {
    tab.value = '3'
  }
  if (status === 5) {
    tab.value = '4'
  }
  if (status === 10) {
    tab.value = '9'
  }

  filterParams.status = status

  axios.get(url, { params: filterParams }).then((response) => {
    scrollNextUrl = response.data.next
    vehiclesFilter.value = response.data.results
    loading.value = false
  })
}

const ppt = () => {
  tab.value = '5'
  loading.value = true
  if (filterParams.status || filterParams.status === 0) {
    delete filterParams.status
  }
  if (filterParams.vpt) {
    delete filterParams.vpt
  }
  if (filterParams.no_web) {
    delete filterParams.no_web
  }
  if (filterParams.inmediate_delivery) {
    delete filterParams.inmediate_delivery
  }
  filterParams.ppt = true
  axios.get(url, { params: filterParams }).then((response) => {
    scrollNextUrl = response.data.next
    vehiclesFilter.value = response.data.results
    loading.value = false
  })
}

const vpt = () => {
  tab.value = '6'
  loading.value = true
  if (filterParams.status || filterParams.status === 0) {
    delete filterParams.status
  }
  if (filterParams.ppt) {
    delete filterParams.ppt
  }
  if (filterParams.no_web) {
    delete filterParams.no_web
  }
  if (filterParams.inmediate_delivery) {
    delete filterParams.inmediate_delivery
  }
  filterParams.vpt = true
  axios.get(url, { params: filterParams }).then((response) => {
    scrollNextUrl = response.data.next
    vehiclesFilter.value = response.data.results
    loading.value = false
  })
}

const web = () => {
  tab.value = '7'
  loading.value = true
  if (filterParams.status || filterParams.status === 0) {
    delete filterParams.status
  }
  if (filterParams.ppt) {
    delete filterParams.ppt
  }
  if (filterParams.vpt) {
    delete filterParams.vpt
  }
  if (filterParams.inmediate_delivery) {
    delete filterParams.inmediate_delivery
  }
  filterParams.no_web = true
  axios.get(url, { params: filterParams }).then((response) => {
    scrollNextUrl = response.data.next
    vehiclesFilter.value = response.data.results
    loading.value = false
  })
}

const entrega = () => {
  tab.value = '8'
  loading.value = true
  if (filterParams.status || filterParams.status === 0) {
    delete filterParams.status
  }
  if (filterParams.ppt) {
    delete filterParams.ppt
  }
  if (filterParams.vpt) {
    delete filterParams.vpt
  }
  if (filterParams.no_web) {
    delete filterParams.no_web
  }
  filterParams.inmediate_delivery = true
  axios.get(url, { params: filterParams }).then((response) => {
    scrollNextUrl = response.data.next
    vehiclesFilter.value = response.data.results
    loading.value = false
  })
}

const vehicleId = ref(null)
const vehicleSlug = ref(null)
const vehicleMenu = (id, slug) => {
  menu.value.modal.showModal()
  vehicleId.value = id
  vehicleSlug.value = slug
}

const deleteVehicle = (vehicleId) => {
  if (vehicleId) {
    id.value = vehicleId
  }
  axios
    .delete(`${import.meta.env.VITE_VEHICLES}/${id.value}`)
    .then(() => all())
    .then(() => {
      menu.value.modal.close()
    })
  menu.value.modal.focus()
}

const vehicleWeb = (slugWeb) => {
  if (slugWeb) {
    slug.value = slugWeb
  }
  window.open(`${import.meta.env.VITE_WEB}${slug.value}`, '_blank')
  slug.value = ''
  menu.value.modal.close()
}

const addAuto = () => {
  drawer.value = false
  info.value.modal.showModal()
  axios
    .post(`${import.meta.env.VITE_VEHICLES}/from-chassis-number/`, {
      chassis_number: vin.value
    })
    .then((response) => {
      if (response.status === 201 || response.status === 200) {
        loadingInfo.value = false
        modalTitle.value = 'Auto añadido'
        modalMessage.value = 'El vehículo ha sido añadido con éxito'
      } else if (response.status === 400) {
        loadingInfo.value = false
        modalTitle.value = 'Error'
        modalMessage.value = 'Se ha producido un error al intentar añadir el vehículo'
      } else if (response.status === 409) {
        loadingInfo.value = false
        modalTitle.value = 'Error'
        modalMessage.value = 'Puede que el vehiculo que intentas añadir ya existe'
      } else {
        loadingInfo.value = false
        modalTitle.value = 'Error'
        modalMessage.value = 'Se ha producido un error al intentar añadir el vehículo'
      }
    })
}

const addSemi = () => {
  const value = version.value.value.split('<')
  info.value.modal.showModal()
  drawer.value = false
  axios
    .post(`${import.meta.env.VITE_VEHICLES}/from-national-code/`, {
      national_vehicle_code: value[0],
      registration_date_month: value[1],
      registration_date_year: value[2],
      version: value[3],
      model: eurotax.value[1]
    })
    .then((response) => {
      if (response.status === 201 || response.status === 200) {
        selected()
        loadingInfo.value = false
        modalTitle.value = 'Auto añadido'
        modalMessage.value = 'El vehículo ha sido añadido con éxito'
      } else if (response.status === 400) {
        loadingInfo.value = false
        modalTitle.value = 'Error'
        modalMessage.value = 'Se ha producido un error al intentar añadir el vehículo'
      } else if (response.status === 409) {
        loadingInfo.value = false
        modalTitle.value = 'Error'
        modalMessage.value = 'Puede que el vehiculo que intentas añadir ya existe'
      } else {
        loadingInfo.value = false
        modalTitle.value = 'Error'
        modalMessage.value = 'Se ha producido un error al intentar añadir el vehículo'
      }
    })
  resetDrawer()
}

const step2 = () => {
  loading.value = true
  axios
    .post(`${import.meta.env.VITE_API}/vehicles-models/eurotax-models/`, {
      brand: brand.value.id,
      vehicle_type: body.value
    })
    .then((response) => {
      typeList.value = response.data
      for (const types of typeList.value) {
        types.codes.map((code) => {
          let id = makeValue(code)
          let title = makeType(code.data)
          typeOptions.push({
            value: id,
            label: title
          })
        })
      }
    })
    .then(() => {
      refresh.value++
      disModel.value = false
      loading.value = false
    })
}

const step3 = () => {
  loadingBtn.value = true
  eurotax.value = model.value.value.split('-')
  axios
    .post(`${import.meta.env.VITE_API}/vehicles-models/eurotax-types/`, {
      model_code: eurotax.value[0],
      vehicle_model: eurotax.value[1]
    })
    .then((response) => {
      versionList.value = response.data.types
      for (const types of versionList.value) {
        let id = makeVersion(types)
        let title = makeType(types)
        versionOptions.push({
          value: id,
          label: title
        })
      }
    })
    .then(() => {
      refresh.value++
      disVersion.value = false
      loadingBtn.value = false
      disAdd.value = false
    })
}

const makeValue = (code) => {
  let value = code.id + '-' + code.vehicle_model
  return value
}

const makeVersion = (code) => {
  const divider = '<'
  let value = code.national_vehicle_code
  if (code.production_end_date_month) {
    value = value + divider + code.production_end_date_month
  } else {
    value = value + divider + code.production_start_date_month
  }
  if (code.production_end_date_year) {
    value = value + divider + code.production_end_date_year
  } else {
    value = value + divider + code.production_start_date_year
  }
  value = value + divider + code.name
  return value
}

const makeType = (code) => {
  const space = ' | '
  const script = ' - '
  let name = code.name
  if (code.production_start_date_month) {
    const psdm = code.production_start_date_month
    name = name + space + psdm
    if (code.production_start_date_year) {
      const psdy = code.production_start_date_year
      name = name + script + psdy
    }
    if (code.production_end_date_month) {
      const pedm = code.production_end_date_month
      name = name + space + pedm
      if (code.production_end_date_year) {
        const pedy = code.production_end_date_year
        name = name + script + pedy
      }
    }
  }
  return name
}

const fillVehicle = () => {
  axios.get(scrollNextUrl).then((response) => {
    scrollNextUrl = response.data.next
    vehiclesFilter.value = [...vehiclesFilter.value, ...response.data.results]
  })
}

const tabContainer = ref(null)
const horizontalScroll = (evt) => {
  tabContainer.value.scrollLeft += evt.deltaY * 1
}

const openDrawer = (section) => {
  drawer.value = true
  drawerSection.value = section
}

onMounted(() => {
  axios.get(userUrl).then((response) => {
    userStore.id = response.data.id
    userStore.email = response.data.email
    userStore.name = response.data.first_name
    userStore.lastName = response.data.last_name
    userStore.image = response.data.image
    userStore.perms = response.data.permissions_codenames
    userStore.isAdmin = response.data.is_admin
  })

  selected()

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        fillVehicle()
      }
    })
  })
  observer.observe(vehicleNext.value)
})
</script>

<template>
  <ModalDialog ref="menu">
    <ul class="menu w-full p-0 [&_li>*]:rounded-none">
      <li><RouterLink :to="'/vehiculos/' + vehicleId">Ver/Editar</RouterLink></li>
      <div class="divider m-0"></div>
      <li><a @click="vehicleWeb(vehicleSlug)">Ver anuncio</a></li>
      <div class="divider m-0"></div>
      <li><a>Ejecutar PT</a></li>
      <div class="divider m-0"></div>
      <li><a>Imprimir</a></li>
      <div class="divider m-0"></div>
      <li><a @click="deleteVehicle(vehicleId)">Eliminar</a></li>
    </ul>
  </ModalDialog>
  <ModalInfo ref="info" :title="modalTitle" :message="modalMessage" :loading="loadingInfo" />
  <HeaderMain ref="header">
    <DrawerComponent id="filterDrawer" v-model="drawer" width="w-screen lg:w-1/2">
      <template #content>
        <div class="p-4 lg:p-0">
          <header class="flex w-full flex-row items-center justify-between gap-2 lg:hidden">
            <form @submit.prevent="search" class="w-full">
              <label class="input input-bordered flex items-center gap-2">
                <Icon icon="mdi:magnify" width="24" />
                <input
                  type="text"
                  placeholder="Buscar"
                  v-model="searchValue"
                  @change="searchReact"
                  class="w-full"
                />
                <Icon icon="mdi:times" width="24" @click="searchReset" class="cursor-pointer" />
              </label>
            </form>
            <div class="flex gap-2 lg:hidden">
              <label for="filterDrawer" @click="filterDrawer" class="text-black">
                <div tabindex="0" role="button" class="btn btn-square btn-outline lg:hidden">
                  <Icon icon="heroicons:adjustments-vertical" width="24" />
                </div>
              </label>
              <DropdownBtn>
                <template #btn>
                  <div tabindex="0" role="button" class="btn btn-square btn-primary">
                    <Icon icon="mdi:plus" width="24" />
                  </div>
                </template>
                <template #content>
                  <li><label for="filterDrawer" @click="autoDrawer">Registro Automático</label></li>
                  <li>
                    <label for="filterDrawer" @click="semiDrawer">Registro Semi-Automático</label>
                  </li>
                  <li><label for="filterDrawer" @click="manualDrawer">Registro Manual</label></li>
                </template>
              </DropdownBtn>
            </div>
          </header>
          <div class="hidden w-full flex-row gap-8 lg:flex">
            <aside class="min-h-full w-96 bg-white p-8 text-base-content">
              <span class="text-xl font-bold">Filtros</span>
              <RangeSelect
                label="Año:"
                class="mt-4"
                :from="options.reverseYears"
                :to="options.years"
                v-model:gte="yearGte"
                v-model:lte="yearLte"
                @change-gte="yearFilter"
                @change-lte="yearFilter"
              />
              <RangeInputN
                label="Precio:"
                :max="200000"
                v-model:gte="priceGte"
                v-model:lte="priceLte"
                @change-gte="priceFilter"
                @change-lte="priceFilter"
              />
              <RangeInputN
                label="Kms:"
                :max="200000"
                v-model:gte="kmsGte"
                v-model:lte="kmsLte"
                @change-gte="kmsFilter"
                @change-lte="kmsFilter"
              />
              <SelectInput
                label="Combustible:"
                :options="options.combustible"
                v-model="combustible"
                @selected="combustibleFilter"
              />
              <SelectInput
                label="Tipo de Cambio:"
                :options="options.cambio"
                v-model="cambio"
                @selected="cambioFilter"
              />
              <SelectInput
                label="Tipo de Vehículo:"
                :options="options.vehiculo"
                v-model="vehiculo"
                @selected="vehiculoFilter"
              />
              <SelectInput
                label="Categoría web:"
                :options="options.categoria"
                v-model="categoria"
                @selected="categoriaFilter"
              />
              <SelectInput
                label="Etiqueta medioambiental:"
                :options="options.medioambiental"
                v-model="medioambiental"
                @selected="medioambientalFilter"
                :initialValue="null"
              />
              <CheckInput label="ITV Vigente:" v-model="itv" />
              <CheckInput label="Pendiente ITV:" v-model="pitv" />
              <CheckInput label="Pendiente Video:" v-model="pVideo" />
              <li class="mt-6 grid grid-cols-2 gap-2">
                <button @click="reset" class="btn btn-outline w-full">Limpiar</button>
                <button @click="filter" class="btn btn-primary w-full text-white">
                  <LoadingSpinner v-if="loading" />
                  <span v-else class="font-semibold text-white">Filtrar</span>
                </button>
              </li>
            </aside>
            <div
              class="mx-auto flex w-full max-w-6xl flex-shrink flex-col items-start justify-center rounded-md py-4"
            >
              <div class="flex w-full flex-row justify-between gap-2">
                <form @submit.prevent="search">
                  <label class="input input-bordered flex w-96 items-center gap-2">
                    <Icon icon="mdi:magnify" width="24" />
                    <input
                      type="text"
                      class="grow"
                      placeholder="Buscar"
                      v-model="searchValue"
                      @change="searchReact"
                    />
                    <Icon icon="mdi:times" width="24" @click="searchReset" />
                  </label>
                </form>
                <div class="flex flex-row gap-2 lg:hidden">
                  <button @click="discountDrawer" class="btn btn-secondary hidden lg:flex">
                    <Icon icon="mdi:discount" width="25" />
                    Descuentos
                  </button>
                  <DropdownBtn>
                    <template #btn>
                      <div
                        tabindex="0"
                        role="button"
                        class="btn btn-primary hidden text-white lg:flex"
                      >
                        <Icon icon="mdi:plus" width="25" />
                        Nuevo
                      </div>
                    </template>
                    <template #content>
                      <li>
                        <label for="filterDrawer" @click="autoDrawer">Registro Automático</label>
                      </li>
                      <li>
                        <label for="filterDrawer" @click="semiDrawer"
                          >Registro Semi-Automático</label
                        >
                      </li>
                      <li>
                        <label for="filterDrawer" @click="manualDrawer">Registro Manual</label>
                      </li>
                    </template>
                  </DropdownBtn>
                </div>
              </div>
              <div
                role="tablist"
                ref="tabContainer"
                @wheel.prevent="horizontalScroll"
                class="no-scrollbar tabs tabs-bordered mt-7 w-[66vw] max-w-6xl overflow-x-scroll font-medium xl:w-[73vw] [&_a]:gap-2 [&_a]:text-nowrap [&_a]:text-xs [&_a]:font-semibold [&_a]:text-base-200 focus:[&_a]:font-semibold"
              >
                <a
                  role="tab"
                  class="tab"
                  :class="{ 'tab-active font-bold !text-black': tab === '0' }"
                  @click="all"
                >
                  Todos ({{ filtersCounters.total }})
                </a>
                <a
                  role="tab"
                  class="tab"
                  :class="{ 'tab-active font-bold !text-black': tab === '1' }"
                  @click="vehicleStatus(0)"
                >
                  Recepción ({{ filtersCounters.receipt }})
                </a>
                <a
                  role="tab"
                  class="tab"
                  :class="{ 'tab-active font-bold !text-black': tab === '2' }"
                  @click="vehicleStatus(3)"
                >
                  Publicación ({{ filtersCounters.publication }})
                </a>
                <a
                  role="tab"
                  class="tab"
                  :class="{ 'tab-active font-bold !text-black': tab === '3' }"
                  @click="vehicleStatus(4)"
                >
                  En venta ({{ filtersCounters.on_sale }})
                </a>
                <a
                  role="tab"
                  class="tab"
                  :class="{ 'tab-active font-bold !text-black': tab === '4' }"
                  @click="vehicleStatus(5)"
                >
                  Reservados ({{ filtersCounters.reserved }})
                </a>
                <a
                  role="tab"
                  class="tab"
                  :class="{ 'tab-active font-bold !text-black': tab === '5' }"
                  @click="ppt"
                >
                  Pte. de PT ({{ filtersCounters.ppt }})
                </a>
                <a
                  role="tab"
                  class="tab"
                  :class="{ 'tab-active font-bold !text-black': tab === '6' }"
                  @click="vpt"
                >
                  Validar PT ({{ filtersCounters.vpt }})
                </a>
                <a
                  role="tab"
                  class="tab"
                  :class="{ 'tab-active font-bold !text-black': tab === '7' }"
                  @click="web"
                >
                  No web ({{ filtersCounters.no_web }})
                </a>
                <a
                  role="tab"
                  class="tab"
                  :class="{ 'tab-active font-bold !text-black': tab === '8' }"
                  @click="entrega"
                >
                  Entrega inmediata ({{ filtersCounters.inmediate_delivery }})
                </a>
                <a
                  role="tab"
                  class="tab"
                  :class="{ 'tab-active font-bold !text-black': tab === '9' }"
                  @click="vehicleStatus(10)"
                >
                  No disponible ({{ filtersCounters.not_available }})
                </a>
              </div>
              <div
                class="flex min-h-[150vh] w-full flex-col items-center justify-between lg:hidden xl:flex"
              >
                <LoadingSpinner v-if="loading" class="loading-lg mt-8" />
                <div v-else class="w-full">
                  <CardDesktop
                    v-for="(vehicle, index) in vehiclesFilter"
                    :key="index"
                    :vehicle="vehicle"
                    @cochesnet-btn="(id = parseInt(vehicle.id)), openDrawer('cochesnet')"
                    @wallapop-btn="(id = parseInt(vehicle.id)), openDrawer('wallapop')"
                    @sumauto-btn="(id = parseInt(vehicle.id)), openDrawer('sumauto')"
                    @menu-btn2="vehicleWeb"
                    @menu-btn5="deleteVehicle"
                  />
                </div>
              </div>
              <div
                class="hidden min-h-[150vh] w-full flex-col items-center justify-between px-4 lg:flex xl:hidden"
              >
                <LoadingSpinner v-if="loading" class="loading-lg mt-8" />
                <div v-else class="w-full">
                  <CardMobile
                    v-for="(vehicle, index) in vehiclesFilter"
                    @menu="vehicleMenu"
                    :key="index"
                    :vehicle="vehicle"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            class="mt-4 flex min-h-[150vh] flex-col items-center justify-between lg:hidden"
            :key="refresh"
          >
            <div class="flex h-full w-full flex-col items-center">
              <div
                role="tablist"
                ref="tabContainer"
                @wheel.prevent="horizontalScroll"
                class="no-scrollbar tabs tabs-bordered mx-4 w-full overflow-x-scroll text-nowrap font-medium [&_a]:gap-2 [&_a]:text-[14px] [&_a]:font-semibold [&_a]:text-base-200"
              >
                <a
                  role="tab"
                  class="tab"
                  :class="{ 'tab-active font-bold !text-black': tab === '0' }"
                  @click="all"
                >
                  Todos ({{ filtersCounters.total }})
                </a>
                <a
                  role="tab"
                  class="tab"
                  :class="{ 'tab-active font-bold !text-black': tab === '1' }"
                  @click="vehicleStatus(0)"
                >
                  Recepción ({{ filtersCounters.receipt }})
                </a>
                <a
                  role="tab"
                  class="tab"
                  :class="{ 'tab-active font-bold !text-black': tab === '2' }"
                  @click="vehicleStatus(3)"
                >
                  Publicación ({{ filtersCounters.publication }})
                </a>
                <a
                  role="tab"
                  class="tab"
                  :class="{ 'tab-active font-bold !text-black': tab === '3' }"
                  @click="vehicleStatus(4)"
                >
                  En venta ({{ filtersCounters.on_sale }})
                </a>
                <a
                  role="tab"
                  class="tab"
                  :class="{ 'tab-active font-bold !text-black': tab === '4' }"
                  @click="vehicleStatus(5)"
                >
                  Reservados ({{ filtersCounters.reserved }})
                </a>
                <a
                  role="tab"
                  class="tab"
                  :class="{ 'tab-active font-bold !text-black': tab === '5' }"
                  @click="ppt"
                >
                  Pte. de PT ({{ filtersCounters.ppt }})
                </a>
                <a
                  role="tab"
                  class="tab"
                  :class="{ 'tab-active font-bold !text-black': tab === '6' }"
                  @click="vpt"
                >
                  Validar PT ({{ filtersCounters.vpt }})
                </a>
                <a
                  role="tab"
                  class="tab"
                  :class="{ 'tab-active font-bold !text-black': tab === '7' }"
                  @click="web"
                >
                  No web ({{ filtersCounters.no_web }})
                </a>
                <a
                  role="tab"
                  class="tab"
                  :class="{ 'tab-active font-bold !text-black': tab === '8' }"
                  @click="entrega"
                >
                  Entrega inmediata ({{ filtersCounters.inmediate_delivery }})
                </a>
                <a
                  role="tab"
                  class="tab"
                  :class="{ 'tab-active font-bold !text-black': tab === '9' }"
                  @click="vehicleStatus(10)"
                >
                  No disponible ({{ filtersCounters.not_available }})
                </a>
              </div>
              <LoadingSpinner v-if="loading" class="loading-lg mt-24" />
              <div class="w-full" v-else>
                <CardMobile
                  v-for="(vehicle, index) in vehiclesFilter"
                  @menu="vehicleMenu"
                  :key="index"
                  :vehicle="vehicle"
                />
              </div>
            </div>
          </div>
          <div ref="vehicleNext" class="my-8 flex w-full items-center justify-center">
            <LoadingSpinner v-if="scrollNextUrl" class="loading-lg" />
          </div>
        </div>
      </template>
      <template #drawer>
        <template v-if="drawerSection === 'filter'">
          <div>
            <DrawerTitle title="Filtros" @toggle="toggle" />
            <RangeSelect
              label="Año:"
              :from="options.reverseYears"
              :to="options.years"
              v-model:gte="yearGte"
              v-model:lte="yearLte"
              @change-gte="yearFilter"
              @change-lte="yearFilter"
            />
            <RangeInputN
              label="Precio:"
              :max="200000"
              v-model:gte="priceGte"
              v-model:lte="priceLte"
              @change-gte="priceFilter"
              @change-lte="priceFilter"
            />
            <RangeInputN
              label="KMs:"
              :max="200000"
              v-model:gte="kmsGte"
              v-model:lte="kmsLte"
              @change-gte="kmsFilter"
              @change-lte="kmsFilter"
            />
            <SelectInput
              label="Combustible:"
              :options="options.combustible"
              v-model="combustible"
              @selected="combustibleFilter"
            />
            <SelectInput
              label="Tipo de Cambio:"
              :options="options.cambio"
              v-model="cambio"
              @selected="cambioFilter"
            />
            <SelectInput
              label="Tipo de Vehículo:"
              :options="options.vehiculo"
              v-model="vehiculo"
              @selected="vehiculoFilter"
            />
            <SelectInput
              label="Categoría web:"
              :options="options.categoria"
              v-model="categoria"
              @selected="categoriaFilter"
            />
            <SelectInput
              label="Etiqueta medioambiental:"
              :options="options.medioambiental"
              v-model="medioambiental"
              @selected="medioambientalFilter"
              :initialValue="null"
            />
            <CheckInput class="mt-6" label="ITV Vigente:" v-model="itv" />
            <CheckInput label="Pendiente ITV:" v-model="pitv" />
            <CheckInput label="Pendiente Video:" v-model="pVideo" />
          </div>
          <DrawerActions
            secondary="Reset"
            primary="Filtrar"
            @click-secondary="reset"
            @click-primary="filter"
          />
        </template>
        <template v-if="drawerSection === 'auto'">
          <div>
            <DrawerTitle title="Nuevo Vehículo Automático" @toggle="toggle" />
            <TextInput label="VIN:" placeholder="Introducir VIN" v-model="vin" />
          </div>
          <DrawerActions
            secondary="Cancelar"
            primary="Añadir"
            @click-primary="addAuto"
            @click-secondary="toggle"
          />
        </template>
        <template v-if="drawerSection === 'semi'">
          <div class="flex flex-col">
            <DrawerTitle title="Nuevo Vehículo Semi-Automático" @toggle="toggle" />
            <SearchSelect label="Marca:" :options="brandOptions" v-model="brand" />
            <SelectInput label="Carrocería:" v-model="body" :options="bodyOptions" />
            <div class="mt-3 flex flex-row justify-end">
              <button ref="stepBtn" class="btn btn-primary text-white" @click="step2">
                <LoadingSpinner v-if="loading" />
                Buscar
              </button>
            </div>
            <SearchSelect
              label="Modelo:"
              :options="typeOptions"
              v-model="model"
              :key="refresh"
              :disabled="disModel"
            />
            <div class="mt-3 flex flex-row justify-end">
              <button class="btn btn-primary text-white" :disabled="disModel" @click="step3">
                <LoadingSpinner v-if="loadingBtn" />
                Buscar
              </button>
            </div>
            <SearchSelect
              label="Version:"
              :options="versionOptions"
              v-model="version"
              :key="refresh"
              :disabled="disVersion"
            />
          </div>
          <DrawerActions
            secondary="Cancelar"
            primary="Añadir"
            @click-primary="addSemi"
            @click-secondary="toggle"
            :disabled="disAdd"
          />
        </template>
        <template v-if="drawerSection === 'manual'">
          <div>
            <DrawerTitle title="Nuevo Vehículo Manual" @toggle="toggle" />
            <TextInput label="Bastidor:" />
            <TextInput label="Matricula:" />
            <TextInput label="Fabricación:" />
            <TextInput label="Marca:" />
            <TextInput label="Modelo:" />
            <TextInput label="Version:" />
            <TextInput label="Carrocería:" />
            <TextInput label="Tipo de cambio:" />
            <TextInput label="Combustible:" />
          </div>
          <DrawerActions secondary="Cancelar" primary="Añadir" />
        </template>
        <template v-if="drawerSection === 'discount'">
          <AutoDiscountDrawer :toggle="toggle" />
        </template>
        <CochesnetDrawer
          v-if="drawerSection === 'cochesnet'"
          :key="id"
          :id="id"
          :toggle="toggle"
          @published="all"
        />
        <WallapopDrawer
          v-if="drawerSection === 'wallapop'"
          :key="id"
          :id="id"
          :toggle="toggle"
          @published="all"
        />
        <SumautoDrawer
          v-if="drawerSection === 'sumauto'"
          :key="id"
          :id="id"
          :toggle="toggle"
          @published="all"
        />
      </template>
    </DrawerComponent>
  </HeaderMain>
</template>

<style scoped>
.tab-active {
  color: black;
  font-weight: 600;
}
</style>
