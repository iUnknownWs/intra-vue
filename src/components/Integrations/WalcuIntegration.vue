<script setup>
import { onMounted, ref } from 'vue'
import { Icon } from '@iconify/vue'
import options from '@/js/filterOptions'
import axios from 'axios'

const props = defineProps({
  id: { type: Number, required: true },
  tab: { type: String, required: true }
})

defineEmits(['return'])

const loading = ref(false)

const info = ref(null)
const confirm = ref(null)
const modalTitle = ref('')
const modalMessage = ref('')

const defaults = ref('')

const integration = ref({})
const secret = ref(null)
const dealer = ref(null)
const appId = ref(null)
const url = ref(null)
const vehicleType = ref(null)
const urlVideo = ref(null)
const urlBackOffice = ref(null)
const keyVehicle = ref(null)
const keyDefault = ref(null)
const videoDefault = ref(null)
const backofficeDefault = ref(null)
const delivered = ref(null)
const onSale = ref(null)
const pending_publication = ref(null)
const pending_shipping = ref(null)
const reserved = ref(null)

const modalDefaults = (value) => {
  defaults.value = value
  modalTitle.value = 'Confirmar configuración Predeterminada'
  modalMessage.value =
    '¿Deseas aplicar también esta configuración a todos los vehículos que ya se encuentran en el fichero?'
  confirm.value.modal.showModal()
}

const confirmDefaults = () => {
  if (defaults.value === 'video') {
    videoDefault.value = true
  }
  if (defaults.value === 'backoffice') {
    backofficeDefault.value = true
  }
  if (defaults.value === 'key') {
    keyDefault.value = true
  }
}

const getData = () => {
  loading.value = true
  axios
    .get(`${import.meta.env.VITE_INTEGRATIONS}/crm/?integration=${props.id}`)
    .then((response) => {
      integration.value = response.data.results[0]
      secret.value = integration.value.integration.data.secret
      dealer.value = integration.value.integration.data.dealer_id
      appId.value = integration.value.integration.data.app_id
      url.value = integration.value.integration.data.url
      vehicleType.value = integration.value.vehicle_type
      urlVideo.value = integration.value.additional_config_data.url_video_required
      urlBackOffice.value = integration.value.additional_config_data.url_backoffice_required
      keyVehicle.value = integration.value.additional_config_data.key_required
      delivered.value = integration.value.status_config_data.delivered
      onSale.value = integration.value.status_config_data.on_sale
      pending_publication.value = integration.value.status_config_data.pending_publication
      pending_shipping.value = integration.value.status_config_data.pending_shipping
      reserved.value = integration.value.status_config_data.reserved
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
        integration: 'crm',
        app_id: appId.value,
        dealer_id: dealer.value,
        default_vehicle_type: vehicleType.value,
        delivered: delivered.value,
        key_required: keyVehicle.value,
        on_sale: onSale.value,
        pending_publication: pending_publication.value,
        pending_shipping: pending_shipping.value,
        reserved: reserved.value,
        secret: secret.value,
        set_key: keyDefault.value,
        update_url_backoffice: backofficeDefault.value,
        update_url_video: videoDefault.value,
        url: url.value,
        url_backoffice_required: urlBackOffice.value,
        url_video_required: urlVideo.value
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

const headersLogs = [
  { text: 'Fecha', value: 'created_at', width: 140 },
  { text: 'Usuario', value: 'user' },
  { text: 'Resultado', value: 'response' },
  { text: 'Comentarios', value: 'comments' },
  { text: 'Num. Resultado', value: 'num_results', width: 60 },
  { text: 'Acciones', value: 'id', width: 40 }
]

const logs = ref([])
const loadingLogs = ref(false)
const getLogs = () => {
  loadingLogs.value = true
  axios
    .get(`${import.meta.env.VITE_INTEGRATIONS}/file_logs/?integration_id=${props.id}`)
    .then((response) => {
      logs.value = response.data.results
    })
    .finally(() => {
      loadingLogs.value = false
    })
}

const downloadFile = (id) => {
  axios
    .post(`${import.meta.env.VITE_INTEGRATIONS}/file_logs/download_file/`, { file_id: id })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `walcu_log_${id}.xml`)
      document.body.appendChild(link)
      link.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(link)
    })
    .catch((err) => {
      console.error(err)
    })
}

