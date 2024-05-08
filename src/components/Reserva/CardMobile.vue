<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

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
  <div class="card card-compact w-full bg-white p-4 text-xs shadow-xl xl:hidden">
    <div class="flex flex-row gap-4">
      <div class="flex flex-col items-center justify-between gap-3">
        <RouterLink :to="'/reservas/' + reserve.id">
          <div
            class="relative aspect-square w-20 rounded-lg bg-cover bg-center md:w-28"
            :style="{
              'background-image': `url(${reserve.vehicle.image || placeholder})`
            }"
          >
            <div
              v-if="reserve.vehicle.key_locator"
              class="triangle1 absolute left-0 top-0 bg-gradient-to-b from-primary to-secondary pl-2 pt-2 shadow-xl"
            >
              <span class="w-fit text-xs font-medium text-white">{{
                reserve.vehicle.key_locator
              }}</span>
            </div>
          </div>
        </RouterLink>
        <div
          class="[&_span]:badge [&_span]:min-w-20 [&_span]:rounded-md [&_span]:text-[8px] [&_span]:font-semibold md:[&_span]:min-w-28 md:[&_span]:text-[12px]"
        >
          <span v-if="reserve.status == 0" class="!border-[#FCFF75] !bg-[#FFFDD5]">
            Pendiente
          </span>
          <span v-if="reserve.status == 1" class="!border-[#809CFF] !bg-[#DCE1FF]">
            Confirmado
          </span>
          <span v-if="reserve.status == 2" class="!border-base-200 !bg-base-300 !text-white">
            Cancelado
          </span>
          <span v-if="reserve.status == 3" class="!border-[#E6ABEF] !bg-[#FBE3FF]">
            Entregado
          </span>
        </div>
      </div>
      <div class="flex w-full flex-row justify-between">
        <div class="flex w-full flex-col justify-around">
          <div class="flex flex-row justify-between gap-1">
            <div class="flex w-fit flex-col">
              <RouterLink :to="'/reservas/' + reserve.vehicle.id" class="text-sm font-bold">
                {{ reserve.vehicle.license_plate }} {{ reserve.vehicle.model.brand.title }}
                {{ reserve.vehicle.model.model_web?.title }}
              </RouterLink>
              <span class="text-sm font-medium text-base-200">{{
                reserve.vehicle.version?.title
              }}</span>
            </div>
            <div class="flex min-w-8 flex-col items-center">
              <a @click="$emit('menu', reserve.vehicle.id, reserve.vehicle.slug)">
                <Icon icon="mdi:dots-vertical" width="24" color="black" />
              </a>
              <div
                v-if="reserve.vehicle.maintenance?.distinctive"
                class="flex h-full items-center justify-center [&_img]:mt-1 [&_img]:w-8"
              >
                <img
                  v-if="reserve.vehicle.maintenance.distinctive == 0"
                  src="/src/assets/img/etiqueta_0.png"
                  alt="env label"
                />
                <img
                  v-if="reserve.vehicle.maintenance.distinctive == 1"
                  src="/src/assets/img/etiqueta_ECO.png"
                  alt="env label"
                />
                <img
                  v-if="reserve.vehicle.maintenance.distinctive == 2"
                  src="/src/assets/img/etiqueta_B.png"
                  alt="env label"
                />
                <img
                  v-if="reserve.vehicle.maintenance.distinctive == 3"
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
              <span class="text-xs font-semibold">{{ reserve.vehicle.year }}</span>
            </div>
            <div class="flex flex-row items-center gap-1">
              <Icon icon="ph:speedometer" width="14" class="text-base-200" />
              <span class="text-xs font-semibold">{{ reserve.vehicle.kms }} Kms</span>
            </div>
            <div class="flex flex-row items-center gap-1">
              <Icon icon="mdi:gas-station" width="14" class="text-base-200" />
              <span class="text-xs font-semibold">{{ reserve.vehicle.fuel?.description }}</span>
            </div>
            <div class="flex flex-row items-center gap-1">
              <Icon icon="mdi:car-brake-parking" width="14" class="text-base-200" />
              <span class="text-xs font-semibold">{{ reserve.vehicle.gear_box?.description }}</span>
            </div>
          </div>
          <div class="divider m-0 hidden md:flex"></div>
          <div class="hidden flex-row justify-between md:flex">
            <div class="flex flex-col gap-1">
              <span class="text-base-200">Días stock: </span>
              <span class="font-semibold">{{ reserve.vehicle.days_in_stock }} días</span>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-base-200">Días en reserva: </span>
              <span class="font-semibold">{{ reserve.vehicle.days_in_reserve }} días</span>
            </div>
            <div class="flex flex-col items-start p-0">
              <span class="text-base-200">Importe pendiente</span>
              <span class="font-bold">{{ reserve.pending_booking_amount }} €</span>
            </div>
            <span
              v-if="reserve.source === 'Manual'"
              class="badge border-[#809CFF] bg-[#DCE1FF] px-4 py-2 font-medium"
            >
              Intranet
            </span>
            <span
              v-if="reserve.source === 'Web'"
              class="badge border-[#ABEFB1] bg-[#EAFFE3] px-4 py-2 font-medium"
            >
              Web
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="divider m-0 md:hidden"></div>
    <div class="flex flex-row justify-between md:hidden">
      <div class="flex flex-row gap-1">
        <span class="text-base-200">Días stock: </span>
        <span class="font-semibold">{{ reserve.vehicle.days_in_stock }} días</span>
      </div>
      <div class="flex flex-row gap-1">
        <span class="text-base-200">Días en reserva: </span>
        <span class="font-semibold">{{ reserve.vehicle.days_in_reserve }} días</span>
      </div>
      <span
        v-if="reserve.source === 'Manual'"
        class="badge border-[#809CFF] bg-[#DCE1FF] px-4 py-2 font-medium"
      >
        Intranet
      </span>
      <span
        v-if="reserve.source === 'Web'"
        class="badge border-[#ABEFB1] bg-[#EAFFE3] px-4 py-2 font-medium"
      >
        Web
      </span>
    </div>
  </div>
</template>
