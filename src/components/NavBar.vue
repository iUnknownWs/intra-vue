<script setup>
import { Icon } from '@iconify/vue'
import NavLink from './NavLink.vue'
import DropdownAvatar from './DropdownAvatar.vue'
import DropdownBtn from './DropdownBtn.vue'
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
        <RouterLink to="/" class="btn btn-ghost px-0 text-xl text-white">
          <img
            class="ml-2 w-8"
            src="https://intranet-pre.garageclub.es/static/images/brand/favicon-blanco-xs.png"
            alt="logo"
          />
        </RouterLink>
      </div>
      <ul class="menu menu-horizontal hidden gap-2 text-white lg:flex">
        <NavLink label="Vehículos" href="/" />
        <NavLink label="Reservas" href="/about" />
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
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
            <p class="pl-2 text-center text-xs text-gray-500">willders.carvajal@gmail.com</p>
          </div>
          <div class="divider m-0 p-0"></div>
          <li>
            <a> <Icon icon="mdi:user" /> Mi Perfil </a>
          </li>
          <li>
            <a> <Icon icon="mdi:logout" /> Cerrar Sesión </a>
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
          <li><a>General</a></li>
          <li><a>Usuarios</a></li>
          <li><a>Descuentos</a></li>
          <li><a>Financiación</a></li>
          <li class="menu-title flex-row items-center gap-1">
            <Icon icon="mdi:settings" />Gestión de extras
          </li>
          <li><a>Tipos de garantía</a></li>
          <li><a>Modos de Entrega</a></li>
          <li><a>Gestión documental</a></li>
          <li><a>Varios</a></li>
          <li class="menu-title flex-row items-center gap-1">
            <Icon icon="mdi:settings" />Integraciones
          </li>
          <li><a>Portales Web</a></li>
        </template>
      </DropdownBtn>
    </div>
  </div>
</template>