const resendLog = (id) => {
  axios
    .post(`${import.meta.env.VITE_INTEGRATIONS}/file_logs/resend_file/`, { file_id: id })
    .then(() => {
      getLogs()
      modalTitle.value = 'Log enviado'
      modalMessage.value = 'El log se ha enviado correctamente'
      info.value.modal.showModal()
    })
    .catch((err) => {
      console.error(err)
      modalTitle.value = 'Error'
      modalMessage.value = 'No se pudo enviar el log'
      info.value.modal.showModal()
    })
}

onMounted(() => {
  getData()
  getLogs()
})
</script>

<template>
  <ModalInfo ref="info" :title="modalTitle" :message="modalMessage" />
  <ModalConfirm
    ref="confirm"
    :title="modalTitle"
    :message="modalMessage"
    @confirm="confirmDefaults"
  />
  <div class="flex flex-col gap-8">
    <div v-if="tab === 'settings'" class="mb-16 flex flex-col gap-8">
      <div class="mx-auto w-full max-w-3xl rounded-md bg-white p-4">
        <div class="flex items-center">
          <button class="btn btn-square btn-ghost mr-2" @click="$emit('return')">
            <Icon icon="mdi:arrow-left" width="24" />
          </button>
          <h2 class="text-xl font-medium">Walcu</h2>
        </div>
        <div class="divider m-0"></div>
        <div class="flex flex-col p-4">
          <div class="flex flex-col items-center gap-4 lg:flex-row">
            <TextInput label="Dealer ID" v-model="dealer" />
            <TextInput label="Secret" v-model="secret" />
            <TextInput label="APP ID" v-model="appId" />
          </div>
          <div class="flex flex-col p-4"></div>
        </div>
        <div class="flex items-center">
          <h3 class="text-xl font-medium">Stock sync</h3>
        </div>
        <div class="divider m-0"></div>
        <div class="flex flex-col p-4">
          <div class="flex flex-col items-center gap-4 lg:flex-row">
            <TextInput label="URL" v-model="url" />
            <SelectInput
              label="Tipo de Vehículo"
              v-model="vehicleType"
              :options="options.vehicleState"
              :initialValue="null"
            />
          </div>
          <div class="my-4 flex flex-col gap-4 lg:flex-row">
            <ToggleInput label="Url Video" v-model="urlVideo" @changed="modalDefaults('video')" />
            <ToggleInput
              label="Url BackOffice"
              v-model="urlBackOffice"
              @changed="modalDefaults('backoffice')"
            />
            <ToggleInput
              label="llave del vehículo"
              v-model="keyVehicle"
              @changed="modalDefaults('key')"
            />
          </div>
          <h3 class="text-lg font-medium">Estados:</h3>
          <div class="grid grid-cols-1 gap-x-4 lg:grid-cols-2">
            <SelectInput
              label="Pendiente de envío"
              v-model="pending_shipping"
              :options="options.walcuStatus"
              :initialValue="null"
            />
            <SelectInput
              label="Reservado"
              v-model="reserved"
              :options="options.walcuStatus"
              :initialValue="null"
            />
            <SelectInput
              label="Pendiente publicación"
              v-model="pending_publication"
              :options="options.walcuStatus"
              :initialValue="null"
            />
            <SelectInput
              label="Entregado"
              v-model="delivered"
              :options="options.walcuStatus"
              :initialValue="null"
            />
            <SelectInput
              label="En venta"
              v-model="onSale"
              :options="options.walcuStatus"
              :initialValue="null"
            />
          </div>
          <button class="btn btn-primary mt-4 self-end" @click="saveData">
            <LoadingSpinner v-if="loading" />
            <span v-else class="font-semibold text-white">Guardar</span>
          </button>
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
            :items="logs"
            :headers="headersLogs"
            :loading="loadingLogs"
          >
            <template v-slot:item-created_at="{ created_at }">
              {{ new Date(created_at).toLocaleString('en-GB') }}
            </template>
            <template v-slot:item-id="{ id, file }">
              <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn btn-xs m-1">Acciones</div>
                <ul
                  tabindex="0"
                  class="menu dropdown-content menu-xs z-10 w-36 rounded-box bg-white p-2 shadow"
                >
                  <li><a :href="file" target="_blank">Ver</a></li>
                  <li><a @click="downloadFile(id)">Descargar</a></li>
                  <li><a @click="resendLog(id)">Forzar envío</a></li>
                </ul>
              </div>
            </template>
          </EasyDataTable>
        </template>
      </VehicleTable>
    </div>
  </div>
</template>
