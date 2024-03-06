<script setup>
import { Icon } from '@iconify/vue'
import { useRoute } from 'vue-router'
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
const categoria = ref('0')
const chassis = ref('')
const bodyOptions = ref([])
const brandOptions = ref([])
const webBrandOptions = ref([])
const body = ref('')
const brand = ref({ id: '', label: '' })
const webBrand = ref({ id: '', label: '' })
const model = ref({ id: '', label: '' })
const license = ref('')
const license1 = ref('')
const kms = ref(0)
const fuel = ref('0')
const gearBox = ref('0')
const power = ref(0)
const doors = ref(0)
const distinctive = ref('0')
const licenseOG = ref('')
const keysQ = ref(0)

axios
  .get(url)
  .then((response) => {
    vehicle.value = response.data
  })
  .then(() => {
    loading.value = false
    chassis.value = vehicle.value.chassis_number
    brand.value = { id: vehicle.value.model.brand.id, label: vehicle.value.model.brand.title }
    webBrand.value = { id: vehicle.value.brand_web.id, label: vehicle.value.brand_web.title }
    license.value = vehicle.value.license_plate
    license1.value = vehicle.value.date_first_registration
    kms.value = vehicle.value.kms
    fuel.value = vehicle.value.fuel.id
    gearBox.value = vehicle.value.gear_box.id
    power.value = vehicle.value.power
    doors.value = vehicle.value.doors
    distinctive.value = vehicle.value.maintenance.distinctive
    licenseOG.value = vehicle.value.original_license_plate
    keysQ.value = vehicle.value.maintenance.keys_quantity
  })
  .then(() => {
    axios
      .get(`https://intranet-pre.garageclub.es/get-models-web/?brand=${webBrand.value.id}`)
      .then((response) => {
        console.log(response.data)
        for (let option of response.data.results) {
          webBrandOptions.value.push({
            id: option.id,
            label: option.title
          })
        }
      })
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
  })

axios.get(bodyUrl).then((response) => {
  bodyOptions.value = response.data.results
})

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

const tabEvent1 = () => {
  tab.value = 1
  for (let tab of tabs) {
    tab.value.classList.remove('tab-active')
  }
  tab1.value.classList.add('tab-active')
}

const tabEvent2 = () => {
  tab.value = 2
  for (let tab of tabs) {
    tab.value.classList.remove('tab-active')
  }
  tab2.value.classList.add('tab-active')
}

const tabEvent3 = () => {
  tab.value = 3
  for (let tab of tabs) {
    tab.value.classList.remove('tab-active')
  }
  tab3.value.classList.add('tab-active')
}

const tabEvent4 = () => {
  tab.value = 4
  for (let tab of tabs) {
    tab.value.classList.remove('tab-active')
  }
  tab4.value.classList.add('tab-active')
}

const tabEvent5 = () => {
  tab.value = 5
  for (let tab of tabs) {
    tab.value.classList.remove('tab-active')
  }
  tab5.value.classList.add('tab-active')
}

const tabEvent6 = () => {
  tab.value = 6
  for (let tab of tabs) {
    tab.value.classList.remove('tab-active')
  }
  tab6.value.classList.add('tab-active')
}

const tabEvent7 = () => {
  tab.value = 7
  for (let tab of tabs) {
    tab.value.classList.remove('tab-active')
  }
  tab7.value.classList.add('tab-active')
}

const tabEvent8 = () => {
  tab.value = 8
  for (let tab of tabs) {
    tab.value.classList.remove('tab-active')
  }
  tab8.value.classList.add('tab-active')
}

const tabEvent9 = () => {
  tab.value = 9
  for (let tab of tabs2) {
    tab.value.classList.remove('tab-active')
  }
  tab9.value.classList.add('tab-active')
}

const tabEvent10 = () => {
  tab.value = 10
  for (let tab of tabs2) {
    tab.value.classList.remove('tab-active')
  }
  tab10.value.classList.add('tab-active')
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
      class="tabs tabs-bordered sticky top-0 overflow-x-scroll text-nowrap px-4 lg:hidden"
    >
      <a ref="tab1" role="tab" class="tab tab-active" @click="tabEvent1">Información Básica</a>
      <a ref="tab2" role="tab" class="tab" @click="tabEvent2">Información Técnica</a>
      <a ref="tab3" role="tab" class="tab" @click="tabEvent3">Portales web</a>
      <a ref="tab4" role="tab" class="tab" @click="tabEvent4">Historia y Mantenimiento</a>
      <a ref="tab5" role="tab" class="tab" @click="tabEvent5">Precio</a>
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
      <aside class="hidden h-min max-w-64 rounded bg-base-100 lg:block">
        <ul class="menu menu-sm w-56 rounded-box bg-base-100">
          <li>
            <a class="font-bold" @click="tab = 1">Admin</a>
            <ul>
              <li><a @click="tab = 1">Información Básica</a></li>
              <li><a @click="tab = 2">Información Técnica</a></li>
              <li><a @click="tab = 3">Portales web</a></li>
              <li><a @click="tab = 4">Historia y Mantenimiento</a></li>
              <li><a @click="tab = 5">Precio</a></li>
              <li><a @click="tab = 6">Comentarios</a></li>
              <li><a @click="tab = 7">Extras</a></li>
              <li><a @click="tab = 8">Descuentos</a></li>
            </ul>
          </li>
          <li>
            <a class="font-bold" @click="tab = 9">Equipamiento</a>
            <ul>
              <li><a @click="tab = 9">Equipamiento sin coste</a></li>
              <li><a @click="tab = 10">Equipamiento con coste</a></li>
            </ul>
          </li>
          <li><a class="font-bold" @click="tab = 11">PT</a></li>
        </ul>
      </aside>
      <section class="flex w-full flex-col gap-4 rounded bg-base-100 p-4">
        <div v-if="tab > 0 && tab < 9">
          <h1 class="text-xl font-medium">Información Básica</h1>
          <div class="grid grid-cols-2 gap-x-4 lg:gap-x-10">
            <SelectInput v-model="categoria" :options="options.categoria" label="Categoria web:" />
            <SelectInput label="Carrocería:" :options="bodyOptions" v-model="body" />
            <SearchSelect label="Marca:" :options="brandOptions" v-model="brand" />
            <SearchSelect label="Marca web:" :options="webBrandOptions" v-model="webBrand" />
            <SearchSelect label="Modelo:" :options="webBrandOptions" v-model="model" />
            <TextInput label="Modelo web:" />
            <TextInput v-model="chassis" label="Bastidor:" />
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
            <TextInput label="Fabricación:" />
            <TextInput label="Matricula Origen:" v-model="licenseOG" />
            <TextInput label="Nº llaves:" v-model="keysQ" />
          </div>
        </div>
        <div v-if="tab > 8 && tab < 12">
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
        <div v-if="tab === 12">
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

<style scoped></style>
