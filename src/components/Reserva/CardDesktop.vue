<script setup>
import { Icon } from '@iconify/vue'
defineProps({
  reserve: { Object, required: true }
})

defineEmits(['menu-btn1'], ['menu-btn2'], ['menu-btn3'], ['menu-btn4'], ['menu-btn5'])
</script>

<template>
  <div class="card card-side mt-4 hidden w-full flex-row gap-4 bg-white p-6 xl:flex">
    <RouterLink :to="'/reservas/' + reserve.id">
      <div
        class="relative aspect-[58/47] h-52 rounded-lg bg-cover bg-center"
        :style="{
          'background-image': `url(${reserve.vehicle.image || placeholder})`
        }"
      >
        <div
          v-if="reserve.vehicle.key_locator"
          class="triangle absolute left-0 top-0 bg-gradient-to-b from-primary to-secondary pl-2 pt-2 shadow-xl"
        >
          <span class="w-fit text-base font-medium text-white">{{
            reserve.vehicle.key_locator
          }}</span>
        </div>
        <div
          class="absolute bottom-2 right-2 [&_span]:badge [&_span]:min-w-28 [&_span]:rounded-md [&_span]:text-xs [&_span]:font-bold"
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
    </RouterLink>
    <div class="flex w-full min-w-[350px] flex-col">
      <div class="flex flex-row justify-between">
        <div class="flex flex-col">
          <RouterLink :to="'/reservas/' + reserve.id" class="text-xl font-bold">
            {{ reserve.vehicle.license_plate }} {{ reserve.vehicle.model.brand.title }}
            {{ reserve.vehicle.model.model_web?.title }}
          </RouterLink>
          <span class="text-base text-base-200">{{
            reserve.vehicle.version?.title
          }}</span>
        </div>
        <div class="flex flex-row items-center">
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
          <div class="dropdown dropdown-end menu-xs">
            <div tabindex="0" role="button" class="btn btn-square btn-ghost">
              <Icon icon="mdi:dots-vertical" width="24" />
            </div>
            <ul
              tabindex="0"
              class="menu dropdown-content z-[1] mt-0 w-32 rounded-box bg-white p-2 text-xs shadow-lg"
            >
              <li><RouterLink :to="'/reservas/' + reserve.id">Ver/Editar</RouterLink></li>
              <li><a @click="$emit('menu-btn5', reserve.id)">Eliminar</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="divider m-0"></div>
      <div class="flex flex-row justify-between gap-2">
        <div class="flex flex-row items-center gap-1">
          <Icon icon="mdi:calendar" width="20" class="text-base-200" />
          <span class="text-base font-semibold">{{ reserve.vehicle.year }}</span>
        </div>
        <div class="flex flex-row items-center gap-1">
          <Icon icon="ph:speedometer" width="20" class="text-base-200" />
          <span class="text-base font-semibold">{{ reserve.vehicle.kms }} Kms</span>
        </div>
        <div class="flex flex-row items-center gap-1">
          <Icon icon="mdi:gas-station" width="20" class="text-base-200" />
          <span class="text-base font-semibold">{{ reserve.vehicle.fuel?.description }}</span>
        </div>
        <div class="flex flex-row items-center gap-1">
          <Icon icon="mdi:car-brake-parking" width="20" class="text-base-200" />
          <span class="text-base font-semibold">{{ reserve.vehicle.gear_box?.description }}</span>
        </div>
      </div>
      <div class="divider m-0"></div>
      <div class="flex flex-row justify-between gap-4">
        <div class="flex flex-row gap-1">
          <span class="text-base-200">Días stock: </span>
          <span class="font-semibold">{{ reserve.vehicle.days_in_stock }} días</span>
        </div>
        <div class="flex flex-row gap-1">
          <span class="text-base-200">Días reserva: </span>
          <span class="font-semibold">{{ reserve.vehicle.days_in_reserve }} días</span>
        </div>
        <div class="flex flex-row gap-1">
          <span class="text-base-200">Imp. pendiente</span>
          <span class="font-bold">{{ reserve.pending_booking_amount }} €</span>
        </div>
      </div>
      <div class="divider m-0"></div>
      <div class="flex flex-row justify-between gap-4">
        <div class="flex flex-col gap-1">
          <span class="font-semibold">
            {{ reserve.contact_first_name }} {{ reserve.contact_last_name }}
          </span>
          <span class="text-base-200"
            >{{ reserve.contact_city }}, {{ reserve.contact_country }}</span
          >
        </div>
        <div class="flex flex-col gap-1">
          <span class="font-semibold">ID: {{ reserve.contact_document_id }}</span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-end font-semibold">
            {{ reserve.contact_phone_prefix }} {{ reserve.contact_phone }}
          </span>
          <span class="text-base-200">{{ reserve.contact_email }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
