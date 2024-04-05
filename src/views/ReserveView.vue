<script setup>
import { Icon } from '@iconify/vue'
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import options from '@/js/filterOptions'
import phonesPrefix from '@/js/phone_prefixes.json'
import axios from 'axios'
import CardDetails from '@/components/Reserva/CardDetails.vue'
import TextInput from '@/components/TextInput.vue'
import ExtrasDrawer from '@/components/Reserva/ExtrasDrawer.vue'

axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('token')}`

const route = useRoute()
const id = ref(route.params.id)
const url = `${import.meta.env.VITE_SALES}/bookings/${id.value}`
const buyersUrl = `${import.meta.env.VITE_API}/buyers/`
const galleryDocs = ref([])
const loading = ref(true)
const vehicle = ref({})
const tab = ref('details')

const edit = ref(null)
const infoModal = ref(null)
const confirm = ref(null)
const modalTitle = ref('')
const modalMessage = ref('')

const getVehicle = () => {
  loading.value = true
  isFetchingExtras.value = true
  axios
    .get(url)
    .then((response) => {
      vehicle.value = response.data
      seller.value = vehicle.value.seller
      contactId.value = vehicle.value.contact_document_type
      contactIdNumber.value = vehicle.value.contact_document_id
      contactName.value = vehicle.value.contact_first_name
      contactLastName.value = vehicle.value.contact_last_name
      contactEmail.value = vehicle.value.contact_email
      contactPrefix.value = vehicle.value.contact_phone_prefix
      contactPhone.value = vehicle.value.contact_phone
      contactCity.value = vehicle.value.contact_city
      contactRegion.value = vehicle.value.contact_region
      contactCountry.value = vehicle.value.contact_country
      contactZip.value = vehicle.value.contact_postal_code
      companyVat.value = vehicle.value.buyer_company.vat
      companyName.value = vehicle.value.buyer_company.name
      companyEmail.value = vehicle.value.buyer_company.email
      companyPrefix.value = vehicle.value.buyer_company.phone_prefix
      companyPhone.value = vehicle.value.buyer_company.phone
      companyCity.value = vehicle.value.buyer_company.address.city
      companyRegion.value = vehicle.value.buyer_company.address.region
      companyCountry.value = vehicle.value.buyer_company.address.country
      companyZip.value = vehicle.value.buyer_company.address.postal_code
      extras.value = vehicle.value.extras
      isFetchingExtras.value = false
      deliveryCity.value = vehicle.value.delivery_city
      deliveryRegion.value = vehicle.value.delivery_province
      deliveryCountry.value = vehicle.value.delivery_country
      deliveryZip.value = vehicle.value.delivery_postal_code
      payments.value = vehicle.value.payments
      isFetchingPayments.value = false
      paymentType.value = vehicle.value.form_of_payment_type
      paymentAmount.value = vehicle.value.form_of_payment_financed_price
      paymentMonths.value = vehicle.value.form_of_payment_financed_amount_fees
      paymentDues.value = vehicle.value.form_of_payment_financed_fee
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
const sellerOptions = ref([])
const seller = ref(null)
const contactId = ref(null)
const contactIdNumber = ref(null)
const contactName = ref(null)
const contactLastName = ref(null)
const contactEmail = ref(null)
const prefixOptions = ref([])
const contactPrefix = ref(null)
const contactPhone = ref(null)
const contactCity = ref(null)
const contactRegion = ref(null)
const contactCountry = ref(null)
const contactZip = ref(null)
const companyVat = ref(null)
const companyName = ref(null)
const companyEmail = ref(null)
const companyPrefix = ref(null)
const companyPhone = ref(null)
const companyCity = ref(null)
const companyRegion = ref(null)
const companyCountry = ref(null)
const companyZip = ref(null)

axios.get(buyersUrl).then((response) => {
  sellerOptions.value = response.data.results
})

for (let prefix of phonesPrefix) {
  prefixOptions.value.push({ id: prefix.dial_code, label: `${prefix.code} ${prefix.dial_code}` })
}

const serverOptions = ref({
  page: 1,
  rowsPerPage: 20
})

const extras = ref([])
const isFetchingExtras = ref(true)
const serverItemsLength = ref(0)
const headersExtras = [
  { text: 'Nombre', value: 'title' },
  { text: 'Descripción', value: 'description' },
  { text: 'Precio', value: 'price' },
  { text: 'Acciones', value: 'id', width: 40 }
]

const payments = ref([])
const paymentAmount = ref(null)
const paymentMonths = ref(null)
const paymentDues = ref(null)
const isFetchingPayments = ref(true)
const paymentType = ref(null)

const headersPayments = [
  { text: 'Forma de Pago', value: 'payment_type' },
  { text: 'Método de Pago', value: 'payment_method' },
  { text: 'Importe', value: 'amount' },
  { text: 'Acciones', value: 'id', width: 40 }
]

const comments = ref('')
const deliveryCity = ref(null)
const deliveryRegion = ref(null)
const deliveryCountry = ref(null)
const deliveryZip = ref(null)

const editMode = ref('')
const extraTitle = ref('')
const extraPrice = ref('')
const extraDescription = ref('')
const extraId = ref(null)
const modalId = ref(null)
const editModal = (id, mode) => {
  modalId.value = id
  if (mode === 0) {
    editMode.value = 'extras'
    axios
    .get(`${import.meta.env.VITE_SALES}/booking-extras/${id}/`)
    .then((response) => {
      extraTitle.value = response.data.title
      extraPrice.value = response.data.price
      extraDescription.value = response.data.description
      extraId.value = response.data.extra
      })
      .then(() => {
        edit.value.showModal()
      })
  }
  if (mode === 1) {
    editMode.value = 'extras'
    axios
      .get(`${import.meta.env.VITE_SALES}/payments/${id}/`)
      .then((response) => {
        console.log(response.data)
      })
      .then(() => {
        edit.value.showModal()
      })
  }
  edit.value.showModal()
}

const updateExtra = () => {
  axios
    .put(`${import.meta.env.VITE_SALES}/booking-extras/${modalId.value}/`, {
      title: extraTitle.value,
      price: extraPrice.value,
      description: extraDescription.value,
      booking: id.value,
      extra: extraId.value
    })
    .then(() => {
      getVehicle()
      edit.value.close()
    })
    .catch((error) => {
      console.error(error)
    })
}

const removeExtra = (id) => {
  axios
    .delete(`${import.meta.env.VITE_SALES}/booking-extras/${id}/`)
    .then(() => {
      getVehicle()
    })
    .catch((error) => {
      console.error(error)
    })
}

const removePayment = (id) => {
  axios
    .delete(`${import.meta.env.VITE_SALES}/payments/${id}/`)
    .then(() => {
      getVehicle()
    })
    .catch((error) => {
      console.error(error)
    })
}

onMounted(() => {
  getVehicle()
  axios
    .get(`${import.meta.env.VITE_SALES}/sale_documents/?booking=${id.value}`)
    .then((response) => {
      galleryDocs.value = response.data.results
    })
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
          <div v-if="editMode === 'extras'">
            <h3 class="text-lg font-bold">Editar Extra</h3>
            <div class="divider m-0"></div>
            <form @submit.prevent="updateExtra" class="flex flex-col">
              <TextInput label="Titulo:" v-model="extraTitle" />
              <TextInput label="Precio:" v-model="extraPrice" />
              <TextInput label="Descripción:" v-model="extraDescription" />
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
                <a class="font-bold" @click="tab = 'details'">Detalles</a>
                <ul v-scroll-spy-link v-scroll-spy-active="{ selector: 'li>a' }">
                  <li><a @click="tab = 'details'">Info. facturación</a></li>
                  <li><a @click="tab = 'details'">Extras</a></li>
                  <li><a @click="tab = 'details'">Más info</a></li>
                </ul>
              </li>
              <li><a class="font-bold" @click="tab = 'payments'">Pagos</a></li>
            </ul>
          </aside>
          <section class="flex w-full flex-1 flex-col">
            <div
              v-scroll-spy="{ offset: 120 }"
              v-if="tab === 'details'"
              class="flex w-full flex-col gap-8"
            >
              <div class="flex flex-col gap-4 rounded bg-base-100 p-4 lg:scroll-m-20">
                <h1 class="text-xl font-medium">Información de facturación</h1>
                <SelectInput
                  label="Vendedor:"
                  :options="sellerOptions"
                  :initialValue="null"
                  optionLabel="name"
                  v-model="seller"
                />
                <div>
                  <ToggleInput
                    label="Particular"
                    option="Empresa"
                    v-model="isCompany"
                    class="my-4 w-fit"
                  />
                  <div class="flex flex-col lg:grid lg:grid-cols-2 lg:gap-x-4">
                    <SelectInput
                      label="Tipo de documento:"
                      :options="options.idTypes"
                      v-model="contactId"
                    />
                    <TextInput label="Numero de documento:" v-model="contactIdNumber" required />
                    <TextInput label="Nombre:" v-model="contactName" />
                    <TextInput label="Apellido:" v-model="contactLastName" />
                    <TextInput label="Email:" v-model="contactEmail" required />
                    <label class="form-control w-full">
                      <div class="label">
                        <span class="label-text font-medium">Teléfono:</span>
                      </div>
                      <div class="flex flex-row gap-2">
                        <VueSelect
                          v-model="contactPrefix"
                          :reduce="(prefix) => prefix.id"
                          :options="prefixOptions"
                          class="w-60"
                        />
                        <input
                          type="text"
                          class="input input-bordered w-full"
                          v-model="contactPhone"
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
                      @place_changed="console.log('si')"
                      class="input input-bordered w-full"
                    >
                    </GMapAutocomplete>
                  </label>
                  <div class="flex flex-col lg:grid lg:grid-cols-2 lg:gap-x-4">
                    <TextInput label="Ciudad:" v-model="contactCity" />
                    <TextInput label="Provincia:" v-model="contactRegion" />
                    <TextInput label="País:" v-model="contactCountry" />
                    <TextInput label="Código Postal:" v-model="contactZip" />
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
                          <VueSelect v-model="companyPrefix" :options="phonesPre" class="w-60" />
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
                      <TextInput label="Provincia:" v-model="companyRegion" />
                      <TextInput label="País:" v-model="companyCountry" />
                      <TextInput label="Código Postal:" v-model="companyZip" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex flex-col gap-4 rounded bg-base-100 p-4 lg:scroll-m-20">
                <VehicleTable title="Extras" add @addBtn="drawerSection = 'extras'">
                  <template #content>
                    <EasyDataTable
                      class="table-dark table-striped"
                      table-class-name="z-0"
                      header-class-name="z-0"
                      hide-footer
                      border-cell
                      :headers="headersExtras"
                      :items="extras"
                      v-model:server-options="serverOptions"
                      :server-items-length="serverItemsLength"
                      :loading="isFetchingExtras"
                    >
                      <template v-slot:item-files="{ files }">
                        <div class="flex gap-2">
                          <a
                            v-for="(file, index) in files"
                            :key="index"
                            :href="file.file"
                            target="_blank"
                            class="btn btn-square btn-xs"
                          >
                            <Icon icon="mdi:download" />
                          </a>
                        </div>
                      </template>
                      <template v-slot:item-status="{ status }">
                        <span class="badge badge-primary rounded-md px-3 py-1 text-white">
                          {{ status.toUpperCase() }}
                        </span>
                      </template>
                      <template v-slot:item-id="{ id }">
                        <div class="w-14">
                          <button class="btn btn-square btn-xs mr-2" @click="editModal(id, 0)">
                            <Icon icon="mdi:pencil" />
                          </button>
                          <button class="btn btn-square btn-error btn-xs" @click="removeExtra(id)">
                            <Icon icon="mdi:trash-can-outline" />
                          </button>
                        </div>
                      </template>
                    </EasyDataTable>
                  </template>
                </VehicleTable>
              </div>
              <div class="flex flex-col gap-4 rounded bg-base-100 p-4 lg:scroll-m-20">
                <h2 class="text-xl font-medium">Más información</h2>
                <AreaInput label="Comentarios Comerciales:" v-model="comments" />
                <label class="form-control w-full">
                  <div class="label">
                    <span class="label-text font-medium">Dirección:</span>
                  </div>
                  <GMapAutocomplete
                    @place_changed="console.log('si')"
                    class="input input-bordered w-full"
                  >
                  </GMapAutocomplete>
                </label>
                <div class="flex flex-col lg:grid lg:grid-cols-2 lg:gap-x-4">
                  <TextInput label="Ciudad:" v-model="deliveryCity" />
                  <TextInput label="Provincia:" v-model="deliveryRegion" />
                  <TextInput label="País:" v-model="deliveryCountry" />
                  <TextInput label="Código Postal:" v-model="deliveryZip" />
                </div>
              </div>
            </div>
            <div v-else class="flex w-full flex-col gap-8">
              <div class="flex scroll-m-28 flex-col gap-4 rounded bg-base-100 p-4 lg:scroll-m-20">
                <h2 class="text-xl font-medium">Forma de pago</h2>
                <div class="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <SelectInput
                    label="Método de Pago:"
                    v-model="paymentType"
                    :options="options.paymentType"
                  />
                  <TextInput label="Importe a financiar:" v-model="paymentAmount" />
                  <TextInput label="Meses de financiación:" v-model="paymentMonths" />
                  <TextInput label="Cuotas mensuales:" v-model="paymentDues" />
                </div>
                <VehicleTable add title="Pagos">
                  <template #content>
                    <EasyDataTable
                      class="table-dark table-striped"
                      table-class-name="z-0"
                      header-class-name="z-0"
                      hide-footer
                      border-cell
                      :headers="headersPayments"
                      :items="payments"
                      v-model:server-options="serverOptions"
                      :server-items-length="serverItemsLength"
                      :loading="isFetchingPayments"
                    >
                      <template v-slot:item-payment_type="{ payment_type }">
                        <span v-if="payment_type == 'counted'"> Contado </span>
                        <span v-else> Financiado </span>
                      </template>
                      <template v-slot:item-payment_method="{ payment_method }">
                        <span v-if="payment_method == 'cash'"> Efectivo </span>
                        <span v-if="payment_method == 'card'"> Tarjeta </span>
                        <span v-if="payment_method == 'transfer'"> Transferencia </span>
                        <span v-if="payment_method == 'vehicle_exchange'"> Vehículo a cambio </span>
                      </template>
                      <template v-slot:item-amount="{ amount }">
                        <span> {{ amount }} € </span>
                      </template>
                      <template v-slot:item-id="{ id }">
                        <div class="w-14">
                          <button class="btn btn-square btn-xs mr-2" @click="editModal(id, 1)">
                            <Icon icon="mdi:pencil" />
                          </button>
                          <button
                            class="btn btn-square btn-error btn-xs"
                            @click="removePayment(id)"
                          >
                            <Icon icon="mdi:trash-can-outline" />
                          </button>
                        </div>
                      </template>
                    </EasyDataTable>
                  </template>
                </VehicleTable>
              </div>
            </div>
          </section>
          <aside class="flex flex-col gap-8">
            <div class="hidden h-fit max-w-lg flex-col gap-4 rounded bg-base-100 p-4 lg:flex">
              <div>
                <h2 class="text-xl font-medium">Resumen de compra</h2>
                <div class="divider m-0"></div>
              </div>
              <div class="text-base [&_div]:mt-1 [&_div]:grid [&_div]:grid-cols-3">
                <div v-if="vehicle.form_of_payment_type === 1">
                  <span> Precio de compra: </span>
                  <span class="mr-2 text-right"> {{ vehicle.price }} </span>
                  <span> Financiado </span>
                </div>
                <div v-else>
                  <span> Precio de compra: </span>
                  <span class="mr-2 text-right"> {{ vehicle.price }} </span>
                  <span> Contado </span>
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
              </div>
              <div class="divider m-0"></div>
              <div class="text-base [&_div]:mt-1 [&_div]:grid [&_div]:grid-cols-3">
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
            </div>
            <template v-for="payment of vehicle.payments" :key="payment.id">
              <div
                v-if="
                  payment.payment_method === 'vehicle_exchange' && payment.form_of_payment_vehicle
                "
                class="hidden h-fit max-w-lg flex-col gap-4 rounded bg-base-100 p-4 lg:flex"
              >
                <div>
                  <h2 class="text-xl font-medium">Vehiculo a comprar</h2>
                  <div class="divider m-0"></div>
                </div>
                <div class="grid grid-cols-2 gap-4 text-base">
                  <div class="flex flex-col">
                    <span class="font-bold"> Marca: </span>
                    <span>
                      {{ payment.form_of_payment_vehicle.brand_details }}
                    </span>
                  </div>
                  <div class="flex flex-col">
                    <span class="font-bold"> Modelo: </span>
                    <span>
                      {{ payment.form_of_payment_vehicle.model_details }}
                    </span>
                  </div>
                  <!-- <div class="flex flex-col">
                    <span class="font-bold"> Versión: </span>
                    <span> falta en la api </span>
                  </div> -->
                  <div class="flex flex-col">
                    <span class="font-bold"> Bastidor: </span>
                    <span>
                      {{ payment.form_of_payment_vehicle.vin }}
                    </span>
                  </div>
                  <div class="flex flex-col">
                    <span class="font-bold"> Matricula: </span>
                    <span>
                      {{ payment.form_of_payment_vehicle.plate }}
                    </span>
                  </div>
                  <div class="flex flex-col">
                    <span class="font-bold"> Kms: </span>
                    <span>
                      {{ payment.form_of_payment_vehicle.kms }}
                    </span>
                  </div>
                  <div class="flex flex-col">
                    <span class="font-bold"> Cambios: </span>
                    <span>
                      {{ payment.form_of_payment_vehicle.gearbox_details }}
                    </span>
                  </div>
                  <div class="flex flex-col">
                    <span class="font-bold"> Combustible: </span>
                    <span>
                      {{ payment.form_of_payment_vehicle.fuel_details }}
                    </span>
                  </div>
                  <div class="flex flex-col">
                    <span class="font-bold"> Valoración: </span>
                    <span> {{ payment.form_of_payment_vehicle.price }} € </span>
                  </div>
                </div>
              </div>
            </template>
            <div class="hidden h-fit max-w-lg flex-col gap-4 rounded bg-base-100 p-4 lg:flex">
              <div>
                <h2 class="text-xl font-medium">Documentos</h2>
                <div class="divider m-0"></div>
              </div>
              <div
                v-for="doc in galleryDocs"
                :key="doc.id"
                class="card card-side m-3 bg-base-100 shadow-xl"
              >
                <div class="card-body flex-row justify-between p-4">
                  <div class="flex gap-2">
                    <span class="badge badge-primary capitalize">{{ doc.status }}</span>
                    <span class="text-sm">{{ doc.date_parsed }}</span>
                    <span class="text-sm">{{ doc.sent_to }}</span>
                  </div>
                  <div class="self flex gap-2">
                    <button class="btn btn-square btn-error btn-sm" @click="console.log(doc.id)">
                      <Icon icon="mdi:delete" width="20" />
                    </button>
                  </div>
                </div>
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
      <ul class="menu min-h-full w-screen bg-white p-4 text-base-content lg:w-96 justify-between">
        <ExtrasDrawer v-if="drawerSection === 'extras'" :toggle="toggleDrawer" />
      </ul>
    </div>
  </div>
</template>

<style scoped>
.active {
  background-color: #dcdddf !important;
  color: black !important;
  font-weight: 600;
}
</style>
