<script setup>
import HeaderMain from '@/components/HeaderMain.vue'
import { ref } from 'vue'

const drawer = ref(false)

const toggleDrawer = () => {
  drawer.value = !drawer.value
}
</script>

<template>
  <div class="drawer drawer-end">
    <input id="integration-drawer" type="checkbox" class="drawer-toggle" v-model="drawer" />
    <div class="drawer-content">
      <HeaderMain>
        <span class="text-3xl font-bold">Portales Web</span>
        <div class="mt-6 flex flex-col items-center gap-4 lg:flex-row">
          <IntegrationCard
            img="https://garageclub-prod.s3.amazonaws.com/backend/media/imagen_2024-01-30_210822393.png"
            @settingClick="toggleDrawer"
            @primaryClick="toggleDrawer"
          />
          <IntegrationCard
            img="https://garageclub-prod.s3.amazonaws.com/backend/media/wallapop-logo-317DAB9D83-seeklogo.com.png"
            @settingClick="toggleDrawer"
            @primaryClick="toggleDrawer"
          />
          <IntegrationCard
            img="https://www.sumauto.com/assets/logo.svg?a2a568d6"
            @settingClick="toggleDrawer"
            @primaryClick="toggleDrawer"
          />
        </div>
      </HeaderMain>
    </div>
    <div class="drawer-side z-50">
      <label for="integration-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu min-h-full w-80 bg-white p-4 text-base-content ">
        <DrawerTitle title="Integraciones" @toggle="toggleDrawer" />
      </ul>
    </div>
  </div>
</template>