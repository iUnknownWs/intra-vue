<script setup>
import axios from 'axios'
import { ref } from 'vue'

const props = defineProps({
  reserve: { Object, required: true },
  getData: { Function, required: true }
})

defineEmits(['docuDrawer', 'deliverBtn'])

const info = ref(null)
const modalTitle = ref('')
const modalMessage = ref('')
const modalLoading = ref(false)
const refresh = ref(false)

const resendEmail = () => {
  modalLoading.value = true
  info.value.modal.showModal()
  refresh.value = false

  axios
    .get(`${import.meta.env.VITE_SALES}/bookings/${props.reserve.id}/resend_confirmation_email/`)
    .then(() => {
      modalLoading.value = false
      modalTitle.value = 'Email reenviado'
      modalMessage.value = 'El email ha sido reenviado'
    })
    .catch((error) => {
      modalLoading.value = false
      modalTitle.value = 'Error'
      modalMessage.value = 'No se pudo reenviar el email'
      console.log(error)
    })
}

const printReserve = () => {
  modalLoading.value = true
  info.value.modal.showModal()
  refresh.value = false

  axios
    .post(`${import.meta.env.VITE_SALES}/bookings/${props.reserve.id}/download_mail_file/`)
    .then((response) => {
      modalLoading.value = false
      modalTitle.value = 'Reserva generada'
      modalMessage.value = 'Tu reserva ha sido generada, la descarga se iniciará en breve'
      const downloadLink = document.createElement('a')
      const url = window.URL.createObjectURL(new Blob([response.data]))
      downloadLink.href = url
      downloadLink.setAttribute('download', `Reserva ${props.reserve.id}.pdf`)
      document.body.appendChild(downloadLink)
      downloadLink.click()
    })
    .catch((error) => {
      console.log(error)
    })
}

const cancelReserve = () => {
  modalLoading.value = true
  info.value.modal.showModal()
  refresh.value = true

  axios
    .patch(`${import.meta.env.VITE_SALES}/bookings/${props.reserve.id}/`, {
      status: 2
    })
    .then(() => {
      modalLoading.value = false
      modalTitle.value = 'Reserva cancelada'
      modalMessage.value = 'Tu reserva ha sido cancelada'
    })
    .catch((error) => {
      console.log(error)
      modalLoading.value = false
      modalTitle.value = 'Error'
      modalMessage.value = 'No se pudo cancelar la reserva'
    })
}

const modalClosed = () => {
  if (refresh.value) {
    props.getData()
  }
  modalTitle.value = null
  modalMessage.value = null
}

const placeholder = ref('https://intranet-pre.garageclub.es/static/images/brand/favicon.png')
</script>

<template>
  <ModalInfo
    ref="info"
    :title="modalTitle"
    :message="modalMessage"
    :loading="modalLoading"
    @close="modalClosed"
  />
  <div class="card card-side mt-4 hidden w-full flex-row gap-4 bg-white p-6 xl:flex">
    <RouterLink :to="'/reservas/' + reserve.id">
      <div
        class="relative aspect-video h-52 rounded-lg bg-cover bg-center"
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
          <span class="text-base text-base-200">{{ reserve.vehicle.version?.title }}</span>
        </div>
        <div class="flex flex-row items-center gap-4">
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
          <template v-if="reserve.status !== 2">
            <div class="flex w-full flex-row gap-4">
              <button
                v-if="reserve.status == 1"
                class="btn btn-accent text-white"
                @click="$emit('deliverBtn')"
              >
                Entregar
              </button>
              <DropdownBtn>
                <template #btn>
                  <button class="btn btn-outline">Acciones</button>
                </template>
                <template #content>
                  <li><a @click="$emit('docuDrawer')">Enviar Documentación</a></li>
                  <li><a @click="resendEmail">Reenviar Confirmación</a></li>
                  <li><a @click="printReserve">Imprimir reserva</a></li>
                  <li><a @click="cancelReserve">Cancelar reserva</a></li>
                </template>
              </DropdownBtn>
            </div>
          </template>
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
          <span class="text-base-200">Imp. pendiente:</span>
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

<!-- <template>
  <div class="card card-side mt-4 hidden h-[250px] w-fit bg-base-100 text-xs font-normal lg:flex">
    <span class="relative z-0">
      <div
        class="cover z-0 h-full w-[400px] rounded-s-2xl bg-cover bg-center shadow-xl"
        :style="{
          backgroundImage: `url(${reserve.vehicle.image ? reserve.vehicle.image : placeholder})`
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
            class="badge badge-info mr-2 mt-2 rounded-md px-3 pb-1 text-white"
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
            class="badge badge-accent mr-2 mt-2 rounded-md px-3 pb-1 text-white"
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
          <div class="my-2 flex flex-row justify-between gap-3">
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
          <span></span>
        </div>
      </div>
      <template v-if="reserve.status !== 2">
        <div class="divider divider-horizontal"></div>
        <div class="flex w-full flex-row gap-4">
          <button
            v-if="reserve.status == 1"
            class="btn btn-accent text-white"
            @click="$emit('deliverBtn')"
          >
            Entregar
          </button>
          <DropdownBtn>
            <template #btn>
              <button class="btn btn-outline">Acciones</button>
            </template>
            <template #content>
              <li><a @click="$emit('docuDrawer')">Enviar Documentación</a></li>
              <li><a @click="resendEmail">Reenviar Confirmación</a></li>
              <li><a @click="printReserve">Imprimir reserva</a></li>
              <li><a @click="cancelReserve">Cancelar reserva</a></li>
            </template>
          </DropdownBtn>
        </div>
      </template>
    </div>
  </div>
  <ModalInfo
    ref="info"
    :title="modalTitle"
    :message="modalMessage"
    :loading="modalLoading"
    @close="modalClosed"
  />
</template> -->
