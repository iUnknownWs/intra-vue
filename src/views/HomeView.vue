<script setup>
import { Icon } from '@iconify/vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import options from '@/js/filterOptions.js'
import CardDesktop from '@/components/CardDesktop.vue'
import CardMobile from '@/components/CardMobile.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('token')}`

const url = `${import.meta.env.VITE_VEHICLES}/?`
const brandUrl = `${import.meta.env.VITE_API}/vehicles-brands/?limit=500`
const bodyUrl = `${import.meta.env.VITE_API}/vehicles-types/`
let scrollNextUrl = ''
const vehiclesFilter = ref([])
const params = ref('')
const filterParams = {}
const urlParams = ref(url)
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
const drawer = ref('')
const toggleDrawer = ref(false)
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
const loadingNext = ref(false)

const searchReact = () => {
  if (searchValue.value !== '') {
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
  toggleDrawer.value = !toggleDrawer.value
  resetDrawer()
}

const filterDrawer = () => {
  drawer.value = 'filter'
}

const autoDrawer = () => {
  drawer.value = 'auto'
}

const semiDrawer = () => {
  drawer.value = 'semi'
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
  drawer.value = 'manual'
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
  const filterUrl = `${urlParams.value}${new URLSearchParams(filterParams)}`
  window.scrollTo({ top: 0, behavior: 'smooth' })
  axios.get(filterUrl).then((response) => {
    vehiclesFilter.value = response.data.results
    loading.value = false
  })
  toggleDrawer.value = ref(false)
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
  all()
  toggleDrawer.value = ref(false)
}

const search = () => {
  loading.value = true
  const searchParams = {
    search: searchValue.value
  }
  const searchUrl = `${urlParams.value}${new URLSearchParams(searchParams)}`
  axios.get(searchUrl).then((response) => {
    scrollNextUrl = response.data.next
    vehiclesFilter.value = response.data.results
    loading.value = false
  })
}

const selected = () => {
  if (tab.value === '0') {
    all()
  }
  if (tab.value === '1') {
    pr()
  }
  if (tab.value === '2') {
    pp()
  }
  if (tab.value === '3') {
    venta()
  }
  if (tab.value === '4') {
    reserva()
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
    na()
  }
}

const all = () => {
  loading.value = true
  axios.get(url).then((response) => {
    scrollNextUrl = response.data.next
    vehiclesFilter.value = response.data.results
    loading.value = false
  })
}

const pr = () => {
  loading.value = true
  params.value = 'status=0'
  urlParams.value = url + params.value + '&'
  axios.get(urlParams.value).then((response) => {
    scrollNextUrl = response.data.next
    vehiclesFilter.value = response.data.results
    loading.value = false
  })
}

const ppt = () => {
  loading.value = true
  params.value = 'ppt=true'
  urlParams.value = url + params.value + '&'
  axios.get(urlParams.value).then((response) => {
    scrollNextUrl = response.data.next
    vehiclesFilter.value = response.data.results
    loading.value = false
  })
}

const vpt = () => {
  loading.value = true
  params.value = 'vpt=true'
  urlParams.value = url + params.value + '&'
  axios.get(urlParams.value).then((response) => {
    scrollNextUrl = response.data.next
    vehiclesFilter.value = response.data.results
    loading.value = false
  })
}

const pp = () => {
  loading.value = true
  params.value = 'status=3'
  urlParams.value = url + params.value + '&'
  axios.get(urlParams.value).then((response) => {
    scrollNextUrl = response.data.next
    vehiclesFilter.value = response.data.results
    loading.value = false
  })
}

const venta = () => {
  loading.value = true
  params.value = 'status=4'
  urlParams.value = url + params.value + '&'
  axios.get(urlParams.value).then((response) => {
    scrollNextUrl = response.data.next
    vehiclesFilter.value = response.data.results
    loading.value = false
  })
}

const reserva = () => {
  loading.value = true
  params.value = 'status=5'
  urlParams.value = url + params.value + '&'
  axios.get(urlParams.value).then((response) => {
    scrollNextUrl = response.data.next
    vehiclesFilter.value = response.data.results
    loading.value = false
  })
}

const web = () => {
  loading.value = true
  params.value = 'no_web=true'
  urlParams.value = url + params.value + '&'
  axios.get(urlParams.value).then((response) => {
    scrollNextUrl = response.data.next
    vehiclesFilter.value = response.data.results
    loading.value = false
  })
}

const entrega = () => {
  loading.value = true
  params.value = 'inmediate_delivery=true'
  urlParams.value = url + params.value + '&'
  axios.get(urlParams.value).then((response) => {
    scrollNextUrl = response.data.next
    vehiclesFilter.value = response.data.results
    loading.value = false
  })
}

const na = () => {
  loading.value = true
  params.value = 'status=10'
  urlParams.value = url + params.value + '&'
  axios.get(urlParams.value).then((response) => {
    scrollNextUrl = response.data.next
    vehiclesFilter.value = response.data.results
    loading.value = false
  })
}

const vehicleMenu = (vehicleId, vehicleSlug) => {
  menu.value.modal.showModal()
  id.value = vehicleId
  slug.value = vehicleSlug
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
  toggleDrawer.value = false
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
  toggleDrawer.value = false
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
  loadingNext.value = true
  axios
    .get(scrollNextUrl)
    .then((response) => {
      scrollNextUrl = response.data.next
      vehiclesFilter.value = [...vehiclesFilter.value, ...response.data.results]
    })
    .then(() => {
      loadingNext.value = false
    })
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      fillVehicle()
    }
  })
})

