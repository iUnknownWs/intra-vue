<script setup>
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
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
const url = `${import.meta.env.VITE_VEHICLES}`
const vehicles = ref([])
axios.get(url).then((response) => {
  vehicles.value = response.data.results
})
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
          <SelectTab label="Pestaña:" />
        </div>
        <div class="hidden flex-row items-start lg:flex">
          <div class="my-4 ml-4 min-h-full w-80 bg-white text-base-content">
            <div class="menu-title flex flex-row justify-between">Filtros</div>
            <div class="divider m-0"></div>
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
          <div
            role="tablist"
            class="tabs tabs-bordered ml-20 mt-8 hidden justify-items-start bg-white font-medium lg:grid"
          >
            <input type="radio" name="class" role="tab" class="tab" aria-label="Todos" checked />
            <div role="tabpanel" class="tab-content pt-2">
              <CardDesktop
                v-for="(vehicle, index) in vehicles"
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
                :img="vehicle.image"
                :combustible="vehicle.fuel.description"
                :año="vehicle.year"
                :cambios="vehicle.gear_box.description"
                :kms="vehicle.kms"
                :leads="vehicle.key_locator"
              />
            </div>
            <input type="radio" name="class" role="tab" class="tab" aria-label="Recepción" />
            <div role="tabpanel" class="tab-content pt-2">Tab content 2</div>
            <input type="radio" name="class" role="tab" class="tab" aria-label="Publicación" />
            <div role="tabpanel" class="tab-content pt-2">Tab content 3</div>
            <input type="radio" name="class" role="tab" class="tab" aria-label="En venta" />
            <div role="tabpanel" class="tab-content pt-2">Tab content 4</div>
            <input type="radio" name="class" role="tab" class="tab" aria-label="Reservados" />
            <div role="tabpanel" class="tab-content pt-2">Tab content 5</div>
            <input type="radio" name="class" role="tab" class="tab" aria-label="Pte. de PT" />
            <div role="tabpanel" class="tab-content pt-2">Tab content 6</div>
            <input type="radio" name="class" role="tab" class="tab" aria-label="Validar PT" />
            <div role="tabpanel" class="tab-content pt-2">Tab content 7</div>
            <input type="radio" name="class" role="tab" class="tab" aria-label="No web" />
            <div role="tabpanel" class="tab-content pt-2">Tab content 8</div>
            <input
              type="radio"
              name="class"
              role="tab"
              class="tab"
              aria-label="Entrega inmediata"
            />
            <div role="tabpanel" class="tab-content pt-2">Tab content 9</div>
            <input type="radio" name="class" role="tab" class="tab" aria-label="No disponible" />
            <div role="tabpanel" class="tab-content pt-2">Tab content 10</div>
          </div>
        </div>
        <div class="mt-4 flex flex-col items-center justify-center lg:hidden">
          <CardMobile
            v-for="(vehicle, index) in vehicles"
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
            :img="vehicle.image"
            :combustible="vehicle.fuel.description"
            :año="vehicle.year"
            :cambios="vehicle.gear_box.description"
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
