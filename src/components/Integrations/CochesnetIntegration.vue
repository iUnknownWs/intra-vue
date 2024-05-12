<script setup>
import { onMounted, ref } from 'vue'
import { Icon } from '@iconify/vue'
import axios from 'axios'
import options from '@/js/filterOptions'
import EditCampaign from './EditCampaign.vue'
import AddCampaign from './AddCampaign.vue'
import LogDrawer from './LogDrawer.vue'

const props = defineProps({
  id: { type: Number, required: true },
  tab: { type: String, required: true }
})

defineEmits(['return'])

const loading = ref(false)
const loadingCampaign = ref(false)

const drawer = ref(false)
const drawerSection = ref('')
const toggle = () => {
  drawer.value = !drawer.value
}

const info = ref(null)
const modalTitle = ref('')
const modalMessage = ref('')

const campaigns = ref([])
const getCampaigns = () => {
  loadingCampaign.value = true
  axios
    .get(`${import.meta.env.VITE_INTEGRATIONS}/campaigns/?integration=${props.id}`)
    .then((response) => {
      campaigns.value = response.data.results
    })
    .finally(() => {
      loadingCampaign.value = false
    })
}

const getData = () => {
  loading.value = true
  axios
    .get(`${import.meta.env.VITE_INTEGRATIONS}/web_portals/?integration=${props.id}`)
    .then((response) => {
      integration.value = response.data.results[0]
      user.value = integration.value.integration.data.username
      password.value = integration.value.integration.data.password
      description.value = integration.value.default_description
      warranty.value = integration.value.coches_net_config.official_warranty
      defaultCategory.value = integration.value.coches_net_config.default_category
      carfax.value = integration.value.coches_net_config.show_carfax_report
    })
    .finally(() => {
      loading.value = false
    })
}

const saveData = () => {
  loading.value = true
  axios
    .post(
      `${import.meta.env.VITE_INTEGRATIONS}/integrations/${props.id}/create_or_update_config/`,
      {
        integration: 'web_portals',
        username: user.value,
        password: password.value,
        description: description.value,
        official_warranty: warranty.value,
        default_category: defaultCategory.value,
        show_carfax_report: carfax.value
      }
    )
    .then(() => {
      getData()
      modalTitle.value = 'Integración actualizada'
      modalMessage.value = 'Las configuraciones se han actualizado correctamente'
      info.value.modal.showModal()
    })
    .catch((err) => {
      modalTitle.value = 'Error'
      modalMessage.value = 'No se pudo actualizar la configuración'
      info.value.modal.showModal()
      console.error(err)
    })
    .finally(() => {
      loading.value = false
    })
}

const serverOptions = ref({
  page: 1,
  rowsPerPage: 20
})

const headersCampaigns = [
  { text: 'Titulo', value: 'title' },
  { text: 'Inicio', value: 'start_date' },
  { text: 'Fin', value: 'end_date' },
  { text: 'Descripción', value: 'description', width: 60 },
  { text: 'Imagen', value: 'image_overlay', width: 60 },
  { text: 'Acciones', value: 'id', width: 40 }
]

const logs = ref([])
const loadingLogs = ref(false)
const getLogs = () => {
  loadingLogs.value = true
  axios
    .get(`${import.meta.env.VITE_INTEGRATIONS}/integration_log/?integration=${props.id}`)
    .then((response) => {
      logs.value = response.data.results
    })
    .finally(() => {
      loadingLogs.value = false
    })
}

const headersLogs = [
  { text: 'Fecha de creación', value: 'created_at', width: 120 },
  { text: 'Headers', value: 'headers', width: 60 },
  { text: 'Method', value: 'method', width: 60 },
  { text: 'Código', value: 'status_code', width: 60 },
  { text: 'Response', value: 'response', width: 60 },
  { text: 'Detalles', value: 'id', width: 100 }
]

const removeCampaign = (id) => {
  axios.delete(`${import.meta.env.VITE_INTEGRATIONS}/campaigns/${id}/`).then(() => {
    getCampaigns()
  })
}

const campaignData = ref({})
const campaignId = ref(null)
const editCampaign = (id) => {
  campaignId.value = id
  drawer.value = !drawer.value
  drawerSection.value = 'editCampaign'
}

