<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import options from '@/js/filterOptions.js'

const props = defineProps({
  id: { type: String, required: true },
  cochesnetBodyOptions: { type: Array, required: true },
  toggle: { type: Function, required: true }
})

const cochesnetUrl = `${import.meta.env.VITE_VEHICLES}/${props.id}/get_cochesnet_info/`
const updateUrl = `${import.meta.env.VITE_API}/coches-net-images/update_in_bulk/`
const deleteUrl = `${import.meta.env.VITE_API}/coches-net-images/`
const cochesnetIntegrationUrl = `${import.meta.env.VITE_INTEGRATIONS}/coches_net/`
const cochesnetDescription = ref(null)
const cochesnetCategory = ref(null)
const cochesnetBrand = ref(null)
const cochesnetModel = ref(null)
const cochesnetVersion = ref(null)
const cochesnetBody = ref(null)
const cochesnetFabrication = ref(null)
const cochesnetWarranty = ref(null)
const cochesnetYear = ref(null)
const cochesnetDoors = ref(null)
const cochesnetColor = ref(null)
const cochesnetFuel = ref(null)
const cochesnetMetalized = ref(false)
const cochesnetType = ref(null)
const cochesnetYoutube = ref(null)
const cochesnetEnv = ref(null)
const cochesnetImages = ref(null)
const cochesnetTrans = ref(null)
const cochesnetVersionOptions = ref([])
const cochesnetBrandsOptions = ref([])
const cochesnetColorsOptions = ref([])
const cochesnetModelsOptions = ref([])
const cochesnetTypeOptions = ref([])
const cochesnetWarrantyOptions = ref([])
const cochesnetFabricationOptions = ref([])
const color = ref(true)
const fabrication = ref(true)
const offer_type = ref(true)
const version = ref(true)
const isMobile = ref(window.innerWidth < 1024)
const info = ref(null)
const modalMessage = ref('')
const modalTitle = ref('')
const loading = ref(false)

const getBrands = () => {
  axios
    .get(cochesnetIntegrationUrl + 'brands/' + '?category=' + cochesnetCategory.value)
    .then((response) => {
      cochesnetBrandsOptions.value = response.data
      cochesnetBrand.value = null
      cochesnetModel.value = null
      cochesnetVersion.value = null
      cochesnetFabrication.value = null
      cochesnetModelsOptions.value = []
      cochesnetVersionOptions.value = []
      cochesnetFabricationOptions.value = []
    })
    .catch(() => {
      cochesnetBrandsOptions.value = []
      modalTitle.value = 'Datos inválidos'
      modalMessage.value = 'No se encontraron marcas con los datos introducidos'
      info.value.modal.showModal()
    })
}

const getModels = () => {
  axios
    .post(cochesnetIntegrationUrl + 'models/', {
      brand: cochesnetBrand.value,
      category: cochesnetCategory.value,
      fuel: cochesnetFuel.value,
      years: cochesnetYear.value
    })
    .then((response) => {
      cochesnetModelsOptions.value = response.data
      cochesnetVersionOptions.value = []
      cochesnetFabricationOptions.value = []
      cochesnetModel.value = null
      cochesnetVersion.value = null
      cochesnetFabrication.value = null
    })
    .catch(() => {
      cochesnetModelsOptions.value = []
      cochesnetVersionOptions.value = []
      cochesnetFabricationOptions.value = []
      cochesnetVersion.value = null
      cochesnetFabrication.value = null
      modalTitle.value = 'Datos inválidos'
      modalMessage.value = 'No se encontraron modelos con los datos introducidos'
      info.value.modal.showModal()
    })
}

