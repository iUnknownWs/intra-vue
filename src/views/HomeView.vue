<script setup>
import { Icon } from '@iconify/vue'
</script>

<template>
  <div class="drawer drawer-end">
    <input v-model="toggleDrawer" id="filterDrawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <!-- Page content here -->
      <header class="flex flex-row items-center justify-between">
        <label class="input input-bordered flex w-52 items-center gap-2 lg:w-96">
          <input type="text" class="grow" placeholder="Buscar" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="h-4 w-4 opacity-70"
          >
            <path
              fill-rule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clip-rule="evenodd"
            />
          </svg>
        </label>
        <div class="flex gap-2">
          <label
            for="filterDrawer"
            @click="filterDrawer"
            class="btn btn-outline text-black lg:hidden"
          >
            <Icon icon="mdi:filter" />
          </label>
          <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-primary text-white lg:hidden">
              <Icon icon="mdi:plus" />
            </div>
            <ul
              tabindex="0"
              class="menu dropdown-content z-[1] mt-2 w-52 rounded-box bg-base-100 p-2 text-xs shadow-lg"
            >
              <li><label for="autoDrawer" @click="autoDrawer">Registro Automático</label></li>
              <li>
                <label for="autoDrawer" @click="semiDrawer">Registro Semi-Automático</label>
              </li>
              <li><label for="autoDrawer" @click="manualDrawer">Registro Manual</label></li>
            </ul>
          </div>
          <label for="filterDrawer" class="btn btn-outline hidden text-black">
            <Icon icon="mdi:filter" />
            Filtros
          </label>
          <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-primary hidden text-white lg:flex">
              <Icon icon="mdi:plus" />
              Nuevo
            </div>
            <ul
              tabindex="0"
              class="menu dropdown-content z-[1] mt-2 w-52 rounded-box bg-base-100 p-2 text-xs shadow-lg"
            >
              <li><label for="autoDrawer" @click="autoDrawer">Registro Automático</label></li>
              <li>
                <label for="autoDrawer" @click="semiDrawer">Registro Semi-Automático</label>
              </li>
              <li><label for="autoDrawer" @click="manualDrawer">Registro Manual</label></li>
            </ul>
          </div>
        </div>
      </header>
      <div class="hidden flex-row items-start lg:flex">
        <div class="my-4 ml-4 min-h-full w-80 bg-white text-base-content">
          <div class="menu-title flex flex-row justify-between">Filtros</div>
          <div class="divider m-0"></div>
          <label class="form-control mb-4 w-full max-w-xs">
            <div class="label">
              <span class="label-text font-medium">Categoría</span>
            </div>
            <select class="select select-bordered">
              <option disabled selected>Pick one</option>
              <option>Star Wars</option>
              <option>Harry Potter</option>
              <option>Lord of the Rings</option>
              <option>Planet of the Apes</option>
              <option>Star Trek</option>
            </select>
          </label>
          <label class="form-control mb-4 w-full max-w-xs">
            <div class="label">
              <span class="label-text font-medium">Categoría</span>
            </div>
            <select class="select select-bordered">
              <option disabled selected>Pick one</option>
              <option>Star Wars</option>
              <option>Harry Potter</option>
              <option>Lord of the Rings</option>
              <option>Planet of the Apes</option>
              <option>Star Trek</option>
            </select>
          </label>
          <label class="form-control mb-4 w-full max-w-xs">
            <div class="label">
              <span class="label-text font-medium">Categoría</span>
            </div>
            <select class="select select-bordered">
              <option disabled selected>Pick one</option>
              <option>Star Wars</option>
              <option>Harry Potter</option>
              <option>Lord of the Rings</option>
              <option>Planet of the Apes</option>
              <option>Star Trek</option>
            </select>
          </label>
          <label class="form-control mb-4 w-full max-w-xs">
            <div class="label">
              <span class="label-text font-medium">Categoría</span>
            </div>
            <select class="select select-bordered">
              <option disabled selected>Pick one</option>
              <option>Star Wars</option>
              <option>Harry Potter</option>
              <option>Lord of the Rings</option>
              <option>Planet of the Apes</option>
              <option>Star Trek</option>
            </select>
          </label>
          <label class="form-control mb-4 w-full max-w-xs">
            <div class="label">
              <span class="label-text font-medium">Categoría</span>
            </div>
            <select class="select select-bordered">
              <option disabled selected>Pick one</option>
              <option>Star Wars</option>
              <option>Harry Potter</option>
              <option>Lord of the Rings</option>
              <option>Planet of the Apes</option>
              <option>Star Trek</option>
            </select>
          </label>
          <label class="form-control mb-4 w-full max-w-xs">
            <div class="label">
              <span class="label-text font-medium">Categoría</span>
            </div>
            <select class="select select-bordered">
              <option disabled selected>Pick one</option>
              <option>Star Wars</option>
              <option>Harry Potter</option>
              <option>Lord of the Rings</option>
              <option>Planet of the Apes</option>
              <option>Star Trek</option>
            </select>
          </label>
          <li class="flex flex-row justify-around">
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
            <div class="card mt-4 w-full bg-base-100 text-xs font-normal">
              <div class="card-body flex-row p-4">
                <div
                  class="cover relative z-10 aspect-video h-52 bg-[url('https://intranet-pre.garageclub.es/static/images/brand/favicon.png')] bg-cover bg-center"
                >
                  <div class="dropdown dropdown-end menu-xs absolute right-2 top-2">
                    <div tabindex="0" role="button" class="btn btn-circle btn-ghost text-white">
                      <Icon icon="mdi:dots-vertical" width="30" />
                    </div>
                    <ul
                      tabindex="0"
                      class="menu dropdown-content z-[1] mt-0 w-32 rounded-box bg-base-100 p-2 text-xs shadow-lg"
                    >
                      <li><a>Ver/Editar</a></li>
                      <li><a>Ejecutar PT</a></li>
                      <li><a>Imprimir</a></li>
                      <li><a>Eliminar</a></li>
                    </ul>
                  </div>
                  <div class="absolute bottom-2 right-2">
                    <span class="badge-error mr-2 mt-2 rounded-md px-3 pb-1 text-white"
                      >En venta</span
                    >
                    <span class="badge-info mr-2 mt-2 rounded-md px-3 pb-1 text-white">12</span>
                  </div>
                </div>
                <div class="flex-col pl-4">
                  <div class="test flex flex-row justify-between">
                    <div>
                      <span class="mr-2 font-semibold">3445LTR</span>
                      <span class="font-semibold capitalize">Land rover range rover</span>
                    </div>
                    <div class="flex flex-col items-start p-0">
                      <span>Dias Stock</span>
                      <span class="font-bold">58 Dias</span>
                    </div>
                  </div>
                  <span class="font-medium text-gray-500">Version del Vehículo</span>
                  <div class="mt-3 flex flex-row gap-2">
                    <span class="badge-neutral mr-2 rounded-md px-3 pb-1 text-white">wallapop</span>
                    <span class="badge-neutral mr-2 rounded-md px-3 pb-1 text-white">sumauto</span>
                    <span class="badge-neutral mr-2 rounded-md px-3 pb-1 text-white">sumauto</span>
                  </div>
                  <div class="mt-3 flex flex-row justify-between gap-3">
                    <div class="flex flex-col items-start p-0">
                      <span>Contado</span>
                      <span class="font-bold">10.000€</span>
                    </div>
                    <div class="flex flex-col items-start p-0">
                      <span>Financiado</span>
                      <span class="font-bold">9.000€</span>
                      <span>Desde 340€</span>
                    </div>
                    <span>2019</span>
                    <span>125.000k</span>
                    <span>Automático</span>
                    <span>Gasolina</span>
                  </div>
                  <div class="divider m-0"></div>
                  <div class="flex flex-row gap-3">
                    <span>120cv</span>
                    <span>5P</span>
                  </div>
                </div>
              </div>
            </div>
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
          <input type="radio" name="class" role="tab" class="tab" aria-label="Entrega inmediata" />
          <div role="tabpanel" class="tab-content pt-2">Tab content 9</div>
          <input type="radio" name="class" role="tab" class="tab" aria-label="No disponible" />
          <div role="tabpanel" class="tab-content pt-2">Tab content 10</div>
        </div>
      </div>
    </div>
    <div class="drawer-side">
      <label for="filterDrawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul v-if="drawer === 'filter'" class="menu min-h-full w-80 bg-white p-4 text-base-content">
        <!-- Sidebar content here -->
        <li class="menu-title flex flex-row justify-between">
          Filtros {{ toggleDrawer }}
          <button @click="toggleFilterDrawer" class="btn btn-square btn-xs">
            <Icon icon="mdi:close" width="20" />
          </button>
        </li>
        <div class="divider m-0"></div>
        <label class="form-control mb-4 w-full max-w-xs">
          <div class="label">
            <span class="label-text font-medium">Categoría</span>
          </div>
          <select class="select select-bordered">
            <option disabled selected>Pick one</option>
            <option>Star Wars</option>
            <option>Harry Potter</option>
            <option>Lord of the Rings</option>
            <option>Planet of the Apes</option>
            <option>Star Trek</option>
          </select>
        </label>
        <label class="form-control mb-4 w-full max-w-xs">
          <div class="label">
            <span class="label-text font-medium">Categoría</span>
          </div>
          <select class="select select-bordered">
            <option disabled selected>Pick one</option>
            <option>Star Wars</option>
            <option>Harry Potter</option>
            <option>Lord of the Rings</option>
            <option>Planet of the Apes</option>
            <option>Star Trek</option>
          </select>
        </label>
        <label class="form-control mb-4 w-full max-w-xs">
          <div class="label">
            <span class="label-text font-medium">Categoría</span>
          </div>
          <select class="select select-bordered">
            <option disabled selected>Pick one</option>
            <option>Star Wars</option>
            <option>Harry Potter</option>
            <option>Lord of the Rings</option>
            <option>Planet of the Apes</option>
            <option>Star Trek</option>
          </select>
        </label>
        <label class="form-control mb-4 w-full max-w-xs">
          <div class="label">
            <span class="label-text font-medium">Categoría</span>
          </div>
          <select class="select select-bordered">
            <option disabled selected>Pick one</option>
            <option>Star Wars</option>
            <option>Harry Potter</option>
            <option>Lord of the Rings</option>
            <option>Planet of the Apes</option>
            <option>Star Trek</option>
          </select>
        </label>
        <label class="form-control mb-4 w-full max-w-xs">
          <div class="label">
            <span class="label-text font-medium">Categoría</span>
          </div>
          <select class="select select-bordered">
            <option disabled selected>Pick one</option>
            <option>Star Wars</option>
            <option>Harry Potter</option>
            <option>Lord of the Rings</option>
            <option>Planet of the Apes</option>
            <option>Star Trek</option>
          </select>
        </label>
        <label class="form-control mb-4 w-full max-w-xs">
          <div class="label">
            <span class="label-text font-medium">Categoría</span>
          </div>
          <select class="select select-bordered">
            <option disabled selected>Pick one</option>
            <option>Star Wars</option>
            <option>Harry Potter</option>
            <option>Lord of the Rings</option>
            <option>Planet of the Apes</option>
            <option>Star Trek</option>
          </select>
        </label>
        <li class="flex flex-row justify-around">
          <button @click="toggleFilterDrawer" class="btn btn-primary w-28 text-white">
            <Icon icon="mdi:arrow-u-left-top" />
            Reset
          </button>
          <button @click="toggleFilterDrawer" class="btn btn-outline w-24 text-black">
            <Icon icon="mdi:check" />
            Filtrar
          </button>
        </li>
      </ul>
      <ul v-if="drawer === 'auto'" class="menu min-h-full w-80 bg-white p-4 text-base-content">
        <!-- Sidebar content here -->
        <li>
          <a>{{ drawer }}</a>
        </li>
        <li>
          <a>sexo</a>
        </li>
      </ul>
      <ul v-if="drawer === 'semi'" class="menu min-h-full w-80 bg-white p-4 text-base-content">
        <!-- Sidebar content here -->
        <li>
          <a>{{ drawer }}</a>
        </li>
        <li>
          <a>puto</a>
        </li>
      </ul>
      <ul v-if="drawer === 'manual'" class="menu min-h-full w-80 bg-white p-4 text-base-content">
        <!-- Sidebar content here -->
        <li>
          <a>{{ drawer }}</a>
        </li>
        <li>
          <a>voy pa esa</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
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
.badge-neutral {
  font-weight: 600;
}
.badge-info {
  font-weight: 600;
}
.badge-error {
  font-weight: 600;
}
</style>