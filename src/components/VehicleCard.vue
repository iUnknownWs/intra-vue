<script setup>
import { useUserStore } from '@/stores/user'
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import axios from 'axios'

const props = defineProps({
  vehicle: { type: Object, required: true }
})

defineEmits(['status', 'reserve', 'delete'])

const userStore = useUserStore()
const placeholder = ref('https://intranet-pre.garageclub.es/static/images/brand/favicon.png')
const walcuUrl = ref(null)

axios.get(`${import.meta.env.VITE_VEHICLES}/${props.vehicle.id}/walcu_url/`).then((response) => {
  walcuUrl.value = response.data.url
})

const leads = ref(0)
axios
  .get(`${import.meta.env.VITE_VEHICLES}/${props.vehicle.id}/leads_comparsion/?period=recent`)
  .then((response) => {
    leads.value = response.data.f_query_lead_count || 0
  })
</script>

<template>
  <div class="card card-side mt-4 w-full flex-row gap-4 bg-white p-6">
    <div
      class="relative aspect-video h-52 rounded-lg bg-cover bg-center"
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
      <template v-if="userStore.perms.includes('allow_change_vehicle_status')">
        <DropdownBtn class="absolute bottom-2 right-2">
          <template #btn>
            <div>
              <button
                v-if="vehicle.status == 0"
                class="badge min-w-28 rounded-md !border-[#FCFF75] !bg-[#FFFDD5] font-semibold"
              >
                Pte. de Recepción
              </button>
              <button
                v-if="vehicle.status == 3"
                class="badge min-w-28 rounded-md !border-[#EFABAB] !bg-[#FDECEC] font-semibold"
              >
                Pte. de Publicación
              </button>
              <button
                v-if="vehicle.status == 4"
                class="badge min-w-28 rounded-md !border-[#EFABAB] !bg-[#FDECEC] font-semibold"
              >
                En venta
              </button>
              <button
                v-if="vehicle.status == 5"
                class="badge min-w-28 rounded-md !border-[#FCFF75] !bg-[#FFFDD5] font-semibold"
              >
                Reservado
              </button>
              <button
                v-if="vehicle.status == 8"
                class="badge min-w-28 rounded-md !border-[#809CFF] !bg-[#DCE1FF] font-semibold"
              >
                Entregado
              </button>
              <button v-if="vehicle.status == 10" class="badge min-w-28 rounded-md font-semibold">
                No Disponible
              </button>
            </div>
          </template>
          <template #content>
            <button
              @click="$emit('status', 5)"
              class="badge w-full rounded-md border-[#FCFF75] !bg-[#FFFDD5] font-semibold"
            >
              Reservado
            </button>
            <button
              @click="$emit('status', 0)"
              class="badge w-full rounded-md border-[#FCFF75] !bg-[#FFFDD5] font-semibold"
            >
              Pte. de Recepción
            </button>
            <button
              @click="$emit('status', 3)"
              class="badge w-full rounded-md !border-[#EFABAB] !bg-[#FDECEC] font-semibold"
            >
              Pte. de Publicación
            </button>
            <button
              @click="$emit('status', 4)"
              class="badge w-full rounded-md !border-[#EFABAB] !bg-[#FDECEC] font-semibold"
            >
              En venta
            </button>
            <button
              @click="$emit('status', 8)"
              class="badge w-full rounded-md !border-[#809CFF] !bg-[#DCE1FF] font-semibold"
            >
              Entregado
            </button>
            <button @click="$emit('status', 10)" class="badge w-full rounded-md font-semibold">
              No Disponible
            </button>
          </template>
        </DropdownBtn>
      </template>
      <template v-else>
        <span class="badge min-w-28 rounded-md border-[#FCFF75] !bg-[#FFFDD5] font-semibold">
          Reservado
        </span>
        <span class="badge min-w-28 rounded-md border-[#FCFF75] !bg-[#FFFDD5] font-semibold">
          Pte. de Recepción
        </span>
        <span class="badge min-w-28 rounded-md !border-[#EFABAB] !bg-[#FDECEC] font-semibold">
          Pte. de Publicación
        </span>
        <span class="badge min-w-28 rounded-md !border-[#EFABAB] !bg-[#FDECEC] font-semibold">
          En venta
        </span>
        <span class="badge min-w-28 rounded-md !border-[#809CFF] !bg-[#DCE1FF] font-semibold">
          Entregado
        </span>
        <span class="badge min-w-28 rounded-md font-semibold"> No Disponible </span>
      </template>
    </div>
    <div class="flex w-full flex-col justify-around">
      <div class="flex flex-row items-center justify-between">
        <div class="flex flex-col">
          <span class="text-xl font-bold">
            {{ vehicle.license_plate }} {{ vehicle.model.brand.title }}
            {{ vehicle.model.model_web?.title }}
          </span>
          <span class="text-base text-base-200">{{ vehicle.version.title }}</span>
        </div>
        <div class="flex gap-4">
          <button class="btn btn-ghost" @click="$emit('delete')">Eliminar</button>
          <button v-if="vehicle.status == 4" class="btn btn-warning" @click="$emit('reserve')">
            Reservar
          </button>
        </div>
      </div>
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
          <span class="text-base-200">Precio:</span>
          <span class="font-bold">{{ vehicle.price?.financed_price || 0 }}€</span>
          <span class="text-base-200"> Desde {{ vehicle.price?.financing_fee || 0 }}€ </span>
        </div>
        <div class="flex flex-col">
          <span class="text-base-200">Matricula:</span>
          <span class="font-bold">{{ vehicle.license_plate }}</span>
        </div>
        <div class="flex flex-col">
          <span class="text-base-200">Matriculación:</span>
          <span class="font-bold">
            {{
              new Date(vehicle.registration_date).toLocaleString('en-GB', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric'
              })
            }}
          </span>
        </div>
        <div class="flex flex-col">
          <span class="text-base-200">Días stock:</span>
          <span class="font-bold">{{ vehicle.days_in_stock }} Días</span>
        </div>
        <div class="flex flex-col">
          <span class="text-base-200">Links:</span>
          <a class="link font-bold" :href="walcuUrl" target="_blank"> {{ leads }} Leads</a>
          <a class="link font-bold" :href="vehicle.teamwork_url" target="_blank"
            >{{ vehicle.teamwork_subtasks }} Tasks</a
          >
        </div>
      </div>
    </div>
  </div>
</template>
