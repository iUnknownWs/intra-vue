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
              <li><a>Registro Automático</a></li>
              <li><a>Registro Semi-Automático</a></li>
              <li><a>Registro Manual</a></li>
            </ul>
          </div>
        </div>
      </header>
      <div class="flex flex-row items-start">
        <div class="my-4 min-h-full w-80 bg-white text-base-content">
          <div class="menu-title flex flex-row justify-between">
            Filtros
            <button @click="toggleFilterDrawer" class="btn btn-square btn-xs">
              <Icon icon="mdi:close" width="20" />
            </button>
          </div>
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
        </div>
        <div
          role="tablist"
          class="tabs tabs-bordered ml-20 mt-8 hidden justify-items-start bg-white font-medium lg:grid"
        >
          <input type="radio" name="class" role="tab" class="tab" aria-label="Todos" checked />
          <div role="tabpanel" class="tab-content pt-2">
            <div class="flex max-w-[1280px] flex-row flex-wrap justify-between">
              <div class="card mt-4 w-[560px] bg-base-100 text-xs">
                <div class="card-body flex-row items-center p-4">
                  <img
                    src="https://intranet-pre.garageclub.es/static/images/brand/favicon.png"
                    alt="pic"
                    width="150"
                  />
                  <div class="flex-col">
                    <span class="font-medium">3445LTR </span>
                    <span class="m-3 capitalize">land rover range rover</span>
                    <span class="badge-error mr-2 mt-2 rounded-md px-3 pb-1 text-white"
                      >En venta</span
                    >
                    <div class="mt-3 flex flex-row gap-2">
                      <span class="badge-neutral mr-2 rounded-md px-3 pb-1 text-white"
                        >wallapop</span
                      >
                      <span class="badge-neutral mr-2 rounded-md px-3 pb-1 text-white"
                        >sumauto</span
                      >
                      <span class="badge-neutral mr-2 rounded-md px-3 pb-1 text-white"
                        >sumauto</span
                      >
                    </div>
                    <div class="mt-3 flex flex-row justify-between">
                      <div class="flex flex-col items-start p-0">
                        <span>Contado</span>
                        <span>10.000€</span>
                      </div>
                      <div class="flex flex-col items-start p-0">
                        <span>Financiado</span>
                        <span>9.000€</span>
                        <span>Desde 340€</span>
                      </div>
                      <div class="flex flex-col items-start p-0">
                        <span>Dias Stock</span>
                        <span>58 Dias</span>
                      </div>
                    </div>
                    <div class="divider m-0"></div>
                    <div class="flex flex-row justify-between">
                      <span>2019</span>
                      <span>125.000k</span>
                      <span>Automático</span>
                      <span>Gasolina</span>
                      <span>120cv</span>
                      <span>5P</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card mt-4 w-[560px] bg-base-100 text-xs">
                <div class="card-body flex-row items-center p-4">
                  <img
                    src="https://intranet-pre.garageclub.es/static/images/brand/favicon.png"
                    alt="pic"
                    width="150"
                  />
                  <div class="flex-col">
                    <span class="font-medium">3445LTR </span>
                    <span class="m-3 capitalize">land rover range rover</span>
                    <span class="badge-error mr-2 mt-2 rounded-md px-3 pb-1 text-white"
                      >En venta</span
                    >
                    <div class="mt-3 flex flex-row gap-2">
                      <span class="badge-neutral mr-2 rounded-md px-3 pb-1 text-white"
                        >wallapop</span
                      >
                      <span class="badge-neutral mr-2 rounded-md px-3 pb-1 text-white"
                        >sumauto</span
                      >
                      <span class="badge-neutral mr-2 rounded-md px-3 pb-1 text-white"
                        >sumauto</span
                      >
                    </div>
                    <div class="mt-3 flex flex-row justify-between">
                      <div class="flex flex-col items-start p-0">
                        <span>Contado</span>
                        <span>10.000€</span>
                      </div>
                      <div class="flex flex-col items-start p-0">
                        <span>Financiado</span>
                        <span>9.000€</span>
                        <span>Desde 340€</span>
                      </div>
                      <div class="flex flex-col items-start p-0">
                        <span>Dias Stock</span>
                        <span>58 Dias</span>
                      </div>
                    </div>
                    <div class="divider m-0"></div>
                    <div class="flex flex-row justify-between">
                      <span>2019</span>
                      <span>125.000k</span>
                      <span>Automático</span>
                      <span>Gasolina</span>
                      <span>120cv</span>
                      <span>5P</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card mt-4 w-[560px] bg-base-100 text-xs">
                <div class="card-body flex-row items-center p-4">
                  <img
                    src="https://intranet-pre.garageclub.es/static/images/brand/favicon.png"
                    alt="pic"
                    width="150"
                  />
                  <div class="flex-col">
                    <span class="font-medium">3445LTR </span>
                    <span class="m-3 capitalize">land rover range rover</span>
                    <span class="badge-error mr-2 mt-2 rounded-md px-3 pb-1 text-white"
                      >En venta</span
                    >
                    <div class="mt-3 flex flex-row gap-2">
                      <span class="badge-neutral mr-2 rounded-md px-3 pb-1 text-white"
                        >wallapop</span
                      >
                      <span class="badge-neutral mr-2 rounded-md px-3 pb-1 text-white"
                        >sumauto</span
                      >
                      <span class="badge-neutral mr-2 rounded-md px-3 pb-1 text-white"
                        >sumauto</span
                      >
                    </div>
                    <div class="mt-3 flex flex-row justify-between">
                      <div class="flex flex-col items-start p-0">
                        <span>Contado</span>
                        <span>10.000€</span>
                      </div>
                      <div class="flex flex-col items-start p-0">
                        <span>Financiado</span>
                        <span>9.000€</span>
                        <span>Desde 340€</span>
                      </div>
                      <div class="flex flex-col items-start p-0">
                        <span>Dias Stock</span>
                        <span>58 Dias</span>
                      </div>
                    </div>
                    <div class="divider m-0"></div>
                    <div class="flex flex-row justify-between">
                      <span>2019</span>
                      <span>125.000k</span>
                      <span>Automático</span>
                      <span>Gasolina</span>
                      <span>120cv</span>
                      <span>5P</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card mt-4 w-[560px] bg-base-100 text-xs">
                <div class="card-body flex-row items-center p-4">
                  <img
                    src="https://intranet-pre.garageclub.es/static/images/brand/favicon.png"
                    alt="pic"
                    width="150"
                  />
                  <div class="flex-col">
                    <span class="font-medium">3445LTR </span>
                    <span class="m-3 capitalize">land rover range rover</span>
                    <span class="badge-error mr-2 mt-2 rounded-md px-3 pb-1 text-white"
                      >En venta</span
                    >
                    <div class="mt-3 flex flex-row gap-2">
                      <span class="badge-neutral mr-2 rounded-md px-3 pb-1 text-white"
                        >wallapop</span
                      >
                      <span class="badge-neutral mr-2 rounded-md px-3 pb-1 text-white"
                        >sumauto</span
                      >
                      <span class="badge-neutral mr-2 rounded-md px-3 pb-1 text-white"
                        >sumauto</span
                      >
                    </div>
                    <div class="mt-3 flex flex-row justify-between">
                      <div class="flex flex-col items-start p-0">
                        <span>Contado</span>
                        <span>10.000€</span>
                      </div>
                      <div class="flex flex-col items-start p-0">
                        <span>Financiado</span>
                        <span>9.000€</span>
                        <span>Desde 340€</span>
                      </div>
                      <div class="flex flex-col items-start p-0">
                        <span>Dias Stock</span>
                        <span>58 Dias</span>
                      </div>
                    </div>
                    <div class="divider m-0"></div>
                    <div class="flex flex-row justify-between">
                      <span>2019</span>
                      <span>125.000k</span>
                      <span>Automático</span>
                      <span>Gasolina</span>
                      <span>120cv</span>
                      <span>5P</span>
                    </div>
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
          <div role="tabpanel" class="tab-content pt-2">Tab content 3</div>
          <input type="radio" name="class" role="tab" class="tab" aria-label="No web" />
          <div role="tabpanel" class="tab-content pt-2">Tab content 3</div>
          <input type="radio" name="class" role="tab" class="tab" aria-label="Entrega inmediata" />
          <div role="tabpanel" class="tab-content pt-2">Tab content 3</div>
          <input type="radio" name="class" role="tab" class="tab" aria-label="No disponible" />
          <div role="tabpanel" class="tab-content pt-2">Tab content 3</div>
        </div>
      </div>
    </div>
    <div class="drawer-side">
      <label for="filterDrawer" aria-label="close sidebar" class="drawer-overlay"></label>
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

<style>
.test {
  display: flex;
}
</style>
