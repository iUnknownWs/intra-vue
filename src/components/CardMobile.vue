<script setup>
import { Icon } from '@iconify/vue'
const props = defineProps({
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
  cambios: { type: [String, null], required: true, default: '-' },
  leads: { type: [Number, null], required: true },
  kms: { type: [Number, null], required: true }
})
let lead = 0
if (props.leads) {
  lead = props.leads
}
const integrations = [true, true, true]
</script>

<template>
  <div class="card card-compact mt-3 w-[90vw] bg-base-100 text-xs shadow-xl">
    <figure class="bg-cover">
      <div
        class="cover relative z-0 aspect-video w-[90vw] bg-[url('https://garageclub-prod.s3.amazonaws.com/backend/media/DSC03493_D1K6Ekt_9uWa7UD_jORggzh_lBr3MTE.jpg')] bg-cover bg-center"
        :style="{ 'background-image': 'url(' + img + ')' }"
      >
        <div class="dropdown dropdown-end menu-xs absolute right-2 top-2">
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
          <span class="badge badge-info mr-2 mt-2 rounded-md px-3 pb-1 text-white">{{ lead }}</span>
        </div>
      </div>
    </figure>
    <div class="card-body relative flex">
      <div class="textcard flex gap-1 font-bold">
        <span>{{ placa }}</span>
        <span>{{ marca }}</span>
        <span>{{ modelo }}</span>
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
          <span>{{ kms }} KMs</span>
        </div>
      </div>
      <div class="divider m-0"></div>
      <div class="textcard flex flex-row justify-between">
        <span>{{ año }}</span>
        <span>{{ cambios }}</span>
        <span>{{ combustible }}</span>
      </div>
      <div class="mt-2 flex gap-1 [&>span]:text-xs">
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
