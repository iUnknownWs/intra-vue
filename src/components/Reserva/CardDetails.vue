<script setup>
defineProps({
  reserve: { Object, required: true }
})
</script>

<template>
  <div class="card card-side mt-4 h-[225px] w-fit bg-base-100 text-xs font-normal">
    <span class="relative z-0">
      <div
        class="cover z-0 h-full w-[400px] rounded-s-2xl bg-cover bg-center shadow-xl"
        :style="{
          'background-image': 'url(' + reserve.vehicle.image + ')'
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
        <div class="absolute bottom-2 right-2">
          <span
            v-if="reserve.status == 0"
            class="badge badge-warning mr-2 mt-2 rounded-md px-3 pb-1 text-white"
          >
            Pendiente
          </span>
          <span
            v-if="reserve.status == 1"
            class="badge badge-warning mr-2 mt-2 rounded-md px-3 pb-1 text-white"
          >
            Confirmado
          </span>
          <span
            v-if="reserve.status == 2"
            class="badge badge-primary mr-2 mt-2 rounded-md px-3 pb-1 text-white"
          >
            Cancelado
          </span>
          <span
            v-if="reserve.status == 3"
            class="badge badge-info mr-2 mt-2 rounded-md px-3 pb-1 text-white"
          >
            Entregado
          </span>
        </div>
      </div>
    </span>
    <div class="card-body flex-row justify-between p-4">
      <div class="relative flex w-full flex-row">
        <div class="w-full flex-col pl-4">
          <div class="mb-1 flex min-w-[400px] flex-row justify-between gap-2 *:text-nowrap">
            <div class="flex gap-2">
              <span class="font-semibold">{{ reserve.vehicle.license_plate }}</span>
              <span class="font-semibold capitalize">{{ reserve.vehicle.model.brand.title }}</span>
              <span class="font-semibold capitalize">{{
                reserve.vehicle.model.model_web?.title
              }}</span>
            </div>
            <div class="pb-1">
              <span
                v-if="reserve.source === 'Web'"
                class="badge badge-success rounded-md text-white"
              >
                Web
              </span>
              <span
                v-if="reserve.source === 'Manual'"
                class="badge badge-info rounded-md text-white"
              >
                Intranet
              </span>
            </div>
          </div>
          <span class="py-4 font-medium text-gray-500">{{ reserve.vehicle.version?.title }}</span>
          <div class="mt-1 flex flex-row items-center gap-3 *:text-nowrap">
            <span>{{ reserve.vehicle.kms }} Kms</span>
            <span>{{ reserve.vehicle.year }}</span>
            <span>{{ reserve.vehicle.gear_box?.description }}</span>
            <span>{{ reserve.vehicle.fuel?.description }}</span>
            <div class="flex w-8 self-end">
              <img
                v-if="reserve.vehicle.maintenance?.distinctive == 0"
                src="/src/assets/img/etiqueta_0.png"
                alt="distinctive"
              />
              <img
                v-if="reserve.vehicle.maintenance?.distinctive == 1"
                src="/src/assets/img/etiqueta_ECO.png"
                alt="distinctive"
              />
              <img
                v-if="reserve.vehicle.maintenance?.distinctive == 2"
                src="/src/assets/img/etiqueta_B.png"
                alt="distinctive"
              />
              <img
                v-if="reserve.vehicle.maintenance?.distinctive == 3"
                src="/src/assets/img/etiqueta_C.png"
                alt="distinctive"
              />
            </div>
          </div>
          <div class="divider m-0"></div>
          <div class="mt-3 flex flex-row justify-between gap-3">
            <div class="flex flex-col items-start p-0">
              <span>Dias Stock</span>
              <span class="mx-auto font-bold">{{ reserve.vehicle.days_in_stock }} Dias</span>
            </div>
            <div class="flex flex-col items-start p-0">
              <span>Dias Reservas</span>
              <span class="mx-auto font-bold">{{ reserve.vehicle.days_in_reserve }} Dias</span>
            </div>
            <div class="flex flex-col items-start p-0">
              <span>Importe pendiente</span>
              <span class="mx-auto font-bold">{{ reserve.pending_booking_amount }} €</span>
            </div>
          </div>
        </div>
      </div>
      <div class="divider divider-horizontal"></div>
      <div class="flex w-full flex-row gap-4">
        <button class="btn btn-accent text-white" @click="reserveClick">Entregar</button>
        <button class="btn btn-outline" @click="cancelClick">Opciones</button>
      </div>
    </div>
  </div>
</template>

<style>
.triangle {
  width: 4rem;
  aspect-ratio: 1;
  border-top-left-radius: 16px;
  clip-path: polygon(0 100%, 100% 0, 0 0);
}
</style>
