<script setup>
import { ref, watch, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import HeaderMain from '@/components/HeaderMain.vue'
import SettingTable from '@/components/SettingTable.vue'
import TextInput from '@/components/TextInput.vue'
import DateInput from '@/components/DateInput.vue'
import axios from 'axios'
import router from '@/router'

const url = `${import.meta.env.VITE_SALES}/discounts/`
const items = ref([])
const serverItemsLength = ref(0)
const loading = ref(false)
const users = ref([])
const isFetching = ref(false)
const serverOptions = ref({
  page: 1,
  rowsPerPage: 20
})

const fetching = () => {
  if (isFetching.value) {
    return
  }

  isFetching.value = true
  loading.value = true

  const fetchData = async () => {
    try {
      const params = {
        limit: serverOptions.value.rowsPerPage,
        pager: 'number',
        page: serverOptions.value.page
      }
      const API_URL = `${url}/?${new URLSearchParams(params)}`
      const response = await axios.get(API_URL)
      users.value = response.data.results
      items.value = response.data.results
      serverItemsLength.value = response.data.count
      loading.value = false
    } catch (error) {
      console.error(error)
    } finally {
      isFetching.value = false
    }
  }

  fetchData()
}

onMounted(() => {
  fetching()
})

watch(
  serverOptions,
  () => {
    fetching()
  },
  { deep: true }
)

const remove = (id) => {
  axios.delete(`${url}/${id}/`).then(() => router.go(0))
}

const headers = [
  { text: 'TÍTULO', value: 'title' },
  { text: 'INICIO', value: 'from_date' },
  { text: 'FIN', value: 'to_date' },
  { text: 'VALOR (%)', value: 'amount_percent' },
  { text: 'VALOR FIJO', value: 'amount_fix' },
  { text: 'ACCIONES', value: 'id', width: 60 }
]

const addDiscount = () => {
  axios
    .post(url, {
      title: title.value,
      from_date: startDate.value,
      to_date: endDate.value,
      amount_percent: amount.value,
      amount_fix: amountFix.value
    })
    .then((response) => {
      if (response.status === 201) {
        router.go(0)
      }
    })
}

const edit = ref(null)
const data = ref({})
const refresh = ref(0)

const refreshComponent = () => {
  refresh.value++
}
const editModal = (id) => {
  axios
    .get(`${url}${id}/`)
    .then((response) => {
      data.value = response.data
    })
    .then(() => {
      refreshComponent()
      title.value = data.value.title
      startDate.value = data.value.from_date
      endDate.value = data.value.to_date
      amount.value = data.value.amount_percent
      amountFix.value = data.value.amount_fix
      edit.value.showModal()
    })
}

const editDiscount = () => {
  axios
    .put(`${url}${data.value.id}/`, {
      title: title.value,
      from_date: startDate.value,
      to_date: endDate.value,
      amount_percent: amount.value,
      amount_fix: amountFix.value
    })
    .then(() => router.go(0))
}

const title = ref('')
const updateTitle = (value) => {
  title.value = value
}

const startDate = ref('')
const updateStartDate = (value) => {
  startDate.value = value
}

const endDate = ref('')
const updateEndDate = (value) => {
  endDate.value = value
}

const amount = ref(0)
const amountFix = ref(0)
</script>

<template>
  <dialog ref="edit" id="edit" class="modal">
    <div class="modal-box flex flex-col">
      <form method="dialog flex flex-col">
        <button class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">✕</button>
      </form>
      <h3 class="text-lg font-bold">Editar Descuento</h3>
      <div class="divider m-0"></div>
      <form @submit.prevent="editDiscount" class="flex flex-col">
        <TextInput
          label="Título"
          placeholder="Introducir"
          @input="updateTitle"
          :read="data.title"
          :key="refresh"
        />
        <DateInput
          label="Inicio"
          @input="updateStartDate"
          :key="refresh"
          :read="data.from_date"
        />
        <DateInput label="Fin" @input="updateEndDate" :key="refresh" :read="data.to_date" />
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text font-medium">Valor (%)</span>
          </div>
          <input type="number" class="input input-bordered w-full" max="100" v-model="amount" />
        </label>
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text font-medium">Valor (%)</span>
          </div>
          <input
            type="number"
            class="input input-bordered w-full"
            max="200000"
            v-model="amountFix"
          />
        </label>
        <button type="submit" class="btn btn-primary mt-4 self-end text-white">Guardar</button>
      </form>
    </div>
  </dialog>
  <HeaderMain>
    <SettingTable
      title="Lista de Descuentos"
      :add="true"
      drawerTitle="Añadir Nuevo descuento"
      @toggle="addDiscount"
    >
      <template #content>
        <EasyDataTable
          class="table-dark table-striped"
          border-cell
          buttons-pagination
          :headers="headers"
          :items="items"
          v-model:server-options="serverOptions"
          :server-items-length="serverItemsLength"
          :loading="loading"
          rows-per-page-message="Filas por pestaña"
        >
          <template v-slot:item-id="{ id }">
            <div class="w-20">
              <button class="btn btn-square btn-xs mr-2" @click="editModal(id)">
                <Icon icon="mdi:pencil" />
              </button>
              <button class="btn btn-square btn-error btn-xs" @click="remove(id)">
                <Icon icon="mdi:trash-can-outline" />
              </button>
            </div>
          </template>
        </EasyDataTable>
      </template>
      <template #drawer>
        <TextInput label="Título" placeholder="Introducir" @submit="updateTitle" />
        <DateInput label="Inicio" @input="updateStartDate" />
        <DateInput label="Fin" @input="updateEndDate" />
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text font-medium">Valor (%)</span>
          </div>
          <input type="number" class="input input-bordered w-full" max="100" v-model="amount" />
        </label>
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text font-medium">Valor (%)</span>
          </div>
          <input
            type="number"
            class="input input-bordered w-full"
            max="200000"
            v-model="amountFix"
          />
        </label>
      </template>
    </SettingTable>
  </HeaderMain>
</template>
