<script setup>
import { ref } from 'vue'
defineProps({
  vehicle: { type: Object, required: true }
})

const placeholder = ref('https://intranet-pre.garageclub.es/static/images/brand/favicon.png')
</script>

<template>
  <div class="card card-side mt-4 w-full max-w-6xl bg-base-100 font-normal">
    <div
      class="cover relative z-0 w-[400px] rounded-s-2xl bg-cover bg-center shadow-xl"
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
      <DropdownBtn class="absolute bottom-2 right-2">
        <template #btn>
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
      </DropdownBtn>
    </div>
    <div class="card-body flex-row justify-between p-4">
      <div class="relative flex w-full flex-row">
        <div class="w-full flex-col pl-4">
          <div class="flex w-full flex-row justify-between text-lg">
            <div class="flex gap-3">
              <span class="font-semibold capitalize">{{ vehicle.brand_web.title }}</span>
              <span class="font-semibold capitalize">{{ vehicle.model_web.title }}</span>
              <span class="font-semibold capitalize">{{ vehicle.power }}CV</span>
              <span v-if="vehicle.doors" class="font-semibold capitalize"
                >{{ vehicle.doors }}P</span
              >
            </div>
            <div class="absolute right-2 top-2 flex gap-4">
              <button class="btn btn-primary text-white">Reservar</button>
              <button class="btn btn-outline">Acciones</button>
            </div>
          </div>
          <span class="font-medium text-gray-500">{{ vehicle.version.title }}</span>
          <div class="flex flex-row items-center gap-3">
            <span v-if="vehicle.kms">{{ vehicle.kms }} Kms</span>
            <span>{{ vehicle.year }}</span>
            <span>{{ vehicle.gear_box?.description }}</span>
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
            <div v-if="vehicle.price?.financed_price" class="flex flex-col items-start">
              <span class="font-bold">Precio</span>
              <span>{{ vehicle.price.financed_price }}€</span>
              <span>Desde {{ vehicle.price.financing_fee }}€</span>
            </div>
            <div v-else class="flex flex-col items-start">
              <span class="font-bold">Precio</span>
              <span>Sin Asignar</span>
              <span>Desde 0€</span>
            </div>
            <div v-if="vehicle?.license_plate" class="flex flex-col items-start">
              <span class="font-bold"></span>
              <span>{{ vehicle.license_plate }}</span>
              <span>{{ vehicle.chassis_number }}</span>
            </div>
            <div v-else class="flex flex-col items-start">
              <span class="font-bold">Matricula</span>
              <span>Sin Asignar</span>
            </div>
            <div v-if="vehicle?.date_first_registration" class="flex flex-col items-start">
              <span class="font-bold">Matriculación</span>
              <span>{{ vehicle.date_first_registration }} Dias</span>
            </div>
            <div v-else class="flex flex-col items-start">
              <span class="font-bold">Matriculación</span>
              <span>Sin Asignar</span>
            </div>
            <div class="flex flex-col items-start">
              <span class="font-bold">Dias Stock</span>
              <span>{{ vehicle.days_in_stock }}</span>
            </div>
          </div>
        </div>
      </div>
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
