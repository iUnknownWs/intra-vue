<script setup>
import HeaderMain from '@/components/HeaderMain.vue'
import { useDropzone } from 'vue3-dropzone'
import { useRoute } from 'vue-router'
import { ref, reactive } from 'vue'
import { Icon } from '@iconify/vue'
import axios from 'axios'

axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('token')}`
const route = useRoute()
const id = ref(route.params.id)

axios.get(`${import.meta.env.VITE_USER}/${id.value}/`).then((response) => {
  name.value = response.data.first_name
  lastName.value = response.data.last_name
  email.value = response.data.email
  isAdmin.value = response.data.is_admin
  for (let perm of response.data.permissions) {
    perms.value[perm] = true
  }
})

const permissions = ref([])
axios.get(`${import.meta.env.VITE_API}/permissions/`).then((response) => {
  permissions.value = response.data.results
})

const info = ref(null)
const modalTitle = ref('')
const modalMessage = ref('')

const loading = ref(false)
const name = ref(null)
const lastName = ref(null)
const email = ref(null)
const isAdmin = ref(null)
const perms = ref({})
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
  const newPerms = []

  for (let perm in perms.value) {
    if (perms.value[perm]) {
      newPerms.push(parseInt(perm))
    }
  }

  formData.append('first_name', name.value)
  formData.append('last_name', lastName.value)
  formData.append('email', email.value)
  formData.append('is_admin', isAdmin.value)
  newPerms.forEach((perm) => {
    formData.append('permissions', perm)
  })

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
      formData.delete('image')
      formData.delete('first_name')
      formData.delete('last_name')
      formData.delete('email')
      formData.delete('is_admin')
      formData.delete('permissions')
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
</script>

<template>
  <ModalInfo ref="info" :title="modalTitle" :message="modalMessage" />
  <HeaderMain>
    <div class="mx-auto my-8 flex max-w-5xl flex-col p-6">
      <div class="flex w-full flex-col gap-4 lg:flex-row">
        <div class="flex w-full flex-col rounded-md bg-white p-4">
          <h1 class="mb-4 text-xl font-bold">Editar Perfil del Usuario {{ name }}</h1>
          <div>
            <h3 class="text-xl font-medium">Información personal</h3>
            <div class="divider m-0"></div>
          </div>
          <div class="mt-4 w-full">
            <span class="label-text font-medium">Subir foto de perfil</span>
            <div
              v-bind="getRootProps()"
              class="my-3 flex w-full items-center rounded-xl bg-base-100 p-3 lg:block"
            >
              <input v-bind="getInputProps()" />
              <div class="hidden flex-row items-center justify-between text-center lg:flex">
                <p class="font-medium text-base-200" v-if="isDragActive">
                  Suelta los archivos para añadirlos
                </p>
                <LoadingSpinner v-else-if="loading" />
                <p v-else class="font-medium text-base-200">Arrastra y suelta sus archivos aquí</p>
                <button class="btn btn-outline btn-sm text-base-200">Subir</button>
              </div>
              <button class="btn btn-outline btn-sm mx-auto self-center text-base-200 lg:hidden">
                <Icon icon="mdi:file-upload-outline" width="24" class="text-base-200" />
                Subir
              </button>
            </div>
          </div>
          <TextInput label="Nombre:" v-model="name" />
          <TextInput label="Apellidos:" v-model="lastName" />
          <TextInput label="Email:" v-model="email" />
          <div class="my-4">
            <h3 class="text-xl font-medium">Permisos</h3>
            <div class="divider m-0"></div>
          </div>
          <ToggleInput label="Administrador" v-model="isAdmin" class="my-4 w-fit" />
          <div class="grid grid-cols-2 gap-2">
            <ToggleInput
              v-for="permission in permissions"
              :key="permission.id"
              :label="permission.name"
              v-model="perms[permission.id]"
            />
          </div>
          <button class="btn btn-primary mt-4 self-end text-white" @click="save">Guardar</button>
        </div>
        <div class="box-border flex h-fit w-full flex-col rounded-md bg-white p-4">
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
    </div>
  </HeaderMain>
</template>
