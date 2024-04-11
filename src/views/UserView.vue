<script setup>
import HeaderMain from '@/components/HeaderMain.vue'
import { useDropzone } from 'vue3-dropzone'
import { useRoute } from 'vue-router'
import { ref, reactive } from 'vue'
import axios from 'axios'

axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('token')}`
const route = useRoute()
const id = ref(route.params.id)

axios.get(`${import.meta.env.VITE_USER}/${id.value}/`).then((response) => {
  name.value = response.data.first_name
  lastName.value = response.data.last_name
  email.value = response.data.email
})

const drawer = ref(false)
const info = ref(null)
const modalTitle = ref('')
const modalMessage = ref('')

const loading = ref(false)
const name = ref(null)
const lastName = ref(null)
const email = ref(null)
const newPassword = ref(null)
const confirmPassword = ref(null)

const formData = new FormData()

const saveFiles = (files) => {
  for (var x = 0; x < files.length; x++) {
    formData.append('image', files[x])
  }
  loading.value = false
}

const onDrop = (acceptFiles) => {
  loading.value = true
  saveFiles(acceptFiles)
}

const optionsDrop = reactive({
  multiple: true,
  onDrop,
  accept: 'image/*'
})

const save = () => {
  loading.value = true

  formData.append('first_name', name.value)
  formData.append('last_name', lastName.value)
  formData.append('email', email.value)

  axios
    .patch(`${import.meta.env.VITE_USER}/${id.value}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(() => {
      modalTitle.value = 'Usuario'
      modalMessage.value = 'La información del usuario ha sido actualizada correctamente'
      info.value.modal.showModal()
    })
    .catch((err) => {
      modalTitle.value = 'Error'
      modalMessage.value = 'No se pudo actualizar la información del usuario'
      info.value.modal.showModal()
      console.error(err)
    })
    .finally(() => {
      loading.value = false
    })
}

const passwordLoading = ref(false)

const changePassword = () => {
  if (newPassword.value === confirmPassword.value) {
    passwordLoading.value = true
    axios
      .post(`${import.meta.env.VITE_USER}/${localStorage.getItem('userid')}/change-password/`, {
        new_password: newPassword.value,
        confirm_password: confirmPassword.value
      })
      .then(() => {
        modalTitle.value = 'Contraseña actualizada'
        modalMessage.value = 'La contraseña ha sido actualizada correctamente'
        info.value.modal.showModal()
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        passwordLoading.value = false
      })
  } else {
    modalTitle.value = 'Contraseñas no coinciden'
    modalMessage.value = 'Las contraseñas no coinciden, por favor, verifique los datos'
    info.value.modal.showModal()
  }
}

const { getRootProps, getInputProps, isDragActive } = useDropzone(optionsDrop)

const toggleDrawer = () => {
  drawer.value = !drawer.value
}
</script>

<template>
  <div class="drawer drawer-end">
    <input id="integration-drawer" type="checkbox" class="drawer-toggle" v-model="drawer" />
    <div class="drawer-content">
      <ModalInfo ref="info" :title="modalTitle" :message="modalMessage" />
      <HeaderMain>
        <h1 class="mx-4 mt-4 text-xl font-bold lg:mx-12">Perfil de Usuario</h1>
        <h2 class="mx-4 mb-4 text-lg font-bold lg:mx-12">Hola bienvenido, {{ name }}</h2>
        <div class="flex w-full flex-col gap-4 p-2 lg:flex-row">
          <div class="flex w-full flex-col rounded-md bg-base-100 p-4 lg:mx-10 lg:p-10">
            <div>
              <h3 class="text-xl font-medium">Información personal</h3>
              <div class="divider m-0"></div>
            </div>
            <div class="mt-4">
              <span class="label-text font-medium">Subir foto de perfil</span>
              <div
                v-bind="getRootProps()"
                class="my-2 hidden w-fit rounded border-2 border-black p-3 lg:block"
              >
                <input v-bind="getInputProps()" />
                <div class="w-[25rem] text-center">
                  <p v-if="isDragActive">Suelta los archivos para añadirlos</p>
                  <LoadingSpinner v-else-if="loading" />
                  <p v-else>Arrastra y suelta los archivos o selecciónalos haciendo click</p>
                </div>
              </div>
              <div
                v-bind="getRootProps()"
                class="my-2 w-fit rounded border-2 border-black p-2 lg:hidden"
              >
                <input v-bind="getInputProps()" />
                <div class="w-fit text-center">
                  <p v-if="isDragActive">Suelta los archivos para añadirlos</p>
                  <LoadingSpinner v-else-if="loading" />
                  <p v-else class="text-xs">Pulsa aquí para añadir archivos</p>
                </div>
              </div>
            </div>
            <TextInput label="Nombre:" v-model="name" />
            <TextInput label="Apellidos:" v-model="lastName" />
            <TextInput label="Email:" v-model="email" />
            <button class="btn btn-primary mt-4 self-end text-white" @click="save">Guardar</button>
          </div>
          <div
            class="box-border flex h-fit w-full flex-col rounded-md bg-base-100 p-4 lg:mx-10 lg:p-10"
          >
            <div>
              <h3 class="text-xl font-medium">Cambiar contraseña</h3>
              <div class="divider m-0"></div>
            </div>
            <TextInput label="Nueva Contraseña:" type="password" v-model="newPassword" />
            <TextInput label="Repetir Contraseña:" type="password" v-model="confirmPassword" />
            <button class="btn btn-primary mt-4 self-end text-white" @click="changePassword">
              <LoadingSpinner v-if="passwordLoading" />
              <span v-else class="font-medium text-white">Cambiar</span>
            </button>
          </div>
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
