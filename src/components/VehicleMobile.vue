<script setup>
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

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
  <div class="card card-compact mt-3 w-full bg-white p-4 text-sm shadow-xl">
    <div class="flex flex-row gap-4">
      <div class="flex flex-col items-center justify-between gap-3">
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
        <span class="font-bold">{{ vehicle.price?.price_with_discounts || 0 }}€</span>
      </div>
      <div class="flex w-full flex-row justify-between">
        <div class="flex w-full flex-col justify-around">
          <div class="flex w-full flex-row items-center justify-between gap-2">
            <div class="flex w-full flex-col">
              <span class="text-sm font-bold">
                {{ vehicle.license_plate }} {{ vehicle.model.brand.title }}
                {{ vehicle.model.model_web.title }} {{ vehicle.power }}CV {{ vehicle.doors }}P
              </span>
            </div>
            <template v-if="userStore.perms.includes('allow_change_vehicle_status')">
              <DropdownBtn>
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
                    <button
                      v-if="vehicle.status == 10"
                      class="badge min-w-28 rounded-md font-semibold"
                    >
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
                  <button
                    @click="$emit('status', 10)"
                    class="badge w-full rounded-md font-semibold"
                  >
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
          <div class="divider m-0"></div>
          <div class="grid grid-cols-2 gap-1 md:grid-cols-4">
            <div class="flex flex-row items-center gap-1">
              <Icon icon="mdi:calendar" width="14" class="text-base-200" />
              <span class="font-semibold">{{ vehicle.year }}</span>
            </div>
            <div class="flex flex-row items-center gap-1">
              <Icon icon="ph:speedometer" width="14" class="text-base-200" />
              <span class="font-semibold">{{ vehicle.kms }} Kms</span>
            </div>
            <div class="flex flex-row items-center gap-1">
              <Icon icon="mdi:gas-station" width="14" class="text-base-200" />
              <span class="font-semibold">{{ vehicle.fuel?.description }}</span>
            </div>
            <div class="flex flex-row items-center gap-1">
              <Icon icon="mdi:car-brake-parking" width="14" class="text-base-200" />
              <span class="font-semibold">{{ vehicle.gear_box?.description }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- <template>
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
          <span class="w-fit text-xs font-medium text-white">{{ vehicle.key_locator }}</span>
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
</template> -->
