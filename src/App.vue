<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { Icon } from '@iconify/vue'
</script>

<template>
  <div class="drawer">
    <input id="drawer" type="checkbox" class="drawer-toggle" v-model="drawer" />
    <div class="drawer-content flex flex-col">
      <!-- Navbar -->
      <header>
        <div class="navbar bg-black">
          <div class="navbar-start">
            <label
              for="drawer"
              aria-label="open sidebar"
              class="btn btn-square btn-ghost text-white lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="inline-block h-6 w-6 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
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
            <ul class="menu menu-horizontal gap-2 text-white">
              <li>
                <RouterLink
                  to="/"
                  class="border-b-2 border-black font-medium hover:bg-white hover:text-black focus:border-white focus:text-white hover:focus:text-black"
                >
                  Vehículos
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to="/about"
                  class="border-b-2 border-black font-medium hover:bg-white hover:text-black focus:border-white focus:text-white hover:focus:text-black"
                >
                  Reservas
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to="/"
                  class="border-b-2 border-black font-medium hover:bg-white hover:text-black focus:border-white focus:text-white hover:focus:text-black"
                >
                  Tasaciones
                </RouterLink>
              </li>
            </ul>
          </div>

          <div class="navbar-end">
            <div class="dropdown dropdown-end">
              <div tabindex="0" role="button" class="avatar btn btn-circle btn-ghost">
                <div class="w-10 rounded-full">
                  <img
                    alt="Avatar"
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
              <ul
                tabindex="0"
                class="menu dropdown-content menu-sm z-[1] mt-3 min-w-56 rounded-box bg-base-100 p-2 font-medium shadow"
              >
                <div class="avatar flex items-center">
                  <div class="w-10 rounded-full">
                    <img
                      src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    />
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
              </ul>
            </div>
            <div class="dropdown dropdown-end">
              <div tabindex="0" role="button" class="btn btn-circle btn-ghost">
                <div class="w-10 rounded-full">
                  <Icon icon="mdi:settings" color="white" width="30" />
                </div>
              </div>
              <ul
                tabindex="0"
                class="menu dropdown-content menu-sm z-[1] mt-3 min-w-56 rounded-box bg-base-100 p-2 font-medium shadow"
              >
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
              </ul>
            </div>
          </div>
        </div>
      </header>
      <!-- Page content here -->
      <main>
        <RouterView />
      </main>
    </div>
    <div class="drawer-side">
      <label for="drawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu min-h-full w-80 bg-white p-4 text-lg font-medium">
        <!-- Sidebar content here -->
        <li class="disabled focus:bg-white">
          <img
            class="w-60 pb-4 active:!bg-white"
            src="https://garageclub.es/static/img/logo_black.svg"
            alt="logo"
          />
        </li>
        <li @click="toggleDrawer">
          <RouterLink to="/" class="font-medium hover:bg-white hover:text-black focus:border-white">
            <Icon icon="mdi:car" />
            Vehículos
          </RouterLink>
        </li>
        <li @click="toggleDrawer">
          <RouterLink
            to="/about"
            class="font-medium hover:bg-white hover:text-black focus:border-white"
          >
            <Icon icon="mdi:book" />
            Reservas
          </RouterLink>
        </li>
        <li @click="toggleDrawer">
          <RouterLink to="/" class="font-medium hover:bg-white hover:text-black focus:border-white">
            <Icon icon="mdi:attach-money" />
            Tasaciones
          </RouterLink>
        </li>
      </ul>
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
