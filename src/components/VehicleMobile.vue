<script setup>
import { ref } from 'vue'

defineProps({
  vehicle: {
    type: Object,
    required: true
  }
})

const placeholder = ref('https://intranet-pre.garageclub.es/static/images/brand/favicon.png')
</script>

<template>
  <div class="card-compact mt-3 flex w-[90vw] flex-row bg-base-100 text-xs">
    <figure>
      <div
        class="cover relative z-0 aspect-square h-full self-center bg-cover bg-center"
        :style="{
          backgroundImage: `url(${vehicle.image ? vehicle.image : placeholder})`
        }"
      >
        <div
          v-if="vehicle.key_locator"
          class="triangle1 absolute left-0 top-0 bg-gradient-to-b from-primary to-secondary pl-2 pt-2"
        >
          <span class="w-fit text-base font-medium text-white">{{ vehicle.key_locator }}</span>
        </div>
      </div>
    </figure>
    <div class="card-body ml-28 flex">
      <div class="textcard mr-5 flex gap-1 text-nowrap font-bold">
        <span>{{ vehicle.brand_web.title }}</span>
        <span>{{ vehicle.model_web.title }}</span>
        <span>{{ vehicle.power }}CV</span>
      </div>
      <div>
        <button
          v-if="vehicle.status == 0"
          class="badge badge-warning mr-2 mt-2 rounded-md px-3 pb-1 text-white"
        >
          Pte. de Recepción
        </button>
        <button
          v-if="vehicle.status == 3"
          class="badge badge-error mr-2 mt-2 rounded-md px-3 pb-1 text-white"
        >
          Pte. de Publicación
        </button>
        <button
          v-if="vehicle.status == 4"
          class="badge badge-error mr-2 mt-2 rounded-md px-3 pb-1 text-white"
        >
          En venta
        </button>
        <button
          v-if="vehicle.status == 5"
          class="badge badge-warning mr-2 mt-2 rounded-md px-3 pb-1 text-white"
        >
          Reservado
        </button>
        <button
          v-if="vehicle.status == 8"
          class="badge badge-info mr-2 mt-2 rounded-md px-3 pb-1 text-white"
        >
          Entregado
        </button>
        <button
          v-if="vehicle.status == 10"
          class="badge badge-primary mr-2 mt-2 rounded-md px-3 pb-1 text-white"
        >
          No Disponible
        </button>
      </div>
      <div class="textcard flex flex-row flex-wrap items-center justify-start gap-3">
        <span>{{ vehicle.price?.financed_price ? vehicle.price.financed_price : 0 }}€</span>
        <span>{{ vehicle.kms }} Kms</span>
        <span>{{ vehicle.year }}</span>
        <span>{{ vehicle.gear_box?.description ? vehicle.gear_box.description : 'Cambio' }}</span>
        <span>{{ vehicle.fuel?.description }}</span>
      </div>
    </div>
  </div>
</template>
<!-- 
<DropdownBtn class="absolute right-2 top-32">
  <template #btn>
    <button class="badge badge-warning mr-2 mt-2 rounded-md px-3 pb-1 text-white">
      Pte. de Recepción
    </button>
   <button
          v-if="vehicle.status == 3"
          class="badge badge-error mr-2 mt-2 rounded-md px-3 pb-1 text-white"
        >
          Pte. de Publicación
        </button>
        <button
          v-if="vehicle.status == 4"
          class="badge badge-error mr-2 mt-2 rounded-md px-3 pb-1 text-white"
        >
          En venta
        </button>
        <button
          v-if="vehicle.status == 5"
          class="badge badge-warning mr-2 mt-2 rounded-md px-3 pb-1 text-white"
        >
          Reservado
        </button>
        <button
          v-if="vehicle.status == 8"
          class="badge badge-info mr-2 mt-2 rounded-md px-3 pb-1 text-white"
        >
          Entregado
        </button>
        <button
          v-if="vehicle.status == 10"
          class="badge badge-primary mr-2 mt-2 rounded-md px-3 pb-1 text-white"
        >
          No Disponible
        </button> 
  </template>
  <template #content>
    <button class="badge badge-warning mr-2 mt-2 rounded-md px-3 pb-1 text-white">
      Reservado
    </button>
    <button class="badge badge-warning mr-2 mt-2 rounded-md px-3 pb-1 text-white">
      Pte. de Recepción
    </button>
    <button class="badge badge-error mr-2 mt-2 rounded-md px-3 pb-1 text-white">
      Pte. de Publicación
    </button>
    <button class="badge badge-error mr-2 mt-2 rounded-md px-3 pb-1 text-white">
      En venta
    </button>
    <button class="badge badge-info mr-2 mt-2 rounded-md px-3 pb-1 text-white">
      Entregado
    </button>
    <button class="badge badge-primary mr-2 mt-2 rounded-md px-3 pb-1 text-white">
      No Disponible
    </button>
  </template>
