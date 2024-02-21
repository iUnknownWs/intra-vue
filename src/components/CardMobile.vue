<script setup>
// defineProps({
//   placa: { type: String, required: true },
//   modelo: { type: String, required: true },
//   marca: { type: String, required: true },
//   version: { type: String, required: true },
//   estado: { type: String, required: true },
//   contado: { type: Number, required: true },
//   financiado: { type: Array, required: true },
//   stock: { type: Number, required: true },
//   img: { type: String, required: true },
//   attr: { type: Array, required: true },
//   integrations: { type: Array, required: true },
//   num: { type: Number, required: true }
// })

const placa = '34445LTR'
const marca = 'Range Rover'
const modelo = 'Land Rover'
const version = '2019'
const estado = 'En venta'
const contado = 10000
const financiado = [9000, 340]
const stock = 58
const img = `https://garageclub-prod.s3.amazonaws.com/backend/media/DSC03493_D1K6Ekt_9uWa7UD_jORggzh_lBr3MTE.jpg`
const attrs = ['2019', 'Automático', 'Gasolina', '120cv', '5P']
const integrations = [true, true, true]
const leads = 12
</script>

<template>
  <div class="card card-compact mt-3 w-[90vw] bg-base-100 text-xs shadow-xl">
    <figure class="bg-cover">
      <div
        class="cover relative z-0 aspect-video w-[90vw] bg-[url('https://garageclub-prod.s3.amazonaws.com/backend/media/DSC03493_D1K6Ekt_9uWa7UD_jORggzh_lBr3MTE.jpg')] bg-cover bg-center"
        :style="{ 'background-image': 'url(' + img + ')' }"
      >
        <div class="absolute bottom-2 right-2">
          <span class="badge badge-error mr-2 mt-2 rounded-md px-3 pb-1 text-white">{{
            estado
          }}</span>
          <span class="badge badge-info mr-2 mt-2 rounded-md px-3 pb-1 text-white">{{
            leads
          }}</span>
        </div>
      </div>
    </figure>
    <div class="card-body relative flex">
      <div class="textcard flex gap-1 font-bold">
        <span>{{ placa }}</span>
        <span>{{ marca }}</span>
        <span>{{ modelo }}</span>
        <span class="text-gray-500">{{ version }}</span>
      </div>
      <div class="textcard flex flex-row justify-between">
        <div class="flex flex-col">
          <span>Contado</span>
          <span class="font-bold">{{ contado }}€</span>
        </div>
        <div class="flex flex-col">
          <span>Financiado</span>
          <span class="font-bold">{{ financiado[0] }}€</span>
          <span>Desde {{ financiado[1] }}€</span>
        </div>
        <div class="flex flex-col">
          <span>Dias stock</span>
          <span class="font-bold">{{ stock }} días</span>
        </div>
        <div class="flex flex-col">
          <span>Kms</span>
          <span>125.000KMs</span>
        </div>
      </div>
      <div class="divider m-0"></div>
      <div class="textcard flex flex-row justify-between">
        <span v-for="(attr, index) in attrs" :key="index">{{ attr }}</span>
      </div>
      <div class="mt-2 flex gap-1 [&>span]:text-xs">
        <span v-if="integrations[0]" class="badge badge-primary rounded-md pb-1"
          ><a href="">coches.net</a></span
        >
        <span v-if="integrations[1]" class="badge badge-primary rounded-md pb-1"
          ><a href="">wallapop</a></span
        >
        <span v-if="integrations[2]" class="badge badge-primary rounded-md pb-1"
          ><a href="">sumauto</a></span
        >
      </div>
    </div>
  </div>
</template>

<style scoped></style>
