<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import HeaderMain from '@/components/HeaderMain.vue'
import CochesnetIntegration from '@/components/Integrations/CochesnetIntegration.vue'
import WallapopIntegration from '@/components/Integrations/WallapopIntegration.vue'
import SumautoIntegration from '@/components/Integrations/SumautoIntegration.vue'
import CofidisIntegration from '@/components/Integrations/CofidisIntegration.vue'
import WalcuIntegration from '@/components/Integrations/WalcuIntegration.vue'

axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('token')}`

const info = ref(null)
const modalTitle = ref('')
const modalMessage = ref('')
const drawer = ref(false)
const tab = ref(1)

const toggleDrawer = () => {
  drawer.value = !drawer.value
}

const integration = ref('menu')
const integrationId = ref(null)
const integrationSection = ref('settings')

const tabSelect = (tabSelected) => {
  tab.value = tabSelected
  integration.value = 'menu'
}

const webPortals = ref([])
const finances = ref([])
const crms = ref([])

const getIntegrations = () => {
  axios
    .get(`${import.meta.env.VITE_INTEGRATIONS}/integrations/?category=web_portals`)
    .then((response) => {
      webPortals.value = response.data.results
    })
  axios.get(`${import.meta.env.VITE_INTEGRATIONS}/integrations/?category=crm`).then((response) => {
    crms.value = response.data.results
  })
  axios
    .get(`${import.meta.env.VITE_INTEGRATIONS}/integrations/?category=financing`)
    .then((response) => {
      finances.value = response.data.results
    })
}

const settIntegration = (id, name) => {
  integrationId.value = id
  integration.value = name
}

const disIntegration = (id, state) => {
  axios
    .patch(`${import.meta.env.VITE_INTEGRATIONS}/integrations/${id}/`, { is_active: !state })
    .then(() => {
      getIntegrations()
      modalTitle.value = 'Integración' + (state ? ' desactivada' : ' activada')
      modalMessage.value = `La integración ha sido ${state ? 'desactivada' : 'activada'} correctamente`
      info.value.modal.showModal()
    })
}

onMounted(() => {
  getIntegrations()
})
</script>

<template>
  <div class="drawer drawer-end">
    <input id="integration-drawer" type="checkbox" class="drawer-toggle" v-model="drawer" />
    <div class="drawer-content">
      <ModalInfo ref="info" :title="modalTitle" :message="modalMessage" />
      <HeaderMain>
        <span class="text-3xl font-bold">Integraciones</span>
        <template v-if="integration === 'menu'">
          <div role="tablist" class="tabs tabs-bordered my-8 w-fit">
            <a
              role="tab"
              class="tab"
              :class="{ 'tab-active font-medium': tab === 1 }"
              @click="tabSelect(1)"
            >
              Portales Web
            </a>
            <a
              role="tab"
              class="tab"
              :class="{ 'tab-active font-medium': tab === 2 }"
              @click="tabSelect(2)"
            >
              Financiación
            </a>
            <a
              role="tab"
              class="tab"
              :class="{ 'tab-active font-medium': tab === 3 }"
              @click="tabSelect(3)"
            >
              CRM
            </a>
          </div>
        </template>
        <template v-if="integration === 'Coches.net'">
          <div role="tablist" class="tabs tabs-bordered my-8 w-fit">
            <a
              role="tab"
              class="tab"
              :class="{ 'tab-active font-medium': integrationSection === 'settings' }"
              @click="integrationSection = 'settings'"
            >
              Configuración
            </a>
            <a
              role="tab"
              class="tab"
              :class="{ 'tab-active font-medium': integrationSection === 'logs' }"
              @click="integrationSection = 'logs'"
            >
              Logs
            </a>
          </div>
        </template>
        <template v-if="integration === 'Wallapop'">
          <div role="tablist" class="tabs tabs-bordered my-8 w-fit">
            <a
              role="tab"
              class="tab"
              :class="{ 'tab-active font-medium': integrationSection === 'settings' }"
              @click="integrationSection = 'settings'"
            >
              Configuración
            </a>
            <a
              role="tab"
              class="tab"
              :class="{ 'tab-active font-medium': integrationSection === 'logs' }"
              @click="integrationSection = 'logs'"
            >
              Logs
            </a>
          </div>
        </template>
        <template v-if="integration === 'Sumauto'">
          <div role="tablist" class="tabs tabs-bordered my-8 w-fit">
            <a
              role="tab"
              class="tab"
              :class="{ 'tab-active font-medium': integrationSection === 'settings' }"
              @click="integrationSection = 'settings'"
            >
              Configuración
            </a>
            <a
              role="tab"
              class="tab"
              :class="{ 'tab-active font-medium': integrationSection === 'logs' }"
              @click="integrationSection = 'logs'"
            >
              Logs
            </a>
          </div>
        </template>
        <div v-if="tab === 1" class="flex w-full flex-col gap-8">
          <div v-if="integration === 'menu'">
            <div class="mb-4 rounded-md bg-base-100 p-4">
              <div>
                <h2 class="text-xl font-medium">Portales Web</h2>
              </div>
              <div class="divider m-0"></div>
              <div class="mt-6 flex flex-col items-center gap-4 lg:flex-row">
                <IntegrationCard
                  v-for="portal in webPortals"
                  :key="portal.id"
                  :img="portal.logo_img"
                  :name="portal.provider_name"
                  :state="portal.is_active"
                  toggle
                  @settingClick="settIntegration(portal.id, portal.provider_name)"
                  @primaryClick="disIntegration(portal.id, portal.is_active)"
                />
              </div>
            </div>
          </div>
          <CochesnetIntegration
            v-if="integration === 'Coches.net'"
            :id="integrationId"
            :tab="integrationSection"
            @return="integration = 'menu'"
          />
          <WallapopIntegration
            v-if="integration === 'Wallapop'"
            :id="integrationId"
            :tab="integrationSection"
            @return="integration = 'menu'"
          />
          <SumautoIntegration
            v-if="integration === 'Sumauto'"
            :id="integrationId"
            :tab="integrationSection"
            @return="integration = 'menu'"
          />
        </div>
        <div v-if="tab === 2" class="mx-auto flex w-full flex-col">
          <template v-if="integration === 'menu'">
            <div class="mb-4 rounded-md bg-base-100 p-4">
              <h2 class="text-xl font-medium">Configuración financiera</h2>
              <div class="divider m-0"></div>
              <div class="mt-6 flex flex-col items-center gap-4 lg:flex-row">
                <IntegrationCard
                  v-for="finance in finances"
                  :key="finance.id"
                  :img="finance.logo_img"
                  :name="finance.provider_name"
                  :state="finance.is_active"
                  toggle
                  @settingClick="integration = finance.provider_name"
                  @primaryClick="disIntegration(finance.id, finance.is_active, finance)"
                />
              </div>
            </div>
          </template>
          <CofidisIntegration v-if="integration === 'COFIDIS'" @return="integration = 'menu'" />
        </div>
        <div v-if="tab === 3" class="flex w-full flex-col">
          <template v-if="integration === 'menu'">
            <div class="mb-4 rounded-md bg-base-100 p-4">
              <div>
                <h2 class="text-xl font-medium">CRM</h2>
              </div>
              <div class="divider m-0"></div>
              <div class="mt-6 flex flex-col items-center gap-4 lg:flex-row">
                <IntegrationCard
                  v-for="crm in crms"
                  :key="crm.id"
                  :img="crm.logo_img"
                  :name="crm.provider_name"
                  :state="crm.is_active"
                  toggle
                  @settingClick="settIntegration(crm.id, crm.provider_name)"
                  @primaryClick="disIntegration(crm.id, crm.is_active, crm)"
                />
              </div>
            </div>
          </template>
          <WalcuIntegration
            v-if="integration === 'Walcu CRM'"
            @return="integration = 'menu'"
            :id="integrationId"
          />
        </div>
      </HeaderMain>
    </div>
    <div class="drawer-side z-50">
      <label for="integration-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu min-h-full w-80 bg-white p-4 text-base-content">
        <DrawerTitle title="Integraciones" @toggle="toggleDrawer" />
      </ul>
    </div>
  </div>
</template>

<style>
.btn-error {
  color: #fff;
}
</style>
