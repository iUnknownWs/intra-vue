<script setup>
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'

defineProps({
  vehicle: {
    type: Object,
    required: true
  }
})

defineEmits(['status'])

const userStore = useUserStore()
const placeholder = ref('https://intranet-pre.garageclub.es/static/images/brand/favicon.png')
</script>

<template>
  <div class="card-compact flex w-[90vw] flex-row bg-white text-xs">
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
        <span>{{ vehicle.license_plate }}</span>
        <span>{{ vehicle.brand_web.title }}</span>
        <span>{{ vehicle.model_web.title }}</span>
        <span>{{ vehicle.power }}CV</span>
      </div>
      <template v-if="userStore.perms.includes('allow_change_vehicle_status')">
        <DropdownBtn>
          <template #btn>
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
      </template>
      <template v-else>
        <span class="badge badge-warning mr-2 mt-2 rounded-md px-3 pb-1 text-white">
          Reservado
        </span>
        <span class="badge badge-warning mr-2 mt-2 rounded-md px-3 pb-1 text-white">
          Pte. de Recepción
        </span>
        <span class="badge badge-error mr-2 mt-2 rounded-md px-3 pb-1 text-white">
          Pte. de Publicación
        </span>
        <span class="badge badge-error mr-2 mt-2 rounded-md px-3 pb-1 text-white"> En venta </span>
        <span class="badge badge-info mr-2 mt-2 rounded-md px-3 pb-1 text-white"> Entregado </span>
        <span class="badge badge-primary mr-2 mt-2 rounded-md px-3 pb-1 text-white">
          No Disponible
        </span>
      </template>
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
