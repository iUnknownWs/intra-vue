<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import HeaderMain from '@/components/HeaderMain.vue'

axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('token')}`

const finRatesUrl = `${import.meta.env.VITE_API}/vehicles-financing-rates/`
const finProdUrl = `${import.meta.env.VITE_API}/vehicles-financing-products/`

const drawer = ref(false)
const tab = ref(1)

const toggleDrawer = () => {
  drawer.value = !drawer.value
}

const integration = ref('menu')

const finRate = ref(null)
const finProd = ref(null)
const finRateOptions = ref([])
const finProdOptions = ref([])

axios.get(finProdUrl).then((response) => {
  finProdOptions.value = response.data.results
})

axios.get(finRatesUrl).then((response) => {
  finRateOptions.value = response.data.results
})
</script>

<template>
  <div class="drawer drawer-end">
    <input id="integration-drawer" type="checkbox" class="drawer-toggle" v-model="drawer" />
    <div class="drawer-content">
      <HeaderMain>
        <span class="text-3xl font-bold">Integraciones</span>
        <div role="tablist" class="tabs tabs-bordered my-8">
          <a
            role="tab"
            class="tab"
            :class="{ 'tab-active font-medium': tab === 1 }"
            @click="tab = 1"
          >
            Portales Web
          </a>
          <a
            role="tab"
            class="tab"
            :class="{ 'tab-active font-medium': tab === 2 }"
            @click="tab = 2"
          >
            Financiación
          </a>
          <a
            role="tab"
            class="tab"
            :class="{ 'tab-active font-medium': tab === 3 }"
            @click="tab = 3"
          >
            CRM
          </a>
        </div>
        <div v-if="tab === 1" class="flex w-full flex-col rounded-md bg-base-100 p-4">
          <template v-if="integration === 'menu'">
            <div class="mb-4">
              <div>
                <h2 class="text-xl font-medium">Portales Web</h2>
              </div>
              <div class="divider m-0"></div>
            </div>
            <div class="mt-6 flex flex-col items-center gap-4 lg:flex-row">
              <IntegrationCard
                img="https://garageclub-prod.s3.amazonaws.com/backend/media/imagen_2024-01-30_210822393.png"
                @settingClick="integration = 'cochesnet'"
                @primaryClick="console.log('desactivar')"
              />
              <IntegrationCard
                img="https://garageclub-prod.s3.amazonaws.com/backend/media/wallapop-logo-317DAB9D83-seeklogo.com.png"
                @settingClick="integration = 'wallapop'"
                @primaryClick="console.log('desactivar')"
              />
              <IntegrationCard
                img="https://www.sumauto.com/assets/logo.svg?a2a568d6"
                @settingClick="integration = 'sumauto'"
                @primaryClick="console.log('desactivar')"
              />
            </div>
          </template>
          <template v-if="integration === 'cochesnet'">
            <div class="mb-4">
              <div class="flex items-center">
                <button class="btn btn-square btn-ghost mr-2" @click="integration = 'menu'">
                  <Icon icon="mdi:arrow-left" width="25" />
                </button>
                <h2 class="text-xl font-medium">Cochesnet</h2>
              </div>
              <div class="divider m-0"></div>
            </div>
          </template>
          <template v-if="integration === 'wallapop'">
            <div class="mb-4">
              <div class="flex items-center">
                <button class="btn btn-square btn-ghost mr-2" @click="integration = 'menu'">
                  <Icon icon="mdi:arrow-left" width="25" />
                </button>
                <h2 class="text-xl font-medium">Wallapop</h2>
              </div>
              <div class="divider m-0"></div>
            </div>
          </template>
          <template v-if="integration === 'sumauto'">
            <div class="mb-4">
              <div class="flex items-center">
                <button class="btn btn-square btn-ghost mr-2" @click="integration = 'menu'">
                  <Icon icon="mdi:arrow-left" width="25" />
                </button>
                <h2 class="text-xl font-medium">Sumauto</h2>
              </div>
              <div class="divider m-0"></div>
            </div>
          </template>
        </div>
        <div
          v-if="tab === 2"
          class="mx-auto flex w-full max-w-3xl flex-col rounded-md bg-base-100 p-4"
        >
          <div>
            <h2 class="text-xl font-medium">Configuración financiera</h2>
            <div class="divider m-0"></div>
          </div>
          <div class="my-4 flex flex-col items-center gap-4 lg:flex-row">
            <SelectInput
              label="Interés por defecto:"
              v-model="finRate"
              :options="finRateOptions"
              optionLabel="label"
              :initialValue="null"
            />
            <SelectInput
              label="Producto por defecto:"
              v-model="finProd"
              :options="finProdOptions"
              optionLabel="label"
              :initialValue="null"
            />
          </div>
          <button class="btn btn-primary self-end">Guardar</button>
        </div>
        <div v-if="tab === 3" class="flex w-full flex-col rounded-md bg-base-100 p-4">
          <template v-if="integration === 'walcu'">
            <div class="mb-4">
              <div class="flex items-center">
                <button class="btn btn-square btn-ghost mr-2" @click="integration = 'menu'">
                  <Icon icon="mdi:arrow-left" width="25" />
                </button>
                <h2 class="text-xl font-medium">Walcu</h2>
              </div>
              <div class="divider m-0"></div>
            </div>
          </template>
          <template v-if="integration === 'menu'">
            <div class="mb-4">
              <div>
                <h2 class="text-xl font-medium">CRM</h2>
              </div>
              <div class="divider m-0"></div>
            </div>
            <div class="mt-6 flex flex-col items-center gap-4 lg:flex-row">
              <IntegrationCard
                img="https://www.walcu.com/wp-content/uploads/elementor/thumbs/logo-walcu-pwhwe8cmr066cx7a97fdv60rf1bbefzikhxt38wa9s.png"
                @settingClick="integration = 'walcu'"
                @primaryClick="toggleDrawer"
              />
            </div>
          </template>
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
