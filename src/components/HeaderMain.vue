<script setup>
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import NavBar from '@/components/NavBar.vue'
import axios from 'axios'

axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('token')}`

const drawer = ref(false)
const toggleDrawer = () => {
  drawer.value = !drawer.value
}
</script>

<template>
  <div class="drawer bg-base-200">
    <input id="drawer" type="checkbox" class="drawer-toggle" v-model="drawer" />
    <div class="drawer-content flex flex-col">
      <!-- Navbar -->
      <header class="sticky top-0 z-20">
        <NavBar />
      </header>
      <!-- Page content here -->
      <main class="min-h-[90vh] w-[98vw]">
        <slot />
      </main>
    </div>
    <div class="drawer-side z-50">
      <label for="drawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <div class="menu min-h-full w-screen bg-white p-4 text-lg font-medium lg:w-80">
        <!-- Sidebar content here -->
        <DrawerLogo @toggle="toggleDrawer">
          <img
            class="w-60 pb-4 active:!bg-white"
            src="https://garageclub.es/static/img/logo_black.svg"
            alt="logo"
          />
        </DrawerLogo>
        <DrawerLink label="Vehículos" href="/vehiculos" :toggleDrawer="toggleDrawer">
          <Icon icon="mdi:car" />
        </DrawerLink>
        <DrawerLink label="Reservas" href="/reservas" :toggleDrawer="toggleDrawer">
          <Icon icon="mdi:book" />
        </DrawerLink>
        <DrawerLink label="Tasaciones" href="/tasaciones" :toggleDrawer="toggleDrawer">
          <Icon icon="mdi:attach-money" />
        </DrawerLink>
      </div>
    </div>
  </div>
</template>
