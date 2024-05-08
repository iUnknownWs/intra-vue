<script setup>
import { Icon } from '@iconify/vue'
defineProps({
  vehicle: { type: Object, required: true }
})

defineEmits(['menu-btn1'], ['menu-btn2'], ['menu-btn3'], ['menu-btn4'], ['menu-btn5'])
const placeholder = 'https://intranet-pre.garageclub.es/static/images/brand/favicon.png'
</script>

<template>
  <div class="card card-side mt-4 w-full flex-row gap-4 bg-white p-6">
    <RouterLink :to="'/vehiculos/' + vehicle.id">
      <div
        class="relative aspect-video h-44 rounded-lg bg-cover bg-center"
        :style="{
          'background-image': `url(${vehicle.image || placeholder})`
        }"
      >
        <div
          v-if="vehicle.key_locator"
          class="triangle absolute left-0 top-0 bg-gradient-to-b from-primary to-secondary pl-2 pt-2 shadow-xl"
        >
          <span class="w-fit text-base font-medium text-white">{{ vehicle.key_locator }}</span>
        </div>
        <div
          class="absolute bottom-2 right-2 [&_span]:badge [&_span]:min-w-28 [&_span]:rounded-md [&_span]:text-xs [&_span]:font-bold"
        >
          <span v-if="vehicle.status == 0" class="!border-[#FCFF75] !bg-[#FFFDD5]">
            Pte. Recepción
          </span>
          <span v-if="vehicle.status == 3" class="!border-[#EFABAB] !bg-[#FDECEC]">
            Pte. Publicación
          </span>
          <span v-if="vehicle.status == 4" class="!border-[#EFABAB] !bg-[#FDECEC]"> En venta </span>
          <span v-if="vehicle.status == 5" class="!border-[#FCFF75] !bg-[#FFFDD5]">
            Reservado
          </span>
          <span v-if="vehicle.status == 8" class="!border-[#809CFF] !bg-[#DCE1FF]">
            Entregado
          </span>
          <span v-if="vehicle.status == 10" class="badge-primary"> No disponible </span>
        </div>
      </div>
    </RouterLink>
    <div class="flex w-full min-w-[350px] flex-col">
      <RouterLink :to="'/vehiculos/' + vehicle.id" class="text-xl font-bold">
        {{ vehicle.license_plate }} {{ vehicle.model.brand.title }}
        {{ vehicle.model.model_web?.title }}
      </RouterLink>
      <span class="text-base font-medium text-base-200">{{ vehicle.version.title }}</span>
      <div class="divider m-0"></div>
      <div class="flex flex-row justify-between gap-2">
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
      <div class="divider m-0"></div>
      <div class="flex flex-row justify-between gap-4">
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
          <span class="font-bold">{{ vehicle.leads || 0 }}</span>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <button class="btn btn-neutral btn-sm" disabled>Coches.net</button>
      <button class="btn btn-neutral btn-sm">Wallapop</button>
      <button class="btn btn-neutral btn-sm">Sumauto</button>
    </div>
    <div class="flex flex-col">
      <div class="dropdown dropdown-end menu-xs">
        <div tabindex="0" role="button" class="btn btn-square btn-ghost">
          <Icon icon="mdi:dots-vertical" width="30" />
        </div>
        <ul
          tabindex="0"
          class="menu dropdown-content z-[1] mt-0 w-32 rounded-box bg-white p-2 text-xs shadow-lg"
        >
          <li><RouterLink :to="'/vehiculos/' + vehicle.id">Ver/Editar</RouterLink></li>
          <li><a @click="$emit('menu-btn2', vehicle.slug)">Ver anuncio</a></li>
          <li><a @click="$emit('menu-btn3')">Ejecutar PT</a></li>
          <li><a @click="$emit('menu-btn4')">Imprimir</a></li>
          <li><a @click="$emit('menu-btn5', vehicle.id)">Eliminar</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>