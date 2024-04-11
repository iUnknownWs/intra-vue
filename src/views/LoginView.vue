<script setup>
import axios from 'axios'
import TextInput from '@/components/TextInput.vue'
import { ref } from 'vue'
import router from '@/router'
import ModalDialog from '@/components/ModalDialog.vue'

const email = ref('')
const password = ref('')
const validation = ref(null)

const login = () => {
  axios
    .post(import.meta.env.VITE_LOGIN, {
      email: email.value,
      password: password.value
    })
    .then((response) => {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('userid', response.data.user.id)
      localStorage.setItem('image', response.data.user.image)
      localStorage.setItem('email', response.data.user.email)
      localStorage.setItem('name', response.data.user.first_name)
      localStorage.setItem('last_name', response.data.user.last_name)
      if (response.status === 200) {
        router.push('/vehiculos')
      }
    })
    .catch(() => {
      validation.value.modal.showModal()
    })
}
if (localStorage.getItem('token')) {
  router.push('/vehiculos')
}
</script>

<template>
  <ModalDialog ref="validation">
    <h3 class="text-lg font-bold">No se ha podido iniciar la sesión</h3>
    <p class="py-4">El email o contraseña son incorrectos</p>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">Cerrar</button>
      </form>
    </div>
  </ModalDialog>
  <div
    class="flex h-screen w-screen items-center justify-center bg-black bg-[url('/src/assets/img/bg2.png')] bg-cover bg-center"
  >
    <div class="card m-auto w-[90vw] bg-base-100 shadow-xl lg:w-96">
      <figure class="px-10 pt-10">
        <img
          src="https://intranet-pre.garageclub.es/static/images/brand/vertical-negro.svg"
          alt="Logo"
          class="rounded-xl"
        />
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title text-xl">Iniciar Sesión</h2>
        <h3 class="text-sm text-gray-500">Intranet</h3>
        <form class="w-full" @submit.prevent="login">
          <TextInput label="Email" placeholder="Introducir Email" v-model="email" />
          <TextInput
            label="Contraseña"
            placeholder="Introducir Contraseña"
            type="password"
            v-model="password"
          />
          <span class="text-xs font-medium"
            ><RouterLink to="/recuperar">¿Olvidaste tu contraseña?</RouterLink></span
          >
          <div class="card-actions w-full">
            <button class="btn btn-primary mt-2 w-full text-white" type="submit">Acceder</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