const getVersions = () => {
  axios
    .post(cochesnetIntegrationUrl + 'version/', {
      body_type: cochesnetBody.value,
      brand: cochesnetBrand.value,
      category: cochesnetCategory.value,
      color: cochesnetColor.value,
      description: cochesnetDescription.value,
      doors: cochesnetDoors.value,
      env_label: cochesnetEnv.value,
      fuel: cochesnetFuel.value,
      is_metalized: cochesnetMetalized.value,
      model: cochesnetModel.value,
      model_id: cochesnetModel.value,
      offer_type: cochesnetType.value,
      transmission: cochesnetTrans.value,
      warranty: cochesnetWarranty.value,
      years: cochesnetYear.value,
      youtube_video: cochesnetYoutube.value
    })
    .then((response) => {
      cochesnetVersionOptions.value = response.data
      cochesnetVersion.value = null
      cochesnetFabrication.value = null
      cochesnetFabricationOptions.value = []
    })
    .catch(() => {
      cochesnetVersionOptions.value = []
      cochesnetFabricationOptions.value = []
      cochesnetFabrication.value = null
      modalTitle.value = 'Datos inválidos'
      modalMessage.value = 'No se encontraron versiones con los datos introducidos'
      info.value.modal.showModal()
    })
}

const getFabrication = () => {
  axios
    .post(cochesnetIntegrationUrl + 'unique_vehicles/', {
      body_type: cochesnetBody.value,
      brand: cochesnetBrand.value,
      category: cochesnetCategory.value,
      color: cochesnetColor.value,
      description: cochesnetDescription.value,
      doors: cochesnetDoors.value,
      env_label: cochesnetEnv.value,
      fuel: cochesnetFuel.value,
      is_metalized: cochesnetMetalized.value,
      model: cochesnetModel.value,
      model_id: cochesnetModel.value,
      offer_type: cochesnetType.value,
      transmission: cochesnetVersion.value,
      version: cochesnetVersion.value,
      warranty: cochesnetWarranty.value,
      years: cochesnetYear.value,
      youtube_video: cochesnetYoutube.value
    })
    .then((response) => {
      cochesnetFabricationOptions.value = response.data
      cochesnetFabrication.value = null
      version.value = false
    })
    .catch(() => {
      cochesnetFabricationOptions.value = []
      modalTitle.value = 'Datos inválidos'
      modalMessage.value = 'No se encontraron fechas de fabricación con los datos introducidos'
      info.value.modal.showModal()
    })
}

const publish = () => {
  loading.value = true
  axios.post(cochesnetIntegrationUrl + 'publish_vehicle/', {
    body_type: cochesnetBody.value,
    brand: cochesnetBrand.value,
    category: cochesnetCategory.value,
    color: cochesnetColor.value,
    description: cochesnetDescription.value,
    doors: cochesnetDoors.value,
    env_label: cochesnetEnv.value,
    fuel: cochesnetFuel.value,
    is_metalized: cochesnetMetalized.value,
    model: cochesnetModel.value,
    model_id: cochesnetModel.value,
    offer_type: cochesnetType.value,
    transmission: cochesnetVersion.value,
    version: cochesnetVersion.value,
    warranty: cochesnetWarranty.value,
    years: cochesnetYear.value,
    youtube_video: cochesnetYoutube.value,
    unique_vehicle: cochesnetFabrication.value,
    vehicle: props.id
  }).then(() => {
    loading.value = false
  }).catch(() => {
    modalTitle.value = 'Error'
    modalMessage.value = 'No se pudo publicar el vehículo'
    info.value.modal.showModal()
    loading.value = false
  })
}

onMounted(() => {
  axios
    .get(cochesnetUrl)
    .then((response) => {
      cochesnetBody.value = response.data.body_type
      cochesnetBrand.value = response.data.brand
      cochesnetCategory.value = response.data.category
      cochesnetDescription.value = response.data.description
      cochesnetDoors.value = response.data.doors
      cochesnetEnv.value = response.data.env_label
      cochesnetFuel.value = response.data.fuel
      cochesnetImages.value = response.data.images
      cochesnetModel.value = response.data.model_id
      cochesnetType.value = response.data.offer_type
      cochesnetTrans.value = response.data.transmission
      cochesnetVersionOptions.value = response.data.versions
      cochesnetWarranty.value = response.data.warranty
      cochesnetYear.value = response.data.years
    })
    .then(() => {
      axios
        .post(cochesnetIntegrationUrl + 'models/', {
          brand: cochesnetBrand.value,
          category: cochesnetCategory.value,
          years: cochesnetYear.value,
          fuel: cochesnetFuel.value
        })
        .then((response) => {
          cochesnetModelsOptions.value = response.data
        })
    })
  axios.get(cochesnetIntegrationUrl + 'brands/').then((response) => {
    cochesnetBrandsOptions.value = response.data
  })
  axios.get(cochesnetIntegrationUrl + 'colors/').then((response) => {
    cochesnetColorsOptions.value = response.data
  })

  axios.get(cochesnetIntegrationUrl + 'offer_types/').then((response) => {
    cochesnetTypeOptions.value = response.data
  })

  axios.get(cochesnetIntegrationUrl + 'warranties/').then((response) => {
    cochesnetWarrantyOptions.value = response.data
  })
})
</script>

