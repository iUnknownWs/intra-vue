<script setup>
import TextInput from '@/components/TextInput.vue'
import { RouterLink } from 'vue-router'
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
        <h2 class="card-title text-base lg:text-xl">¿Has olvidado tu contraseña?</h2>
        <h3 class="text-xs text-gray-500 lg:text-sm">
          Introduce tu email para resetear la contraseña.
        </h3>
        <TextInput label="Email" placeholder="Introducir Email" />
        <div class="card-actions">
          <RouterLink to="/">
            <button class="btn btn-outline btn-primary mt-2">Cancelar</button>
          </RouterLink>
          <button class="btn btn-primary mt-2 text-white">Recuperar</button>
        </div>
      </div>
    </div>
  </div>
</template>
