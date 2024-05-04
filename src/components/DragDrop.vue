<script setup>
import { useDropzone } from 'vue3-dropzone'
import { ref, reactive } from 'vue'
import axios from 'axios'

const props = defineProps({
  url: { type: String, required: true },
  type: { type: String, required: true },
  params: { type: Array, required: true },
  format: { type: String, required: true },
  fetch: { type: Function },
  file_name: { type: String }
})

const loading = ref(false)

const saveFiles = (files) => {
  const formData = new FormData()
  for (var x = 0; x < files.length; x++) {
    formData.append(props.type, files[x])
    if (props.file_name) formData.append(props.file_name, files[x].name)
    for (let param of props.params) {
      formData.append(param.key, param.value)
    }
  }

  axios
    .post(props.url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(() => {
      loading.value = false
      if (props.fetch) props.fetch()
    })
    .catch((err) => {
      console.error(err)
    })
}

const onDrop = (acceptFiles) => {
  loading.value = true
  saveFiles(acceptFiles)
}

const optionsDrop = reactive({
  multiple: true,
  onDrop,
  accept: props.format
})

const { getRootProps, getInputProps, isDragActive } = useDropzone(optionsDrop)
</script>

<template>
  <div v-bind="getRootProps()" class="m-2 w-fit rounded border-2 border-black p-3">
    <input v-bind="getInputProps()" />
    <div class="w-fit text-center">
      <p v-if="isDragActive">Suelta los archivos para añadirlos</p>
      <LoadingSpinner v-else-if="loading" />
      <p v-else>Arrastra y suelta los archivos o selecciónalos haciendo click</p>
    </div>
  </div>
</template>