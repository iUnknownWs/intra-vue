<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import options from '@/js/filterOptions'
const props = defineProps({
  toggle: { type: Function, required: true },
  id: { type: Number, required: true }
})

const paymentType = ref(null)
const paymentMethod = ref(null)
const paymentAmount = ref(null)
const vehicleVin = ref(null)
const vehiclePlate = ref(null)
const vehicleBrand = ref(null)
const vehicleModel = ref(null)
const vehicleFuel = ref(null)
const vehicleGearbox = ref(null)
const vehicleKms = ref([])

const vehicleBrands = ref([])
const vehicleModels = ref([])

const typeSelected = () => {
  if (paymentType.value === 'financed') {
    paymentMethod.value = 'transfer'
  } else {
    paymentMethod.value = null
  }
}

const updatePayment = () => {
  const payload = {
    payment_method: paymentMethod.value,
    payment_type: paymentType.value,
    amount: paymentAmount.value
  }

  if (paymentType.value === 'counted' && paymentMethod.value === 'vehicle_exchange') {
    payload.form_of_payment_vehicle = {
      vin: vehicleVin.value,
      plate: vehiclePlate.value,
      brand: vehicleBrand.value,
      model_car: vehicleModel.value,
      fuel: vehicleFuel.value,
      gearbox: vehicleGearbox.value,
      kms: vehicleKms.value
    }
  }

  axios.patch(`${import.meta.env.VITE_SALES}/payments/${props.id}/`, payload).then(() => {
    props.toggle()
  })
}

const getModels = () => {
  axios
    .get(
      `${import.meta.env.VITE_API}/vehicles-models-web/?brand_web=${vehicleBrand.value}&limit=200`
    )
    .then((response) => {
      vehicleModels.value = response.data.results
    })
    .catch((error) => {
      console.log(error)
    })

  vehicleModel.value = null
}

onMounted(() => {
  axios.get(`${import.meta.env.VITE_SALES}/payments/${props.id}/`).then((response) => {
    paymentMethod.value = response.data.payment_method
    paymentType.value = response.data.payment_type
    paymentAmount.value = response.data.amount
    if (response.data.form_of_payment_vehicle) {
      vehicleVin.value = response.data.form_of_payment_vehicle.vin
      vehiclePlate.value = response.data.form_of_payment_vehicle.plate
      vehicleBrand.value = response.data.form_of_payment_vehicle.brand
      vehicleModel.value = response.data.form_of_payment_vehicle.model_car
      vehicleFuel.value = response.data.form_of_payment_vehicle.fuel
      vehicleGearbox.value = response.data.form_of_payment_vehicle.gearbox
      vehicleKms.value = response.data.form_of_payment_vehicle.kms
      axios
        .get(
          `${import.meta.env.VITE_API}/vehicles-models-web/?brand_web=${vehicleBrand.value}&limit=200`
        )
        .then((response) => {
          vehicleModels.value = response.data.results
        })
    }
  })
  axios.get(`${import.meta.env.VITE_API}/vehicles-brands-web/?limit=200`).then((response) => {
    vehicleBrands.value = response.data.results
  })
})
</script>

<template>
  <div>
    <DrawerTitle title="Editar Pago" @toggle="toggle" />
    <SelectInput
      label="Forma de Pago:"
      v-model="paymentType"
      :options="options.paymentForm"
      @selected="typeSelected"
      :initialValue="null"
    />
    <SelectInput
      v-if="paymentType === 'counted'"
      label="Tipo de Pago:"
      v-model="paymentMethod"
      :options="options.paymentMethods"
      :disabled="!paymentType"
      :initialValue="null"
    />
    <SelectInput
      v-if="paymentType === 'booking_pre_order_payment'"
      label="Tipo de Pago:"
      v-model="paymentMethod"
      :options="options.paymentMethods2"
      :disabled="!paymentType"
      :initialValue="null"
    />
    <div
      v-if="paymentType === 'counted' && paymentMethod === 'vehicle_exchange'"
      class="grid grid-cols-1 gap-4 lg:grid-cols-2"
    >
      <TextInput label="Bastidor:" v-model="vehicleVin" />
      <TextInput label="Matrícula:" v-model="vehiclePlate" />
      <SearchSelect
        label="Marca:"
        v-model="vehicleBrand"
        :options="vehicleBrands"
        optionLabel="title"
        optionValue="id"
        @selected="getModels"
      />
      <SearchSelect
        label="Modelo:"
        v-model="vehicleModel"
        :options="vehicleModels"
        optionLabel="title"
        optionValue="id"
      />
      <SelectInput
        label="Combustible:"
        v-model="vehicleFuel"
        :initialValue="null"
        :options="options.combustible"
      />
      <SelectInput
        label="Cambios:"
        v-model="vehicleGearbox"
        :initialValue="null"
        :options="options.cambio"
      />
      <TextInput label="Kms:" v-model="vehicleKms" />
      <TextInput label="Importe:" v-model="paymentAmount" />
    </div>
    <TextInput v-else label="Importe:" v-model="paymentAmount" />
  </div>
  <DrawerActions
    secondary="Cancelar"
    primary="Guardar"
    @click-secondary="toggle"
    @click-primary="updatePayment"
  />
</template>
