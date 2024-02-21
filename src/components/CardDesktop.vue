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
  <div class="card mt-4 w-full bg-base-100 text-xs font-normal">
    <div class="card-body flex-row p-4">
      <div
        class="cover relative z-0 aspect-video h-32 bg-cover bg-center"
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
      <div class="flex-col pl-4">
        <div class="test flex flex-row justify-between">
          <div>
            <span class="mr-2 font-semibold">{{ placa }}</span>
            <span class="font-semibold capitalize">{{ marca }}</span>
            <span class="font-semibold capitalize">{{ modelo }}</span>
          </div>
        </div>
        <span class="font-medium text-gray-500">{{ version }}</span>
        <div class="mt-3 flex flex-row justify-between gap-3">
          <div class="flex flex-col items-start p-0">
            <span>Contado</span>
            <span class="font-bold">{{ contado }}€</span>
          </div>
          <div class="flex flex-col items-start p-0">
            <span>Financiado</span>
            <span class="font-bold">{{ financiado[0] }}€</span>
            <span>Desde {{ financiado[1] }}€</span>
          </div>
          <div class="flex flex-col items-start p-0">
            <span>Dias Stock</span>
            <span class="font-bold">{{ stock }} Dias</span>
          </div>
        </div>
        <div class="divider m-0"></div>
        <div class="flex flex-row gap-3">
          <span v-for="(attr, index) in attrs" :key="index">{{ attr }}</span>
        </div>
      </div>
      <div class="divider divider-horizontal"></div>
      <div class="flex flex-col justify-around">
        <span v-if="integrations[0]" class="badge badge-neutral mr-2 rounded-md pb-1 text-white"
          ><a href="">wallapop</a></span
        >
        <span v-if="integrations[1]" class="badge badge-neutral mr-2 rounded-md pb-1 text-white"
          ><a href="">coches.net</a></span
        >
        <span v-if="integrations[2]" class="badge badge-neutral mr-2 rounded-md pb-1 text-white"
          ><a href="">sumauto</a></span
        >
      </div>
      <div class="dropdown dropdown-end menu-xs">
        <div tabindex="0" role="button" class="btn btn-square btn-ghost">
          <Icon icon="mdi:dots-vertical" width="30" />
        </div>
        <ul
          tabindex="0"
          class="menu dropdown-content z-[1] mt-0 w-32 rounded-box bg-base-100 p-2 text-xs shadow-lg"
        >
          <li><a>Ver/Editar</a></li>
          <li><a>Ejecutar PT</a></li>
          <li><a>Imprimir</a></li>
          <li><a>Eliminar</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
