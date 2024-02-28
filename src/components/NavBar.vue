<script setup>
import axios from 'axios'
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import router from '@/router'
import { interes, ajuste } from '@/js/filterOptions.js'

axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('token')}`

const drawer = ref(false)
const toggleDrawer = () => {
  drawer.value = !drawer.value
}
const logout = () => {
  localStorage.removeItem('token')
  router.push('/')
}
const url = `${import.meta.env.VITE_USER}/${localStorage.getItem('userid')}`
const data = ref([])
axios.get(url).then((response) => {
  data.value = response.data
})
</script>

<template>
  <div class="drawer drawer-end">
    <input id="riDrawer" type="checkbox" class="drawer-toggle" v-model="drawer" />
    <div class="drawer-content">
      <!-- Page content here -->
      <div class="navbar bg-black">
        <div class="navbar-start">
          <label
            for="drawer"
            aria-label="open sidebar"
            class="btn btn-square btn-ghost text-white lg:hidden"
          >
            <Icon icon="mdi:menu" width="30" />
          </label>
          <div>
            <RouterLink to="/vehiculos" class="btn btn-ghost px-0 text-xl text-white">
              <img
                class="ml-2 w-8"
                src="https://intranet-pre.garageclub.es/static/images/brand/favicon-blanco-xs.png"
                alt="logo"
              />
            </RouterLink>
          </div>
          <ul class="menu menu-horizontal hidden gap-2 text-white lg:flex">
            <NavLink label="Vehículos" href="/vehiculos" />
            <NavLink label="Reservas" href="/reservas" />
            <NavLink label="Tasaciones" href="/tasaciones" />
          </ul>
        </div>

        <div class="navbar-end">
          <DropdownAvatar>
            <template #btn>
              <div class="w-10 rounded-full">
                <img
                  alt="Avatar"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </template>
            <template #content>
              <div class="avatar flex items-center">
                <div class="w-10 rounded-full">
                  <img
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
                <p class="pl-2 text-center text-xs text-gray-500">{{ data.email }}</p>
              </div>
              <div class="divider m-0 p-0"></div>
              <li>
                <a> <Icon icon="mdi:user" /> Mi Perfil </a>
              </li>
              <li>
                <a @click="logout"> <Icon icon="mdi:logout" /> Cerrar sesión </a>
              </li>
            </template>
          </DropdownAvatar>
          <DropdownBtn>
            <template #btn>
              <div tabindex="0" role="button" class="btn btn-circle btn-ghost">
                <Icon icon="mdi:settings" color="white" width="30" />
              </div>
            </template>
            <template #content>
              <li class="menu-title flex-row items-center gap-1">
                <Icon icon="mdi:settings" />General
              </li>
              <MenuLink label="Usuarios" href="/usuarios" />
              <MenuLink label="Descuentos" href="/descuentos" />
              <li>
                <label for="riDrawer" aria-label="open sidebar"> Financiación </label>
              </li>
              <li class="menu-title flex-row items-center gap-1">
                <Icon icon="mdi:settings" />Gestión de extras
              </li>
              <MenuLink label="Tipos de garantías" href="/garantias" />
              <MenuLink label="Modos de entrega" href="/entregas" />
              <MenuLink label="Gestión de documentos" href="/documentos" />
              <MenuLink label="Extras" href="/extras" />
              <li class="menu-title flex-row items-center gap-1">
                <Icon icon="mdi:settings" />Integraciones
              </li>
              <MenuLink label="Portales Web" href="/integraciones" />
            </template>
          </DropdownBtn>
        </div>
      </div>
    </div>
    <div class="drawer-side z-10">
      <label for="riDrawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu min-h-full w-80 justify-between bg-white p-4 text-base-content">
        <!-- Sidebar content here -->
        <div>
          <DrawerTitle title="Añadir Ajuste Financiero" @toggle="toggleDrawer" />
          <SelectInput label="Interés:" :options="interes" />
          <SelectInput label="Tipo de Ajuste:" :options="ajuste" />
        </div>
        <DrawerActions :toggleDrawer="toggleDrawer" primary="Guardar" secondary="Cancelar" />
      </ul>
    </div>
  </div>
</template>