const addCampaign = () => {
  drawer.value = !drawer.value
  drawerSection.value = 'addCampaign'
}

const updatedCampaign = () => {
  getCampaigns()
  modalTitle.value = 'Campaña actualizada'
  modalMessage.value = 'La campaña se ha actualizado correctamente'
  info.value.modal.showModal()
}

const integration = ref({})
const user = ref(null)
const password = ref(null)
const description = ref(null)
const defaultCategory = ref(null)
const warranty = ref(null)
const carfax = ref(null)

const toggleAutomatization = (data) => {
  axios
    .patch(`${import.meta.env.VITE_INTEGRATIONS}/automations/${data.id}/`, {
      automation_id: data.id,
      integration: props.id,
      is_active: data.is_active
    })
    .then(() => {
      getAutomatization()
    })
}

const updateDay = (data) => {
  axios.patch(`${import.meta.env.VITE_INTEGRATIONS}/automations/${data.id}/`, {
    automation_id: data.id,
    integration: props.id,
    day_of_week: data.day_of_week
  })
}

const updateValue = (data) => {
  axios.patch(`${import.meta.env.VITE_INTEGRATIONS}/automations/${data.id}/`, {
    automation_id: data.id,
    integration: props.id,
    int_value: data.int_value
  })
}

const automatization = ref([])
const getAutomatization = () => {
  axios.get(`${import.meta.env.VITE_INTEGRATIONS}/automations/`).then((response) => {
    automatization.value = response.data.results
  })
}

const logId = ref(null)
const logDetails = (id) => {
  logId.value = id
  drawer.value = !drawer.value
  drawerSection.value = 'log'
}

onMounted(() => {
  getData()
  getLogs()
  getCampaigns()
  getAutomatization()
})
</script>

