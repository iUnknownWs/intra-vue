<script setup>
import { Icon } from '@iconify/vue'
import { useRoute } from 'vue-router'
import router from '@/router'
import { ref, onMounted, watch } from 'vue'
import VehicleCard from '@/components/VehicleCard.vue'
import VehicleMobile from '@/components/VehicleMobile.vue'
import options from '@/js/filterOptions'
import axios from 'axios'

axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('token')}`

const route = useRoute()
const id = ref(route.params.id)
const url = `${import.meta.env.VITE_VEHICLES}/${id.value}`
const brandUrl = `${import.meta.env.VITE_API}/vehicles-brands/?limit=500`
const webBrandUrl = `${import.meta.env.VITE_API}/public/brands-web/?limit=500`
const bodyUrl = `${import.meta.env.VITE_API}/vehicles-types/`
const buyersUrl = `${import.meta.env.VITE_API}/buyers/`
const providersUrl = `${import.meta.env.VITE_API}/companies/?limit=1000&is_provider=true`
const bodyTypeUrl = `${import.meta.env.VITE_DATA}`
const modelWebUrl = `${import.meta.env.VITE_PUBLIC}/models-web/?limit=5000&brand_web=`
const keysWebUrl = `${import.meta.env.VITE_KEYS}`
const extrasUrl = `${import.meta.env.VITE_SALES}/discounts/`
const loading = ref(true)
const vehicle = ref({})
const tab = ref(1)
const navBtn1 = ref(null)
const navBtn2 = ref(null)
const navBtn3 = ref(null)
const navBtn4 = ref(null)
const navBtn5 = ref(null)
const navs = [navBtn1, navBtn2, navBtn3, navBtn4, navBtn5]
const tab1 = ref(null)
const tab2 = ref(null)
const tab3 = ref(null)
const tab4 = ref(null)
const tab5 = ref(null)
const tab6 = ref(null)
const tab7 = ref(null)
const tab8 = ref(null)
const tab9 = ref(null)
const tab10 = ref(null)
const tabs = [tab1, tab2, tab3, tab4, tab5, tab6, tab7, tab8]
const tabs2 = [tab9, tab10]
const scrollDown = ref(false)
const scrollTop = ref(true)
const category = ref([])
const chassis = ref(null)
const bodyOptions = ref([])
const brandOptions = ref([])
const webBrandOptions = ref([])
const bodyTypeOptions = ref([])
const driveOptions = ref([])
const modelWebOptions = ref([])
const regulationsOptions = ref([])
const keysOptions = ref([])
const regimenOptions = ref([])
const buyersOptions = ref([])
const providersOptions = ref([])
// const body = ref('')
const drives = ref(null)
const bodyType = ref(null)
const brand = ref({ id: '', label: '' })
const webBrand = ref({ id: '', label: '' })
const model = ref({ id: '', label: '' })
const modelWeb = ref({ id: '', label: '' })
const provider = ref({ id: '', label: '' })
const buyer = ref({ id: '', label: '' })
const license = ref('')
const license1 = ref(null)
const kms = ref(0)
const fuel = ref(null)
const gearBox = ref(null)
const power = ref(0)
const doors = ref(0)
const distinctive = ref(null)
const licenseOG = ref('')
const key = ref(0)
const keysQ = ref(0)
const fabrication = ref(null)
const gears = ref(0)
const speed = ref(0)
const acceleration = ref(0)
const environment = ref(0)
const road = ref(0)
const city = ref(0)
const co2 = ref(0)
const length = ref(0)
const tare = ref(0)
const height = ref(0)
const itvExp = ref(null)
const owners = ref(0)
const basic = ref(null)
const technical = ref(null)
const portals = ref(null)
const maintenance = ref(null)
const prices = ref(null)
const comments = ref(null)
const extras = ref(null)
const discounts = ref(null)
const freeEquip = ref(null)
const equip = ref(null)
const basicTab = ref(null)
const technicalTab = ref(null)
const portalsTab = ref(null)
const maintenanceTab = ref(null)
const pricesTab = ref(null)
const commentsTab = ref(null)
const extrasTab = ref(null)
const discountsTab = ref(null)
const freeEquipTab = ref(null)
const equipTab = ref(null)
const asideTabs = [
  basicTab,
  technicalTab,
  portalsTab,
  maintenanceTab,
  pricesTab,
  commentsTab,
  extrasTab,
  discountsTab,
  freeEquipTab,
  equipTab
]
const regimen = ref(null)
const purchaseDate = ref(null)
const purchasePrice = ref(0)
const sellManage = ref(false)
const sellerName = ref('')
const commission = ref(0)
const price = ref('0')
const financed = ref('0')
const financingMonths = ref(0)
const financingQ = ref('0')
const reserve = ref('0')
const iva = ref(false)
const error = ref(null)
const message = ref('')
const commInternal = ref('')
const commExternal = ref('')
const drawer = ref(false)
const drawerSection = ref('')
const discountMode = ref(false)

const updateData = () => {
  loading.value = true
  const payload = {
    acceleration: acceleration?.value,
    body_type: bodyType?.value,
    chassis_number: chassis?.value,
    city: city?.value,
    co2: co2?.value,
    date_first_registration: license1?.value,
    doors: doors?.value,
    drive_type: drives?.value,
    environment: environment?.value,
    external_comments: commExternal?.value,
    fuel: fuel?.value,
    gear_box: gearBox?.value,
    heigth: height?.value,
    internal_comments: commInternal?.value,
    kms: kms?.value,
    length: length?.value,
    license_plate: license?.value,
    maintenance: {
      distinctive: distinctive?.value,
      keys_quantity: keysQ?.value
    },
    max_speed: speed?.value,
    number_gears: gears?.value,
    original_license_plate: licenseOG?.value,
    power: power?.value,
    purchase: {
      provider: provider.value?.id,
      buyer: buyer.value?.id,
      tax_regime: regimen?.value,
      purchase_date: purchaseDate?.value,
      price: purchasePrice?.value,
      vehicle: vehicle.value.id
    },
    price: {
      sale_price: price?.value,
      financed_price: financed?.value,
      amount_fees: financingMonths?.value,
      financing_fee: financingQ?.value,
      reserve_amount: reserve?.value,
      is_tax_deductible: iva?.value,
      vehicle: vehicle.value.id
    },
    registration_date: fabrication?.value,
    road: road?.value,
    tare: tare?.value,
    web_categories: category?.value
  }
  if (payload.chassis_number === null) {
    message.value = 'Debe ingresar el VIN del vehículo, el campo Bastidor es obligatorio'
    error.value?.modal.showModal()
    fetch()
    return
  }
  if (payload.drive_type === 0) {
    payload.drive_type = 1
  }
  if (vehicle.value.purchase?.vehicle && vehicle.value.price?.vehicle) {
    delete payload.purchase.vehicle
    delete payload.price.vehicle
  } else if (!vehicle.value.purchase?.vehicle && !vehicle.value.price?.vehicle) {
    axios.patch(url, {}).then(() => {
      fetch()
    })
  } else if (vehicle.value.price?.vehicle) {
    delete payload.price.vehicle
  } else {
    delete payload.purchase.vehicle
  }
  axios.patch(url, payload).then(() => {
    fetch()
  })
}

const fetch = () => {
  axios
    .get(url)
    .then((response) => {
      vehicle.value = response.data
    })
    .then(() => {
      loading.value = false
      category.value = vehicle.value.web_categories[0]?.id
      bodyType.value = vehicle.value.body_type?.id || null
      brand.value = { id: vehicle.value.model.brand.id, label: vehicle.value.model.brand.title }
      webBrand.value = { id: vehicle.value.brand_web.id, label: vehicle.value.brand_web.title }
      modelWeb.value = { id: vehicle.value.model_web.id, label: vehicle.value.model_web.title }
      chassis.value = vehicle.value?.chassis_number
      license.value = vehicle.value.license_plate
      license1.value = vehicle.value?.date_first_registration
      kms.value = vehicle.value?.kms
      fuel.value = vehicle.value.fuel?.id
      gearBox.value = vehicle.value?.gear_box.id
      power.value = vehicle.value?.power
      doors.value = vehicle.value?.doors
      distinctive.value = vehicle.value?.maintenance.distinctive
      fabrication.value = vehicle.value?.registration_date
      licenseOG.value = vehicle.value?.original_license_plate
      key.value = vehicle.value?.key_locator
      keysQ.value = vehicle.value.maintenance?.keys_quantity
      drives.value = vehicle.value.drive_type?.id || null
      gears.value = vehicle.value?.number_gears
      speed.value = vehicle.value?.max_speed
      acceleration.value = vehicle.value?.seconds_to_100_speed
      environment.value = vehicle.value?.consumption_in_environment
      road.value = vehicle.value?.consumption_in_road
      city.value = vehicle.value?.consumption_in_city
      co2.value = vehicle.value?.co2_emissions
      length.value = vehicle.value?.length
      tare.value = vehicle.value?.tare_weigth
      height.value = vehicle.value?.heigth
      itvExp.value = vehicle.value.maintenance?.itv_expiration
      owners.value = vehicle.value.maintenance?.owners_quantity
      provider.value = vehicle.value.purchase?.provider || null
      buyer.value = vehicle.value.purchase?.buyer || null
      regimen.value = vehicle.value.purchase?.tax_regime || null
      purchaseDate.value = vehicle.value.purchase?.purchase_date
      purchasePrice.value = vehicle.value.purchase?.total_price
      price.value = vehicle.value.price?.sale_price
      financed.value = vehicle.value.price?.financed_price
      financingMonths.value = vehicle.value.price?.amount_fees
      financingQ.value = vehicle.value.price?.financing_fee
      reserve.value = vehicle.value.price?.reserve_amount
      iva.value = vehicle.value.price?.is_tax_deductible
      sellerName.value = vehicle.value.purchase?.owner
      commission.value = vehicle.value.purchase?.selling_fee
      purchaseDate.value = vehicle.value.purchase?.purchase_date
      commExternal.value = vehicle.value?.external_comments
      commInternal.value = vehicle.value?.internal_comments
    })
    .then(() => {
      axios.get(`${modelWebUrl}${webBrand.value.id}`).then((response) => {
        for (let option of response.data.results) {
          modelWebOptions.value.push({
            id: option.id,
            label: option.title
          })
        }
      })
    })
}

fetch()
// axios
//   .post(`${import.meta.env.VITE_API}/vehicles-models/eurotax-models/`, {
//     brand: brand.value.id,
//     vehicle_type: body.value
//   })
//   .then((response) => {
//     for (const types of response.data) {
//       types.codes.map((code) => {
//         let id = makeValue(code)
//         let title = makeType(code.data)
//         modelOptions.push({
//           value: id,
//           label: title
//         })
//       })
//     }
//   })

axios.get(bodyUrl).then((response) => {
  bodyOptions.value = response.data.results
})

axios.get(keysWebUrl + '?free_keys=true').then((response) => {
  for (let option of response.data.results) {
    keysOptions.value.push({
      id: option.id,
      title: option.id
    })
  }
})

axios.get(buyersUrl).then((response) => {
  for (let option of response.data.results) {
    buyersOptions.value.push({
      id: option.id,
      label: option.name
    })
  }
})

axios.get(providersUrl).then((response) => {
  for (let option of response.data.results) {
    providersOptions.value.push({
      id: option.id,
      label: option.name
    })
  }
})

const unlinkKey = () => {
  axios.put(keysWebUrl + key.value, { vehicle: null }).then(() => {
    router.go(0)
  })
}

const linkKey = () => {
  axios.put(keysWebUrl + key.value, { vehicle: vehicle.value.id }).then(() => {
    router.go(0)
  })
}

axios.get(brandUrl).then((response) => {
  for (let option of response.data.results) {
    brandOptions.value.push({
      id: option.id,
      label: option.title
    })
  }
})

axios.get(webBrandUrl).then((response) => {
  for (let option of response.data.results) {
    webBrandOptions.value.push({
      id: option.id,
      label: option.title
    })
  }
})

axios.get(bodyTypeUrl).then((response) => {
  for (let option of response.data.bodies) {
    bodyTypeOptions.value.push({
      id: option.id,
      title: option.name
    })
  }
  for (let option of response.data.drives) {
    driveOptions.value.push({
      id: option.id,
      title: option.name
    })
  }
  for (let option of response.data.vehicle_regulations) {
    regulationsOptions.value.push({
      id: option.id,
      title: option.name
    })
  }
  for (let option of response.data.tax_regimes) {
    regimenOptions.value.push({
      id: option.id,
      title: option.name
    })
  }
})

const tabEvent1 = () => {
  tab.value = 1
  for (let tab of tabs) {
    tab.value.classList.remove('tab-active')
  }
  tab1.value.classList.add('tab-active')
  basic.value.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
}

const tabEvent2 = () => {
  tab.value = 2
  for (let tab of tabs) {
    tab.value.classList.remove('tab-active')
  }
  tab2.value.classList.add('tab-active')
  technical.value.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
}

const tabEvent3 = () => {
  tab.value = 3
  for (let tab of tabs) {
    tab.value.classList.remove('tab-active')
  }
  tab3.value.classList.add('tab-active')
  portals.value.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
}

const tabEvent4 = () => {
  tab.value = 4
  for (let tab of tabs) {
    tab.value.classList.remove('tab-active')
  }
  tab4.value.classList.add('tab-active')
  maintenance.value.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
}

const tabEvent5 = () => {
  tab.value = 5
  for (let tab of tabs) {
    tab.value.classList.remove('tab-active')
  }
  tab5.value.classList.add('tab-active')
  prices.value.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
}

const tabEvent6 = () => {
  tab.value = 6
  for (let tab of tabs) {
    tab.value.classList.remove('tab-active')
  }
  tab6.value.classList.add('tab-active')
  comments.value.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
}

const tabEvent7 = () => {
  tab.value = 7
  for (let tab of tabs) {
    tab.value.classList.remove('tab-active')
  }
  tab7.value.classList.add('tab-active')
  extras.value.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
}

const tabEvent8 = () => {
  tab.value = 8
  for (let tab of tabs) {
    tab.value.classList.remove('tab-active')
  }
  tab8.value.classList.add('tab-active')
  discounts.value.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
}

const tabEvent9 = () => {
  tab.value = 9
  for (let tab of tabs2) {
    tab.value.classList.remove('tab-active')
  }
  tab9.value.classList.add('tab-active')
  freeEquip.value.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
}

const tabEvent10 = () => {
  tab.value = 10
  for (let tab of tabs2) {
    tab.value.classList.remove('tab-active')
  }
  tab10.value.classList.add('tab-active')
  equip.value.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
}

const navEvent1 = () => {
  tab.value = 1
  for (let nav of navs) {
    nav.value.classList.remove('active')
  }
  navBtn1.value.classList.add('active')
}

const navEvent2 = () => {
  tab.value = 3
  for (let nav of navs) {
    nav.value.classList.remove('active')
  }
  navBtn2.value.classList.add('active')
}

const navEvent3 = () => {
  tab.value = 9
  for (let nav of navs) {
    nav.value.classList.remove('active')
  }
  navBtn3.value.classList.add('active')
}

const navEvent4 = () => {
  tab.value = 11
  for (let nav of navs) {
    nav.value.classList.remove('active')
  }
  navBtn4.value.classList.add('active')
}

const navEvent5 = () => {
  tab.value = 12
  for (let nav of navs) {
    nav.value.classList.remove('active')
  }
  navBtn5.value.classList.add('active')
}

const isFetching = ref(false)
const serverOptions = ref({
  page: 1,
  rowsPerPage: 20
})
const serverItemsLength = ref(0)
const items = ref([])

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
      const API_URL = `${extrasUrl}/?${new URLSearchParams(params)}`
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
  { text: 'Nombre', value: 'title' },
  { text: 'Descripción', value: 'from_date' },
  { text: 'Precio', value: 'to_date' },
  { text: 'Acciones', value: 'id', width: 60 }
]

const addExtra = () => {
  axios
    .post(url, {
      // title: title.value,
      // from_date: from_date.value,
      // to_date: to_date.value,
      // amount_percent: parseInt(amount_percent.value) || 0,
      // amount_fix: parseInt(amount_fix.value) || 0
    })
    .then((response) => {
      if (response.status === 201) {
        // reset()
        fetching()
      }
    })
}

const addDiscount = () => {
  axios
    .post(url, {
      // title: title.value,
      // from_date: from_date.value,
      // to_date: to_date.value,
      // amount_percent: parseInt(amount_percent.value) || 0,
      // amount_fix: parseInt(amount_fix.value) || 0
    })
    .then((response) => {
      if (response.status === 201) {
        // reset()
        fetching()
      }
    })
}

const toggleDrawer = () => {
  drawer.value = !drawer.value
}

const extraDrawer = () => {
  drawerSection.value = 'extra'
}

const discountDrawer = () => {
  drawerSection.value = 'discount'
}

onMounted(() => {
  let prev = window.scrollY
  window.addEventListener('scroll', () => {
    let current = window.scrollY
    if (prev > current) {
      scrollDown.value = false
      scrollTop.value = true
    } else {
      scrollDown.value = true
      scrollTop.value = false
    }
    prev = current
    if (equip.value?.getBoundingClientRect().top < 200) {
      asideTabs[0].value.classList?.remove('activeSection')
      asideTabs[1].value.classList?.remove('activeSection')
      asideTabs[2].value.classList?.remove('activeSection')
      asideTabs[3].value.classList?.remove('activeSection')
      asideTabs[4].value.classList?.remove('activeSection')
      asideTabs[5].value.classList?.remove('activeSection')
      asideTabs[6].value.classList?.remove('activeSection')
      asideTabs[7].value.classList?.remove('activeSection')
      asideTabs[8].value.classList?.remove('activeSection')
      asideTabs[9].value.classList?.add('activeSection')
    } else if (freeEquip.value?.getBoundingClientRect().top < 200) {
      asideTabs[0].value.classList?.remove('activeSection')
      asideTabs[1].value.classList?.remove('activeSection')
      asideTabs[2].value.classList?.remove('activeSection')
      asideTabs[3].value.classList?.remove('activeSection')
      asideTabs[4].value.classList?.remove('activeSection')
      asideTabs[5].value.classList?.remove('activeSection')
      asideTabs[6].value.classList?.remove('activeSection')
      asideTabs[7].value.classList?.remove('activeSection')
      asideTabs[8].value.classList?.add('activeSection')
      asideTabs[9].value.classList?.remove('activeSection')
    } else if (discounts.value?.getBoundingClientRect().top < 200) {
      asideTabs[0].value.classList?.remove('activeSection')
      asideTabs[1].value.classList?.remove('activeSection')
      asideTabs[2].value.classList?.remove('activeSection')
      asideTabs[3].value.classList?.remove('activeSection')
      asideTabs[4].value.classList?.remove('activeSection')
      asideTabs[5].value.classList?.remove('activeSection')
      asideTabs[6].value.classList?.remove('activeSection')
      asideTabs[7].value.classList?.add('activeSection')
      asideTabs[8].value.classList?.remove('activeSection')
      asideTabs[9].value.classList?.remove('activeSection')
    } else if (extras.value?.getBoundingClientRect().top < 200) {
      asideTabs[0].value.classList?.remove('activeSection')
      asideTabs[1].value.classList?.remove('activeSection')
      asideTabs[2].value.classList?.remove('activeSection')
      asideTabs[3].value.classList?.remove('activeSection')
      asideTabs[4].value.classList?.remove('activeSection')
      asideTabs[5].value.classList?.remove('activeSection')
      asideTabs[6].value.classList?.add('activeSection')
      asideTabs[7].value.classList?.remove('activeSection')
      asideTabs[8].value.classList?.remove('activeSection')
      asideTabs[9].value.classList?.remove('activeSection')
    } else if (comments.value?.getBoundingClientRect().top < 200) {
      asideTabs[0].value.classList?.remove('activeSection')
      asideTabs[1].value.classList?.remove('activeSection')
      asideTabs[2].value.classList?.remove('activeSection')
      asideTabs[3].value.classList?.remove('activeSection')
      asideTabs[4].value.classList?.remove('activeSection')
      asideTabs[5].value.classList?.add('activeSection')
      asideTabs[6].value.classList?.remove('activeSection')
      asideTabs[7].value.classList?.remove('activeSection')
      asideTabs[8].value.classList?.remove('activeSection')
      asideTabs[9].value.classList?.remove('activeSection')
    } else if (prices.value?.getBoundingClientRect().top < 200) {
      asideTabs[0].value.classList?.remove('activeSection')
      asideTabs[1].value.classList?.remove('activeSection')
      asideTabs[2].value.classList?.remove('activeSection')
      asideTabs[3].value.classList?.remove('activeSection')
      asideTabs[4].value.classList?.add('activeSection')
      asideTabs[5].value.classList?.remove('activeSection')
      asideTabs[6].value.classList?.remove('activeSection')
      asideTabs[7].value.classList?.remove('activeSection')
      asideTabs[8].value.classList?.remove('activeSection')
      asideTabs[9].value.classList?.remove('activeSection')
    } else if (maintenance.value?.getBoundingClientRect().top < 200) {
      asideTabs[0].value.classList?.remove('activeSection')
      asideTabs[1].value.classList?.remove('activeSection')
      asideTabs[2].value.classList?.remove('activeSection')
      asideTabs[3].value.classList?.add('activeSection')
      asideTabs[4].value.classList?.remove('activeSection')
      asideTabs[5].value.classList?.remove('activeSection')
      asideTabs[6].value.classList?.remove('activeSection')
      asideTabs[7].value.classList?.remove('activeSection')
      asideTabs[8].value.classList?.remove('activeSection')
      asideTabs[9].value.classList?.remove('activeSection')
    } else if (portals.value?.getBoundingClientRect().top < 200) {
      asideTabs[0].value.classList?.remove('activeSection')
      asideTabs[1].value.classList?.remove('activeSection')
      asideTabs[2].value.classList?.add('activeSection')
      asideTabs[3].value.classList?.remove('activeSection')
      asideTabs[4].value.classList?.remove('activeSection')
      asideTabs[5].value.classList?.remove('activeSection')
      asideTabs[6].value.classList?.remove('activeSection')
      asideTabs[7].value.classList?.remove('activeSection')
      asideTabs[8].value.classList?.remove('activeSection')
      asideTabs[9].value.classList?.remove('activeSection')
    } else if (technical.value?.getBoundingClientRect().top < 200) {
      asideTabs[0].value.classList?.remove('activeSection')
      asideTabs[1].value.classList?.add('activeSection')
      asideTabs[2].value.classList?.remove('activeSection')
      asideTabs[3].value.classList?.remove('activeSection')
      asideTabs[4].value.classList?.remove('activeSection')
      asideTabs[5].value.classList?.remove('activeSection')
      asideTabs[6].value.classList?.remove('activeSection')
      asideTabs[7].value.classList?.remove('activeSection')
      asideTabs[8].value.classList?.remove('activeSection')
      asideTabs[9].value.classList?.remove('activeSection')
    } else {
      asideTabs[0].value.classList?.add('activeSection')
      asideTabs[1].value.classList?.remove('activeSection')
      asideTabs[2].value.classList?.remove('activeSection')
      asideTabs[3].value.classList?.remove('activeSection')
      asideTabs[4].value.classList?.remove('activeSection')
      asideTabs[5].value.classList?.remove('activeSection')
      asideTabs[6].value.classList?.remove('activeSection')
      asideTabs[7].value.classList?.remove('activeSection')
      asideTabs[8].value.classList?.remove('activeSection')
      asideTabs[9].value.classList?.remove('activeSection')
    }
  })
})
</script>

<template>
  <div class="drawer drawer-end">
    <input id="vehicle-drawer" type="checkbox" class="drawer-toggle" v-model="drawer" />
    <div class="drawer-content">
      <ModalInfo class="w-full" ref="error" title="Error" :message="message" />
      <HeaderMain class="pb-16">
        <header class="flex flex-col items-center">
          <LoadingSpinner v-if="loading" class="loading-lg" />
          <VehicleCard v-else :vehicle="vehicle" class="hidden lg:flex" />
          <VehicleMobile v-if="!loading" :vehicle="vehicle" class="my-3 lg:hidden" />
        </header>
        <div
          v-if="tab > 0 && tab < 9"
          role="tablist"
          class="tabs tabs-bordered sticky top-[4rem] z-10 overflow-x-scroll text-nowrap bg-white px-4 py-2 lg:hidden"
        >
          <a ref="tab1" role="tab" class="tab tab-active" @click="tabEvent1">Información Básica</a>
          <a ref="tab2" role="tab" class="tab" @click="tabEvent2">Información Técnica</a>
          <a ref="tab3" role="tab" class="tab" @click="tabEvent3">Portales web</a>
          <a ref="tab4" role="tab" class="tab" @click="tabEvent4">Mantenimiento</a>
          <a ref="tab5" role="tab" class="tab" @click="tabEvent5">Compra y precio</a>
          <a ref="tab6" role="tab" class="tab" @click="tabEvent6">Comentarios</a>
          <a ref="tab7" role="tab" class="tab" @click="tabEvent7">Extras</a>
          <a ref="tab8" role="tab" class="tab" @click="tabEvent8">Descuentos</a>
        </div>
        <div
          v-if="tab === 9 || tab === 10"
          role="tablist"
          class="tabs tabs-bordered sticky top-0 overflow-x-scroll text-nowrap px-4 lg:hidden"
        >
          <a ref="tab9" role="tab" class="tab tab-active" @click="tabEvent9"
            >Equipamiento sin coste</a
          >
          <a ref="tab10" role="tab" class="tab" @click="tabEvent10">Equipamiento con coste</a>
        </div>
        <main class="flex w-full flex-col gap-6 lg:flex-row">
          <aside class="sticky top-[4rem] hidden h-min max-w-64 rounded bg-base-100 lg:block">
            <ul class="menu menu-sm w-56 rounded-box bg-base-100">
              <li>
                <a class="font-bold" @click="tab = 1">Admin</a>
                <ul>
                  <li>
                    <a id="basicTab" ref="basicTab" class="activeSection" @click="tabEvent1"
                      >Información Básica</a
                    >
                  </li>
                  <li>
                    <a ref="technicalTab" @click="tabEvent2">Información Técnica</a>
                  </li>
                  <li><a ref="portalsTab" @click="tabEvent3">Portales web</a></li>
                  <li><a ref="maintenanceTab" @click="tabEvent4">Mantenimiento</a></li>
                  <li><a ref="pricesTab" @click="tabEvent5">Compra y precio</a></li>
                  <li><a ref="commentsTab" @click="tabEvent6">Comentarios</a></li>
                  <li><a ref="extrasTab" @click="tabEvent7">Extras</a></li>
                  <li><a ref="discountsTab" @click="tabEvent8">Descuentos</a></li>
                </ul>
              </li>
              <li>
                <a class="font-bold" @click="tabEvent9">Equipamiento</a>
                <ul>
                  <li><a ref="freeEquipTab" @click="tabEvent9">Equipamiento sin coste</a></li>
                  <li><a ref="equipTab" @click="tabEvent10">Equipamiento con coste</a></li>
                </ul>
              </li>
              <li><a class="font-bold" @click="tab = 11">PT</a></li>
            </ul>
          </aside>
          <section class="flex w-full flex-col">
            <div v-if="tab > 0 && tab < 9" class="flex flex-col gap-8">
              <div ref="basic" class="flex scroll-m-20 flex-col gap-4 rounded bg-base-100 p-4">
                <div class="flex flex-row justify-between">
                  <h1 class="text-xl font-medium">Información Básica</h1>
                  <DropdownBtn>
                    <template #btn>
                      <button class="btn btn-outline btn-sm hidden lg:block">Acciones</button>
                      <button class="btn btn-circle btn-ghost lg:hidden">
                        <Icon icon="mdi:dots-vertical" width="30" class="text-primary" />
                      </button>
                    </template>
                    <template #content>
                      <ul>
                        <li><a>Recalcular etiqueta</a></li>
                        <li><a @click="unlinkKey">Liberar llave</a></li>
                      </ul>
                    </template>
                  </DropdownBtn>
                </div>
                <div class="grid grid-cols-2 gap-x-4 lg:gap-x-10">
                  <SelectInput
                    label="Categoria web:"
                    :options="options.categoria"
                    v-model="category"
                    :initialValue="null"
                  />
                  <SelectInput
                    label="Carrocería:"
                    :options="bodyTypeOptions"
                    v-model="bodyType"
                    :initialValue="null"
                  />
                  <SearchSelect label="Marca:" :options="brandOptions" v-model="brand" />
                  <SearchSelect label="Marca web:" :options="webBrandOptions" v-model="webBrand" />
                  <SearchSelect label="Modelo:" :options="webBrandOptions" v-model="model" />
                  <SearchSelect label="Modelo web:" :options="modelWebOptions" v-model="modelWeb" />
                  <TextInput label="Bastidor:" v-model="chassis" />
                  <TextInput label="Matricula:" v-model="license" />
                  <DateInput label="1º Matriculación:" v-model="license1" />
                  <TextInput label="Km Actuales:" v-model="kms" />
                  <SelectInput
                    label="Combustible:"
                    :options="options.combustible"
                    v-model="fuel"
                    :initialValue="null"
                  />
                  <SelectInput
                    label="Cambio:"
                    :options="options.cambio"
                    v-model="gearBox"
                    :initialValue="null"
                  />
                  <TextInput label="Potencia (cv):" v-model="power" />
                  <TextInput label="Tamaño (cc):" />
                  <TextInput label="Puertas:" v-model="doors" />
                  <SelectInput
                    label="Distintivo:"
                    :options="options.medioambiental"
                    v-model="distinctive"
                    :initialValue="null"
                  />
                  <DateInput label="Fabricación:" v-model="fabrication" />
                  <TextInput label="Matricula Origen:" v-model="licenseOG" />
                  <TextInput
                    v-if="vehicle.key_locator"
                    label="Llave asignada:"
                    v-model="key"
                    :disabled="true"
                  />
                  <SelectInput
                    v-else
                    label="Llave asignada:"
                    :options="keysOptions"
                    v-model="key"
                    @selected="linkKey"
                    :initialValue="null"
                  />
                  <TextInput label="Nº llaves:" v-model="keysQ" />
                </div>
              </div>
              <div ref="technical" class="flex scroll-m-20 flex-col gap-4 rounded bg-base-100 p-4">
                <div class="flex flex-row justify-between">
                  <h1 class="text-xl font-medium">Información Técnica</h1>
                </div>
                <div class="grid grid-cols-2 gap-x-4 lg:gap-x-10">
                  <SelectInput
                    label="Tracción:"
                    :options="driveOptions"
                    v-model="drives"
                    :initialValue="null"
                  />
                  <TextInput label="Marchas:" v-model="gears" />
                  <TextInput label="Vel Máxima:" v-model="speed" />
                  <TextInput label="Aceleración 0-100:" v-model="acceleration" />
                </div>
                <h2 class="mt-3 p-0 text-lg font-medium">Consumo y emisión</h2>
                <div class="divider m-0 p-0"></div>
                <div class="grid grid-cols-2 gap-x-4 lg:gap-x-10">
                  <TextInput label="Consumo en el Ambiente:" v-model="environment" />
                  <TextInput label="En carretera:" v-model="road" />
                  <TextInput label="En ciudad:" v-model="city" />
                  <TextInput label="Emisiones CO2:" v-model="co2" />
                </div>
                <h2 class="mt-3 p-0 text-lg font-medium">Dimensiones</h2>
                <div class="divider m-0 p-0"></div>
                <div class="grid grid-cols-2 gap-x-4 lg:gap-x-10">
                  <TextInput label="Longitud:" v-model="length" />
                  <TextInput label="Altura:" v-model="height" />
                  <TextInput label="Tara:" v-model="tare" />
                </div>
              </div>
              <!-- <div ref="portals" class="flex scroll-m-20 flex-col gap-4 rounded bg-base-100 p-4">
                <h1 class="text-xl font-medium">Portales Web</h1>
                <div class="mt-6 flex flex-col items-center gap-4 lg:flex-row">
                  <IntegrationCard
                    img="https://garageclub-prod.s3.amazonaws.com/backend/media/imagen_2024-01-30_210822393.png"
                  />
                  <IntegrationCard
                    img="https://garageclub-prod.s3.amazonaws.com/backend/media/wallapop-logo-317DAB9D83-seeklogo.com.png"
                  />
                </div>
              </div> -->
              <div
                ref="maintenance"
                class="flex scroll-m-20 flex-col gap-4 rounded bg-base-100 p-4"
              >
                <h1 class="text-xl font-medium">Mantenimiento</h1>
                <div class="grid grid-cols-2 gap-x-4 lg:gap-x-10">
                  <TextInput label="Propietarios:" v-model="owners" />
                  <DateInput label="Vencimiento ITV:" v-model="itvExp" />
                </div>
                <h2>Libro de revisiones</h2>
                <div class="divider m-0 p-0"></div>
              </div>
              <div ref="prices" class="flex scroll-m-20 flex-col gap-4 rounded bg-base-100 p-4">
                <div class="flex flex-row justify-between">
                  <h1 class="text-xl font-medium">Información de compra</h1>
                  <button class="btn btn-outline btn-sm hidden lg:block">Generar contrato</button>
                </div>
                <CheckInput
                  label="Gestión de venta:"
                  v-model="sellManage"
                  class="flex items-start"
                />
                <div v-if="!sellManage" class="grid grid-cols-2 gap-x-4 lg:gap-x-10">
                  <SearchSelect label="Proveedor:" :options="providersOptions" v-model="provider" />
                  <SearchSelect label="Comprador:" :options="buyersOptions" v-model="buyer" />
                  <DateInput label="Fecha de compra:" v-model="purchaseDate" />
                  <TextInput label="Precio de compra:" v-model="purchasePrice" />
                  <SelectInput
                    label="Régimen:"
                    :options="regimenOptions"
                    v-model="regimen"
                    :initialValue="null"
                  />
                </div>
                <div v-else class="grid grid-cols-2 gap-x-4 lg:gap-x-10">
                  <TextInput label="Nombre Completo:" v-model="sellerName" />
                  <TextInput label="Importe de comisión:" v-model="commission" />
                  <DateInput label="Fecha de compra:" v-model="purchaseDate" />
                </div>
                <div class="flex flex-row justify-between">
                  <h1 class="text-xl font-medium">Configuración de precio</h1>
                  <button class="btn btn-outline btn-sm hidden lg:block">Conf. Financiera</button>
                </div>
                <div class="divider m-0 p-0"></div>
                <div class="grid grid-cols-2 gap-x-4 lg:gap-x-10">
                  <TextInput label="Precio de venta:" v-model="price" />
                  <TextInput label="Precio financiado:" v-model="financed" />
                  <TextInput label="Meses de financiación:" v-model="financingMonths" />
                  <TextInput label="Cuota financiación:" v-model="financingQ" />
                  <TextInput label="Reserva:" v-model="reserve" />
                  <CheckInput label="IVA deducible:" v-model="iva" class="flex items-start" />
                </div>
              </div>
              <div ref="comments" class="flex scroll-m-20 flex-col gap-4 rounded bg-base-100 p-4">
                <h1 class="text-xl font-medium">Comentarios</h1>
                <div class="flex flex-col gap-x-4 lg:gap-x-10">
                  <AreaInput label="Internos:" v-model="commInternal" />
                  <AreaInput label="Externos:" v-model="commExternal" />
                </div>
              </div>
              <div ref="extras" class="flex scroll-m-20 flex-col gap-4 rounded bg-base-100 p-4">
                <VehicleTable title="Lista de Extras" @addBtn="extraDrawer">
                  <template #content>
                    <EasyDataTable
                      class="table-dark table-striped"
                      table-class-name="z-0 max-w-4xl"
                      header-class-name="z-0"
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
                  <template #drawer> </template>
                </VehicleTable>
              </div>
              <div ref="discounts" class="flex scroll-m-20 flex-col gap-4 rounded bg-base-100 p-4">
                <VehicleTable title="Lista de Descuentos" @addBtn="discountDrawer">
                  <template #content>
                    <EasyDataTable
                      class="z-0"
                      table-class-name="z-0 max-w-4xl"
                      header-class-name="z-0"
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
                </VehicleTable>
              </div>
            </div>
            <div v-if="tab > 8 && tab < 12">
              <div ref="freeEquip" class="flex scroll-m-20 flex-col gap-4 rounded bg-base-100 p-4">
                <h1 class="text-xl font-medium">Equipamiento</h1>
                <div class="grid grid-cols-2 gap-x-4 lg:gap-x-10">
                  <TextInput label="Categoria web:" />
                  <TextInput label="Carrocería:" />
                  <TextInput label="Marca Web:" />
                  <TextInput label="Modelo Web:" />
                  <TextInput label="Matricula:" />
                  <TextInput label="1º Matriculación:" />
                  <TextInput label="1º Matricula:" />
                  <TextInput label="Km Actuales:" />
                  <TextInput label="Procedencia:" />
                </div>
              </div>
              <div
                ref="equip"
                class="flex scroll-m-20 flex-col gap-4 rounded bg-base-100 p-4"
              ></div>
              <div ref="gallery" class="flex flex-col gap-4 rounded bg-base-100 p-4">
                <h2 class="text-xl font-medium">Galería Multimedia</h2>
                <div role="tablist" class="tabs tabs-bordered tabs-md">
                  <input type="radio" name="galeria" role="tab" class="tab" aria-label="Galería" />
                  <div role="tabpanel" class="tab-content p-4 lg:p-8">
                    <div class="grid grid-cols-2 gap-4 lg:grid-cols-3">
                      <div class="skeleton h-28 w-28"></div>
                      <div class="skeleton h-28 w-28"></div>
                      <div class="skeleton h-28 w-28"></div>
                      <div class="skeleton h-28 w-28"></div>
                      <div class="skeleton h-28 w-28"></div>
                      <div class="skeleton h-28 w-28"></div>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="galeria"
                    role="tab"
                    class="tab"
                    aria-label="Documentos"
                    checked
                  />
                  <div role="tabpanel" class="tab-content p-8">Documentos</div>
                </div>
              </div>
            </div>
          </section>
          <aside class="hidden min-w-fit max-w-md flex-col gap-4 rounded bg-base-100 p-4 lg:flex">
            <h2 class="text-xl font-medium">Galería Multimedia</h2>
            <div role="tablist" class="tabs tabs-bordered tabs-md">
              <input
                type="radio"
                name="galeria"
                role="tab"
                class="tab"
                aria-label="Galería"
                checked
              />
              <div role="tabpanel" class="tab-content lg:p-3">
                <div class="grid grid-cols-2 gap-4 lg:grid-cols-3">
                  <div class="skeleton h-28 w-28"></div>
                  <div class="skeleton h-28 w-28"></div>
                  <div class="skeleton h-28 w-28"></div>
                  <div class="skeleton h-28 w-28"></div>
                  <div class="skeleton h-28 w-28"></div>
                  <div class="skeleton h-28 w-28"></div>
                </div>
              </div>

              <input type="radio" name="galeria" role="tab" class="tab" aria-label="Documentos" />
              <div role="tabpanel" class="tab-content p-8">Documentos</div>
            </div>
          </aside>
        </main>
      </HeaderMain>
      <footer class="fixed bottom-0 z-50">
        <div @click="updateData" class="btm-nav z-10 hidden lg:flex">
          <div class="flex max-w-md flex-row justify-end">
            <button class="btn btn-primary max-w-24 text-white">Guardar</button>
          </div>
        </div>
        <div v-if="scrollTop" class="btm-nav lg:hidden">
          <button ref="navBtn1" @click="navEvent1" class="active">
            <Icon icon="mdi:car" width="30" />
            <span class="btm-nav-label">I. Admin</span>
          </button>
          <button ref="navBtn2" @click="navEvent2">
            <Icon icon="mdi:webpack" width="30" />
            <span class="btm-nav-label">Port Web</span>
          </button>
          <button ref="navBtn3" @click="navEvent3">
            <Icon icon="mdi:bag-checked" width="30" />
            <span class="btm-nav-label">Equip</span>
          </button>
          <button ref="navBtn4" @click="navEvent4">
            <Icon icon="mdi:performance" width="30" />
            <span class="btm-nav-label">PT</span>
          </button>
          <button ref="navBtn5" @click="navEvent5">
            <Icon icon="mdi:image-multiple" width="30" />
            <span class="btm-nav-label">Galeria</span>
          </button>
        </div>
        <div v-if="scrollDown" class="btm-nav lg:hidden">
          <div>
            <button class="btn w-36" ref="navBtn6" @click="1">
              <span class="btm-nav-label">Cambiar Estado</span>
            </button>
          </div>
          <div>
            <button class="btn btn-warning w-36" ref="navBtn6" @click="1">
              <span class="btm-nav-label">Reservar</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
    <div class="drawer-side z-50 h-full w-full">
      <label for="vehicle-drawer" aria-label="close sidebar" class="drawer-overlay w-full"></label>
      <ul
        v-if="drawerSection === 'extra'"
        class="menu min-h-full w-80 flex-col justify-between bg-white p-4 text-base-content"
      >
        <div>
          <DrawerTitle title="Añadir Extra" @toggle="toggleDrawer" />
          <ToggleInput label="Auto / Manual" v-model="active" />
          <SelectInput label="Tipo:" :options="options.extra" v-model="extra" />
        </div>
        <DrawerActions
          class="self-end"
          secondary="Cancelar"
          primary="Guardar"
          @click-secondary="toggleDrawer"
          @click-primary="addExtra"
        />
      </ul>
      <ul
        v-if="drawerSection === 'discount'"
        class="menu min-h-full w-80 flex-col justify-between bg-white p-4 text-base-content"
      >
        <div>
          <DrawerTitle title="Añadir Descuento" @toggle="toggleDrawer" />
          <ToggleInput label="Auto / Manual" v-model="discountMode" />
          <SelectInput
            v-if="!discountMode"
            label="Descuento:"
            :options="options.extra"
            v-model="addDiscount"
          />
          <div v-else>
            <TextInput label="Titulo:" v-model="discountTitle" />
            <div class="grid grid-cols-2 gap-x-4">
              <DateInput label="Valido desde:" v-model="discountFrom" />
              <DateInput label="Valido hasta:" v-model="discountTo" />
              <NumberInput label="Valor Porcentual:" v-model="discountPercent" />
              <NumberInput label="Valor Fijo:" v-model="discountFixed" />
            </div>
          </div>
        </div>
        <DrawerActions
          class="self-end"
          secondary="Cancelar"
          primary="Guardar"
          @click-secondary="toggleDrawer"
          @click-primary="addExtra"
        />
      </ul>
    </div>
  </div>
</template>

<style>
.activeSection {
  background-color: #dcdddf;
  font-weight: 600;
}
</style>
