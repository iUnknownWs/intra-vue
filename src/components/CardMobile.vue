<script setup>
import { Icon } from '@iconify/vue'
defineProps({
  vehicle: { type: Object, required: true }
})
defineEmits(['menu'])
const placeholder = 'https://intranet-pre.garageclub.es/static/images/brand/favicon.png'
</script>

<template>
  <div class="card card-compact mt-3 w-full bg-white p-4 text-xs shadow-xl">
    <div class="flex flex-row gap-4">
      <div class="flex flex-col items-center justify-between gap-3">
        <RouterLink :to="'/vehiculos/' + vehicle.id">
          <div
            class="relative aspect-square w-20 rounded-lg bg-cover bg-center md:w-28"
            :style="{
              'background-image': `url(${vehicle.image || placeholder})`
            }"
          >
            <div
              v-if="vehicle.key_locator"
              class="triangle1 absolute left-0 top-0 bg-gradient-to-b from-primary to-secondary pl-2 pt-2 shadow-xl"
            >
              <span class="w-fit text-xs font-medium text-white">{{ vehicle.key_locator }}</span>
            </div>
          </div>
        </RouterLink>
        <div
          class="[&_span]:badge [&_span]:min-w-20 [&_span]:rounded-md [&_span]:text-[8px] [&_span]:font-semibold md:[&_span]:min-w-28 md:[&_span]:text-[12px]"
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
      <div class="flex w-full flex-row justify-between">
        <div class="flex w-full flex-col justify-between">
          <div class="flex flex-row justify-between gap-1">
            <div class="flex w-fit flex-col">
              <RouterLink :to="'/vehiculos/' + vehicle.id" class="text-sm font-bold">
                {{ vehicle.license_plate }} {{ vehicle.model.brand.title }}
                {{ vehicle.model.model_web?.title }}
              </RouterLink>
              <span class="text-sm font-medium text-base-200">{{ vehicle.version.title }}</span>
            </div>
            <div class="flex min-w-8 flex-col items-center">
              <a @click="$emit('menu', vehicle.id, vehicle.slug)">
                <Icon icon="mdi:dots-vertical" width="24" color="black" />
              </a>
              <div v-if="vehicle.maintenance?.distinctive" class="flex h-full items-center justify-center [&_img]:mt-1 [&_img]:w-8">
                <img
                  v-if="vehicle.maintenance.distinctive == 0"
                  src="/src/assets/img/etiqueta_0.png"
                  alt="env label"
                />
                <img
                  v-if="vehicle.maintenance.distinctive == 1"
                  src="/src/assets/img/etiqueta_ECO.png"
                  alt="env label"
                />
                <img
                  v-if="vehicle.maintenance.distinctive == 2"
                  src="/src/assets/img/etiqueta_B.png"
                  alt="env label"
                />
                <img
                  v-if="vehicle.maintenance.distinctive == 3"
                  src="/src/assets/img/etiqueta_C.png"
                  alt="env label"
                />
              </div>
            </div>
          </div>
          <div class="divider m-0"></div>
          <div class="grid grid-cols-2 gap-1 md:grid-cols-4">
            <div class="flex flex-row items-center gap-1">
              <Icon icon="mdi:calendar" width="14" class="text-base-200" />
              <span class="text-xs font-semibold">{{ vehicle.year }}</span>
            </div>
            <div class="flex flex-row items-center gap-1">
              <Icon icon="ph:speedometer" width="14" class="text-base-200" />
              <span class="text-xs font-semibold">{{ vehicle.kms }} Kms</span>
            </div>
            <div class="flex flex-row items-center gap-1">
              <Icon icon="mdi:gas-station" width="14" class="text-base-200" />
              <span class="text-xs font-semibold">{{ vehicle.fuel?.description }}</span>
            </div>
            <div class="flex flex-row items-center gap-1">
              <Icon icon="mdi:car-brake-parking" width="14" class="text-base-200" />
              <span class="text-xs font-semibold">{{ vehicle.gear_box?.description }}</span>
            </div>
          </div>
          <div class="divider m-0 hidden md:flex"></div>
          <div class="hidden flex-row justify-between md:flex">
            <div class="flex flex-col gap-1">
              <span class="text-base-200">Contado: </span>
              <span class="font-semibold">{{ vehicle.price?.price_with_discounts || 0 }}€</span>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-base-200">Financiado: </span>
              <span class="font-semibold">{{ vehicle.price?.financed_price || 0 }}€</span>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-base-200">Días stock: </span>
              <span class="font-semibold">{{ vehicle.days_in_stock }} días</span>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-base-200">Leads: </span>
              <span class="font-semibold">{{ vehicle.leads || 0 }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="divider m-0 md:hidden"></div>
    <div class="flex flex-row justify-between md:hidden">
      <div class="flex flex-row gap-1">
        <span class="text-base-200">Contado: </span>
        <span class="font-semibold">{{ vehicle.price?.price_with_discounts || 0 }}€</span>
      </div>
      <div class="flex flex-row gap-1">
        <span class="text-base-200">Días stock: </span>
        <span class="font-semibold">{{ vehicle.days_in_stock }} días</span>
      </div>
      <div class="flex flex-row gap-1">
        <span class="text-base-200">Leads: </span>
        <span class="font-semibold">{{ vehicle.leads || 0 }}</span>
      </div>
    </div>
  </div>
</template>