</DropdownBtn> -->
<!-- <script setup>
import { ref } from 'vue'
defineProps({
  vehicle: {
    type: Object,
    required: true
  }
})

const placeholder = ref('https://intranet-pre.garageclub.es/static/images/brand/favicon.png')
</script>

<template>
  <div class="card card-side card-compact mt-3 w-[90vw] bg-base-100 text-xs shadow-xl">
    <div
      class="cover z-0 aspect-video h-full w-36 self-center bg-cover bg-center"
      :style="{
        backgroundImage: `url(${vehicle.image ? vehicle.image : placeholder})`
      }"
    >
      <div
        v-if="vehicle.key_locator"
        class="triangle absolute left-0 top-0 bg-gradient-to-b from-primary to-secondary pl-2 pt-2 shadow-xl"
      >
        <span class="w-fit text-base font-medium text-white">{{ vehicle.key_locator }}</span>
      </div>
    </div>
    <div class="card-body relative flex">
      <div class="textcard mr-5 flex gap-1 font-bold">
        <span>{{ vehicle.license_plate }}</span>
        <span>{{ vehicle.brand_web.title }}</span>
        <span>{{ vehicle.model_web.title }}</span>
        <span>{{ vehicle.power }}CV</span>
        <span>{{ vehicle.doors }}P</span>
      </div>
      <span class="textcard text-xs text-gray-500">{{ vehicle.version.title }}</span>
      <div class="textcard flex flex-row items-center justify-start gap-3">
        <span>{{ vehicle.kms }} Kms</span>
        <span>{{ vehicle.year }}</span>
        <span>{{ vehicle.gear_box?.description ? vehicle.gear_box.description : 'Cambio' }}</span>
        <span>{{ vehicle.fuel?.description }}</span>
        <div class="w-7">
          <img
            v-if="vehicle.maintenance.distinctive == 0"
            src="/src/assets/img/etiqueta_0.png"
            alt="distinctive"
          />
          <img
            v-if="vehicle.maintenance.distinctive == 1"
            src="/src/assets/img/etiqueta_ECO.png"
            alt="distinctive"
          />
          <img
            v-if="vehicle.maintenance.distinctive == 2"
            src="/src/assets/img/etiqueta_B.png"
            alt="distinctive"
          />
          <img
            v-if="vehicle.maintenance.distinctive == 3"
            src="/src/assets/img/etiqueta_C.png"
            alt="distinctive"
          />
        </div>
      </div>
      <div class="textcard flex flex-row justify-between">
        <div class="flex flex-col">
          <span class="mb-1 font-bold">Financiado</span>
          <span>{{ vehicle.price?.financed_price ? vehicle.price.financed_price : 0 }}€</span>
          <span>Desde {{ vehicle.price?.financing_fee ? vehicle.price.financing_fee : 0 }}€</span>
        </div>
        <div class="flex flex-col">
          <span class="mb-1 font-bold">Matriculación</span>
          <span>{{
            vehicle.date_first_registration ? vehicle.date_first_registration : 'Sin Asignar'
          }}</span>
        </div>
        <div class="flex flex-col">
          <span class="mb-1 font-bold">Dias stock</span>
          <span>{{ vehicle.days_in_stock }} días</span>
        </div>
      </div>
    </div>
  </div>
</template> -->
<style>
.triangle1 {
  width: 3.5rem;
  aspect-ratio: 1;
  clip-path: polygon(0 100%, 100% 0, 0 0);
}
</style>