onMounted(() => {
  selected()
  observer.observe(vehicleNext.value)
})
</script>

<template>
  <ModalDialog ref="menu">
    <ul class="menu w-full p-0 [&_li>*]:rounded-none">
      <li><a>Ver/Editar</a></li>
      <div class="divider m-0"></div>
      <li><a @click="vehicleWeb">Ver anuncio</a></li>
      <div class="divider m-0"></div>
      <li><a>Ejecutar PT</a></li>
      <div class="divider m-0"></div>
      <li><a>Imprimir</a></li>
      <div class="divider m-0"></div>
      <li><a @click="deleteVehicle">Eliminar</a></li>
    </ul>
  </ModalDialog>
  <ModalInfo ref="info" :title="modalTitle" :message="modalMessage" :loading="loadingInfo" />
  <HeaderMain ref="header">
    <div class="drawer drawer-end">
      <input v-model="toggleDrawer" id="filterDrawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content">
        <!-- Page content here -->
        <header class="flex flex-row items-center justify-between">
          <TextBtn
            class="max-w-[400px] lg:ml-4"
            placeholder="Buscar"
            v-model="searchValue"
            :disabled="disSearch"
            @btn-click="search"
            @change="searchReact"
          >
            <Icon icon="mdi:magnify" width="25" />
          </TextBtn>
          <div class="ml-2 flex gap-1">
            <label for="filterDrawer" @click="filterDrawer" class="text-black lg:hidden">
              <div tabindex="0" role="button" class="btn btn-primary text-white lg:hidden">
                <Icon icon="mdi:filter" />
              </div>
            </label>
            <DropdownBtn class="lg:hidden">
              <template #btn>
                <div tabindex="0" role="button" class="btn btn-outline">
                  <Icon icon="mdi:plus" />
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
            <label for="filterDrawer" class="btn btn-outline hidden text-black">
              <Icon icon="mdi:filter" />
              Filtros
            </label>
            <DropdownBtn>
              <template #btn>
                <div tabindex="0" role="button" class="btn btn-primary hidden text-white lg:flex">
                  <Icon icon="mdi:plus" />
                  Nuevo
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
        <div class="lg:hidden">
          <SelectTab label="Pestaña:" v-model="tab" @change="selected" />
        </div>
        <div class="hidden flex-row items-start lg:flex">
          <div class="my-4 ml-4 min-h-full w-80 bg-white text-base-content">
            <div class="menu-title flex flex-row justify-between">Filtros</div>
            <div class="divider m-0"></div>
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
            <CheckInput label="ITV Vigente:" v-model="itv" />
            <CheckInput label="Pendiente ITV:" v-model="pitv" />
            <CheckInput label="Pendiente Video:" v-model="pVideo" />
            <li class="mt-8 flex flex-row justify-between">
              <button class="btn btn-outline w-28" @click="reset">
                <Icon icon="mdi:arrow-u-left-top" />
                Reset
              </button>
              <button class="btn btn-primary w-24 text-white" @click="filter">
                <Icon icon="mdi:check" />
                Filtrar
              </button>
            </li>
          </div>
          <div class="flex flex-col items-center justify-center">
            <div
              role="tablist"
              class="tabs tabs-bordered ml-20 mt-8 hidden justify-items-start bg-white font-medium lg:grid"
            >
              <input
                type="radio"
                name="class"
                role="tab"
                class="tab"
                aria-label="Todos"
                checked
                @change="all"
              />
              <input
                ref="pr"
                type="radio"
                name="class"
                role="tab"
                class="tab"
                aria-label="Recepción"
                @change="pr"
              />
              <input
                type="radio"
                name="class"
                role="tab"
                class="tab"
                aria-label="Publicación"
                @change="pp"
              />
              <input
                type="radio"
                name="class"
                role="tab"
                class="tab"
                aria-label="En venta"
                @change="venta"
              />
              <input
                type="radio"
                name="class"
                role="tab"
                class="tab"
                aria-label="Reservados"
                @change="reserva"
              />
              <input
                type="radio"
                name="class"
                role="tab"
                class="tab"
                aria-label="Pte. de PT"
                @change="ppt"
              />
              <input
                type="radio"
                name="class"
                role="tab"
                class="tab"
                aria-label="Validar PT"
                @change="vpt"
              />
              <input
                type="radio"
                name="class"
                role="tab"
                class="tab"
                aria-label="No web"
                @change="web"
              />
              <input
                type="radio"
                name="class"
                role="tab"
                class="tab"
                aria-label="Entrega inmediata"
                @change="entrega"
              />
              <input
                type="radio"
                name="class"
                role="tab"
                class="tab"
                aria-label="No disponible"
                @change="na"
              />
            </div>
            <div class="flex min-h-[150vh] flex-col justify-between">
              <LoadingSpinner v-if="loading" class="loading-lg" />
              <CardDesktop
                v-else
                v-for="(vehicle, index) in vehiclesFilter"
                :key="index"
                :id="vehicle.id"
                :slug="vehicle.slug || 'No disponible'"
                :placa="vehicle.license_plate || 'Sin matricula'"
                :modelo="vehicle.model?.model_web?.title || 'No disponible'"
                :marca="vehicle.model?.brand?.title || 'No disponible'"
                :version="vehicle.version?.title || 'No disponible'"
                :estado="vehicle.status"
                :contado="vehicle.price?.price_with_discounts || 0"
                :financiado="vehicle.price?.financed_price || '0'"
                :quotes="vehicle.price?.financing_fee || '0'"
                :stock="vehicle.days_in_stock || 0"
                :img="
                  vehicle.image ||
                  'https://intranet-pre.garageclub.es/static/images/brand/favicon.png'
                "
                :combustible="vehicle.fuel?.description || 'No disponible'"
                :año="vehicle.year || 0"
                :cambios="vehicle.gear_box?.description || 'No disponible'"
                :keys="vehicle.key_locator"
                :kms="vehicle.kms || 0"
                :distinctive="vehicle.maintenance?.distinctive"
                @menu-btn2="vehicleWeb"
                @menu-btn5="deleteVehicle"
              />
              <div ref="vehicleNext" class="my-8 flex w-full items-center justify-center">
                <LoadingSpinner v-if="loadingNext" class="loading-lg" />
              </div>
            </div>
          </div>
        </div>
        <div
          class="mt-4 flex min-h-[150vh] flex-col items-center justify-center lg:hidden"
          :key="refresh"
        >
          <LoadingSpinner v-if="loading" class="loading-lg" />
          <CardMobile
            v-else
            v-for="(vehicle, index) in vehiclesFilter"
            @menu="vehicleMenu"
            :key="index"
            :id="vehicle.id"
            :slug="vehicle.slug || 'No disponible'"
            :placa="vehicle.license_plate || 'Sin matricula'"
            :modelo="vehicle.model?.model_web?.title || 'No disponible'"
            :marca="vehicle.model?.brand?.title || 'No disponible'"
            :version="vehicle.version?.title || 'No disponible'"
            :estado="vehicle.status"
            :contado="vehicle.price?.price_with_discounts || 0"
            :financiado="vehicle.price?.financed_price || '0'"
            :quotes="vehicle.price?.financing_fee || '0'"
            :stock="vehicle.days_in_stock || 0"
            :img="
              vehicle.image || 'https://intranet-pre.garageclub.es/static/images/brand/favicon.png'
            "
            :combustible="vehicle.fuel?.description || 'No disponible'"
            :año="vehicle.year || 0"
            :cambios="vehicle.gear_box?.description || 'No disponible'"
            :keys="vehicle.key_locator"
            :kms="vehicle.kms || 0"
            :distinctive="vehicle.maintenance?.distinctive"
          />
          <div ref="vehicleNext2" class="mx-auto w-full">
            <LoadingSpinner v-if="loadingNext" class="loading-lg" />
            <span v-else>Final de la pagina</span>
          </div>
        </div>
      </div>
      <div class="drawer-side z-50">
        <label for="filterDrawer" aria-label="close sidebar" class="drawer-overlay"></label>
        <ul
          v-if="drawer === 'filter'"
          class="menu min-h-full w-screen bg-white p-4 text-base-content lg:w-[50vw]"
        >
          <!-- Sidebar content here -->
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
          />
          <CheckInput label="ITV Vigente:" v-model="itv" />
          <CheckInput label="Pendiente ITV:" v-model="pitv" />
          <CheckInput label="Pendiente Video:" v-model="pVideo" />
          <DrawerActions
            secondary="Reset"
            primary="Filtrar"
            @click-secondary="reset"
            @click-primary="filter"
          />
        </ul>
        <ul
          v-if="drawer === 'auto'"
          class="menu min-h-full w-screen justify-between bg-white p-4 text-base-content lg:w-[50vw]"
        >
          <!-- Sidebar content here -->
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
        </ul>
        <ul
          v-if="drawer === 'semi'"
          class="menu min-h-full w-screen justify-between bg-white p-4 text-base-content lg:w-[50vw]"
        >
          <!-- Sidebar content here -->
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
        </ul>
        <ul
          v-if="drawer === 'manual'"
          class="menu min-h-full w-screen justify-between bg-white p-4 text-base-content lg:w-[50vw]"
        >
          <!-- Sidebar content here -->
          <div>
            <DrawerTitle title="Nuevo Vehículo Manual" @toggle="toggle" />
            <TextInput label="Bastidor:" placeholder="Introducir" />
            <TextInput label="Matricula:" placeholder="Introducir" />
            <TextInput label="Fabricación:" placeholder="Introducir" />
            <TextInput label="Marca:" placeholder="Introducir" />
            <TextInput label="Modelo:" placeholder="Introducir" />
            <TextInput label="Version:" placeholder="Introducir" />
            <TextInput label="Carrocería:" placeholder="Introducir" />
            <TextInput label="Tipo de cambio:" placeholder="Introducir" />
            <TextInput label="Combustible:" placeholder="Introducir" />
          </div>
          <DrawerActions secondary="Cancelar" primary="Añadir" />
        </ul>
      </div>
    </div>
  </HeaderMain>
</template>

<style>
.badge {
  font-weight: 600;
  color: #fff;
}
.textcard {
  font-size: 0.65rem;
  line-height: 0.75rem;
}
.v-select,
.vs__dropdown-toggle {
  height: 3rem;
  background-color: #f3f4f6;
  background: #f3f4f6;
  border-radius: 10px !important;
}
</style>
