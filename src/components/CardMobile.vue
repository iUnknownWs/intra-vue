<script setup>
import { Icon } from '@iconify/vue'
defineProps({
  id: { type: Number, required: true },
  slug: { type: String, required: true },
  placa: { type: [String, null], required: true },
  modelo: { type: String, required: true },
  marca: { type: String, required: true },
  version: { type: String, required: true },
  estado: { type: Number, required: true },
  contado: { type: [Number, null], required: true },
  financiado: { type: [String, null], required: true },
  quotes: { type: [String, null], required: true },
  stock: { type: Number, required: true },
  img: {
    type: [String, null],
    default: 'https://intranet-pre.garageclub.es/static/images/brand/favicon.png'
  },
  combustible: { type: String, required: true },
  año: { type: Number, required: true },
  cambios: { type: [String, null], required: true },
  keys: { type: [Number, null], required: true },
  kms: { type: [Number, null], required: true },
  distinctive: { type: Number, required: true },
  leads: { type: Number, default: 0 }
})

const integrations = [true, true, true]

defineEmits(['btn-click'])
</script>

<template>
  <div class="card card-compact mt-3 w-[90vw] bg-base-100 text-xs shadow-xl">
    <figure class="bg-cover">
      <div
        class="cover relative z-0 aspect-video w-[90vw] bg-[url('https://garageclub-prod.s3.amazonaws.com/backend/media/DSC03493_D1K6Ekt_9uWa7UD_jORggzh_lBr3MTE.jpg')] bg-cover bg-center"
        :style="{ 'background-image': 'url(' + img + ')' }"
      >
        <div
          v-if="keys"
          class="triangle absolute left-0 top-0 bg-gradient-to-b from-primary to-secondary pl-2 pt-2 shadow-xl"
        >
          <span class="w-fit text-base font-medium text-white">{{ keys }}</span>
        </div>

        <div class="absolute bottom-2 right-2">
          <span
            v-if="estado == 0"
            class="badge badge-warning mr-2 mt-2 rounded-md px-3 pb-1 text-white"
          >
            Pte. de Recepción
          </span>
          <span
            v-if="estado == 3"
            class="badge badge-error mr-2 mt-2 rounded-md px-3 pb-1 text-white"
          >
            Pte. de Publicación
          </span>
          <span
            v-if="estado == 4"
            class="badge badge-error mr-2 mt-2 rounded-md px-3 pb-1 text-white"
          >
            En venta
          </span>
          <span
            v-if="estado == 5"
            class="badge badge-warning mr-2 mt-2 rounded-md px-3 pb-1 text-white"
          >
            Reservado
          </span>
          <span
            v-if="estado == 8"
            class="badge badge-info mr-2 mt-2 rounded-md px-3 pb-1 text-white"
          >
            Entregado
          </span>
          <span
            v-if="estado == 10"
            class="badge badge-primary mr-2 mt-2 rounded-md px-3 pb-1 text-white"
          >
            No disponible
          </span>
        </div>
      </div>
    </figure>
    <div class="card-body relative flex">
      <div class="textcard flex gap-1 font-bold">
        <span>{{ placa }}</span>
        <span>{{ marca }}</span>
        <span>{{ modelo }}</span>
      </div>
      <div class="absolute right-2 top-2">
        <button class="btn btn-square btn-xs btn-ghost" @click="$emit('menu', id, slug)">
          <Icon icon="mdi:dots-vertical" width="30" />
        </button>
      </div>
      <span class="textcard text-xs text-gray-500">{{ version }}</span>
      <div class="textcard flex flex-row justify-between">
        <div class="flex flex-col">
          <span>Contado</span>
          <span class="font-bold">{{ contado }}€</span>
        </div>
        <div class="flex flex-col">
          <span>Financiado</span>
          <span class="font-bold">{{ financiado }}€</span>
          <span>Desde {{ quotes }}€</span>
        </div>
        <div class="flex flex-col">
          <span>Dias stock</span>
          <span class="font-bold">{{ stock }} días</span>
        </div>
        <div class="flex flex-col">
          <span>Kms</span>
          <span class="font-bold">{{ kms }}</span>
        </div>
        <div class="flex flex-col">
          <span>Leads</span>
          <span class="font-bold">{{ leads }}</span>
        </div>
      </div>
      <div class="divider m-0"></div>
      <div class="textcard flex flex-row justify-around">
        <span>{{ año }}</span>
        <span>{{ cambios }}</span>
        <span>{{ combustible }}</span>
      </div>
      <div class="mt-2 flex justify-around gap-1 [&>span]:text-xs">
        <span v-if="integrations[0]" class="badge badge-primary rounded-md pb-1"
          ><a href="">coches.net</a></span
        >
        <span v-if="integrations[1]" class="badge badge-primary rounded-md pb-1"
          ><a href="">wallapop</a></span
        >
        <span v-if="integrations[2]" class="badge badge-primary rounded-md pb-1"
          ><a href="">sumauto</a></span
        >
      </div>
    </div>
  </div>
</template>
