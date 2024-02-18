<script setup>
import { Icon } from '@iconify/vue'
</script>

<template>
  <div class="drawer drawer-end">
    <input v-model="filterDrawer" id="filterDrawer" type="checkbox" class="drawer-toggle" />
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
          <label for="filterDrawer" class="btn btn-outline text-black lg:hidden">
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
              <li><a>Registro Automático</a></li>
              <li><a>Registro Semi-Automático</a></li>
              <li><a>Registro Manual</a></li>
            </ul>
          </div>
          <label for="filterDrawer" class="btn btn-outline hidden text-black lg:flex">
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
              <li><a>Registro Automático</a></li>
              <li><a>Registro Semi-Automático</a></li>
              <li><a>Registro Manual</a></li>
            </ul>
          </div>
        </div>
      </header>
      <div class="w-full pt-8">
        <div role="tablist" class="tabs-boxed tabs hidden lg:grid">
          <a role="tab" class="tab tab-active">Tab 1</a>
          <a role="tab" class="tab">Tab 2</a>
          <a role="tab" class="tab">Tab 3</a>
          <a role="tab" class="tab">Tab 3</a>
          <a role="tab" class="tab">Tab 3</a>
          <a role="tab" class="tab">Tab 3</a>
          <a role="tab" class="tab">Tab 3</a>
          <a role="tab" class="tab">Tab 3</a>
          <a role="tab" class="tab">Tab 3</a>
          <a role="tab" class="tab">Tab 3</a>
        </div>
        <section class="hidden flex-col lg:flex">
          <div class="overflow-x-auto">
            <div class="card bg-base-100 shadow-xl">
              <div class="card-body flex-row items-center">
                <img
                  src="https://intranet-pre.garageclub.es/static/images/brand/favicon.png"
                  alt="pic"
                  width="90"
                />
                <div>
                  <span class="font-medium">3445LTR </span>
                  <span class="mb-2 capitalize">land rover range rover</span> <br />
                  <span>"{ vin }"</span> <br />
                  <span class="badge mr-2 mt-2">coches.net</span>
                  <span class="badge mr-2">wallapop</span>
                  <span class="badge mr-2">sumauto</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <div class="drawer-side">
      <label for="filterDrawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu min-h-full w-80 bg-white p-4 text-base-content">
        <!-- Sidebar content here -->
        <li class="menu-title flex flex-row justify-between">
          Filtros
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  components: {},
  data() {
    return {
      filterDrawer: false
    }
  },
  methods: {
    toggleFilterDrawer() {
      this.filterDrawer = !this.filterDrawer
    }
  }
}
</script>

<!-- <div
      role="tablist"
      class="tabs-boxed tabs tabs-xs justify-center bg-white font-medium lg:tabs-lg"
    >
      <input type="radio" name="class" role="tab" class="tab" aria-label="Todos" checked />
      <div role="tabpanel" class="tab-content pt-2">
        <section class="flex flex-row items-center gap-2">
          <input type="checkbox" checked="checked" class="checkbox" />
          <p class="p-2">Foto</p>
          <p class="p-2">Matricula</p>
          <p class="p-2">Bastidor</p>
          <p class="p-2">Marca</p>
          <p class="p-2">Modelo / Version</p>
          <p class="p-2">Matriculación</p>
          <p class="p-2">Combustible</p>
          <p class="p-2">Cambio</p>
          <p class="p-2">Precio</p>
          <p class="p-2">Kms</p>
          <p class="p-2">Kms</p>
          <p class="p-2">Publicación</p>
          <p class="p-2">Dias stock</p>
          <p class="p-2">Estado</p>
        </section>
      </div>

      <input type="radio" name="class" role="tab" class="tab" aria-label="Recepción" />
      <div role="tabpanel" class="tab-content pt-2">Tab content 2</div>

      <input type="radio" name="class" role="tab" class="tab" aria-label="Publicación" />
      <div role="tabpanel" class="tab-content pt-2">Tab content 3</div>

      <input type="radio" name="class" role="tab" class="tab" aria-label="En venta" />
      <div role="tabpanel" class="tab-content pt-2">Tab content 3</div>

      <input type="radio" name="class" role="tab" class="tab" aria-label="Reservados" />
      <div role="tabpanel" class="tab-content pt-2">Tab content 3</div>

      <input type="radio" name="class" role="tab" class="tab" aria-label="Pte. de PT" />
      <div role="tabpanel" class="tab-content pt-2">Tab content 3</div>

      <input type="radio" name="class" role="tab" class="tab" aria-label="Validar PT" />
      <div role="tabpanel" class="tab-content pt-2">Tab content 3</div>

      <input type="radio" name="class" role="tab" class="tab" aria-label="No web" />
      <div role="tabpanel" class="tab-content pt-2">Tab content 3</div>

      <input type="radio" name="class" role="tab" class="tab" aria-label="Entrega inmediata" />
      <div role="tabpanel" class="tab-content pt-2">Tab content 3</div>

      <input type="radio" name="class" role="tab" class="tab" aria-label="No disponible" />
      <div role="tabpanel" class="tab-content pt-2">Tab content 3</div>
    </div> -->
