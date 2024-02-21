<script setup>
import { RouterView } from 'vue-router'
import { Icon } from '@iconify/vue'
import NavBar from './components/NavBar.vue'
import DrawerLink from './components/DrawerLink.vue'
import DrawerLogo from './components/DrawerLogo.vue'
</script>

<template>
  <div class="drawer">
    <input id="drawer" type="checkbox" class="drawer-toggle" v-model="drawer" />
    <div class="drawer-content flex flex-col">
      <!-- Navbar -->
      <header>
        <NavBar />
      </header>
      <!-- Page content here -->
      <main>
        <RouterView />
      </main>
    </div>
    <div class="drawer-side">
      <label for="drawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <div class="menu min-h-full w-screen bg-white p-4 text-lg font-medium lg:w-80">
        <!-- Sidebar content here -->
        <DrawerLogo>
          <img
            class="w-60 pb-4 active:!bg-white"
            src="https://garageclub.es/static/img/logo_black.svg"
            alt="logo"
          />
        </DrawerLogo>
        <DrawerLink label="Vehículos" href="/" :toggleDrawer="toggleDrawer">
          <Icon icon="mdi:car" />
        </DrawerLink>
        <DrawerLink label="Reservas" href="/about" :toggleDrawer="toggleDrawer">
          <Icon icon="mdi:book" />
        </DrawerLink>
        <DrawerLink label="Tasaciones" href="/" :toggleDrawer="toggleDrawer">
          <Icon icon="mdi:attach-money" />
        </DrawerLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {
      drawer: false
    }
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer
    }
  }
}
</script>
