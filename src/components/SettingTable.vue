<script lang="ts" setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

defineProps({
  title: { type: String, required: true },
  add: { type: Boolean, required: true },
  drawerTitle: { type: String, required: true }
})
defineEmits(['toggle'])

const toggleDrawer = () => {
  toggle.value = !toggle.value
}
const toggle = ref(false)
</script>
<template>
  <div class="drawer drawer-end">
    <input id="rightDrawer" type="checkbox" class="drawer-toggle" v-model="toggle" />
    <div class="drawer-content">
      <!-- Page content here -->
      <div class="flex flex-col">
        <div class="flex flex-row justify-between">
          <span class="text-2xl font-semibold">{{ title }}</span>
          <label
            v-if="add"
            for="rightDrawer"
            class="btn btn-primary drawer-button btn-sm mb-2 self-end text-white"
          >
            <Icon icon="mdi:plus" width="25" />
            Nuevo
          </label>
        </div>
        <slot name="content" />
      </div>
    </div>
    <div class="drawer-side z-20">
      <label for="rightDrawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu min-h-full w-screen justify-between bg-white p-4 text-base-content lg:w-80">
        <!-- Sidebar content here -->
        <div>
          <DrawerTitle :title="drawerTitle" @toggle="toggleDrawer" />
          <slot name="drawer" />
        </div>
        <li class="mt-8 flex flex-row justify-around">
          <button @click="toggle = !toggle" class="btn btn-outline w-28">Cancelar</button>
          <button
            @click="$emit('toggle', (toggle = !toggle))"
            class="btn btn-primary w-24 text-white"
          >
            Guardar
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
