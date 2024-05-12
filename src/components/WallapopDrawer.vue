<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
const props = defineProps({
  id: { type: [String, Number], required: true },
  toggle: { type: Function, required: true }
})

const emits = defineEmits(['published'])

const wallapopUrl = `${import.meta.env.VITE_VEHICLES}/${props.id}/get_wallapop_info/`
const wallapopIntegrationUrl = `${import.meta.env.VITE_INTEGRATIONS}/wallapop/`
const wallapopDescription = ref(null)
const wallapopBody = ref(null)
const wallapopWarranty = ref(null)
const wallapopWarrantyOptions = ref([])
const wallapopBodyOptions = ref([])
const isMobile = ref(window.innerWidth < 1024)
const info = ref(null)
const modalMessage = ref('')
const modalTitle = ref('')
const loading = ref(false)
const charLimit = 3000
const limitWarning = ref(false)

const limitText = () => {
  if (wallapopDescription.value.length > charLimit) {
    limitWarning.value = true
  } else {
    limitWarning.value = false
  }
}

const getData = () => {
  axios.get(wallapopUrl).then((response) => {
    wallapopDescription.value = response.data.description
    wallapopBody.value = response.data.body_type
    wallapopWarranty.value = response.data.warranty
  })
}

const publish = () => {
  loading.value = true
  axios
    .post(wallapopIntegrationUrl + 'prepare_vehicle_wallapop/', {
      body_type: wallapopBody.value,
      warranty_period: wallapopWarranty.value,
      description: wallapopDescription.value,
      vehicle: props.id
    })
    .then(() => {
      loading.value = false
      modalTitle.value = 'Vehículo publicado'
      modalMessage.value = 'Vehículo se ha publicado correctamente en Wallapop'
      emits('published')
      props.toggle()
      info.value.modal.showModal()
    })
    .catch(() => {
      modalTitle.value = 'Error'
      modalMessage.value = 'No se ha podido publicar el vehículo'
      info.value.modal.showModal()
    })
}

onMounted(() => {
  axios.get(wallapopUrl).then((response) => {
    wallapopDescription.value = response.data.description
    wallapopBody.value = response.data.body_type
    wallapopWarranty.value = response.data.warranty
  })
  axios.get(wallapopIntegrationUrl + 'body_types/').then((response) => {
    wallapopBodyOptions.value = response.data
  })
  axios.get(wallapopIntegrationUrl + 'warranty_periods/').then((response) => {
    wallapopWarrantyOptions.value = response.data
  })
})
</script>

<template>
  <div class="flex min-h-[95vh] w-full flex-col justify-between">
    <div class="flex flex-1 flex-col">
      <DrawerTitle title="Configuración Wallapop" @toggle="toggle" />
      <h2 class="my-4 text-lg font-semibold">Galería de fotos</h2>
      <DraggableGallery
        :url="wallapopUrl"
        dataKey="images"
        :id="id"
        class="my-4 grid h-min grid-cols-2 gap-2 lg:grid-cols-5 lg:gap-4"
        :skeletons="20"
        :mobile="isMobile"
      />
      <a @click="getData" class="link">Actualizar descripción</a>
      <span v-if="limitWarning" class="block text-error"
        >Limite de caracteres alcanzado la descripción de tener menos de 3.000</span
      >
      <AreaInput label="Descripción:" v-model="wallapopDescription" @input="limitText" />
      <h2 class="my-4 text-lg font-semibold">Identificación en coches.net</h2>
      <div class="my-4 flex grid-cols-2 flex-col gap-3 lg:grid">
        <SelectInput
          label="Carrocería"
          :options="wallapopBodyOptions"
          v-model="wallapopBody"
          optionLabel="value"
          optionValue="key"
          :initialValue="null"
        />
        <SelectInput
          label="Garantia"
          :options="wallapopWarrantyOptions"
          v-model="wallapopWarranty"
          optionLabel="value"
          optionValue="key"
          :initialValue="null"
        />
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
