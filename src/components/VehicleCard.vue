<script setup>
// import { Icon } from '@iconify/vue'
defineProps({
  vehicle: { type: Object, required: true }
})

defineEmits(['menu-btn1'], ['menu-btn2'], ['menu-btn3'], ['menu-btn4'], ['menu-btn5'])

// const integrations = [true, true, true]
</script>

<template>
  <div class="card card-side mt-4 w-full max-w-6xl bg-base-100 font-normal">
    <div
      class="cover relative z-0 w-[400px] rounded-s-2xl bg-cover bg-center shadow-xl"
      :style="{
        'background-image':
          'url(' + vehicle.image ||
          'https://intranet-pre.garageclub.es/static/images/brand/favicon.png' + ')'
      }"
    >
      <div
        v-if="vehicle.key_locator"
        class="triangle absolute left-0 top-0 bg-gradient-to-b from-primary to-secondary pl-2 pt-2 shadow-xl"
      >
        <span class="w-fit text-base font-medium text-white">{{ vehicle.key_locator }}</span>
      </div>
      <div class="absolute bottom-2 right-2">
        <span
          v-if="vehicle.status == 0"
          class="badge badge-warning mr-2 mt-2 rounded-md px-3 pb-1 text-white"
        >
          Pte. de Recepción
        </span>
        <span
          v-if="vehicle.status == 3"
          class="badge badge-error mr-2 mt-2 rounded-md px-3 pb-1 text-white"
        >
          Pte. de Publicación
        </span>
        <span
          v-if="vehicle.status == 4"
          class="badge badge-error mr-2 mt-2 rounded-md px-3 pb-1 text-white"
        >
          En venta
        </span>
        <span
          v-if="vehicle.status == 5"
          class="badge badge-warning mr-2 mt-2 rounded-md px-3 pb-1 text-white"
        >
          Reservado
        </span>
        <span
          v-if="vehicle.status == 8"
          class="badge badge-info mr-2 mt-2 rounded-md px-3 pb-1 text-white"
        >
          Entregado
        </span>
        <span
          v-if="vehicle.status == 10"
          class="badge badge-primary mr-2 mt-2 rounded-md px-3 pb-1 text-white"
        >
          No Disponible
        </span>
      </div>
    </div>
    <div class="card-body flex-row justify-between p-4">
      <div class="relative flex w-full flex-row">
        <div class="w-full flex-col pl-4">
          <div class="flex w-full flex-row justify-between text-lg">
            <div class="flex gap-2 pr-10">
              <span class="font-semibold capitalize">{{ vehicle.brand_web.title }}</span>
              <span class="font-semibold capitalize">{{ vehicle.model_web.title }}</span>
              <span class="font-semibold capitalize">{{ vehicle.power }}CV</span>
              <span class="font-semibold capitalize">{{ vehicle.doors }}P</span>
            </div>
            <div class="flex gap-4">
              <button class="btn btn-primary text-white">Reservar</button>
              <button class="btn btn-outline">Acciones</button>
            </div>
          </div>
          <span class="font-medium text-gray-500">{{ vehicle.version.title }}</span>
          <div class="flex flex-row items-center gap-3">
            <span>{{ vehicle.kms }} Kms</span>
            <span>{{ vehicle.year }}</span>
            <span>{{ vehicle.gear_box.description }}</span>
            <span>{{ vehicle.fuel.description }}</span>
            <div class="flex w-8 self-end">
              <img
                v-if="vehicle.maintenance.distinctive == 0"
                src="/src/assets/img/etiqueta_0.png"
                alt="vehicle.maintenance.distinctive"
              />
              <img
                v-if="vehicle.maintenance.distinctive == 1"
                src="/src/assets/img/etiqueta_ECO.png"
                alt="vehicle.maintenance.distinctive"
              />
              <img
                v-if="vehicle.maintenance.distinctive == 2"
                src="/src/assets/img/etiqueta_B.png"
                alt="vehicle.maintenance.distinctive"
              />
              <img
                v-if="vehicle.maintenance.distinctive == 3"
                src="/src/assets/img/etiqueta_C.png"
                alt="vehicle.maintenance.distinctive"
              />
            </div>
          </div>
          <div class="divider m-0"></div>
          <div class="mt-3 flex flex-row gap-6 [&>_div]:rounded [&>_div]:bg-base-200 [&>_div]:p-2">
            <div class="flex flex-col items-start">
              <span class="font-bold">Matricula</span>
              <span>{{ vehicle.license_plate }}€</span>
              <span>{{ vehicle.chassis_number }}€</span>
            </div>
            <div class="flex flex-col items-start p-0">
              <span class="font-bold">Precio</span>
              <span>{{ vehicle.price.financed_price }}€</span>
              <span>Desde {{ vehicle.price.financing_fee }}€</span>
            </div>
            <div class="flex flex-col items-start p-0">
              <span class="font-bold">Matriculación</span>
              <span>{{ vehicle.date_first_registration }} Dias</span>
            </div>
            <div class="flex flex-col items-start p-0">
              <span class="font-bold">Dias Stock</span>
              <span>{{ vehicle.days_in_stock }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="flex flex-row">
        <div class="divider divider-horizontal"></div>
        <div class="flex flex-col justify-around">
          <span v-if="integrations[0]" class="badge badge-neutral mr-2 rounded-md pb-1 text-white"
            ><a href="">wallapop</a></span
          >
          <span v-if="integrations[1]" class="badge badge-neutral mr-2 rounded-md pb-1 text-white"
            ><a href="">coches.net</a></span
          >
          <span v-if="integrations[2]" class="badge badge-neutral mr-2 rounded-md pb-1 text-white"
            ><a href="">sumauto</a></span
          >
        </div>
        <div class="dropdown dropdown-end menu-xs">
          <div tabindex="0" role="button" class="btn btn-square btn-ghost">
            <Icon icon="mdi:dots-vertical" width="30" />
          </div>
          <ul
            tabindex="0"
            class="menu dropdown-content z-[1] mt-0 w-32 rounded-box bg-base-100 p-2 text-xs shadow-lg"
          >
            <li><a @click="$emit('menu-btn1', id)">Ver/Editar</a></li>
            <li><a @click="$emit('menu-btn2', slug)">Ver anuncio</a></li>
            <li><a @click="$emit('menu-btn3')">Ejecutar PT</a></li>
            <li><a @click="$emit('menu-btn4')">Imprimir</a></li>
            <li><a @click="$emit('menu-btn5', id)">Eliminar</a></li>
          </ul>
        </div>
      </div> -->
    </div>
  </div>
</template>

<style>
.triangle {
  width: 4rem;
  aspect-ratio: 1;
  border-top-left-radius: 16px;
  clip-path: polygon(0 100%, 100% 0, 0 0);
}
</style>
