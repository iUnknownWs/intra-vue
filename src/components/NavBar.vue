<script setup>
import axios from 'axios'
import { Icon } from '@iconify/vue'
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
import router from '@/router'

axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('token')}`

const userStore = useUserStore()

const logout = () => {
  localStorage.removeItem('token')
  router.push('/')
}

const image = ref('/src/assets/img/R.png')
if (localStorage.getItem('image')) {
  image.value = localStorage.getItem('image')
}
</script>

<template>
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
            <img v-if="userStore.image" :src="userStore.image" />
            <img v-else alt="Avatar" :src="image" />
          </div>
        </template>
        <template #content>
          <div class="avatar flex items-center">
            <div class="w-10 rounded-full">
              <img v-if="userStore.image" alt="Avatar" :src="userStore.image" />
              <img v-else alt="Avatar" :src="image" />
            </div>
            <p class="pl-2 text-center text-xs text-gray-500">{{ userStore.email }}</p>
          </div>
          <div class="divider m-0 p-0"></div>
          <li>
            <RouterLink to="/perfil"> <Icon icon="mdi:user" /> Mi Perfil </RouterLink>
          </li>
          <li>
            <a @click="logout"> <Icon icon="mdi:logout" /> Cerrar sesión </a>
          </li>
        </template>
      </DropdownAvatar>
      <DropdownBtn>
        <template #btn>
          <div tabindex="0" role="button" class="btn btn-circle btn-ghost">
            <Icon icon="heroicons:cog-8-tooth" color="white" width="30" />
          </div>
        </template>
        <template #content>
          <li class="menu-title flex-row items-center gap-1">
            <Icon icon="mdi:settings" />General
          </li>
          <MenuLink label="Usuarios" href="/usuarios" />
          <MenuLink label="Descuentos" href="/descuentos" />
          <MenuLink label="Descuentos automáticos" href="/descuentos-automaticos" />
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
          <MenuLink label="Integraciones" href="/integraciones" />
        </template>
      </DropdownBtn>
    </div>
  </div>
</template>
