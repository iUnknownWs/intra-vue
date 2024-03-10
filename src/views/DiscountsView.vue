<script setup>
import { ref, watch, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import axios from 'axios'
import router from '@/router'

const url = `${import.meta.env.VITE_SALES}/discounts/`
const items = ref([])
const serverItemsLength = ref(0)
const loading = ref(false)
const loadingSpinner = ref(false)
const isFetching = ref(false)
const edit = ref(null)
const data = ref({})
const title = ref('')
const from_date = ref('')
const to_date = ref('')
const amount_fix = ref(0)
const amount_percent = ref(0)
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
      from_date: from_date.value,
      to_date: to_date.value,
      amount_percent: parseInt(amount_percent.value) || 0,
      amount_fix: parseInt(amount_fix.value) || 0
    })
    .then((response) => {
      if (response.status === 201) {
        reset()
        fetching()
      }
    })
}

const editModal = (id) => {
  axios
    .get(`${url}${id}/`)
    .then((response) => {
      data.value = response.data
      title.value = data.value.title
      from_date.value = data.value.from_date
      to_date.value = data.value.to_date
      amount_fix.value = data.value.amount_fix
      amount_percent.value = data.value.amount_percent
    })
    .then(() => {
      edit.value.showModal()
    })
}

const editDiscount = () => {
  loadingSpinner.value = true
  axios
    .put(`${url}${data.value.id}/`, {
      title: title.value,
      from_date: from_date.value,
      to_date: to_date.value,
      amount_percent: parseInt(amount_percent.value) || 0,
      amount_fix: parseInt(amount_fix.value) || 0
    })
    .then(() => {
      reset()
      fetching()
      edit.value.close()
      loadingSpinner.value = false
    })
}

const reset = () => {
  title.value = ''
  from_date.value = ''
  to_date.value = ''
  amount_fix.value = 0
  amount_percent.value = 0
}
</script>

<template>
  <dialog ref="edit" id="edit" class="modal">
    <div class="modal-box flex flex-col">
      <form
        method="dialog flex flex-col"
        @submit.prevent="
          edit.close()
          reset()
        "
      >
        <button class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">✕</button>
      </form>
      <h3 class="text-lg font-bold">Editar Descuento</h3>
      <div class="divider m-0"></div>
      <form @submit.prevent="editDiscount" class="flex flex-col">
        <TextInput label="Título" placeholder="Introducir" v-model="title" />
        <DateInput label="Inicio" v-model="from_date" />
        <DateInput label="Fin" v-model="to_date" />
        <label class="form-control w-full">
          <NumberInput :label="'Valor Fijo'" :max="200000" v-model="amount_fix" />
        </label>
        <label class="form-control w-full">
          <NumberInput :label="'Valor (%)'" :max="100" v-model="amount_percent" />
        </label>
        <button type="submit" class="btn btn-primary mt-4 self-end text-white">
          <LoadingSpinner v-if="loadingSpinner" />
          Guardar
        </button>
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
        <TextInput label="Título" placeholder="Introducir" v-model="title" />
        <DateInput label="Inicio" v-model="from_date" />
        <DateInput label="Fin" v-model="to_date" />
        <label class="form-control w-full">
          <NumberInput :label="'Valor Fijo'" :max="200000" v-model="amount_fix" />
        </label>
        <label class="form-control w-full">
          <NumberInput :label="'Valor (%)'" :max="100" v-model="amount_percent" />
        </label>
      </template>
    </SettingTable>
  </HeaderMain>
</template>
