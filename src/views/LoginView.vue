<script setup>
import axios from 'axios'
import TextInput from '@/components/TextInput.vue'
import { ref } from 'vue'
import router from '@/router';
const email = ref('')
const updateEmail = (value) => {
  email.value = value
}
const password = ref('')
const updatePassword = (value) => {
  password.value = value
}
const login = () => {
  axios.post(import.meta.env.VITE_LOGIN, {
    email: email.value,
    password: password.value
  }).then((response) => {
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('userid', response.data.user.id)
    if (response.status === 200) {
      router.push('/vehiculos')
    }
  })
}
if (localStorage.getItem('token')) {
  router.push('/vehiculos')
}
</script>

<template>
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
        <TextInput label="Email" placeholder="Introducir Email" @input="updateEmail" />
        <TextInput
          label="Contraseña"
          placeholder="Introducir Contraseña"
          type="password"
          @input="updatePassword"
        />
        <span class="text-xs font-medium"
          ><RouterLink to="/recuperar">¿Olvidaste tu contraseña?</RouterLink></span
        >
        <div class="card-actions w-full">
          <button class="btn btn-primary mt-2 w-full text-white" @click="login">Acceder</button>
        </div>
      </div>
    </div>
  </div>
</template>
