<script setup>
import { ref } from 'vue'
import axios from 'axios'
const props = defineProps({
  toggle: { type: Function, required: true },
  id: { type: Number, required: true }
})

const emits = defineEmits(['added'])

const loading = ref(false)
const formData = new FormData()
const title = ref('')
const description = ref('')
const startDate = ref(null)
const endDate = ref(null)
const includeQr = ref(false)

const previewFile = (file) => {
  formData.append('image_overlay', file)
  formData.append('affected_images', 0)
}

const save = () => {
  loading.value = true
  formData.append('title', title.value)
  formData.append('description', description.value)
  formData.append('start_date', startDate.value)
  formData.append('end_date', endDate.value)
  formData.append('include_qr', includeQr.value)
  formData.append('integration', props.id)

  axios
    .post(`${import.meta.env.VITE_INTEGRATIONS}/campaigns/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(() => {
      props.toggle()
      emits('added')
    })
    .catch((err) => {
      console.error(err)
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <div>
    <DrawerTitle title="Editar campaña" @toggle="toggle" />
    <TextInput label="Titulo:" v-model="title" />
    <div class="flex flex-row gap-2">
      <DateInput label="Fecha de inicio:" v-model="startDate" />
      <DateInput label="Fecha de fin:" v-model="endDate" />
    </div>
    <AreaInput label="Descripción:" v-model="description" />
    <ToggleInput label="Incluir QR:" class="my-2 w-fit" v-model="includeQr" />
    <FileInput label="Imagen de portada:" @fileSelected="previewFile" />
  </div>
  <DrawerActions
    secondary="Cancelar"
    primary="Guardar"
    :loading="loading"
    @click-secondary="toggle"
    @click-primary="save"
  />
</template>
