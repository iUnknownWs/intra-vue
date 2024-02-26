<script setup>
import { Icon } from '@iconify/vue'
import { ref, onMounted } from 'vue'
import TextIcon from '@/components/TextIcon.vue'
import DrawerTitle from '@/components/DrawerTitle.vue'
import DropdownBtn from '@/components/DropdownBtn.vue'
import SelectTab from '@/components/SelectTab.vue'
import SelectInput from '@/components/SelectInput.vue'
import HeaderMain from '@/components/HeaderMain.vue'
import CheckInput from '@/components/CheckInput.vue'
import CardDesktop from '@/components/CardDesktop.vue'
import CardMobile from '@/components/CardMobile.vue'
import TextInput from '@/components/TextInput.vue'
import DrawerActions from '@/components/DrawerActions.vue'
import RangeSelect from '@/components/RangeSelect.vue'
import RangeInputN from '@/components/RangeInputN.vue'
import axios from 'axios'

axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('token')}`

const url = `${import.meta.env.VITE_VEHICLES}/`
const vehicles = ref([])
const vehiclesFilter = ref([])

const params = ref('')
const urlParams = ref('')
const refresh = ref(0)
const tab = ref('0')

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
  refresh.value++
}

onMounted(() => {
  selected()
})

const all = () => {
  axios.get(url).then((response) => {
    vehiclesFilter.value = response.data.results
  })
}

const pr = () => {
  params.value = 'status=0'
  urlParams.value = url + '?' + params.value
  axios.get(urlParams.value).then((response) => {
    vehiclesFilter.value = response.data.results
  })
}

const ppt = () => {
  params.value = 'ppt=true'
  urlParams.value = url + '?' + params.value
  axios.get(urlParams.value).then((response) => {
    vehiclesFilter.value = response.data.results
  })
}

const vpt = () => {
  params.value = 'vpt=true'
  urlParams.value = url + '?' + params.value
  axios.get(urlParams.value).then((response) => {
    vehiclesFilter.value = response.data.results
  })
}

const pp = () => {
  params.value = 'status=3'
  urlParams.value = url + '?' + params.value
  axios.get(urlParams.value).then((response) => {
    vehiclesFilter.value = response.data.results
  })
}

const venta = () => {
  params.value = 'status=4'
  urlParams.value = url + '?' + params.value
  axios.get(urlParams.value).then((response) => {
    vehiclesFilter.value = response.data.results
  })
}

const reserva = () => {
  params.value = 'status=5'
  urlParams.value = url + '?' + params.value
  axios.get(urlParams.value).then((response) => {
    vehiclesFilter.value = response.data.results
  })
}

const web = () => {
  params.value = 'no_web=true'
  urlParams.value = url + '?' + params.value
  axios.get(urlParams.value).then((response) => {
    vehiclesFilter.value = response.data.results
  })
}

const entrega = () => {
  params.value = 'inmediate_delivery=true'
  urlParams.value = url + '?' + params.value
  axios.get(urlParams.value).then((response) => {
    vehiclesFilter.value = response.data.results
  })
}

const na = () => {
  params.value = 'status=10'
  urlParams.value = url + '?' + params.value
  axios.get(urlParams.value).then((response) => {
    vehiclesFilter.value = response.data.results
  })
}

axios.get(url).then((response) => {
  vehicles.value = response.data.results
})

const combustible = [
  {
    value: '0',
    label: 'Diesel'
  },
  {
    value: '1',
    label: 'Eléctrico'
  },
  {
    value: '2',
    label: 'Gasolina'
  },
  {
    value: '3',
    label: 'Hidrógeno'
  },
  {
    value: '4',
    label: 'Gasolina/gas'
  },
  {
    value: '5',
    label: 'Híbrido'
  }
]

const cambio = [
  {
    value: '0',
    label: 'Manual'
  },
  {
    value: '1',
    label: 'Automático'
  }
]

const vehiculo = [
  {
    value: '0',
    label: 'Turismo'
  },
  {
    value: '1',
    label: 'Todo terreno'
  },
  {
    value: '2',
    label: 'Vehículo industrial'
  }
]

const categoria = [
  {
    value: '0',
    label: 'Aventura'
  },
  {
    value: '1',
    label: 'Clásico'
  },
  {
    value: '2',
    label: 'Sport'
  },
  {
    value: '3',
    label: 'Urbano'
  }
]

const medioambiental = [
  {
    value: '0',
    label: '0'
  },
  {
    value: '1',
    label: 'ECO'
  },
  {
    value: '2',
    label: 'B'
  },
  {
    value: '3',
    label: 'C'
  },
  {
    value: '4',
    label: 'ND'
  }
]

const estado = [
  {
    value: '0',
    label: 'Pendiente de recepción'
  },
  {
    value: '1',
    label: 'Pendiente de publicación'
  },
  {
    value: '2',
    label: 'En venta'
  },
  {
    value: '3',
    label: 'Reservado'
  },
  {
    value: '4',
    label: 'Entregado'
  },
  {
    value: '5',
    label: 'No disponible'
  }
]

const etiqueta = [
  {
    value: '0',
    label: 'Cabrio'
  },
  {
    value: '1',
    label: 'Furgoneta'
  },
  {
    value: '2',
    label: 'Deportivo'
  },
  {
    value: '3',
    label: 'No web'
  },
  {
    value: '4',
    label: 'Weekly news'
  }
]
</script>

<template>
  <HeaderMain>
    <div class="drawer drawer-end">
      <input v-model="toggleDrawer" id="filterDrawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content">
        <!-- Page content here -->
        <header class="flex flex-row items-center justify-between">
          <TextIcon class="max-w-xs lg:ml-4" placeholder="Buscar">
            <Icon icon="mdi:magnify" />
          </TextIcon>
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
            <RangeSelect label="Año:" :from="reverseYears" :to="years" />
            <RangeInputN label="Precio:" :max="200000" />
            <RangeInputN label="KMs:" :max="200000" />
            <SelectInput label="Combustible:" :options="combustible" />
            <SelectInput label="Tipo de Cambio:" :options="cambio" />
            <SelectInput label="Tipo de Vehículo:" :options="vehiculo" />
            <SelectInput label="Categoría web:" :options="categoria" />
            <SelectInput label="Etiqueta medioambiental:" :options="medioambiental" />
            <SelectInput label="Estado:" :options="estado" />
            <SelectInput label="Procedencia:" :options="procedencia" />
            <SelectInput label="Etiquetas:" :options="etiqueta" />
            <SelectInput label="Compradores:" :options="compradores" />
            <CheckInput label="ITV Vigente:" />
            <CheckInput label="Pendiente ITV:" />
            <CheckInput label="Pendiente Video:" />
            <li class="mt-8 flex flex-row justify-around">
              <button class="btn btn-outline w-28">
                <Icon icon="mdi:arrow-u-left-top" />
                Reset
              </button>
              <button class="btn btn-primary w-24 text-white">
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
            <div>
              <CardDesktop
                v-for="(vehicle, index) in vehiclesFilter"
                :key="index"
                :placa="vehicle.license_plate || 'No disponible'"
                :modelo="vehicle.model.title || 'No disponible'"
                :marca="vehicle.model.brand.title || 'No disponible'"
                :version="vehicle.version.title || 'No disponible'"
                :estado="vehicle.status || 2"
                :contado="vehicle.price?.price_with_discounts || 0"
                :financiado="vehicle.price?.financed_price || '0'"
                :quotes="vehicle.price?.financing_fee || '0'"
                :stock="vehicle.days_in_stock || 0"
                :img="
                  vehicle.image ||
                  'https://intranet-pre.garageclub.es/static/images/brand/favicon.png'
                "
                :combustible="vehicle.fuel.description || 'No disponible'"
                :año="vehicle.year || 0"
                :cambios="vehicle.gear_box.description || 'No disponible'"
                :leads="vehicle.key_locator || 0"
                :kms="vehicle.kms || 0"
              />
            </div>
          </div>
        </div>
        <div class="mt-4 flex flex-col items-center justify-center lg:hidden" :key="refresh">
          <CardMobile
            v-for="(vehicle, index) in vehiclesFilter"
            :key="index"
            :placa="vehicle.license_plate"
            :modelo="vehicle.model.title"
            :marca="vehicle.model.brand.title"
            :version="vehicle.version.title"
            :contado="vehicle.price?.price_with_discounts"
            :financiado="vehicle.price?.financed_price"
            :quotes="vehicle.price?.financing_fee"
            :estado="vehicle.status"
            :stock="vehicle.days_in_stock"
            :img="vehicle?.image"
            :combustible="vehicle.fuel.description"
            :año="vehicle.year"
            :cambios="vehicle.gear_box?.description"
            :kms="vehicle.kms"
            :leads="vehicle.key_locator"
          />
        </div>
      </div>
      <div class="drawer-side">
        <label for="filterDrawer" aria-label="close sidebar" class="drawer-overlay"></label>
        <ul
          v-if="drawer === 'filter'"
          class="menu min-h-full w-screen bg-white p-4 text-base-content lg:w-[50vw]"
        >
          <!-- Sidebar content here -->
          <DrawerTitle title="Filtros" :toggleDrawer="toggleFilterDrawer" />
          <RangeSelect label="Año:" :from="reverseYears" :to="years" />
          <RangeInputN label="Precio:" :max="200000" />
          <RangeInputN label="KMs:" :max="200000" />
          <SelectInput label="Combustible:" />
          <SelectInput label="Tipo de Cambio:" />
          <SelectInput label="Tipo de Vehículo:" />
          <SelectInput label="Categoría web:" />
          <SelectInput label="Etiqueta medioambiental:" />
          <SelectInput label="Estado:" />
          <SelectInput label="Procedencia:" />
          <SelectInput label="Etiquetas:" />
          <SelectInput label="Compradores:" />
          <CheckInput label="ITV Vigente:" />
          <CheckInput label="Pendiente ITV:" />
          <CheckInput label="Pendiente Video:" />
          <DrawerActions :toggleDrawer="toggleFilterDrawer" secondary="Reset" primary="Filtrar" />
        </ul>
        <ul
          v-if="drawer === 'auto'"
          class="menu min-h-full w-screen justify-between bg-white p-4 text-base-content lg:w-[50vw]"
        >
          <!-- Sidebar content here -->
          <div>
            <DrawerTitle title="Nuevo Vehículo Automático" :toggleDrawer="toggleFilterDrawer" />
            <TextInput label="VIN:" placeholder="Introducir VIN" />
          </div>
          <DrawerActions :toggleDrawer="toggleFilterDrawer" secondary="Cancelar" primary="Añadir" />
        </ul>
        <ul
          v-if="drawer === 'semi'"
          class="menu min-h-full w-screen justify-between bg-white p-4 text-base-content lg:w-[50vw]"
        >
          <!-- Sidebar content here -->
          <div class="flex flex-col">
            <DrawerTitle
              title="Nuevo Vehículo Semi-Automático"
              :toggleDrawer="toggleFilterDrawer"
            />
            <TextInput label="Marca:" placeholder="Introducir Marca" />
            <TextInput label="Carrocería:" placeholder="Introducir Carrocería" />
            <div class="mt-3 flex flex-row justify-end">
              <button class="btn btn-primary text-white">Buscar</button>
            </div>
            <TextInput label="Modelo:" placeholder="Introducir" disabled="true" />
            <div class="mt-3 flex flex-row justify-end">
              <button class="btn btn-primary text-white">Buscar</button>
            </div>
            <TextInput label="Version:" placeholder="Introducir" disabled="true" />
          </div>
          <DrawerActions :toggleDrawer="toggleFilterDrawer" secondary="Cancelar" primary="Añadir" />
        </ul>
        <ul
          v-if="drawer === 'manual'"
          class="menu min-h-full w-screen justify-between bg-white p-4 text-base-content lg:w-[50vw]"
        >
          <!-- Sidebar content here -->
          <div>
            <DrawerTitle title="Nuevo Vehículo Manual" :toggleDrawer="toggleFilterDrawer" />
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
          <DrawerActions :toggleDrawer="toggleFilterDrawer" secondary="Cancelar" primary="Añadir" />
        </ul>
      </div>
    </div>
  </HeaderMain>
</template>

<script>
const currentYear = new Date().getFullYear()
const years = Array.from({ length: currentYear - 1969 }, (_, i) => currentYear - i)
const reverseYears = Array.from({ length: currentYear - 1969 }, (_, i) => currentYear - i).reverse()
export default {
  name: 'HomeView',
  components: {},
  data() {
    return {
      drawer: '',
      toggleDrawer: false
    }
  },
  methods: {
    toggleFilterDrawer() {
      this.toggleDrawer = !this.toggleDrawer
    },
    filterDrawer() {
      this.drawer = 'filter'
    },
    autoDrawer() {
      this.drawer = 'auto'
    },
    semiDrawer() {
      this.drawer = 'semi'
    },
    manualDrawer() {
      this.drawer = 'manual'
    }
  }
}
</script>

<style>
.test {
  display: flex;
}
.badge {
  font-weight: 600;
  color: #fff;
}
.textcard {
  font-size: 0.65rem;
  line-height: 0.75rem;
}
</style>
