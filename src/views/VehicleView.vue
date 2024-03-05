<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import axios from 'axios'
import VehicleCard from '@/components/VehicleCard.vue'
import VehicleMobile from '@/components/VehicleMobile.vue'
import { Icon } from '@iconify/vue'

const route = useRoute()
const id = ref(route.params.id)
const url = `${import.meta.env.VITE_VEHICLES}/${id.value}`
const loading = ref(true)
const vehicle = ref({})
const tab = ref(1)
const menu = ref(null)
const navBtn1 = ref(null)
const navBtn2 = ref(null)
const navBtn3 = ref(null)
const navBtn4 = ref(null)
const navBtn5 = ref(null)

const navEvent1 = () => {
  tab.value = 1
  navBtn1.value.classList.add('active')
  navBtn2.value.classList.remove('active')
  navBtn3.value.classList.remove('active')
  navBtn4.value.classList.remove('active')
  navBtn5.value.classList.remove('active')
}

const navEvent2 = () => {
  tab.value = 3
  navBtn1.value.classList.remove('active')
  navBtn2.value.classList.add('active')
  navBtn3.value.classList.remove('active')
  navBtn4.value.classList.remove('active')
  navBtn5.value.classList.remove('active')
}

const navEvent3 = () => {
  tab.value = 9
  navBtn1.value.classList.remove('active')
  navBtn2.value.classList.remove('active')
  navBtn3.value.classList.add('active')
  navBtn4.value.classList.remove('active')
  navBtn5.value.classList.remove('active')
}

const navEvent4 = () => {
  tab.value = 11
  navBtn1.value.classList.remove('active')
  navBtn2.value.classList.remove('active')
  navBtn3.value.classList.remove('active')
  navBtn4.value.classList.add('active')
  navBtn5.value.classList.remove('active')
}

const navEvent5 = () => {
  menu.value.modal.showModal()
  // tab.value = 12
  // navBtn1.value.classList.remove('active')
  // navBtn2.value.classList.remove('active')
  // navBtn3.value.classList.remove('active')
  // navBtn4.value.classList.remove('active')
  // navBtn5.value.classList.add('active')
}

const tabsAdmin = ref([
  {
    id: 1,
    title: 'Información Básica'
  },
  {
    id: 2,
    title: 'Información Técnica'
  },
  {
    id: 3,
    title: 'Portales web'
  },
  {
    id: 4,
    title: 'Historia y mantenimiento'
  },
  {
    id: 5,
    title: 'Precio'
  },
  {
    id: 6,
    title: 'Comentarios'
  },
  {
    id: 7,
    title: 'Extras'
  },
  {
    id: 8,
    title: 'Documentos'
  }
])

const tabsEquip = ref([
  {
    id: 9,
    title: 'Equipamiento sin coste'
  },
  {
    id: 10,
    title: 'Equipamiento con coste'
  }
])

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
  <ModalDialog ref="menu">
    <ul class="menu w-full p-0 [&_li>*]:rounded-none">
      <li><a>Reservar</a></li>
      <div class="divider m-0"></div>
      <li><a>Cambiar Estado</a></li>
      <div class="divider m-0"></div>
    </ul>
  </ModalDialog>
  <HeaderMain>
    <header class="flex flex-col items-center">
      <LoadingSpinner v-if="loading" class="loading-lg" />
      <VehicleCard v-else :vehicle="vehicle" class="hidden lg:flex" />
      <VehicleMobile v-if="!loading" :vehicle="vehicle" class="my-3 lg:hidden" />
      <SelectInput
        v-if="tab > 0 && tab < 9"
        label="Navegación:"
        :options="tabsAdmin"
        v-model="tab"
        @selected="id = $event"
        class="lg:hidden"
      />
      <SelectInput
        v-else-if="tab > 8 && tab < 11"
        label="Navegación:"
        :options="tabsEquip"
        v-model="tab"
        @selected="id = $event"
        class="lg:hidden"
      />
    </header>
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
      </section>
      <aside class="flex w-full max-w-md flex-col gap-4 rounded bg-base-100 p-4">
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
  <div class="btm-nav lg:hidden">
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
      <Icon icon="mdi:interaction-tap" width="30" />
      <span class="btm-nav-label">Acciones</span>
    </button>
  </div>
</template>

<style scoped></style>