<template>
  <ModalInfo ref="info" :title="modalTitle" :message="modalMessage" />
  <div class="flex min-h-full w-full flex-col justify-between">
    <div>
      <h2 class="my-4 text-lg font-semibold">Galería de fotos</h2>
      <DraggableGallery
        :url="cochesnetUrl"
        dataKey="images"
        :updateUrl="updateUrl"
        :deleteUrl="deleteUrl"
        :id="id"
        class="my-4 grid h-min grid-cols-2 gap-2 lg:grid-cols-5 lg:gap-4"
        :skeletons="20"
        :mobile="isMobile"
      />
      <AreaInput label="Descripción:" v-model="cochesnetDescription" />
      <h2 class="my-4 text-lg font-semibold">Identificación en coches.net</h2>
      <div class="my-4 flex grid-cols-2 flex-col gap-3 lg:grid">
        <SelectInput
          label="Categoria"
          :options="options.cochesnetCategory"
          v-model="cochesnetCategory"
          @selected="getBrands"
        />
        <TextInput label="Año:" v-model="cochesnetYear" />
        <SelectInput label="Combustible" :options="options.combustible" v-model="cochesnetFuel" />
        <TextInput label="Puertas:" v-model="cochesnetDoors" />
        <SelectInput
          label="Color"
          :options="cochesnetColorsOptions"
          v-model="cochesnetColor"
          optionLabel="value"
          optionValue="key"
          :initialValue="null"
          @selected="color = false"
        />
        <SearchSelect
          label="Marca"
          :options="cochesnetBrandsOptions"
          v-model="cochesnetBrand"
          optionLabel="value"
          optionValue="key"
          @selected="getModels"
        />
        <SelectInput
          label="Modelo"
          :options="cochesnetModelsOptions"
          v-model="cochesnetModel"
          optionLabel="value"
          optionValue="key"
          :initialValue="null"
          @selected="getVersions"
        />
        <SelectInput
          label="Carrocería"
          :options="cochesnetBodyOptions"
          v-model="cochesnetBody"
          :initialValue="null"
          @selected="getVersions"
        />
        <SelectInput
          label="Version"
          :options="cochesnetVersionOptions"
          v-model="cochesnetVersion"
          optionLabel="value"
          optionValue="key"
          :initialValue="null"
          @selected="getFabrication"
        />
        <SelectInput
          label="Fabricación"
          :options="cochesnetFabricationOptions"
          v-model="cochesnetFabrication"
          optionLabel="value"
          optionValue="key"
          :initialValue="null"
          :disabled="version"
          @selected="fabrication = false"
        />
      </div>
      <h2 class="my-4 text-lg font-semibold">Extras</h2>
      <CheckInput label="Metalizado" v-model="cochesnetMetalized" class="w-fit" />
      <SelectInput
        label="Tipo de anuncio"
        :options="cochesnetTypeOptions"
        v-model="cochesnetType"
        optionLabel="value"
        optionValue="key"
        :initialValue="null"
        @selected="offer_type = false"
      />
      <SelectInput
        label="Garantia"
        :options="cochesnetWarrantyOptions"
        v-model="cochesnetWarranty"
        optionLabel="value"
        optionValue="key"
        :initialValue="null"
      />
      <TextInput label="Link de YouTube" v-model="cochesnetYoutube" />
    </div>
    <DrawerActions
      secondary="Cancelar"
      primary="Guardar"
      :loading="loading"
      :disabled="color || fabrication || offer_type"
      @click-secondary="toggle"
      @click-primary="publish"
    />
  </div>
</template>
