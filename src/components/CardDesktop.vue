<script setup>
import { Icon } from '@iconify/vue'
const props = defineProps({
  placa: { type: String, required: true },
  modelo: { type: String, required: true },
  marca: { type: String, required: true },
  version: { type: String, required: true },
  estado: { type: Number, required: true },
  contado: { type: Number, required: true },
  financiado: { type: String, required: true },
  quotes: { type: String, required: true },
  stock: { type: Number, required: true },
  img: {
    type: String,
    default: 'https://intranet-pre.garageclub.es/static/images/brand/favicon.png'
  },
  combustible: { type: String, required: true },
  año: { type: Number, required: true },
  cambios: { type: String, required: true, default: '-' },
  leads: { type: Number, required: true },
  kms: { type: Number, required: true }
})
let lead = 0
if (props.leads) {
  lead = props.leads
}

const integrations = [true, true, true]
</script>

<template>
  <div class="card mt-4 w-full bg-base-100 text-xs font-normal">
    <div class="card-body flex-row p-4">
      <div
        class="cover relative z-0 aspect-video h-32 bg-cover bg-center"
        :style="{
          'background-image': 'url(' + img + ')'
        }"
      >
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
            No Disponible
          </span>
          <span class="badge badge-info mr-2 mt-2 rounded-md px-3 pb-1 text-white">{{ lead }}</span>
        </div>
      </div>
      <div class="flex-col pl-4">
        <div class="test flex flex-row justify-between">
          <div class="flex gap-2">
            <span class="font-semibold">{{ placa }}</span>
            <span class="font-semibold capitalize">{{ marca }}</span>
            <span class="font-semibold capitalize">{{ modelo }}</span>
          </div>
        </div>
        <span class="font-medium text-gray-500">{{ version }}</span>
        <div class="mt-3 flex flex-row justify-between gap-3">
          <div class="flex flex-col items-start p-0">
            <span>Contado</span>
            <span class="font-bold">{{ contado }}€</span>
          </div>
          <div class="flex flex-col items-start p-0">
            <span>Financiado</span>
            <span class="font-bold">{{ financiado }}€</span>
            <span>Desde {{ quotes }}€</span>
          </div>
          <div class="flex flex-col items-start p-0">
            <span>Dias Stock</span>
            <span class="font-bold">{{ stock }} Dias</span>
          </div>
        </div>
        <div class="divider m-0"></div>
        <div class="flex flex-row gap-3">
          <span>{{ año }}</span>
          <span>{{ cambios }}</span>
          <span>{{ combustible }}</span>
          <span>{{ kms }} Kms</span>
        </div>
      </div>
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
          <li><a>Ver/Editar</a></li>
          <li><a>Ejecutar PT</a></li>
          <li><a>Imprimir</a></li>
          <li><a>Eliminar</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
