<script setup>
import { Icon } from '@iconify/vue'
defineProps({
  vehicle: { type: Object, required: true },
  id: { type: Number, required: true },
  slug: { type: String, required: true },
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
  keys: { type: Number },
  kms: { type: Number, required: true },
  distinctive: { type: [Number, null], required: true },
  leads: { type: Number, default: 0 }
})

defineEmits(['menu-btn1'], ['menu-btn2'], ['menu-btn3'], ['menu-btn4'], ['menu-btn5'])

const integrations = [true, true, true]
</script>

<template>
  <div class="card card-side mt-4 w-full flex-row gap-4 bg-white p-6">
    <div
      class="relative aspect-video w-60 rounded-lg bg-cover bg-center"
      :style="{
        'background-image': 'url(' + img + ')'
      }"
    >
      <!-- <div
        v-if="keys"
        class="triangle absolute left-0 top-0 bg-gradient-to-b from-primary to-secondary pl-2 pt-2 shadow-xl"
      >
        <span class="w-fit text-base font-medium text-white">{{ keys }}</span>
      </div> -->
      <div
        class="absolute bottom-2 right-2 [&_span]:badge [&_span]:min-w-20 [&_span]:rounded-md [&_span]:text-xs [&_span]:font-semibold"
      >
        <span v-if="estado == 0" class="badge-warning"> Pte. de Recepción </span>
        <span v-if="estado == 3" class="badge-error"> Pte. de Publicación </span>
        <span v-if="estado == 4" class="badge-error"> En venta </span>
        <span v-if="estado == 5" class="badge-warning"> Reservado </span>
        <span v-if="estado == 8" class="badge-info"> Entregado </span>
        <span v-if="estado == 10" class="badge-primary"> No Disponible </span>
      </div>
    </div>
    <div class="flex min-w-[650px] flex-col">
      <span class="text-xl font-bold">
        {{ vehicle.license_plate }} {{ vehicle.model.brand.title }}
        {{ vehicle.model.model_web.title }}
      </span>
      <span class="text-base font-medium text-base-200">{{ vehicle.version.title }}</span>
      <div class="divider m-0"></div>
      <div class="flex flex-row gap-2">
        <div class="grid grid-cols-2 gap-x-12 gap-y-2">
          <div class="flex flex-row items-center gap-1">
            <Icon icon="mdi:calendar" width="20" class="text-base-200" />
            <span class="text-base font-semibold">{{ vehicle.year }}</span>
          </div>
          <div class="flex flex-row items-center gap-1">
            <Icon icon="ph:speedometer" width="20" class="text-base-200" />
            <span class="text-base font-semibold">{{ vehicle.kms }} Kms</span>
          </div>
          <div class="flex flex-row items-center gap-1">
            <Icon icon="mdi:gas-station" width="20" class="text-base-200" />
            <span class="text-base font-semibold">{{ vehicle.fuel?.description }}</span>
          </div>
          <div class="flex flex-row items-center gap-1">
            <Icon icon="mdi:car-brake-parking" width="20" class="text-base-200" />
            <span class="text-base font-semibold">{{ vehicle.gear_box?.description }}</span>
          </div>
        </div>
        <div class="divider divider-horizontal m-0"></div>
        <div class="flex flex-row gap-4">
          <div class="flex flex-col">
            <span class="font-semibold text-base-200">Contado:</span>
            <span class="font-bold">{{ vehicle.price?.price_with_discount || 0 }}€</span>
          </div>
          <div class="flex flex-col">
            <span class="font-semibold text-base-200">Financiado:</span>
            <span class="font-bold">{{ vehicle.price?.financed_price || 0 }}€</span>
            <span class="font-semibold text-base-200"
              >Desde {{ vehicle.price?.financing_fee || 0 }}€</span
            >
          </div>
          <div class="flex flex-col">
            <span class="font-semibold text-base-200">Días stock:</span>
            <span class="font-bold">{{ vehicle.days_in_stock }} Días</span>
          </div>
          <div class="flex flex-col">
            <span class="font-semibold text-base-200">Leads:</span>
            <span class="font-bold">{{ vehicle.leads }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <button class="btn btn-sm">Coches.net</button>
      <button class="btn btn-sm">Wallapop</button>
      <button class="btn btn-sm">Sumauto</button>
    </div>
    <div class="flex flex-col">
      <a>
        <Icon icon="mdi:dots-vertical" width="24" />
      </a>
    </div>
  </div>
</template>

<!-- <RouterLink :to="'/vehiculos/' + id" class="relative z-0">
  <div
    class="cover z-0 h-full w-[400px] rounded-s-2xl bg-cover bg-center shadow-xl"
    :style="{
      'background-image': 'url(' + img + ')'
    }"
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
        class="badge badge-warning text-white"
      >
        Pte. de Recepción
      </span>
      <span
        v-if="estado == 3"
        class="badge badge-error text-white"
      >
        Pte. de Publicación
      </span>
      <span
        v-if="estado == 4"
        class="badge badge-error text-white"
      >
        En venta
      </span>
      <span
        v-if="estado == 5"
        class="badge badge-warning text-white"
      >
        Reservado
      </span>
      <span
        v-if="estado == 8"
        class="badge badge-info text-white"
      >
        Entregado
      </span>
      <span
        v-if="estado == 10"
        class="badge badge-primary text-white"
      >
        No Disponible
      </span>
    </div>
  </div>
</RouterLink>
<div class="card-body flex-row justify-between p-4">
  <div class="relative flex w-full flex-row">
    <div class="w-full min-w-[400px] flex-col pl-4">
      <div class="flex w-full flex-row justify-between">
        <div class="flex gap-2 pr-10">
          <RouterLink :to="'/vehiculos/' + id" class="font-semibold">{{ placa }}</RouterLink>
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
        <div class="flex flex-col items-start p-0">
          <span>Leads</span>
          <span class="font-bold">{{ leads }}</span>
        </div>
      </div>
      <div class="divider m-0"></div>
      <div class="flex flex-row items-center gap-3">
        <span>{{ kms }} Kms</span>
        <span>{{ año }}</span>
        <span>{{ cambios }}</span>
        <span>{{ combustible }}</span>
        <div class="flex w-8 self-end">
          <img v-if="distinctive == 0" src="/src/assets/img/etiqueta_0.png" alt="distinctive" />
          <img
            v-if="distinctive == 1"
            src="/src/assets/img/etiqueta_ECO.png"
            alt="distinctive"
          />
          <img v-if="distinctive == 2" src="/src/assets/img/etiqueta_B.png" alt="distinctive" />
          <img v-if="distinctive == 3" src="/src/assets/img/etiqueta_C.png" alt="distinctive" />
        </div>
      </div>
    </div>
  </div>
  <div class="flex flex-row">
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
        <li><RouterLink :to="'/vehiculos/' + id">Ver/Editar</RouterLink></li>
        <li><a @click="$emit('menu-btn2', slug)">Ver anuncio</a></li>
        <li><a @click="$emit('menu-btn3')">Ejecutar PT</a></li>
        <li><a @click="$emit('menu-btn4')">Imprimir</a></li>
        <li><a @click="$emit('menu-btn5', id)">Eliminar</a></li>
      </ul>
    </div>
  </div>
</div> -->

<!-- <style>
/* HTML: <div class="triangle"></div> */
.triangle {
  width: 4rem;
  aspect-ratio: 1;
  border-top-left-radius: 16px;
  clip-path: polygon(0 100%, 100% 0, 0 0);
}
</style> -->
