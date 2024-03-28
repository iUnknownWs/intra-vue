<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
const props = defineProps({
  id: { type: String, required: true },
  toggle: { type: Function, required: true }
})
const sumautoUrl = `${import.meta.env.VITE_VEHICLES}/${props.id}/get_sumauto_info/`
const sumautoIntegrationUrl = `${import.meta.env.VITE_INTEGRATIONS}/sumauto/`
const sumautoDescription = ref(null)
const sumautoIVA = ref(false)
const sumautoBody = ref(null)
const sumautoWarranty = ref(null)
const sumautoFuel = ref(null)
const sumautoTraction = ref(null)
const sumautoColor = ref(null)
const sumautoMetalized = ref(false)
const sumautoLabel = ref(null)
const sumautoCertified = ref(false)
const sumautoBodyOptions = ref([])
const sumautoWarrantyOptions = ref([])
const sumautoFuelOptions = ref([])
const sumautoColorOptions = ref([])
const sumautoTractionOptions = ref([])
const sumautoLabelOptions = ref([])
const isMobile = ref(window.innerWidth < 1024)
const info = ref(null)
const modalMessage = ref('')
const modalTitle = ref('')
const loading = ref(false)

const publish = () => {
  loading.value = true
  axios
    .post(sumautoIntegrationUrl + 'prepare_vehicle_sumauto/', {
      body_type: sumautoBody.value,
      warranty_period: sumautoWarranty.value,
      description: sumautoDescription.value,
      fuel: sumautoFuel.value,
      drive_type: sumautoTraction.value,
      color: sumautoColor.value,
      is_metalized: sumautoMetalized.value,
      is_tax_deductible: sumautoIVA.value,
      is_certified: sumautoCertified.value,
      label_id: sumautoLabel.value,
      vehicle: props.id
    })
    .then(() => {
      loading.value = false
      modalTitle.value = 'Vehículo publicado'
      modalMessage.value = 'Vehículo se ha publicado correctamente en Wallapop'
      props.toggle()
      info.value.modal.showModal()
    })
    .catch(() => {
      loading.value = false
      modalTitle.value = 'Error'
      modalMessage.value = 'No se ha podido publicar el vehículo'
      info.value.modal.showModal()
    })
}

onMounted(() => {
  axios.get(sumautoUrl).then((response) => {
    sumautoDescription.value = response.data.description
    sumautoBody.value = response.data.body_type
    sumautoWarranty.value = response.data.warranty_period
    sumautoFuel.value = response.data.fuel
    sumautoTraction.value = response.data.drive_type
    sumautoColor.value = response.data.color
    sumautoLabel.value = response.data.label_id
    sumautoMetalized.value = response.data.is_metalized
    sumautoIVA.value = response.data.is_tax_deductible
    sumautoCertified.value = response.data.is_certified
  })
  axios.get(sumautoIntegrationUrl + 'body_types/').then((response) => {
    sumautoBodyOptions.value = response.data
  })
  axios.get(sumautoIntegrationUrl + 'warranty_periods/').then((response) => {
    sumautoWarrantyOptions.value = response.data
  })
  axios.get(sumautoIntegrationUrl + 'fuel_types/').then((response) => {
    sumautoFuelOptions.value = response.data
  })
  axios.get(sumautoIntegrationUrl + 'colors/').then((response) => {
    sumautoColorOptions.value = response.data
  })
  axios.get(sumautoIntegrationUrl + 'drive_types/').then((response) => {
    sumautoTractionOptions.value = response.data
  })
  axios.get(sumautoIntegrationUrl + 'labels/').then((response) => {
    sumautoLabelOptions.value = response.data
  })
})
</script>

<template>
  <div class="flex min-h-[95vh] w-full flex-col justify-between">
    <div class="flex flex-1 flex-col">
      <DrawerTitle title="Configuración CochesNet" @toggle="toggle" />
      <h2 class="my-4 text-lg font-semibold">Galería de fotos</h2>
      <DraggableGallery
        :url="sumautoUrl"
        dataKey="images"
        :id="id"
        class="my-4 grid h-min grid-cols-2 gap-2 lg:grid-cols-5 lg:gap-4"
        :skeletons="20"
        :mobile="isMobile"
      />
      <AreaInput label="Descripción:" v-model="sumautoDescription" />
      <h2 class="my-4 text-lg font-semibold">Identificación en coches.net</h2>
      <div class="my-4 flex grid-cols-2 flex-col gap-3 lg:grid">
        <SelectInput
          label="Carrocería"
          :options="sumautoBodyOptions"
          v-model="sumautoBody"
          optionLabel="value"
          optionValue="key"
          :initialValue="null"
        />
        <SelectInput
          label="Garantia"
          :options="sumautoWarrantyOptions"
          v-model="sumautoWarranty"
          optionLabel="value"
          optionValue="key"
          :initialValue="null"
        />
        <SelectInput
          label="Combustible"
          :options="sumautoFuelOptions"
          v-model="sumautoFuel"
          optionLabel="value"
          optionValue="key"
          :initialValue="null"
        />
        <SelectInput
          label="Tracción"
          :options="sumautoTractionOptions"
          v-model="sumautoTraction"
          optionLabel="value"
          optionValue="key"
          :initialValue="null"
        />
        <SelectInput
          label="Color"
          :options="sumautoColorOptions"
          v-model="sumautoColor"
          optionLabel="value"
          optionValue="key"
          :initialValue="null"
        />

        <SelectInput
          label="Etiqueta"
          :options="sumautoLabelOptions"
          v-model="sumautoLabel"
          optionLabel="value"
          optionValue="key"
          :initialValue="null"
        />
      </div>
      <div class="flex flex-col lg:flex-row lg:gap-4">
        <CheckInput label="IVA Deducible" v-model="sumautoIVA" class="w-fit" />
        <CheckInput label="Metalizado" v-model="sumautoMetalized" class="w-fit" />
        <CheckInput label="Certificado" v-model="sumautoCertified" class="w-fit" />
      </div>
    </div>
    <DrawerActions
      secondary="Cancelar"
      primary="Guardar"
      :loading="loading"
      @click-secondary="toggle"
      @click-primary="publish"
    />
  </div>
  <ModalInfo ref="info" :title="modalTitle" :message="modalMessage" />
</template>