<template>
  <ModalInfo ref="info" :title="modalTitle" :message="modalMessage" />
  <div class="drawer drawer-end">
    <input id="drawer-cochesnet" type="checkbox" class="drawer-toggle" v-model="drawer" />
    <div class="drawer-content">
      <div v-if="tab === 'settings'" class="flex flex-col gap-8">
        <div class="mx-auto w-full max-w-3xl rounded-md bg-base-100 p-4">
          <div class="flex items-center">
            <button class="btn btn-square btn-ghost mr-2" @click="$emit('return')">
              <Icon icon="mdi:arrow-left" width="25" />
            </button>
            <h2 class="text-xl font-medium">Cochesnet</h2>
          </div>
          <div class="divider m-0"></div>
          <div class="flex flex-col p-4">
            <SelectInput
              label="Categorías por defecto"
              v-model="defaultCategory"
              :options="options.defaultCochesnet"
              :initialValue="null"
            />
            <div class="my-4 flex flex-col items-center gap-4 lg:flex-row">
              <TextInput label="Usuario" v-model="user" />
              <TextInput label="Contraseña" v-model="password" type="password" />
            </div>
            <div class="flex flex-col items-center gap-4 lg:flex-row">
              <ToggleInput label="Garantía Oficial" v-model="warranty" />
              <ToggleInput label="Mostrar Carfax" v-model="carfax" />
            </div>
            <AreaInput label="Descripción" v-model="description" />
            <button class="btn btn-primary mt-4 self-end" @click="saveData">
              <LoadingSpinner v-if="loading" />
              <span v-else class="font-semibold text-white">Guardar</span>
            </button>
          </div>
        </div>
        <div class="mx-auto w-full max-w-3xl rounded-md bg-base-100 p-4">
          <VehicleTable title="Campañas" @addBtn="addCampaign" add>
            <template #content>
              <EasyDataTable
                class="table-dark table-striped"
                table-class-name="z-0"
                header-class-name="z-0"
                hide-footer
                :headers="headersCampaigns"
                :items="campaigns"
                v-model:server-options="serverOptions"
                :loading="loadingCampaign"
              >
                <template v-slot:item-id="{ id }">
                  <div class="w-14">
                    <button
                      class="btn btn-square btn-secondary btn-xs mr-2"
                      @click="editCampaign(id)"
                    >
                      <Icon icon="mdi:pencil" />
                    </button>
                    <button class="btn btn-square btn-error btn-xs" @click="removeCampaign(id)">
                      <Icon icon="mdi:trash-can-outline" />
                    </button>
                  </div>
                </template>
                <template v-slot:item-image_overlay="{ image_overlay }">
                  <Icon icon="mdi:check" v-if="image_overlay" color="green" width="30" />
                  <Icon icon="mdi:close" v-else color="red" width="30" />
                </template>
                <template v-slot:item-description="{ description }">
                  <Icon icon="mdi:check" v-if="description" color="green" width="30" />
                  <Icon icon="mdi:close" v-else color="red" width="30" />
                </template>
                <template v-slot:item-start_date="{ start_date }">
                  {{ new Date(start_date).toLocaleString('en-GB') }}
                </template>
                <template v-slot:item-end_date="{ end_date }">
                  {{ new Date(end_date).toLocaleString('en-GB') }}
                </template>
              </EasyDataTable>
            </template>
          </VehicleTable>
        </div>
        <div class="mx-auto mb-4 w-full max-w-3xl rounded-md bg-base-100 p-4">
          <div class="flex items-center">
            <h2 class="text-xl font-medium">Automatismos</h2>
          </div>
          <div class="divider m-0"></div>
          <div class="flex flex-col">
            <div class="flex flex-col justify-around lg:flex-row">
              <div
                v-for="automation in automatization"
                :key="automation.id"
                class="my-4 flex flex-col gap-1"
              >
                <ToggleInput
                  label="Publicar semanalmente"
                  class="w-fit"
                  v-model="automation.is_active"
                  @changed="toggleAutomatization(automation)"
                />
                <SelectInput
                  label="Los días:"
                  v-model="automation.day_of_week"
                  :options="options.week"
                  :initialValue="null"
                  @selected="updateDay(automation)"
                />
                <SelectInput
                  v-if="automation.automation_type === 'FROM_DAYS_OF_STOCK'"
                  label="Vehiculos con mas de:"
                  v-model="automation.int_value"
                  :options="options.daysCochesnet"
                  :initialValue="null"
                  @selected="updateValue(automation)"
                />
                <SelectInput
                  v-if="automation.automation_type === 'VEHICLES_WITH_MOST_STOCK_DAYS'"
                  label="X Vehiculos con mas stock:"
                  v-model="automation.int_value"
                  :options="options.vehiclesCochesnet"
                  :initialValue="null"
                  @selected="updateValue(automation)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="mx-auto w-full max-w-5xl rounded-md bg-base-100 p-4">
        <VehicleTable title="Logs">
          <template #content>
            <EasyDataTable
              class="table-dark table-striped"
              table-class-name="z-0"
              header-class-name="z-0"
              hide-footer
              :headers="headersLogs"
              :items="logs"
              :loading="loadingLogs"
            >
              <template v-slot:item-id="{ id }">
                <button class="btn btn-primary btn-xs" @click="logDetails(id)">Detalles</button>
              </template>
              <template v-slot:item-headers="{ headers }">
                <p class="w-64 overflow-hidden text-ellipsis text-nowrap">{{ headers }}</p>
              </template>
              <template v-slot:item-response="{ response }">
                <p class="w-64 overflow-hidden text-ellipsis text-nowrap">{{ response }}</p>
              </template>
              <template v-slot:item-created_at="{ created_at }">
                {{ new Date(created_at).toLocaleString('en-GB') }}
              </template>
            </EasyDataTable>
          </template>
        </VehicleTable>
      </div>
    </div>
    <div class="drawer-side z-50 h-full w-full">
      <label for="drawer-cochesnet" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu min-h-full w-screen justify-between bg-white p-6 text-base-content lg:w-1/3">
        <EditCampaign
          v-if="drawerSection === 'editCampaign'"
          :toggle="toggle"
          :data="campaignData"
          :id="campaignId"
          :key="campaignId"
          @updated="updatedCampaign"
        />
        <AddCampaign
          v-if="drawerSection === 'addCampaign'"
          :toggle="toggle"
          :id="id"
          @added="updatedCampaign"
        />
        <LogDrawer v-if="drawerSection === 'log'" :toggle="toggle" :id="logId" :key="logId" />
      </ul>
    </div>
  </div>
</template>
