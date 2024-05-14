<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import axios from 'axios'
axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('token')}`

const tab = ref(0)
const loading = ref(false)
const drawer = ref(false)
const drawerSection = ref('')

const info = ref(null)
const modalTitle = ref('')
const modalMessage = ref('')

const toggle = () => {
  drawer.value = !drawer.value
}

const priceRules = ref(null)
axios.get(`${import.meta.env.VITE_API}/price_rule/?main_only=true`).then((response) => {
  priceRules.value = response.data.results
  tab.value = response.data.results[0].id
  marginPrice.value = response.data.results[0].security_margin_price
  getDiscounts()
})

const marginPrice = ref(null)
const discountsTab = (id, margin) => {
  tab.value = id
  marginPrice.value = margin
  getDiscounts()
}

const discounts = ref([])
const getDiscounts = () => {
  loading.value = true
  axios
    .get(`${import.meta.env.VITE_SALES}/discounts/?automated=true&ruleid=${tab.value}`)
    .then((response) => {
      discounts.value = response.data.results
      loading.value = false
    })
}

const headersDiscounts = [
  { text: 'Descuento', value: 'title', width: 140 },
  { text: 'Iniciar tras', value: 'vehicle_automatic_discount.create_in' },
  { text: 'Valor', value: 'amount_fix' },
  { text: 'Acciones', value: 'id', width: 40 }
]

const title = ref('')
const amount = ref(0)
const createIn = ref(0)

const addDrawer = () => {
  drawerSection.value = 'add'
  drawer.value = true
  reset()
}

const addDiscount = () => {
  loading.value = true
  axios
    .post(`${import.meta.env.VITE_SALES}/discounts/`, {
      title: title.value,
      amount_fix: amount.value,
      amount_percent: 0,
      from_date: '1990-01-01',
      vehicle_automatic_discount: {
        create_in: createIn.value,
        price_rule: tab.value
      }
    })
    .then(() => {
      getDiscounts()
      modalTitle.value = 'Descuento añadido'
      modalMessage.value = 'El descuento ha sido añadido con éxito'
      info.value.modal.showModal()
      toggle()
      reset()
    })
    .catch((error) => {
      console.error(error)
      modalTitle.value = 'Error'
      modalMessage.value = 'Se ha producido un error al intentar añadir el descuento'
      info.value.modal.showModal()
    })
    .finally(() => {
      loading.value = false
    })
}

const discountId = ref(null)
const editDrawer = (id) => {
  drawerSection.value = 'edit'
  drawer.value = true
  discountId.value = id
  axios
    .get(`${import.meta.env.VITE_SALES}/discounts/${id}/?automated=true&ruleid=1`)
    .then((response) => {
      title.value = response.data.title
      amount.value = response.data.amount_fix
      createIn.value = response.data.vehicle_automatic_discount.create_in
    })
}

const editDiscount = () => {
  loading.value = true
  axios
    .put(`${import.meta.env.VITE_SALES}/discounts/${discountId.value}/?automated=true&ruleid=1`, {
      title: title.value,
      amount_fix: amount.value,
      amount_percent: 0,
      from_date: '1990-01-01',
      vehicle_automatic_discount: {
        create_in: createIn.value,
        price_rule: tab.value
      }
    })
    .then(() => {
      getDiscounts()
      modalTitle.value = 'Descuento editado'
      modalMessage.value = 'El descuento ha sido editado con éxito'
      info.value.modal.showModal()
      toggle()
      reset()
    })
    .catch((error) => {
      console.error(error)
      modalTitle.value = 'Error'
      modalMessage.value = 'Se ha producido un error al intentar editar el descuento'
      info.value.modal.showModal()
    })
    .finally(() => {
      loading.value = false
    })
}

const removeDiscount = (id) => {
  loading.value = true
  axios
    .delete(`${import.meta.env.VITE_SALES}/discounts/${id}/`)
    .then(() => {
      getDiscounts()
    })
    .catch((error) => {
      console.error(error)
    })
    .finally(() => {
      loading.value = false
    })
}

const reset = () => {
  title.value = ''
  amount.value = 0
  createIn.value = 0
}
</script>

<template>
  <HeaderMain>
    <div class="mx-auto my-8 max-w-5xl rounded-lg bg-white p-4 sm:p-6 lg:p-8">
      <ModalInfo ref="info" :title="modalTitle" :message="modalMessage" />
      <DrawerComponent id="auto-discounts-drawer" v-model="drawer">
        <template #content>
          <h1 class="text-2xl font-semibold">Descuentos Automáticos</h1>
          <div role="tablist" class="tabs-boxed bg-base-100 tabs my-6 [&>a]:font-bold">
            <a
              v-for="rule in priceRules"
              :key="rule.id"
              role="tab"
              class="tab"
              :class="{ 'tab-active': tab === rule.id }"
              @click="discountsTab(rule.id, rule.security_margin_price)"
            >
              &lt;{{ rule.end_interval }}
            </a>
          </div>
          <div class="mb-8 flex flex-row items-end justify-between px-8">
            <TextInput label="Margen de seguridad:" class="max-w-64" v-model="marginPrice" />
            <button class="btn btn-primary btn-sm" @click="addDrawer">Nuevo Descuento</button>
          </div>
          <VehicleTable class="px-8">
            <template #content>
              <EasyDataTable
                class="table-dark table-striped"
                table-class-name="z-0"
                header-class-name="z-0"
                hide-footer
                :items="discounts"
                :headers="headersDiscounts"
                :loading="loading"
              >
                <template v-slot:item-from_date="{ from_date }">
                  {{ new Date(from_date).toLocaleString('en-GB') }}
                </template>
                <template v-slot:item-id="{ id }">
                  <div class="w-14">
                    <button
                      class="btn btn-square btn-secondary btn-xs mr-2"
                      @click="editDrawer(id)"
                    >
                      <Icon icon="mdi:pencil" />
                    </button>
                    <button class="btn btn-square btn-error btn-xs" @click="removeDiscount(id)">
                      <Icon icon="mdi:trash-can-outline" />
                    </button>
                  </div>
                </template>
              </EasyDataTable>
            </template>
          </VehicleTable>
        </template>
        <template #drawer>
          <div>
            <DrawerTitle title="Añadir Nuevo Descuento" @toggle="toggle" />
            <TextInput label="Título:" v-model="title" />
            <TextInput label="Valor:" type="number" v-model="amount" />
            <TextInput label="Días para iniciar:" type="number" v-model="createIn" />
          </div>
          <template v-if="drawerSection === 'add'">
            <DrawerActions
              secondary="Cancelar"
              primary="Guardar"
              :loading="loading"
              @click-secondary="toggle"
              @click-primary="addDiscount"
            />
          </template>
          <template v-if="drawerSection === 'edit'">
            <DrawerActions
              secondary="Cancelar"
              primary="Guardar"
              :loading="loading"
              @click-secondary="toggle"
              @click-primary="editDiscount"
            />
          </template>
        </template>
      </DrawerComponent>
    </div>
  </HeaderMain>
</template>

<style scoped>
.tab-active:not(.tab-disabled):not([disabled]),
.tabs-boxed :is(input:checked) {
  color: #fff;
}
</style>
