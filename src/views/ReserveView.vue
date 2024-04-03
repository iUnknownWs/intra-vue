<script setup>
import { Icon } from '@iconify/vue'
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import options from '@/js/filterOptions'
import router from '@/router'
import axios from 'axios'
import CardDetails from '@/components/Reserva/CardDetails.vue'

axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('token')}`

const route = useRoute()
const id = ref(route.params.id)
const url = `${import.meta.env.VITE_SALES}/bookings/${id.value}`
const masterDataUrl = `${import.meta.env.VITE_DATA}`
const loading = ref(true)
const vehicle = ref({})

const edit = ref(null)
const infoModal = ref(null)
const confirm = ref(null)
const modalTitle = ref('')
const modalMessage = ref('')

const getVehicle = () => {
  loading.value = true
  axios
    .get(url)
    .then((response) => {
      vehicle.value = response.data
    })
    .catch((error) => {
      console.error(error)
    })
    .finally(() => {
      loading.value = false
    })
}

const scrollDown = ref(false)
const scrollTop = ref(true)
const drawer = ref(false)
const drawerSection = ref('')

const toggleDrawer = () => {
  drawer.value = !drawer.value
}

const isCompany = ref(false)

onMounted(() => {
  getVehicle()
})
</script>

<template>
  <div class="drawer drawer-end">
    <input id="vehicle-drawer" type="checkbox" class="drawer-toggle" v-model="drawer" />
    <div class="drawer-content">
      <ModalInfo class="w-full" ref="infoModal" :title="modalTitle" :message="modalMessage" />
      <ModalConfirm
        class="w-full"
        ref="confirm"
        :title="modalTitle"
        :message="modalMessage"
        @confirm="console.log('confirm')"
      />
      <dialog ref="edit" id="edit" class="modal">
        <div class="modal-box flex flex-col">
          <form method="dialog flex flex-col" @submit.prevent="edit.close(), reset()">
            <button class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">✕</button>
          </form>
          <div>
            <h3 class="text-lg font-bold">Editar Descuento</h3>
            <div class="divider m-0"></div>
            <form @submit.prevent="console.log('extras')" class="flex flex-col">
              <button type="submit" class="btn btn-primary mt-4 self-end text-white">
                <LoadingSpinner v-if="loadingSpinner" />
                Guardar
              </button>
            </form>
          </div>
        </div>
      </dialog>
      <HeaderMain class="pb-16">
        <header class="flex flex-col items-center">
          <LoadingSpinner v-if="loading" class="loading-lg" />
          <CardDetails v-else :reserve="vehicle" />
        </header>
        <!-- <div
          v-if="tab > 0 && tab < 9"
          role="tablist"
          class="tabs tabs-bordered sticky top-[4rem] z-10 overflow-x-scroll text-nowrap bg-white px-4 py-2 lg:hidden"
        >
          <a ref="tab1" role="tab" class="tab tab-active" @click="tabEvent1">Información Básica</a>
          <a ref="tab2" role="tab" class="tab" @click="tabEvent2">Información Técnica</a>
          <a ref="tab4" role="tab" class="tab" @click="tabEvent4">Mantenimiento</a>
          <a ref="tab5" role="tab" class="tab" @click="tabEvent5">Compra y precio</a>
          <a ref="tab6" role="tab" class="tab" @click="tabEvent6">Comentarios</a>
          <a ref="tab7" role="tab" class="tab" @click="tabEvent7">Extras</a>
          <a ref="tab8" role="tab" class="tab" @click="tabEvent8">Descuentos</a>
        </div> -->
        <!-- <div
          v-if="tab > 8 && tab < 11"
          role="tablist"
          class="tabs tabs-bordered sticky top-[4rem] z-10 overflow-x-scroll text-nowrap bg-white px-4 py-2 lg:hidden"
        >
          <a ref="tab9" role="tab" class="tab tab-active" @click="tabEvent9">Equip de serie</a>
          <a ref="tab10" role="tab" class="tab" @click="tabEvent10">Equip opcional</a>
        </div> -->
        <section class="my-10 flex w-full flex-col gap-6 lg:flex-row">
          <aside class="sticky top-[4rem] hidden h-min max-w-64 rounded bg-base-100 lg:block">
            <ul class="menu menu-sm w-56 rounded-box bg-base-100">
              <li>
                <a class="font-bold">Detalles</a>
                <ul>
                  <li><a>Info. Comprador</a></li>
                  <li><a>Extras</a></li>
                  <li><a>Documentación</a></li>
                  <li><a>Más info</a></li>
                </ul>
              </li>
              <li><a class="font-bold">Pagos</a></li>
            </ul>
          </aside>
          <section class="flex w-full flex-1 flex-col">
            <div class="flex w-full flex-col gap-8">
              <div class="flex scroll-m-28 flex-col gap-4 rounded bg-base-100 p-4 lg:scroll-m-20">
                <h1 class="text-xl font-medium">Información de la venta</h1>
                <SelectInput label="Vendedor:" :options="[]" />
                <div>
                  <ToggleInput
                    label="Particular"
                    option="Empresa"
                    v-model="isCompany"
                    class="my-4 w-fit"
                    @changed="toggleReserve"
                  />
                  <div class="flex flex-col lg:grid lg:grid-cols-2 lg:gap-x-4">
                    <SelectInput
                      label="Tipo de documento:"
                      :options="options.idTypes"
                      v-model="idType"
                    />
                    <TextInput label="Numero de documento:" v-model="idNumber" required />
                    <TextInput label="Nombre:" v-model="buyerName" />
                    <TextInput label="Apellido:" v-model="buyerLastName" />
                    <TextInput label="Email:" v-model="buyerEmail" required />
                    <label class="form-control w-full">
                      <div class="label">
                        <span class="label-text font-medium">Teléfono:</span>
                      </div>
                      <div class="flex flex-row gap-2">
                        <VueSelect v-model="prefixBuyer" :options="phonesPre" class="w-60" />
                        <input
                          type="text"
                          class="input input-bordered w-full"
                          v-model="buyerPhone"
                          required
                        />
                      </div>
                    </label>
                  </div>
                  <label class="form-control w-full">
                    <div class="label">
                      <span class="label-text font-medium">Dirección:</span>
                    </div>
                    <GMapAutocomplete
                      @place_changed="setBuyerPlace"
                      class="input input-bordered w-full"
                    >
                    </GMapAutocomplete>
                  </label>
                  <div class="flex flex-col lg:grid lg:grid-cols-2 lg:gap-x-4">
                    <TextInput label="Ciudad:" v-model="buyerCity" />
                    <TextInput label="Provincia:" v-model="buyerProvince" />
                    <TextInput label="País:" v-model="buyerCountry" />
                    <TextInput label="Código Postal:" v-model="buyerZip" />
                  </div>
                  <div v-if="isCompany" class="mt-8">
                    <h2 class="text-xl font-semibold">Información de la empresa</h2>
                    <div class="flex flex-col lg:grid lg:grid-cols-2 lg:gap-x-4">
                      <TextInput label="VAT:" v-model="companyVat" />
                      <TextInput label="Nombre:" v-model="companyName" />
                      <TextInput label="Email:" v-model="companyEmail" />
                      <label class="form-control w-full">
                        <div class="label">
                          <span class="label-text font-medium">Teléfono:</span>
                        </div>
                        <div class="flex flex-row gap-2">
                          <VueSelect v-model="prefixCompany" :options="phonesPre" class="w-60" />
                          <input
                            type="text"
                            class="input input-bordered w-full"
                            v-model="companyPhone"
                          />
                        </div>
                      </label>
                    </div>
                    <label class="form-control w-full">
                      <div class="label">
                        <span class="label-text font-medium">Dirección:</span>
                      </div>
                      <GMapAutocomplete
                        @place_changed="setCompanyPlace"
                        class="input input-bordered w-full"
                      >
                      </GMapAutocomplete>
                    </label>
                    <div class="flex flex-col lg:grid lg:grid-cols-2 lg:gap-x-4">
                      <TextInput label="Ciudad:" v-model="companyCity" />
                      <TextInput label="Provincia:" v-model="companyProvince" />
                      <TextInput label="País:" v-model="companyCountry" />
                      <TextInput label="Código Postal:" v-model="companyZip" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <aside class="hidden h-fit max-w-sm flex-col gap-4 rounded bg-base-100 p-4 lg:flex">
            <div>
              <h2 class="text-xl font-medium">Resumen de compra</h2>
              <div class="divider m-0"></div>
            </div>
            <div class="[&_div]:mt-1 [&_div]:grid [&_div]:grid-cols-3">
              <div v-if="vehicle.form_of_payment_type === 1">
                <span> Precio de compra: </span>
                <span class="mr-2 text-right"> {{ vehicle.price }} </span>
                <span> Financiado </span>
              </div>
              <div v-for="extra of vehicle.extras" :key="extra.id">
                <span> Extra: </span>
                <span class="mr-2 text-right"> {{ extra.price }} € </span>
                <span> {{ extra.title }} </span>
              </div>
              <div v-for="discount of vehicle.discounts" :key="discount.id">
                <span> Descuento: </span>
                <span v-if="discount.amount_fix !== '0.00'" class="mr-2 text-right">
                  {{ discount.amount_fix }} €
                </span>
                <span v-if="discount.amount_percent !== '0.00'" class="mr-2 text-right">
                  {{ discount.amount_percent }} %
                </span>
                <span> {{ discount.title }} </span>
              </div>
              <div>
                <span class="font-bold"> Precio final: </span>
                <span class="mr-2 text-right font-bold">{{ vehicle.final_price }}</span>
                <span></span>
              </div>
              <div class="divider m-0"></div>
              <div v-for="payment of vehicle.payments" :key="payment.id">
                <span> Importe de reserva: </span>
                <span class="mr-2 text-right"> {{ payment.amount }} € </span>
                <span v-if="payment.payment_method === 'card'"> Tarjeta </span>
                <span v-if="payment.payment_method === 'transfer'"> Transferencia </span>
                <span v-if="payment.payment_method === 'cash'"> Contado </span>
                <span v-if="payment.payment_method === 'vehicle_exchange'">
                  Vehiculo a cambio
                </span>
              </div>
              <div>
                <span class="font-bold"> Importe pendiente: </span>
                <span class="mr-2 text-right font-bold">
                  {{ vehicle.pending_booking_amount }} €
                </span>
                <span></span>
              </div>
            </div>
          </aside>
        </section>
      </HeaderMain>
      <footer class="fixed bottom-0 z-50">
        <div class="btm-nav z-10 hidden lg:flex">
          <div class="mr-4 flex flex-row justify-end">
            <button class="btn btn-primary max-w-24 text-white" @click="updateData">
              <LoadingSpinner v-if="loading" />
              <span v-else class="font-semibold">Guardar</span>
            </button>
          </div>
        </div>
        <div v-show="scrollTop" class="btm-nav lg:hidden">
          <button ref="navBtn1" @click="navEvent1" class="active">
            <Icon icon="mdi:car" width="30" />
            <span class="btm-nav-label">I. Admin</span>
          </button>
          <button ref="navBtn2" @click="navEvent2">
            <Icon icon="mdi:webpack" width="30" />
            <span class="btm-nav-label">Port Web</span>
          </button>
          <button ref="navBtn3" @click="navEvent3">
            <Icon icon="mdi:bag-checked" width="30" />
            <span class="btm-nav-label">Equip</span>
          </button>
          <button ref="navBtn4" @click="navEvent4">
            <Icon icon="mdi:performance" width="30" />
            <span class="btm-nav-label">PT</span>
          </button>
          <button ref="navBtn5" @click="navEvent5">
            <Icon icon="mdi:image-multiple" width="30" />
            <span class="btm-nav-label">Galeria</span>
          </button>
        </div>
        <div v-show="scrollDown" class="btm-nav lg:hidden">
          <div>
            <label
              for="vehicle-drawer"
              class="btn btn-warning w-36"
              ref="navBtn6"
              @click="drawerSection = 'reserve'"
            >
              <span class="btm-nav-label font-medium">Reservar</span>
            </label>
          </div>
          <div>
            <button class="btn btn-primary w-36 text-white" ref="navBtn6" @click="updateData">
              <span class="btm-nav-label font-medium">Guardar</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
    <div class="drawer-side z-50 h-full w-full">
      <label for="vehicle-drawer" aria-label="close sidebar" class="drawer-overlay w-full"></label>
      <ul class="menu min-h-full w-screen bg-white p-4 text-base-content lg:w-[50vw]">
        <PerformanceTest
          :url="ptUrl"
          :toggle="toggleDrawer"
          :id="id"
          :step="ptStep"
          :testId="ptTestId"
          @created="fetch"
          @validate="fetchPT"
        />
      </ul>
    </div>
  </div>
</template>

<style>
.activeSection {
  background-color: #dcdddf;
  font-weight: 600;
}
</style>
