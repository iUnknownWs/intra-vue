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
import PaymentDrawer from '@/components/Reserva/PaymentDrawer.vue'
import PaymentsDrawer from '@/components/Reserva/PaymentsDrawer.vue'
import CardMobile from '@/components/Reserva/CardMobile.vue'
import DocumentDrawer from '@/components/Reserva/DocumentDrawer.vue'
import DeliveryDrawer from '@/components/Reserva/DeliveryDrawer.vue'

axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('token')}`

const route = useRoute()
const id = ref(route.params.id)
const url = `${import.meta.env.VITE_SALES}/bookings/${id.value}`
const buyersUrl = `${import.meta.env.VITE_API}/buyers/`
const galleryDocs = ref([])
const loading = ref(true)
const vehicle = ref({})
const tab = ref('details')
const isCompany = ref(false)
const extras = ref([])

const tab1 = ref(null)
const tab2 = ref(null)
const tab3 = ref(null)
const tabs = [tab1, tab2, tab3]
const navBtn1 = ref(null)
const navBtn2 = ref(null)
const navBtn3 = ref(null)
const navBtn4 = ref(null)
const navBtns = [navBtn1, navBtn2, navBtn3, navBtn4]

const billingDiv = ref(null)
const extrasDiv = ref(null)
const infoDiv = ref(null)

const tabEvent = (tabSelected) => {
  for (let tab of tabs) {
    tab.value.classList.remove('tab-active')
  }
  if (tabSelected === 1) {
    tab1.value.classList.add('tab-active')
    billingDiv.value.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
  }
  if (tabSelected === 2) {
    extrasDiv.value.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
    tab2.value.classList.add('tab-active')
  }
  if (tabSelected === 3) {
    infoDiv.value.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
    tab3.value.classList.add('tab-active')
  }
}

const navEvent = (tabSelected) => {
  for (let btn of navBtns) {
    btn.value.classList.remove('active')
  }
  if (tabSelected === 1) {
    navBtn1.value.classList.add('active')
    tab.value = 'summary'
  }
  if (tabSelected === 2) {
    navBtn2.value.classList.add('active')
    tab.value = 'details'
  }
  if (tabSelected === 3) {
    navBtn3.value.classList.add('active')
    tab.value = 'payments'
  }
  if (tabSelected === 4) {
    navBtn4.value.classList.add('active')
    tab.value = 'docs'
  }
}

const edit = ref(null)
const info = ref(null)
const confirm = ref(null)
const modalTitle = ref('')
const modalMessage = ref('')

const docusignComments = ref('')

const getVehicle = () => {
  loading.value = true
  isFetchingExtras.value = true
  axios
    .get(url)
    .then((response) => {
      vehicle.value = response.data
      seller.value = vehicle.value.seller
      comments.value = vehicle.value.additional_info
      docusignComments.value = vehicle.value.additional_comments_whithout_warranty
      contactId.value = vehicle.value.contact_document_type
      contactIdNumber.value = vehicle.value.contact_document_id
      contactName.value = vehicle.value.contact_first_name
      contactLastName.value = vehicle.value.contact_last_name
      contactEmail.value = vehicle.value.contact_email
      contactPrefix.value = vehicle.value.contact_phone_prefix
      contactPhone.value = vehicle.value.contact_phone
      contactAddress.value = vehicle.value.contact_address
      contactCity.value = vehicle.value.contact_city
      contactRegion.value = vehicle.value.contact_region
      contactCountry.value = vehicle.value.contact_country
      contactZip.value = vehicle.value.contact_postal_code
      if (vehicle.value?.buyer_company) {
        isCompany.value = true
      }
      companyVat.value = vehicle.value?.buyer_company?.vat
      companyName.value = vehicle.value?.buyer_company?.name
      companyEmail.value = vehicle.value?.buyer_company?.email
      companyPrefix.value = vehicle.value?.buyer_company?.phone_prefix
      companyPhone.value = vehicle.value?.buyer_company?.phone
      companyAddress.value = vehicle.value?.buyer_company?.address.address
      companyCity.value = vehicle.value?.buyer_company?.address.city
      companyRegion.value = vehicle.value?.buyer_company?.address.region
      companyCountry.value = vehicle.value?.buyer_company?.address.country
      companyZip.value = vehicle.value?.buyer_company?.address.postal_code
      vehicleExtras.value = vehicle.value.extras
      isFetchingExtras.value = false
      deliveryAddress.value = vehicle.value.delivery_address
      deliveryCity.value = vehicle.value.delivery_city
      deliveryRegion.value = vehicle.value.delivery_province
      deliveryCountry.value = vehicle.value.delivery_country
      deliveryZip.value = vehicle.value.delivery_postal_code
      payments.value = vehicle.value.payments
      isFetchingPayments.value = false
      paymentType.value = vehicle.value.form_of_payment_type.toString()
      paymentAmount.value = vehicle.value.form_of_payment_financed_price
      paymentMonths.value = vehicle.value.form_of_payment_financed_amount_fees
      paymentDues.value = vehicle.value.form_of_payment_financed_fee
      axios
        .get(`${import.meta.env.VITE_API}/vehicles-extras/?vehicle__in=${vehicle.value.vehicle.id}`)
        .then((response) => {
          extras.value = response.data.results
        })
    })
    .catch((error) => {
      console.error(error)
    })
    .finally(() => {
      loading.value = false
    })
}

const updateData = () => {
  loading.value = true
  axios
    .patch(url, {
      seller: seller.value,
      additional_info: comments.value,
      contact_document_type: contactId.value,
      contact_document_id: contactIdNumber.value,
      contact_first_name: contactName.value,
      contact_last_name: contactLastName.value,
      contact_email: contactEmail.value,
      contact_phone_prefix: contactPrefix.value,
      contact_phone: contactPhone.value,
      contact_address: contactAddress.value,
      contact_city: contactCity.value,
      contact_region: contactRegion.value,
      contact_country: contactCountry.value,
      contact_postal_code: contactZip.value,
      buyer_company: {
        vat: companyVat.value,
        name: companyName.value,
        email: companyEmail.value,
        phone_prefix: companyPrefix.value,
        phone: companyPhone.value,
        address: {
          address: companyAddress.value,
          city: companyCity.value,
          region: companyRegion.value,
          country: companyCountry.value,
          postal_code: companyZip.value
        }
      },
      delivery_address: deliveryAddress.value,
      delivery_city: deliveryCity.value,
      delivery_province: deliveryRegion.value,
      delivery_country: deliveryCountry.value,
      delivery_postal_code: deliveryZip.value
    })
    .then((response) => {
      console.log(response)
      modalTitle.value = 'Información actualizada'
      modalMessage.value = 'La información ha sido actualizada con éxito'
      info.value.modal.showModal()
    })
    .catch((error) => {
      console.error(error)
      modalTitle.value = 'Error'
      modalMessage.value = 'Se ha producido un error al intentar actualizar la información'
      info.value.modal.showModal()
    })
    .finally(() => {
      loading.value = false
    })
}

const scrollDown = ref(false)
const scrollTop = ref(true)
const drawer = ref(false)
const drawerSection = ref('')

const docuDrawer = () => {
  drawerSection.value = 'document'
  drawer.value = true
}

const deliDrawer = () => {
  drawerSection.value = 'delivery'
  drawer.value = true
}

const extraDrawer = () => {
  drawerSection.value = 'extras'
  drawer.value = true
}

const toggleDrawer = () => {
  drawer.value = !drawer.value
}

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
const contactAddress = ref(null)
const contactCity = ref(null)
const contactRegion = ref(null)
const contactCountry = ref(null)
const contactZip = ref(null)
const companyVat = ref(null)
const companyName = ref(null)
const companyEmail = ref(null)
const companyPrefix = ref(null)
const companyPhone = ref(null)
const companyAddress = ref(null)
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

const addressFull = ref([])
const setContactPlace = (place) => {
  addressFull.value = place.address_components
  contactAddress.value = place.formatted_address
  for (let address of addressFull.value) {
    if (address.types.includes('locality')) {
      contactCity.value = address.long_name
    }
    if (address.types.includes('administrative_area_level_1')) {
      contactRegion.value = address.long_name
    }
    if (address.types.includes('country')) {
      contactCountry.value = address.long_name
    }
    if (address.types.includes('postal_code')) {
      contactZip.value = address.long_name
    }
  }
}

const setCompanyPlace = (place) => {
  addressFull.value = place.address_components
  companyAddress.value = place.formatted_address
  for (let address of addressFull.value) {
    if (address.types.includes('locality')) {
      companyCity.value = address.long_name
    }
    if (address.types.includes('administrative_area_level_1')) {
      companyRegion.value = address.long_name
    }
    if (address.types.includes('country')) {
      companyCountry.value = address.long_name
    }
    if (address.types.includes('postal_code')) {
      companyZip.value = address.long_name
    }
  }
}

const setDeliveryPlace = (place) => {
  addressFull.value = place.address_components
  deliveryAddress.value = place.formatted_address
  for (let address of addressFull.value) {
    if (address.types.includes('locality')) {
      deliveryCity.value = address.long_name
    }
    if (address.types.includes('administrative_area_level_1')) {
      deliveryRegion.value = address.long_name
    }
    if (address.types.includes('country')) {
      deliveryCountry.value = address.long_name
    }
    if (address.types.includes('postal_code')) {
      deliveryZip.value = address.long_name
    }
  }
}

const serverOptions = ref({
  page: 1,
  rowsPerPage: 20
})

const vehicleExtras = ref([])
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
const paymentId = ref(null)
const loadingPayment = ref(false)

const updatePayments = () => {
  loadingPayment.value = true
  axios
    .patch(`${import.meta.env.VITE_SALES}/bookings/${id.value}/`, {
      form_of_payment_type: paymentType.value,
      form_of_payment_financed_price: paymentAmount.value,
      form_of_payment_financed_amount_fees: paymentMonths.value,
      form_of_payment_financed_fee: paymentDues.value
    })
    .then(() => {
      getVehicle()
      modalTitle.value = 'Pago actualizado'
      modalMessage.value = 'El pago ha sido actualizado con éxito'
      info.value.modal.showModal()
    })
    .catch((error) => {
      console.error(error)
      modalTitle.value = 'Error'
      modalMessage.value = 'No se pudo actualizar el pago'
      info.value.modal.showModal()
    })
    .finally(() => {
      loadingPayment.value = false
    })
}

const payment = ref({})

const paymentDrawer = (id) => {
  axios.get(`${import.meta.env.VITE_SALES}/payments/${id}/`).then((response) => {
    payment.value = response.data
    drawerSection.value = 'payment'
    paymentId.value = id
    toggleDrawer()
  })
}

const headersPayments = [
  { text: 'Forma de Pago', value: 'payment_type' },
  { text: 'Método de Pago', value: 'payment_method' },
  { text: 'Importe', value: 'amount' },
  { text: 'Acciones', value: 'id', width: 40 }
]

const comments = ref('')
const deliveryAddress = ref(null)
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
  edit.value.showModal()
}

const loadingExtra = ref(false)

const updateExtra = () => {
  loadingExtra.value = true
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
      modalTitle.value = 'Extra actualizado'
      modalMessage.value = 'El extra ha sido actualizado con éxito'
      info.value.modal.showModal()
    })
    .catch((error) => {
      console.error(error)
      modalTitle.value = 'Error'
      modalMessage.value = 'No se pudo actualizar el extra'
      info.value.modal.showModal()
    })
    .finally(() => {
      loadingExtra.value = false
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
  let prev = window.scrollY

  window.addEventListener('scroll', () => {
    let current = window.scrollY
    if (prev > current) {
      scrollDown.value = false
      scrollTop.value = true
    } else {
      scrollDown.value = true
      scrollTop.value = false
    }
    prev = current
  })

  axios
    .get(`${import.meta.env.VITE_SALES}/sale_documents/?booking=${id.value}`)
    .then((response) => {
      galleryDocs.value = response.data.results
    })
  getVehicle()
})
</script>

<template>
  <div class="drawer drawer-end">
    <input id="reserve-drawer" type="checkbox" class="drawer-toggle" v-model="drawer" />
    <div class="drawer-content">
      <ModalInfo class="w-full" ref="info" :title="modalTitle" :message="modalMessage" />
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
                <LoadingSpinner v-if="loadingExtra" />
                <span v-else class="font-semibold text-white">Guardar</span>
              </button>
            </form>
          </div>
        </div>
      </dialog>
      <HeaderMain class="pb-16">
        <div
          v-if="tab === 'details'"
          role="tablist"
          class="tabs tabs-bordered sticky top-[4rem] z-10 h-fit text-nowrap bg-base-100 py-2 xl:hidden [&_a]:text-base-200"
        >
          <a ref="tab1" role="tab" class="tab tab-active" @click="tabEvent(1)">Info facturación</a>
          <a ref="tab2" role="tab" class="tab" @click="tabEvent(2)">Extras</a>
          <a ref="tab3" role="tab" class="tab" @click="tabEvent(3)">Más info</a>
        </div>
        <div class="flex flex-row gap-8 p-3 xl:p-0">
          <aside class="sticky top-[4rem] hidden h-min max-w-64 rounded bg-white xl:block">
            <ul class="menu menu-sm w-56 rounded-box bg-white">
              <li>
                <a class="font-bold" @click="tab = 'details'">Detalles</a>
                <ul v-scroll-spy-link v-scroll-spy-active="{ selector: 'li>a.menu-item' }">
                  <li>
                    <a @click="tab = 'details'" :class="{ 'menu-item': tab === 'details' }">
                      Info. facturación
                    </a>
                  </li>
                  <li>
                    <a @click="tab = 'details'" :class="{ 'menu-item': tab === 'details' }">
                      Extras
                    </a>
                  </li>
                  <li>
                    <a @click="tab = 'details'" :class="{ 'menu-item': tab === 'details' }">
                      Más info
                    </a>
                  </li>
                </ul>
              </li>
              <li><a class="font-bold" @click="tab = 'payments'">Pagos</a></li>
            </ul>
          </aside>
          <div class="flex w-full flex-col gap-6 xl:mx-auto xl:w-fit">
            <header class="mt-3 flex flex-col items-center justify-center xl:h-[250px]">
              <LoadingSpinner v-if="loading" class="loading-lg" />
              <template v-else>
                <CardDetails
                  :reserve="vehicle"
                  :getData="getVehicle"
                  @docuDrawer="docuDrawer"
                  @deliverBtn="deliDrawer"
                />
                <CardMobile :reserve="vehicle" />
              </template>
            </header>
            <div class="mb-4 flex flex-col gap-6 xl:flex-row">
              <section class="flex w-[700px] flex-1 flex-col">
                <div
                  v-scroll-spy="{ offset: 120 }"
                  v-if="tab === 'details'"
                  class="flex w-fit flex-col gap-8"
                >
                  <div
                    ref="billingDiv"
                    class="flex scroll-m-28 flex-col gap-4 rounded bg-white p-4 xl:scroll-m-20"
                  >
                    <h1 class="text-xl font-bold">Información de facturación</h1>
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
                      <div class="flex flex-col xl:grid xl:grid-cols-2 xl:gap-x-4">
                        <SelectInput
                          label="Tipo de documento:"
                          :options="options.idTypes"
                          v-model="contactId"
                        />
                        <TextInput
                          label="Numero de documento:"
                          v-model="contactIdNumber"
                          required
                        />
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
                          @place_changed="setContactPlace"
                          class="input input-bordered w-full"
                        >
                        </GMapAutocomplete>
                      </label>
                      <div class="flex flex-col xl:grid xl:grid-cols-2 xl:gap-x-4">
                        <TextInput label="Ciudad:" v-model="contactCity" />
                        <TextInput label="Provincia:" v-model="contactRegion" />
                        <TextInput label="País:" v-model="contactCountry" />
                        <TextInput label="Código Postal:" v-model="contactZip" />
                      </div>
                      <div v-if="isCompany" class="mt-8">
                        <h2 class="text-xl font-bold">Información de la empresa</h2>
                        <div class="mt-4 flex flex-col xl:grid xl:grid-cols-2 xl:gap-x-4">
                          <TextInput label="VAT:" v-model="companyVat" />
                          <TextInput label="Nombre:" v-model="companyName" />
                          <TextInput label="Email:" v-model="companyEmail" />
                          <label class="form-control w-full">
                            <div class="label">
                              <span class="label-text font-medium">Teléfono:</span>
                            </div>
                            <div class="flex flex-row gap-2">
                              <VueSelect
                                v-model="companyPrefix"
                                :options="prefixOptions"
                                :reduce="(prefix) => prefix.id"
                                class="w-60"
                              />
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
                        <div class="flex flex-col xl:grid xl:grid-cols-2 xl:gap-x-4">
                          <TextInput label="Ciudad:" v-model="companyCity" />
                          <TextInput label="Provincia:" v-model="companyRegion" />
                          <TextInput label="País:" v-model="companyCountry" />
                          <TextInput label="Código Postal:" v-model="companyZip" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    ref="extrasDiv"
                    class="flex scroll-m-28 flex-col gap-4 rounded bg-white p-4 xl:scroll-m-20"
                  >
                    <VehicleTable title="Extras" add @addBtn="extraDrawer">
                      <template #content>
                        <EasyDataTable
                          class="table-dark table-striped"
                          table-class-name="z-0"
                          header-class-name="z-0"
                          hide-footer
                          :headers="headersExtras"
                          :items="vehicleExtras"
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
                              <button
                                class="btn btn-square btn-secondary btn-xs mr-2"
                                @click="editModal(id, 0)"
                              >
                                <Icon icon="mdi:pencil" />
                              </button>
                              <button
                                class="btn btn-square btn-error btn-xs"
                                @click="removeExtra(id)"
                              >
                                <Icon icon="mdi:trash-can-outline" />
                              </button>
                            </div>
                          </template>
                        </EasyDataTable>
                      </template>
                    </VehicleTable>
                  </div>
                  <div
                    ref="infoDiv"
                    class="flex scroll-m-28 flex-col gap-4 rounded bg-white p-4 xl:scroll-m-20"
                  >
                    <h2 class="text-xl font-bold">Más información</h2>
                    <AreaInput label="Comentarios Comerciales:" v-model="comments" />
                    <label class="form-control w-full">
                      <div class="label">
                        <span class="label-text font-medium">Dirección:</span>
                      </div>
                      <GMapAutocomplete
                        @place_changed="setDeliveryPlace"
                        class="input input-bordered w-full"
                      >
                      </GMapAutocomplete>
                    </label>
                    <div class="flex flex-col xl:grid xl:grid-cols-2 xl:gap-x-4">
                      <TextInput label="Ciudad:" v-model="deliveryCity" />
                      <TextInput label="Provincia:" v-model="deliveryRegion" />
                      <TextInput label="País:" v-model="deliveryCountry" />
                      <TextInput label="Código Postal:" v-model="deliveryZip" />
                    </div>
                  </div>
                </div>
                <div
                  v-else-if="tab === 'payments'"
                  class="flex w-full flex-col gap-4"
                >
                  <div class="flex scroll-m-28 flex-col rounded bg-white p-4 xl:scroll-m-20">
                    <h2 class="mb-4 text-xl font-bold">Forma de pago</h2>
                    <SelectInput
                      label="Método de Pago:"
                      v-model="paymentType"
                      :options="options.paymentType"
                      :initialValue="null"
                    />
                    <div v-if="paymentType !== '0'" class="grid grid-cols-1 gap-4 xl:grid-cols-3">
                      <TextInput label="Importe a financiar:" v-model="paymentAmount" />
                      <TextInput label="Meses de financiación:" v-model="paymentMonths" />
                      <TextInput label="Cuotas mensuales:" v-model="paymentDues" />
                    </div>
                    <button
                      class="btn btn-primary mt-4 w-fit self-end text-white"
                      @click="updatePayments"
                    >
                      <LoadingSpinner v-if="loadingPayment" />
                      <span v-else class="font-semibold text-white">Guardar</span>
                    </button>
                  </div>
                  <div class="flex scroll-m-28 flex-col gap-4 rounded bg-white p-4 xl:scroll-m-20">
                    <VehicleTable add title="Pagos" @addBtn="drawerSection = 'payments'">
                      <template #content>
                        <EasyDataTable
                          class="table-dark table-striped"
                          table-class-name="z-0"
                          header-class-name="z-0"
                          hide-footer
                          :headers="headersPayments"
                          :items="payments"
                          v-model:server-options="serverOptions"
                          :server-items-length="serverItemsLength"
                          :loading="isFetchingPayments"
                        >
                          <template v-slot:item-payment_type="{ payment_type }">
                            <span v-if="payment_type == 'counted'"> Contado </span>
                            <span v-else-if="payment_type == 'booking_pre_order_payment'">
                              Pago reservado
                            </span>
                            <span v-else> Financiado </span>
                          </template>
                          <template v-slot:item-payment_method="{ payment_method }">
                            <span v-if="payment_method == 'cash'"> Efectivo </span>
                            <span v-if="payment_method == 'card'"> Tarjeta </span>
                            <span v-if="payment_method == 'transfer'"> Transferencia </span>
                            <span v-if="payment_method == 'vehicle_exchange'">
                              Vehículo a cambio
                            </span>
                          </template>
                          <template v-slot:item-amount="{ amount }">
                            <span> {{ amount }} € </span>
                          </template>
                          <template v-slot:item-id="{ id }">
                            <div class="w-14">
                              <button
                                class="btn btn-square btn-secondary btn-xs mr-2"
                                @click="paymentDrawer(id)"
                              >
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
                <div v-else-if="tab === 'summary'" class="flex w-full flex-col gap-4">
                  <div class="flex h-fit flex-col gap-2 rounded bg-white p-4">
                    <div>
                      <h2 class="text-xl font-bold">Resumen de compra</h2>
                      <div class="divider m-0"></div>
                    </div>
                    <div
                      class="flex flex-col gap-2 text-base [&>div]:flex-row [&>div]:justify-between [&_div]:flex"
                    >
                      <div v-if="vehicle.form_of_payment_type === 1">
                        <div class="flex-col">
                          <span class="font-medium"> Precio de compra: </span>
                          <span class="text-base-200"> Financiado </span>
                        </div>
                        <span class="font-medium"> {{ vehicle.price }} € </span>
                      </div>
                      <div v-else>
                        <div class="flex-col">
                          <span class="font-medium"> Precio de compra: </span>
                          <span class="text-base-200"> Contado </span>
                        </div>
                        <span class="font-medium"> {{ vehicle.price }} € </span>
                      </div>
                      <div v-for="extra of vehicle.extras" :key="extra.id">
                        <div class="flex-col">
                          <span class="font-medium"> Extra: </span>
                          <span class="text-base-200"> {{ extra.title }} </span>
                        </div>
                        <span class="font-medium"> {{ extra.price }} € </span>
                      </div>
                      <div v-for="discount of vehicle.discounts" :key="discount.id">
                        <div class="flex-col">
                          <span class="font-medium"> Descuento: </span>
                          <span class="text-base-200"> {{ discount.title }} </span>
                        </div>
                        <span v-if="discount?.amount_fix" class="font-medium">
                          {{ discount.amount_fix }} €
                        </span>
                        <span v-if="discount?.amount_percent" class="font-medium">
                          {{ discount.amount_percent }} %
                        </span>
                      </div>
                      <div>
                        <span class="text-lg font-bold"> Precio final: </span>
                        <span class="font-bold">{{ vehicle.final_price }} €</span>
                      </div>
                    </div>
                    <div class="divider m-0"></div>
                    <div
                      class="flex flex-col gap-2 text-base [&>div]:flex-row [&_div]:flex [&_div]:justify-between"
                    >
                      <div v-for="payment of vehicle.payments" :key="payment.id">
                        <div class="flex-col">
                          <span class="font-medium"> Importe de reserva: </span>
                          <span class="text-base-200" v-if="payment.payment_method === 'card'">
                            Tarjeta
                          </span>
                          <span class="text-base-200" v-if="payment.payment_method === 'transfer'">
                            Transferencia
                          </span>
                          <span class="text-base-200" v-if="payment.payment_method === 'cash'">
                            Contado
                          </span>
                          <span
                            class="text-base-200"
                            v-if="payment.payment_method === 'vehicle_exchange'"
                          >
                            Vehiculo a cambio
                          </span>
                        </div>
                        <span class="font-medium"> {{ payment.amount }} € </span>
                      </div>
                      <div>
                        <span class="font-bold"> Importe pendiente: </span>
                        <span class="mr-2 text-right font-bold">
                          {{ vehicle.pending_booking_amount }} €
                        </span>
                      </div>
                    </div>
                  </div>
                  <template v-for="payment of vehicle.payments" :key="payment.id">
                    <div
                      v-if="
                        payment.payment_method === 'vehicle_exchange' &&
                        payment.form_of_payment_vehicle
                      "
                      class="flex h-fit max-w-lg flex-col gap-4 rounded bg-base-100 p-4"
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
                </div>
                <div v-else class="flex w-full flex-col gap-4">
                  <div class="flex h-fit flex-col gap-4 rounded bg-white p-4">
                    <div>
                      <h2 class="text-xl font-medium">Documentos</h2>
                      <div class="divider m-0"></div>
                    </div>
                    <div class="mx-auto grid grid-cols-1 gap-4 lg:grid-cols-2">
                      <div
                        v-for="doc in galleryDocs"
                        :key="doc.id"
                        class="card card-side max-w-lg bg-base-100 shadow-xl"
                      >
                        <div class="card-body flex-row items-center justify-between p-4">
                          <div class="flex w-full flex-row gap-2 text-wrap xl:flex-row">
                            <div class="flex flex-row items-center gap-3">
                              <span
                                class="badge badge-primary font-semibold capitalize text-white"
                                >{{ doc.status }}</span
                              >
                              <span class="text-sm">{{ doc.date_parsed }}</span>
                            </div>
                            <span class="text-sm">{{ doc.sent_to }}</span>
                          </div>
                          <div>
                            <button
                              class="btn btn-square btn-error btn-sm"
                              @click="console.log(doc.id)"
                            >
                              <Icon icon="mdi:delete" width="20" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <aside class="flex w-[520px] max-w-xl flex-col gap-8">
                <div class="hidden h-fit w-full flex-col gap-2 rounded bg-white p-4 xl:flex">
                  <div>
                    <h2 class="text-xl font-bold">Resumen de compra</h2>
                    <div class="divider m-0"></div>
                  </div>
                  <div
                    class="flex flex-col gap-2 text-base [&>div]:flex-row [&>div]:justify-between [&_div]:flex"
                  >
                    <div v-if="vehicle.form_of_payment_type === 1">
                      <div class="flex-col">
                        <span class="font-medium"> Precio de compra: </span>
                        <span class="text-base-200"> Financiado </span>
                      </div>
                      <span class="font-medium"> {{ vehicle.price }} € </span>
                    </div>
                    <div v-else>
                      <div class="flex-col">
                        <span class="font-medium"> Precio de compra: </span>
                        <span class="text-base-200"> Contado </span>
                      </div>
                      <span class="font-medium"> {{ vehicle.price }} € </span>
                    </div>
                    <div v-for="extra of vehicle.extras" :key="extra.id">
                      <div class="flex-col">
                        <span class="font-medium"> Extra: </span>
                        <span class="text-base-200"> {{ extra.title }} </span>
                      </div>
                      <span class="font-medium"> {{ extra.price }} € </span>
                    </div>
                    <div v-for="discount of vehicle.discounts" :key="discount.id">
                      <div class="flex-col">
                        <span class="font-medium"> Descuento: </span>
                        <span class="text-base-200"> {{ discount.title }} </span>
                      </div>
                      <span v-if="discount.amount_fix" class="font-medium">
                        {{ discount.amount_fix }}€
                      </span>
                      <span v-if="discount.amount_percent" class="font-medium">
                        {{ discount.amount_percent }}%
                      </span>
                    </div>
                    <div>
                      <span class="text-lg font-bold"> Precio final: </span>
                      <span class="font-bold">{{ vehicle.final_price }} €</span>
                    </div>
                  </div>
                  <div class="divider m-0"></div>
                  <div
                    class="flex flex-col gap-2 text-base [&>div]:flex-row [&_div]:flex [&_div]:justify-between"
                  >
                    <div v-for="payment of vehicle.payments" :key="payment.id">
                      <div class="flex-col">
                        <span class="font-medium"> Importe de reserva: </span>
                        <span class="text-base-200" v-if="payment.payment_method === 'card'">
                          Tarjeta
                        </span>
                        <span class="text-base-200" v-if="payment.payment_method === 'transfer'">
                          Transferencia
                        </span>
                        <span class="text-base-200" v-if="payment.payment_method === 'cash'">
                          Contado
                        </span>
                        <span
                          class="text-base-200"
                          v-if="payment.payment_method === 'vehicle_exchange'"
                        >
                          Vehiculo a cambio
                        </span>
                      </div>
                      <span class="font-medium"> {{ payment.amount }} € </span>
                    </div>
                    <div>
                      <span class="font-bold"> Importe pendiente: </span>
                      <span class="mr-2 text-right font-bold">
                        {{ vehicle.pending_booking_amount }} €
                      </span>
                    </div>
                  </div>
                </div>
                <template v-for="payment of vehicle.payments" :key="payment.id">
                  <div
                    v-if="
                      payment.payment_method === 'vehicle_exchange' &&
                      payment.form_of_payment_vehicle
                    "
                    class="hidden h-fit max-w-lg flex-col gap-4 rounded bg-base-100 p-4 xl:flex"
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
                <div
                  v-if="galleryDocs?.length > 0"
                  class="hidden h-fit max-w-lg flex-col gap-4 rounded bg-white p-4 xl:flex"
                >
                  <div>
                    <h2 class="text-xl font-medium">Documentos</h2>
                    <div class="divider m-0"></div>
                  </div>
                  <div
                    v-for="doc in galleryDocs"
                    :key="doc.id"
                    class="card card-side m-3 bg-base-100 shadow-xl"
                  >
                    <div class="card-body flex-row items-center justify-between p-4">
                      <div class="flex gap-2">
                        <span class="badge badge-primary font-medium capitalize text-white">
                          {{ doc.status }}
                        </span>
                        <span class="text-sm">{{ doc.date_parsed }}</span>
                        <span class="text-sm">{{ doc.sent_to }}</span>
                      </div>
                      <div class="self flex gap-2">
                        <button
                          class="btn btn-square btn-error btn-sm"
                          @click="console.log(doc.id)"
                        >
                          <Icon icon="mdi:delete" width="20" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </HeaderMain>
      <footer class="fixed bottom-0 z-50 bg-white">
        <div class="btm-nav z-10 hidden bg-white xl:flex">
          <div class="mr-4 flex flex-row justify-end">
            <button class="btn btn-primary max-w-24 text-white" @click="updateData">
              <LoadingSpinner v-if="loading" />
              <span v-else class="font-semibold" @click="updateData">Guardar</span>
            </button>
          </div>
        </div>
        <div v-show="scrollTop" class="btm-nav bg-white xl:hidden">
          <button ref="navBtn1" @click="navEvent(1)">
            <Icon icon="mdi:car" width="30" />
            <span class="btm-nav-label">Resumen</span>
          </button>
          <button ref="navBtn2" @click="navEvent(2)" class="active">
            <Icon icon="mdi:account-details" width="30" />
            <span class="btm-nav-label">Detalles</span>
          </button>
          <button ref="navBtn3" @click="navEvent(3)">
            <Icon icon="mdi:payment" width="30" />
            <span class="btm-nav-label">Pagos</span>
          </button>
          <button ref="navBtn4" :disabled="galleryDocs?.length === 0" @click="navEvent(4)">
            <Icon icon="mdi:file-document-edit" width="30" />
            <span class="btm-nav-label">Documentos</span>
          </button>
        </div>
        <div v-show="scrollDown" class="btm-nav bg-white xl:hidden">
          <div>
            <button class="btn btn-accent w-36 text-white">Entregar</button>
          </div>
          <div>
            <button class="btn btn-primary w-36 text-white" ref="navBtn6" @click="updateData">
              <LoadingSpinner v-if="loading" />
              <span v-else class="btm-nav-label font-medium">Guardar</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
    <div class="drawer-side z-50 h-full w-full">
      <label for="reserve-drawer" aria-label="close sidebar" class="drawer-overlay w-full"></label>
      <ul class="menu min-h-full w-screen justify-between bg-white p-4 text-base-content xl:w-1/3">
        <ExtrasDrawer
          v-if="drawerSection === 'extras'"
          :toggle="toggleDrawer"
          :extras="extras"
          :id="id"
          @added="getVehicle"
        />
        <PaymentDrawer
          v-if="drawerSection === 'payment'"
          :toggle="toggleDrawer"
          :id="paymentId"
          :payment="payment"
          @added="getVehicle"
          :key="paymentId"
        />
        <PaymentsDrawer
          v-if="drawerSection === 'payments'"
          :toggle="toggleDrawer"
          :id="id"
          @added="getVehicle"
        />
        <DocumentDrawer
          v-if="drawerSection === 'document'"
          :toggle="toggleDrawer"
          :id="id"
          :comments="docusignComments"
          :email="contactEmail"
        />
        <DeliveryDrawer
          v-if="drawerSection === 'delivery'"
          :toggle="toggleDrawer"
          :id="id"
          :comments="docusignComments"
          :email="contactEmail"
          @delivered="getVehicle"
        />
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
.tab-active {
  color: black;
  font-weight: 600;
}
</style>
