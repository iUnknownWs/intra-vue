<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { Icon } from '@iconify/vue'

const props = defineProps({
  toggle: { type: Function, required: true },
  id: { type: String, required: true }
})

const loading = ref(true)

const marginPrice = ref(0)
const isActive = ref(false)
const ruleId = ref(null)

const discounts = ref([])

const headersDiscounts = [
  { text: 'Descuento', value: 'title', width: 140 },
  { text: 'Iniciar tras', value: 'vehicle_automatic_discount.create_in' },
  { text: 'Valor', value: 'amount_fix' },
  { text: 'Acciones', value: 'id', width: 40 }
]

const getData = () => {
  axios.get(`${import.meta.env.VITE_API}/price_rule/?vehicle=${props.id}`).then((response) => {
    console.log(response.data.results)
    marginPrice.value = response.data.results[0].security_margin_price
    isActive.value = response.data.results[0].is_active
    ruleId.value = response.data.results[0].id
    axios
      .get(
        `${import.meta.env.VITE_SALES}/discounts/?automated=true&ruleid=${response.data.results[0].id}`
      )
      .then((response) => {
        discounts.value = response.data.results
      })
      .finally(() => {
        loading.value = false
      })
  })
}

const changeStatus = () => {
  loading.value = true
  axios
    .patch(`${import.meta.env.VITE_API}/price_rule/${ruleId.value}`, {
      is_active: isActive.value
    })
    .then(() => {
      getData()
    })
    .catch((error) => {
      console.error(error)
    })
    .finally(() => {
      loading.value = false
    })
}

const changePriceMargin = () => {
  loading.value = true
  axios
    .patch(`${import.meta.env.VITE_API}/price_rule/${ruleId.value}`, {
      security_margin_price: marginPrice.value
    })
    .then(() => {
      getData()
    })
    .catch((error) => {
      console.error(error)
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
      getData()
    })
    .catch((error) => {
      console.error(error)
    })
    .finally(() => {
      loading.value = false
    })
}

onMounted(() => {
  getData()
})
</script>

<template>
  <div>
    <DrawerTitle title="Descuento Automático" @toggle="toggle" />
    <template v-if="!loading">
      <TextInput label="Margen de seguridad:" v-model="marginPrice" @change="changePriceMargin" />
      <div class="mt-4 flex flex-row items-center justify-between">
        <ToggleInput
          class="my-2 w-fit"
          label="Activar Automatización"
          v-model="isActive"
          @changed="changeStatus"
        />
        <button class="btn btn-primary btn-sm">
          <Icon icon="mdi:plus" width="24" color="white" />
          <span class="hidden lg:inline">Nuevo</span>
        </button>
      </div>
      <VehicleTable>
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
                <button class="btn btn-square btn-secondary btn-xs mr-2" @click="editDrawer(id)">
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
    <template v-else>
      <LoadingSpinner class="loading-lg self-center" />
    </template>
  </div>
</template>
