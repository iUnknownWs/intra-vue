<script setup>
import { ref } from 'vue'

defineProps({
  reserve: {
    type: Object,
    required: true
  }
})

defineEmits(['status'])

const placeholder = ref('https://intranet-pre.garageclub.es/static/images/brand/favicon.png')
</script>

<template>
  <div class="card-compact mt-3 flex w-[90vw] flex-row bg-base-100 text-xs lg:hidden">
    <figure>
      <div
        class="cover relative z-0 aspect-square h-full self-center bg-cover bg-center"
        :style="{
          backgroundImage: `url(${reserve.vehicle.image ? reserve.vehicle.image : placeholder})`
        }"
      >
        <div
          v-if="reserve.vehicle.key_locator"
          class="triangle1 absolute left-0 top-0 bg-gradient-to-b from-primary to-secondary pl-2 pt-2"
        >
          <span class="w-fit text-base font-medium text-white">{{
            reserve.vehicle.key_locator
          }}</span>
        </div>
      </div>
    </figure>
    <div class="card-body ml-28 flex">
      <div class="textcard mr-5 flex gap-1 text-nowrap font-bold">
        <span>{{ reserve.vehicle.license_plate }}</span>
        <span>{{ reserve.vehicle.model.brand.title }}</span>
        <span>{{ reserve.vehicle.model.model_web.title }}</span>
      </div>
      <DropdownBtn>
        <template #btn>
          <button
            v-if="reserve.vehicle.status == 0"
            class="badge badge-warning mr-2 mt-2 rounded-md px-3 pb-1 text-white"
          >
            Pte. de Recepción
          </button>
          <button
            v-if="reserve.vehicle.status == 3"
            class="badge badge-error mr-2 mt-2 rounded-md px-3 pb-1 text-white"
          >
            Pte. de Publicación
          </button>
          <button
            v-if="reserve.vehicle.status == 4"
            class="badge badge-error mr-2 mt-2 rounded-md px-3 pb-1 text-white"
          >
            En venta
          </button>
          <button
            v-if="reserve.vehicle.status == 5"
            class="badge badge-warning mr-2 mt-2 rounded-md px-3 pb-1 text-white"
          >
            Reservado
          </button>
          <button
            v-if="reserve.vehicle.status == 8"
            class="badge badge-info mr-2 mt-2 rounded-md px-3 pb-1 text-white"
          >
            Entregado
          </button>
          <button
            v-if="reserve.vehicle.status == 10"
            class="badge badge-primary mr-2 mt-2 rounded-md px-3 pb-1 text-white"
          >
            No Disponible
          </button>
        </template>
        <template #content>
          <button
            @click="$emit('status', 5)"
            class="badge badge-warning mr-2 mt-2 rounded-md px-3 pb-1 text-white"
          >
            Reservado
          </button>
          <button
            @click="$emit('status', 0)"
            class="badge badge-warning mr-2 mt-2 rounded-md px-3 pb-1 text-white"
          >
            Pte. de Recepción
          </button>
          <button
            @click="$emit('status', 3)"
            class="badge badge-error mr-2 mt-2 rounded-md px-3 pb-1 text-white"
          >
            Pte. de Publicación
          </button>
          <button
            @click="$emit('status', 4)"
            class="badge badge-error mr-2 mt-2 rounded-md px-3 pb-1 text-white"
          >
            En venta
          </button>
          <button
            @click="$emit('status', 8)"
            class="badge badge-info mr-2 mt-2 rounded-md px-3 pb-1 text-white"
          >
            Entregado
          </button>
          <button
            @click="$emit('status', 10)"
            class="badge badge-primary mr-2 mt-2 rounded-md px-3 pb-1 text-white"
          >
            No Disponible
          </button>
        </template>
      </DropdownBtn>
      <div class="textcard flex flex-row flex-wrap items-center justify-start gap-3">
        <span>{{ reserve.vehicle.kms }} Kms</span>
        <span>{{ reserve.vehicle.year }}</span>
        <span>{{
          reserve.vehicle.gear_box?.description ? reserve.vehicle.gear_box.description : 'Cambio'
        }}</span>
        <span>{{ reserve.vehicle.fuel?.description }}</span>
      </div>
    </div>
  </div>
</template>

<style>

</style>
