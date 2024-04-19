<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
const props = defineProps({
  toggle: { type: Function, required: true },
  id: { type: Number, required: true }
})

const headers = ref('')
const request = ref('')
const responses = ref('')
onMounted(() => {
  axios
    .get(`${import.meta.env.VITE_INTEGRATIONS}/integration_log/${props.id}/`)
    .then((response) => {
      headers.value = response.data.headers
      request.value = response.data.data
      responses.value = response.data.response
    })
})
</script>

<template>
  <div>
    <DrawerTitle title="Detalles del Log" @toggle="toggle" />
    <AreaInput label="Headers:" v-model="headers" />
    <AreaInput label="Request:" v-model="request" />
    <AreaInput label="Response:" v-model="responses" />
  </div>
</template>
