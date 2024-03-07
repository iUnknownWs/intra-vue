<script setup>
import { Icon } from '@iconify/vue'
import { useRoute } from 'vue-router'
import router from '@/router'
import { ref, onMounted } from 'vue'
import VehicleCard from '@/components/VehicleCard.vue'
import VehicleMobile from '@/components/VehicleMobile.vue'
import options from '@/js/filterOptions'
import axios from 'axios'

axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('token')}`

const route = useRoute()
const id = ref(route.params.id)
const url = `${import.meta.env.VITE_VEHICLES}/${id.value}`
const brandUrl = `${import.meta.env.VITE_API}/vehicles-brands/?limit=500`
const webBrandUrl = `${import.meta.env.VITE_API}/public/brands-web/?limit=500`
const bodyUrl = `${import.meta.env.VITE_API}/vehicles-types/`
const bodyTypeUrl = `${import.meta.env.VITE_DATA}`
const modelWebUrl = `${import.meta.env.VITE_PUBLIC}/models-web/?limit=5000&brand_web=`
const keysWebUrl = `${import.meta.env.VITE_KEYS}`
const loading = ref(true)
const vehicle = ref({})
const tab = ref(1)
const navBtn1 = ref(null)
const navBtn2 = ref(null)
const navBtn3 = ref(null)
const navBtn4 = ref(null)
const navBtn5 = ref(null)
const navs = [navBtn1, navBtn2, navBtn3, navBtn4, navBtn5]
const tab1 = ref(null)
const tab2 = ref(null)
const tab3 = ref(null)
const tab4 = ref(null)
const tab5 = ref(null)
const tab6 = ref(null)
const tab7 = ref(null)
const tab8 = ref(null)
const tab9 = ref(null)
const tab10 = ref(null)
const tabs = [tab1, tab2, tab3, tab4, tab5, tab6, tab7, tab8]
const tabs2 = [tab9, tab10]
const scrollDown = ref(false)
const scrollTop = ref(true)
const category = ref('0')
const chassis = ref('')
const bodyOptions = ref([])
const brandOptions = ref([])
const webBrandOptions = ref([])
const bodyTypeOptions = ref([])
const driveOptions = ref([])
const modelWebOptions = ref([])
const regulationsOptions = ref([])
const keysOptions = ref([])
const regimenOptions = ref([])
// const body = ref('')
const drives = ref(0)
const bodyType = ref('0')
const brand = ref({ id: '', label: '' })
const webBrand = ref({ id: '', label: '' })
const model = ref({ id: '', label: '' })
const modelWeb = ref({ id: '', label: '' })
const license = ref('')
const license1 = ref('')
const kms = ref(0)
const fuel = ref('0')
const gearBox = ref('0')
const power = ref(0)
const doors = ref(0)
const distinctive = ref('0')
const licenseOG = ref('')
const key = ref(0)
const keysQ = ref(0)
const fabrication = ref('')
const gears = ref(0)
const speed = ref(0)
const acceleration = ref(0)
const environment = ref(0)
const road = ref(0)
const city = ref(0)
const co2 = ref(0)
const length = ref(0)
const tare = ref(0)
const height = ref(0)
const itvExp = ref('')
const owners = ref(0)
const basic = ref(null)
const technical = ref(null)
const portals = ref(null)
const maintenance = ref(null)
const prices = ref(null)
const comments = ref(null)
const extras = ref(null)
const discounts = ref(null)
const freeEquip = ref(null)
const equip = ref(null)

const updateBasic = () => {
  loading.value = true
  axios
    .patch(url, {
      web_categories: [category.value],
      body_type: bodyType.value,
      chassis_number: chassis.value,
      license_plate: license.value,
      date_first_registration: license1.value,
      kms: kms.value,
      fuel: fuel.value,
      gear_box: gearBox.value,
      power: power.value,
      doors: doors.value,
      maintenance: {
        distinctive: distinctive.value,
        keys_quantity: keysQ.value
      },
      registration_date: fabrication.value,
      original_license_plate: licenseOG.value
    })
    .then(() => {
      fetch()
    })
}

const updateTechnical = () => {
  loading.value = true
  axios
    .patch(url, {
      drive_type: drives.value,
      number_gears: gears.value,
      max_speed: speed.value,
      acceleration: acceleration.value,
      environment: environment.value,
      road: road.value,
      city: city.value,
      co2: co2.value,
      length: length.value,
      tare: tare.value,
      heigth: height.value
    })
    .then(() => {
      fetch()
    })
}

const fetch = () => {
  axios
    .get(url)
    .then((response) => {
      vehicle.value = response.data
    })
    .then(() => {
      loading.value = false
      category.value = vehicle.value.web_categories[0].id
      bodyType.value = vehicle.value.body_type?.id
      brand.value = { id: vehicle.value.model.brand.id, label: vehicle.value.model.brand.title }
      webBrand.value = { id: vehicle.value.brand_web.id, label: vehicle.value.brand_web.title }
      modelWeb.value = { id: vehicle.value.model_web.id, label: vehicle.value.model_web.title }
      chassis.value = vehicle.value.chassis_number
      license.value = vehicle.value.license_plate
      license1.value = vehicle.value.date_first_registration
      kms.value = vehicle.value.kms
      fuel.value = vehicle.value.fuel.id
      gearBox.value = vehicle.value.gear_box.id
      power.value = vehicle.value.power
      doors.value = vehicle.value.doors
      distinctive.value = vehicle.value.maintenance.distinctive
      fabrication.value = vehicle.value.registration_date
      licenseOG.value = vehicle.value.original_license_plate
      key.value = vehicle.value.key_locator
      keysQ.value = vehicle.value.maintenance.keys_quantity
      drives.value = vehicle.value.drive_type.id
      gears.value = vehicle.value.number_gears
      speed.value = vehicle.value.max_speed
      acceleration.value = vehicle.value.seconds_to_100_speed
      environment.value = vehicle.value.consumption_in_environment
      road.value = vehicle.value.consumption_in_road
      city.value = vehicle.value.consumption_in_city
      co2.value = vehicle.value.co2_emissions
      length.value = vehicle.value.length
      tare.value = vehicle.value.tare_weigth
      height.value = vehicle.value.heigth
      itvExp.value = vehicle.value.maintenance.itv_expiration
      owners.value = vehicle.value.maintenance.owners_quantity
    })
    .then(() => {
      axios.get(`${modelWebUrl}${webBrand.value.id}`).then((response) => {
        for (let option of response.data.results) {
          modelWebOptions.value.push({
            id: option.id,
            label: option.title
          })
        }
      })
    })
}

fetch()
// axios
//   .post(`${import.meta.env.VITE_API}/vehicles-models/eurotax-models/`, {
//     brand: brand.value.id,
//     vehicle_type: body.value
//   })
//   .then((response) => {
//     for (const types of response.data) {
//       types.codes.map((code) => {
//         let id = makeValue(code)
//         let title = makeType(code.data)
//         modelOptions.push({
//           value: id,
//           label: title
//         })
//       })
//     }
//   })

axios.get(bodyUrl).then((response) => {
  bodyOptions.value = response.data.results
})

axios.get(keysWebUrl + '?free_keys=true').then((response) => {
  for (let option of response.data.results) {
    keysOptions.value.push({
      id: option.id,
      title: option.id
    })
  }
})

const unlinkKey = () => {
  axios.put(keysWebUrl + key.value, { vehicle: null }).then(() => {
    router.go(0)
  })
}

const linkKey = () => {
  axios.put(keysWebUrl + key.value, { vehicle: vehicle.value.id }).then(() => {
    router.go(0)
  })
}

axios.get(brandUrl).then((response) => {
  for (let option of response.data.results) {
    brandOptions.value.push({
      id: option.id,
      label: option.title
    })
  }
})

axios.get(webBrandUrl).then((response) => {
  for (let option of response.data.results) {
    webBrandOptions.value.push({
      id: option.id,
      label: option.title
    })
  }
})

axios.get(bodyTypeUrl).then((response) => {
  for (let option of response.data.bodies) {
    bodyTypeOptions.value.push({
      id: option.id,
      title: option.name
    })
  }
})

axios.get(bodyTypeUrl).then((response) => {
  for (let option of response.data.drives) {
    driveOptions.value.push({
      id: option.id,
      title: option.name
    })
  }
})

axios.get(bodyTypeUrl).then((response) => {
  for (let option of response.data.vehicle_regulations) {
    regulationsOptions.value.push({
      id: option.id,
      title: option.name
    })
  }
})

axios.get(bodyTypeUrl).then((response) => {
  for (let option of response.data.tax_regimes) {
    regimenOptions.value.push({
      id: option.id,
      title: option.name
    })
  }
})

const tabEvent1 = () => {
  tab.value = 1
  for (let tab of tabs) {
    tab.value.classList.remove('tab-active')
  }
  tab1.value.classList.add('tab-active')
  basic.value.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
}

const tabEvent2 = () => {
  tab.value = 2
  for (let tab of tabs) {
    tab.value.classList.remove('tab-active')
  }
  tab2.value.classList.add('tab-active')
  technical.value.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
}

const tabEvent3 = () => {
  tab.value = 3
  for (let tab of tabs) {
    tab.value.classList.remove('tab-active')
  }
  tab3.value.classList.add('tab-active')
  portals.value.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
}

const tabEvent4 = () => {
  tab.value = 4
  for (let tab of tabs) {
    tab.value.classList.remove('tab-active')
  }
  tab4.value.classList.add('tab-active')
  maintenance.value.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
}

const tabEvent5 = () => {
  tab.value = 5
  for (let tab of tabs) {
    tab.value.classList.remove('tab-active')
  }
  tab5.value.classList.add('tab-active')
  prices.value.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
}

const tabEvent6 = () => {
  tab.value = 6
  for (let tab of tabs) {
    tab.value.classList.remove('tab-active')
  }
  tab6.value.classList.add('tab-active')
  comments.value.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
}

const tabEvent7 = () => {
  tab.value = 7
  for (let tab of tabs) {
    tab.value.classList.remove('tab-active')
  }
  tab7.value.classList.add('tab-active')
  extras.value.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
}

const tabEvent8 = () => {
  tab.value = 8
  for (let tab of tabs) {
    tab.value.classList.remove('tab-active')
  }
  tab8.value.classList.add('tab-active')
  discounts.value.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
}

const tabEvent9 = () => {
  tab.value = 9
  for (let tab of tabs2) {
    tab.value.classList.remove('tab-active')
  }
  tab9.value.classList.add('tab-active')
  freeEquip.value.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
}

const tabEvent10 = () => {
  tab.value = 10
  for (let tab of tabs2) {
    tab.value.classList.remove('tab-active')
  }
  tab10.value.classList.add('tab-active')
  equip.value.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
}

const navEvent1 = () => {
  tab.value = 1
  for (let nav of navs) {
    nav.value.classList.remove('active')
  }
  navBtn1.value.classList.add('active')
}

const navEvent2 = () => {
  tab.value = 3
  for (let nav of navs) {
    nav.value.classList.remove('active')
  }
  navBtn2.value.classList.add('active')
}

const navEvent3 = () => {
  tab.value = 9
  for (let nav of navs) {
    nav.value.classList.remove('active')
  }
  navBtn3.value.classList.add('active')
}

const navEvent4 = () => {
  tab.value = 11
  for (let nav of navs) {
    nav.value.classList.remove('active')
  }
  navBtn4.value.classList.add('active')
}

const navEvent5 = () => {
  tab.value = 12
  for (let nav of navs) {
    nav.value.classList.remove('active')
  }
  navBtn5.value.classList.add('active')
}

onMounted(() => {
  let prev = window.scrollY
  window.addEventListener('scroll', () => {
    let current = window.scrollY
    if (prev > current) {
      scrollDown.value = false
      scrollTop.value = true
    } else {
      scrollDown.value = true
      scrollTop.value = false
    }
    prev = current
  })
})
</script>

<template>
  <HeaderMain class="pb-16">
    <header class="flex flex-col items-center">
      <LoadingSpinner v-if="loading" class="loading-lg" />
      <VehicleCard v-else :vehicle="vehicle" class="hidden lg:flex" />
      <VehicleMobile v-if="!loading" :vehicle="vehicle" class="my-3 lg:hidden" />
    </header>
    <div
      v-if="tab > 0 && tab < 9"
      role="tablist"
      class="tabs tabs-bordered sticky top-[4rem] z-10 overflow-x-scroll text-nowrap bg-white px-4 py-2 lg:hidden"
    >
      <a ref="tab1" role="tab" class="tab tab-active" @click="tabEvent1">Información Básica</a>
      <a ref="tab2" role="tab" class="tab" @click="tabEvent2">Información Técnica</a>
      <a ref="tab3" role="tab" class="tab" @click="tabEvent3">Portales web</a>
      <a ref="tab4" role="tab" class="tab" @click="tabEvent4">Mantenimiento</a>
      <a ref="tab5" role="tab" class="tab" @click="tabEvent5">Compra y precio</a>
      <a ref="tab6" role="tab" class="tab" @click="tabEvent6">Comentarios</a>
      <a ref="tab7" role="tab" class="tab" @click="tabEvent7">Extras</a>
      <a ref="tab8" role="tab" class="tab" @click="tabEvent8">Descuentos</a>
    </div>
    <div
      v-if="tab === 9 || tab === 10"
      role="tablist"
      class="tabs tabs-bordered sticky top-0 overflow-x-scroll text-nowrap px-4 lg:hidden"
    >
      <a ref="tab9" role="tab" class="tab tab-active" @click="tabEvent9">Equipamiento sin coste</a>
      <a ref="tab10" role="tab" class="tab" @click="tabEvent10">Equipamiento con coste</a>
    </div>
    <main class="flex flex-col gap-6 lg:flex-row">
      <aside class="sticky top-[4rem] hidden h-min max-w-64 rounded bg-base-100 lg:block">
        <ul class="menu menu-sm w-56 rounded-box bg-base-100">
          <li>
            <a class="font-bold" @click="tab = 1">Admin</a>
            <ul>
              <li><a @click="tabEvent1">Información Básica</a></li>
              <li>
                <a @click="tabEvent2">Información Técnica</a>
              </li>
              <li><a @click="tabEvent3">Portales web</a></li>
              <li><a @click="tabEvent4">Mantenimiento</a></li>
              <li><a @click="tabEvent5">Compra y precio</a></li>
              <li><a @click="tabEvent6">Comentarios</a></li>
              <li><a @click="tabEvent7">Extras</a></li>
              <li><a @click="tabEvent8">Descuentos</a></li>
            </ul>
          </li>
          <li>
            <a class="font-bold" @click="tabEvent9">Equipamiento</a>
            <ul>
              <li><a @click="tabEvent9">Equipamiento sin coste</a></li>
              <li><a @click="tabEvent10">Equipamiento con coste</a></li>
            </ul>
          </li>
          <li><a class="font-bold" @click="tab = 11">PT</a></li>
        </ul>
      </aside>
      <section class="flex w-full flex-col">
        <div v-if="tab > 0 && tab < 9" class="flex flex-col gap-8">
          <div ref="basic" class="flex scroll-m-20 flex-col gap-4 rounded bg-base-100 p-4">
            <div class="flex flex-row justify-between">
              <h1 class="text-xl font-medium">Información Básica</h1>
              <DropdownBtn>
                <template #btn>
                  <button class="btn btn-primary hidden text-white lg:block">Acciones</button>
                  <button class="btn btn-circle btn-ghost lg:hidden">
                    <Icon icon="mdi:dots-vertical" width="30" class="text-primary" />
                  </button>
                </template>
                <template #content>
                  <ul>
                    <li><a>Recalcular etiqueta</a></li>
                    <li><a @click="unlinkKey">Liberar llave</a></li>
                  </ul>
                </template>
              </DropdownBtn>
            </div>
            <div class="grid grid-cols-2 gap-x-4 lg:gap-x-10">
              <SelectInput label="Categoria web:" :options="options.categoria" v-model="category" />
              <SelectInput label="Carrocería:" :options="bodyTypeOptions" v-model="bodyType" />
              <SearchSelect label="Marca:" :options="brandOptions" v-model="brand" />
              <SearchSelect label="Marca web:" :options="webBrandOptions" v-model="webBrand" />
              <SearchSelect label="Modelo:" :options="webBrandOptions" v-model="model" />
              <SearchSelect label="Modelo web:" :options="modelWebOptions" v-model="modelWeb" />
              <TextInput label="Bastidor:" v-model="chassis" />
              <TextInput label="Matricula:" v-model="license" />
              <DateInput label="1º Matriculación:" v-model="license1" />
              <TextInput label="Km Actuales:" v-model="kms" />
              <SelectInput label="Combustible:" :options="options.combustible" v-model="fuel" />
              <SelectInput label="Cambio:" :options="options.cambio" v-model="gearBox" />
              <TextInput label="Potencia (cv):" v-model="power" />
              <TextInput label="Tamaño (cc):" />
              <TextInput label="Puertas:" v-model="doors" />
              <SelectInput
                label="Distintivo:"
                :options="options.medioambiental"
                v-model="distinctive"
              />
              <DateInput label="Fabricación:" v-model="fabrication" />
              <TextInput label="Matricula Origen:" v-model="licenseOG" />
              <TextInput
                v-if="vehicle.key_locator"
                label="Llave asignada:"
                v-model="key"
                :disabled="true"
              />
              <SelectInput
                v-else
                label="Llave asignada:"
                :options="keysOptions"
                v-model="key"
                @selected="linkKey"
              />
              <TextInput label="Nº llaves:" v-model="keysQ" />
            </div>
            <button class="btn btn-primary mt-4 self-end text-white" @click="updateBasic">
              Guardar
            </button>
          </div>
          <div ref="technical" class="flex scroll-m-20 flex-col gap-4 rounded bg-base-100 p-4">
            <div class="flex flex-row justify-between">
              <h1 class="text-xl font-medium">Información Técnica</h1>
            </div>
            <div class="grid grid-cols-2 gap-x-4 lg:gap-x-10">
              <SelectInput label="Tracción:" :options="driveOptions" v-model="drives" />
              <TextInput label="Marchas:" v-model="gears" />
              <TextInput label="Vel Máxima:" v-model="speed" />
              <TextInput label="Aceleración 0-100:" v-model="acceleration" />
            </div>
            <h2 class="mt-3 p-0 text-lg font-medium">Consumo y emisión</h2>
            <div class="divider m-0 p-0"></div>
            <div class="grid grid-cols-2 gap-x-4 lg:gap-x-10">
              <TextInput label="Consumo en el Ambiente:" v-model="environment" />
              <TextInput label="En carretera:" v-model="road" />
              <TextInput label="En ciudad:" v-model="city" />
              <TextInput label="Emisiones CO2:" v-model="co2" />
            </div>
            <h2 class="mt-3 p-0 text-lg font-medium">Dimensiones</h2>
            <div class="divider m-0 p-0"></div>
            <div class="grid grid-cols-2 gap-x-4 lg:gap-x-10">
              <TextInput label="Longitud:" v-model="length" />
              <TextInput label="Altura:" v-model="height" />
              <TextInput label="Tara:" v-model="tare" />
            </div>
            <button class="btn btn-primary mt-4 self-end text-white" @click="updateTechnical">
              Guardar
            </button>
          </div>
          <div ref="portals" class="flex scroll-m-20 flex-col gap-4 rounded bg-base-100 p-4"></div>
          <div ref="maintenance" class="flex scroll-m-20 flex-col gap-4 rounded bg-base-100 p-4">
            <h1 class="text-xl font-medium">Mantenimiento</h1>
            <div class="grid grid-cols-2 gap-x-4 lg:gap-x-10">
              <TextInput label="Propietarios:" v-model="owners" />
              <DateInput label="Vencimiento ITV:" v-model="itvExp" />
            </div>
            <h2>Libro de revisiones</h2>
            <div class="divider m-0 p-0"></div>
            <button class="btn btn-primary mt-4 self-end text-white" @click="updateTechnical">
              Guardar
            </button>
          </div>
          <div ref="prices" class="flex scroll-m-20 flex-col gap-4 rounded bg-base-100 p-4">
            <h1 class="text-xl font-medium">Mantenimiento</h1>
            <div class="grid grid-cols-2 gap-x-4 lg:gap-x-10">
              <SearchSelect label="Proveedor:" :options="brandOptions" v-model="brand" />
              <SearchSelect label="Comprador:" :options="brandOptions" v-model="brand" />
              <DateInput label="Fecha de compra:" v-model="itvExp" />
              <TextInput label="Precio de compra:" v-model="owners" />
              <SelectInput label="Régimen:" :options="options.categoria" v-model="category" />
            </div>
          </div>
          <div ref="comments" class="flex scroll-m-20 flex-col gap-4 rounded bg-base-100 p-4"></div>
          <div ref="extras" class="flex scroll-m-20 flex-col gap-4 rounded bg-base-100 p-4"></div>
          <div
            ref="discounts"
            class="flex scroll-m-20 flex-col gap-4 rounded bg-base-100 p-4"
          ></div>
        </div>
        <div v-if="tab > 8 && tab < 12">
          <div ref="freeEquip" class="flex scroll-m-20 flex-col gap-4 rounded bg-base-100 p-4">
            <h1 class="text-xl font-medium">Equipamiento</h1>
            <div class="grid grid-cols-2 gap-x-4 lg:gap-x-10">
              <TextInput label="Categoria web:" />
              <TextInput label="Carrocería:" />
              <TextInput label="Marca Web:" />
              <TextInput label="Modelo Web:" />
              <TextInput label="Matricula:" />
              <TextInput label="1º Matriculación:" />
              <TextInput label="1º Matricula:" />
              <TextInput label="Km Actuales:" />
              <TextInput label="Procedencia:" />
            </div>
          </div>
          <div ref="equip" class="flex scroll-m-20 flex-col gap-4 rounded bg-base-100 p-4"></div>
          <div ref="gallery" class="flex flex-col gap-4 rounded bg-base-100 p-4">
            <h2 class="text-xl font-medium">Galería Multimedia</h2>
            <div role="tablist" class="tabs tabs-bordered tabs-md">
              <input type="radio" name="galeria" role="tab" class="tab" aria-label="Galería" />
              <div role="tabpanel" class="tab-content p-4 lg:p-8">
                <div class="grid grid-cols-2 gap-4 lg:grid-cols-3">
                  <div class="skeleton h-28 w-28"></div>
                  <div class="skeleton h-28 w-28"></div>
                  <div class="skeleton h-28 w-28"></div>
                  <div class="skeleton h-28 w-28"></div>
                  <div class="skeleton h-28 w-28"></div>
                  <div class="skeleton h-28 w-28"></div>
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
          </div>
        </div>
      </section>
      <aside class="hidden w-full max-w-md flex-col gap-4 rounded bg-base-100 p-4 lg:flex">
        <h2 class="text-xl font-medium">Galería Multimedia</h2>
        <div role="tablist" class="tabs tabs-bordered tabs-md">
          <input type="radio" name="galeria" role="tab" class="tab" aria-label="Galería" />
          <div role="tabpanel" class="tab-content p-4 lg:p-8">
            <div class="grid grid-cols-2 gap-4 lg:grid-cols-3">
              <div class="skeleton h-28 w-28"></div>
              <div class="skeleton h-28 w-28"></div>
              <div class="skeleton h-28 w-28"></div>
              <div class="skeleton h-28 w-28"></div>
              <div class="skeleton h-28 w-28"></div>
              <div class="skeleton h-28 w-28"></div>
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
  <div v-if="scrollTop" class="btm-nav lg:hidden">
    <button ref="navBtn1" @click="navEvent1" class="active">
      <Icon icon="mdi:car" width="30" />
      <span class="btm-nav-label">I. Admin</span>
    </button>
    <button ref="navBtn2" @click="navEvent2">
      <Icon icon="mdi:webpack" width="30" />
      <span class="btm-nav-label">Port Web</span>
    </button>
    <button ref="navBtn3" @click="navEvent3">
      <Icon icon="mdi:bag-checked" width="30" />
      <span class="btm-nav-label">Equip</span>
    </button>
    <button ref="navBtn4" @click="navEvent4">
      <Icon icon="mdi:performance" width="30" />
      <span class="btm-nav-label">PT</span>
    </button>
    <button ref="navBtn5" @click="navEvent5">
      <Icon icon="mdi:image-multiple" width="30" />
      <span class="btm-nav-label">Galeria</span>
    </button>
  </div>
  <div v-if="scrollDown" class="btm-nav lg:hidden">
    <div>
      <button class="btn w-36" ref="navBtn6" @click="1">
        <span class="btm-nav-label">Cambiar Estado</span>
      </button>
    </div>
    <div>
      <button class="btn btn-warning w-36" ref="navBtn6" @click="1">
        <span class="btm-nav-label">Reservar</span>
      </button>
    </div>
  </div>
</template>
