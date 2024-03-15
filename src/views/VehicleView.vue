<script setup>
import { Icon } from '@iconify/vue'
import { useRoute } from 'vue-router'
import { Sortable } from "sortablejs-vue3";
import { ref, onMounted, watch } from 'vue'
import VehicleCard from '@/components/VehicleCard.vue'
import VehicleMobile from '@/components/VehicleMobile.vue'
import options from '@/js/filterOptions'
import router from '@/router'
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
const modelUrl = `${import.meta.env.VITE_PUBLIC}vehicles-models/`
const modelWebUrl = `${import.meta.env.VITE_PUBLIC}models-web/?limit=5000&brand_web=`
const keysWebUrl = `${import.meta.env.VITE_KEYS}`
const extrasUrl = `${import.meta.env.VITE_API}/vehicles-extras/`
const warrantyUrl = `${import.meta.env.VITE_SALES}/warranty-types/`
const deliveryUrl = `${import.meta.env.VITE_SALES}/delivery-types/`
const docsUrl = `${import.meta.env.VITE_SALES}/documents-managements/`
const anyExtraUrl = `${import.meta.env.VITE_SALES}/any-extra/`
const discountUrl = `${import.meta.env.VITE_API}/vehicles-discounts/`
const discountListUrl = `${import.meta.env.VITE_SALES}/discounts/`
const equipUrl = `${import.meta.env.VITE_API}/vehicles-equipments/`
const galleryUrl = `${import.meta.env.VITE_API}/vehicles-images/`
const gallery360Url = `${import.meta.env.VITE_API}/vehicles-image-360/`
const galleryVideoUrl = `${import.meta.env.VITE_API}/vehicles-videos/`
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
const deliveryOptions = ref([])
const discountOptions = ref([])
const docsOptions = ref([])
const anyExtraOptions = ref([])
const bodyOptions = ref([])
const brandOptions = ref([])
const modelOptions = ref([])
const webBrandOptions = ref([])
const bodyTypeOptions = ref([])
const driveOptions = ref([])
const modelWebOptions = ref([])
const regulationsOptions = ref([])
const keysOptions = ref([])
const regimenOptions = ref([])
const buyersOptions = ref([])
const providersOptions = ref([])
const warrantyOptions = ref([])
const serialEquipItems = ref([])
const freeEquipItems = ref([])
const paidEquipItems = ref([])
const extrasType = ref([])
const vehicleEquips = ref([])
const galleryImages = ref([])
const galleryFaulty = ref([])
const gallery360 = ref([])
const galleryVideo = ref([])
const drives = ref(null)
const bodyType = ref(null)
const brand = ref({ id: '', label: '' })
const webBrand = ref({ id: '', label: '' })
const model = ref({ id: '', label: '' })
const modelWeb = ref({ id: '', label: '' })
const provider = ref({ id: '', label: '' })
const buyer = ref({ id: '', label: '' })
const equipmentsGroup = ref([])
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
const serialEquip = ref(null)
const optionalEquip = ref(null)
const paidEquip = ref(null)
const basicTab = ref(null)
const technicalTab = ref(null)
const portalsTab = ref(null)
const maintenanceTab = ref(null)
const pricesTab = ref(null)
const commentsTab = ref(null)
const extrasTab = ref(null)
const discountsTab = ref(null)
const serialEquipTab = ref(null)
const optionalEquipTab = ref(null)
const asideTabs = [
  basicTab,
  technicalTab,
  portalsTab,
  maintenanceTab,
  pricesTab,
  commentsTab,
  extrasTab,
  discountsTab,
  serialEquipTab,
  optionalEquipTab
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
const extraCategory = ref('0')
const extraValue = ref(0)
const disCategory = ref(true)
const disAdd = ref(true)
const extraMode = ref(false)
const extraTitle = ref('')
const extraPrice = ref(0)
const extraDescription = ref('')
const extraDelivery = ref(false)
const extraIVA = ref(0)
const discount = ref(0)
const discountTitle = ref('')
const discountFrom = ref('')
const discountTo = ref('')
const discountPercent = ref(0)
const discountFixed = ref(0)
const discountId = ref(0)
const equipTitle = ref('')
const equipDescription = ref('')
const equipGroup = ref('0')
const equipWeb = ref(false)
const equipFeatured = ref(false)
const isFetchingEquip = ref(true)
const skeletonGallery = ref(true)
const imagesParams = [
  {
    key: 'vehicle',
    value: id.value
  },
  {
    key: 'gallery_type',
    value: 'main'
  }
]
const faultyParams = [
  {
    key: 'vehicle',
    value: id.value
  },
  {
    key: 'gallery_type',
    value: 'faulty'
  }
]
const params360 = [
  {
    key: 'vehicle',
    value: id.value
  }
]
const videoParams = [
  {
    key: 'vehicle',
    value: id.value
  }
]

const fetchingGallery = () => {
  axios.get(galleryUrl + '?vehicle=' + id.value + '&gallery_type=main').then((response) => {
    galleryImages.value = response.data.results
    skeletonGallery.value = false
  })
}
const fetchingFaulty = () => {
  axios.get(galleryUrl + '?vehicle=' + id.value + '&gallery_type=faulty').then((response) => {
    galleryFaulty.value = response.data.results
    skeletonGallery.value = false
  })
}

const fetchingVideo = () => {
  axios.get(galleryVideoUrl + '?vehicle=' + id.value).then((response) => {
    console.log(response.data.results)
    galleryVideo.value = response.data.results
    skeletonGallery.value = false
  })
}

const fetching360 = () => {
  axios.get(gallery360Url + '?vehicle=' + id.value).then((response) => {
    console.log(response.data.results)
    gallery360.value = response.data.results
    skeletonGallery.value = false
  })
}

fetchingGallery()
fetchingFaulty()
fetchingVideo()
fetching360()

const toggleDrawer = () => {
  drawer.value = !drawer.value
}

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
  isFetchingEquip.value = true
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
      model.value = { id: vehicle.value.model.id, label: vehicle.value.model.title }
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
      regimen.value = vehicle.value.purchase?.tax_regime
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
      paidEquipItems.value = []
      freeEquipItems.value = []
      serialEquipItems.value = []
      vehicleEquips.value = vehicle.value.equipments
      for (let item of vehicle.value.equipments) {
        if (item.type === 'OPTIONAL_AT_EXTRA_CHARGE') {
          paidEquipItems.value.push(item)
        }
        if (item.type === 'OPTIONAL_FREE_OF_CHARGE') {
          freeEquipItems.value.push(item)
        }
        if (item.type === 'SERIAL') {
          serialEquipItems.value.push(item)
        }
      }
      isFetchingEquip.value = false
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
      axios.get(`${modelUrl}?brand=${brand.value.id}&title=`).then((response) => {
        for (let option of response.data.results) {
          modelOptions.value.push({
            id: option.id,
            label: option.title
          })
        }
      })
    })
}

fetch()

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
  for (let option of response.data.equipment_groups) {
    equipmentsGroup.value.push({
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
  serialEquip.value.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
}

const tabEvent10 = () => {
  tab.value = 10
  for (let tab of tabs2) {
    tab.value.classList.remove('tab-active')
  }
  tab10.value.classList.add('tab-active')
  optionalEquip.value.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
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

const isFetchingExtras = ref(false)
const isFetchingDiscounts = ref(false)
const serverOptions = ref({
  page: 1,
  rowsPerPage: 20
})
const serverItemsLength = ref(0)
const itemsExtra = ref([])
const itemsDiscount = ref([])

const fetchingExtras = () => {
  if (isFetchingExtras.value) {
    return
  }

  isFetchingExtras.value = true

  const fetchData = async () => {
    try {
      const params = {
        limit: serverOptions.value.rowsPerPage,
        pager: 'number',
        page: serverOptions.value.page
      }
      const API_URL = `${extrasUrl}?vehicle__in=${id.value}&${new URLSearchParams(params)}`
      const response = await axios.get(API_URL)
      itemsExtra.value = response.data.results
      serverItemsLength.value = response.data.count
    } catch (error) {
      console.error(error)
    } finally {
      isFetchingExtras.value = false
    }
  }

  fetchData()
}

const fetchingDiscounts = () => {
  if (isFetchingDiscounts.value) {
    return
  }

  isFetchingDiscounts.value = true

  const fetchData = async () => {
    try {
      const params = {
        limit: serverOptions.value.rowsPerPage,
        pager: 'number',
        page: serverOptions.value.page
      }
      const API_URL = `${discountUrl}?vehicle__in=${id.value}&${new URLSearchParams(params)}`
      const response = await axios.get(API_URL)
      itemsDiscount.value = response.data.results
      serverItemsLength.value = response.data.count
    } catch (error) {
      console.error(error)
    } finally {
      isFetchingDiscounts.value = false
    }
  }

  fetchData()
}

const edit = ref(null)
const extraId = ref(0)
const editMode = ref('')
const equipId = ref(0)
const editModal = (id, mode) => {
  if (mode === 0) {
    editMode.value = 'extras'
    axios
      .get(`${extrasUrl}${id}/`)
      .then((response) => {
        extraId.value = response.data.id
        extraCategory.value = response.data.category
        extraTitle.value = response.data.title
        extraPrice.value = response.data.price
        extraDescription.value = response.data.description
        extraIVA.value = response.data.iva
        extraDelivery.value = response.data.is_home_delivery
      })
      .then(() => {
        edit.value.showModal()
      })
  }
  if (mode === 1) {
    editMode.value = 'discounts'
    axios
      .get(`${discountUrl}/${id}/`)
      .then((response) => {
        discountId.value = response.data.id
        discountTitle.value = response.data.title
        discountFrom.value = response.data.from_date
        discountTo.value = response.data.to_date
        discountPercent.value = response.data.amount_percent
        discountFixed.value = response.data.amount_fix
      })
      .then(() => {
        edit.value.showModal()
      })
  }
  if (mode === 2) {
    resetEquip()
    editMode.value = 'equip'
    for (let equip of vehicleEquips.value) {
      if (equip.id === id) {
        equipId.value = equip.id
        equipTitle.value = equip.title
        equipDescription.value = equip.description
        equipGroup.value = equip.group
        equipWeb.value = equip.show_in_web
        equipFeatured.value = equip.is_featured
      }
    }
    edit.value.showModal()
  }
}

const updateExtra = () => {
  const payload = {
    content_type_category: extraCategory.value,
    title: extraTitle.value,
    price: extraPrice.value,
    description: extraDescription.value,
    vehicle: id.value
  }
  if (extraCategory.value === 'DocumentManagement') {
    payload.iva = extraIVA.value
  }
  if (extraCategory.value === 'DeliveryType') {
    payload.is_home_delivery = extraDelivery.value
  }
  axios.patch(`${extrasUrl}${extraId.value}/`, payload).then(() => {
    resetExtra()
    fetchingExtras()
    edit.value.close()
  })
}

const updateDiscount = () => {
  axios
    .patch(`${discountUrl}/${discountId.value}/`, {
      title: discountTitle.value,
      from_date: discountFrom.value,
      to_date: discountTo.value,
      amount_percent: discountPercent.value,
      amount_fix: discountFixed.value
    })
    .then(() => {
      resetDiscount()
      fetchingDiscounts()
      edit.value.close()
    })
}

const updateEquip = () => {
  axios
    .patch(`${equipUrl}${equipId.value}/`, {
      title: equipTitle.value,
      description: equipDescription.value,
      group: equipGroup.value,
      show_in_web: equipWeb.value,
      is_featured: equipFeatured.value
    })
    .then(() => {
      fetch()
      resetEquip()
      edit.value.close()
    })
}

const removeExtra = (id) => {
  axios.delete(`${extrasUrl}${id}/`).then(() => fetchingExtras())
}

const removeDiscount = (id) => {
  axios.delete(`${discountUrl}${id}/`).then(() => fetchingDiscounts())
}

const removeEquip = (id) => {
  axios.delete(`${equipUrl}${id}/`).then(() => fetch())
}

const webEquip = (id, value, mode) => {
  if (mode === 0) {
    axios.patch(`${equipUrl}${id}/`, { show_in_web: !value }).then(() => {})
  }
  if (mode === 1) {
    axios.patch(`${equipUrl}${id}/`, { is_featured: !value }).then(() => {})
  }
  fetch()
}

watch(
  serverOptions,
  () => {
    fetchingExtras()
    fetchingDiscounts()
    fetch()
  },
  { deep: true }
)

const headersEquip = [
  { text: 'Nombre', value: 'title' },
  { text: 'Descripción', value: 'description' },
  { text: 'Grupo', value: 'group' },
  { text: 'Web', value: 'web', width: 40 },
  { text: 'Destacado', value: 'featured', width: 40 },
  { text: 'Acciones', value: 'id', width: 40 }
]

const headersExtra = [
  { text: 'Nombre', value: 'title' },
  { text: 'Descripción', value: 'description' },
  { text: 'Precio', value: 'price' },
  { text: 'Acciones', value: 'id', width: 40 }
]

const headersDiscounts = [
  { text: 'Nombre', value: 'title' },
  { text: 'Fecha inicial', value: 'from_date' },
  { text: 'Fecha final', value: 'to_date' },
  { text: 'Valor', value: 'amount_percent' },
  { text: 'Valor fijo', value: 'amount_fix' },
  { text: 'Acciones', value: 'id', width: 60 }
]

const addExtra = () => {
  if (!extraMode.value) {
    axios
      .post(extrasUrl, {
        content_type_category: extraCategory.value,
        object_id: extraValue.value,
        vehicle: id.value
      })
      .then((response) => {
        if (response.status === 201) {
          fetchingExtras()
          toggleDrawer()
          resetExtra()
        }
      })
  } else {
    const payload = {
      content_type_category: extraCategory.value,
      title: extraTitle.value,
      description: extraDescription.value,
      price: extraPrice.value,
      vehicle: id.value
    }

    if (extraCategory.value === 'DeliveryType') {
      payload.is_home_delivery = extraDelivery.value
    }
    if (extraCategory.value === 'DocumentManagement') {
      payload.iva = extraIVA.value
    }

    axios.post(extrasUrl, payload).then((response) => {
      if (response.status === 201) {
        fetchingExtras()
        toggleDrawer()
        resetExtra()
      }
    })
  }
}

const addDiscount = () => {
  if (!discountMode.value) {
    axios
      .post(discountUrl, {
        discount: discount.value,
        vehicle: id.value
      })
      .then((response) => {
        if (response.status === 201) {
          fetchingDiscounts()
          toggleDrawer()
          resetDiscount()
        }
      })
  } else {
    axios
      .post(discountUrl, {
        title: discountTitle.value,
        from_date: discountFrom.value,
        to_date: discountFrom.value,
        amount_percent: discountPercent.value,
        amount_fix: discountFixed.value,
        vehicle: id.value
      })
      .then((response) => {
        if (response.status === 201) {
          fetchingDiscounts()
          toggleDrawer()
          resetDiscount()
        }
      })
  }
}

const addEquip = () => {
  axios
    .post(equipUrl, {
      title: equipTitle.value,
      description: equipDescription.value,
      group: equipGroup.value,
      show_in_web: equipWeb.value,
      is_featured: equipFeatured.value,
      type: drawerSection.value,
      vehicle: id.value
    })
    .then((response) => {
      if (response.status === 201) {
        fetch()
        toggleDrawer()
        resetEquip()
      }
    })
}

const resetEquip = () => {
  equipTitle.value = ''
  equipDescription.value = ''
  equipGroup.value = '0'
  equipWeb.value = false
  equipFeatured.value = false
}

const resetDiscount = () => {
  discount.value = 0
  discountTitle.value = ''
  discountFrom.value = ''
  discountTo.value = ''
  discountFixed.value = 0
  discountPercent.value = 0
}

const resetExtra = () => {
  extraCategory.value = '0'
  extraValue.value = '0'
  extraId.value = 0
  extraTitle.value = ''
  extraPrice.value = 0
  extraDescription.value = ''
  extraIVA.value = 0
  extraDelivery.value = false
  extraMode.value = false
}

const extraDrawer = () => {
  drawerSection.value = 'extra'
  axios.get(warrantyUrl).then((response) => {
    for (let option of response.data.results) {
      warrantyOptions.value.push({
        id: option.id,
        title: option.title
      })
    }
  })
  axios.get(deliveryUrl).then((response) => {
    console.log(response.data.results)
    for (let option of response.data.results) {
      deliveryOptions.value.push({
        id: option.id,
        title: option.title
      })
    }
  })
  axios.get(docsUrl).then((response) => {
    for (let option of response.data.results) {
      docsOptions.value.push({
        id: option.id,
        title: option.title
      })
    }
  })
  axios.get(anyExtraUrl).then((response) => {
    for (let option of response.data.results) {
      anyExtraOptions.value.push({
        id: option.id,
        title: option.title
      })
    }
  })
}

const extraSelected = () => {
  if (extraCategory.value === 'WarrantyType') {
    extrasType.value = warrantyOptions.value
  }
  if (extraCategory.value === 'DeliveryType') {
    extrasType.value = deliveryOptions.value
  }
  if (extraCategory.value === 'DocumentManagement') {
    extrasType.value = docsOptions.value
  }
  if (extraCategory.value === 'AnyExtra') {
    extrasType.value = anyExtraOptions.value
  }
  extraValue.value = '0'
  disCategory.value = false
}

const discountDrawer = () => {
  drawerSection.value = 'discount'
  axios.get(discountListUrl).then((response) => {
    for (let option of response.data.results) {
      discountOptions.value.push({
        id: option.id,
        title: option.title
      })
    }
  })
}

onMounted(() => {
  fetchingExtras()
  fetchingDiscounts()
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
    if (tab.value > 0 && tab.value < 9) {
      if (discounts.value?.getBoundingClientRect().top < 200) {
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
    } else {
      if (optionalEquip.value?.getBoundingClientRect().top < 200) {
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
      } else {
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
      }
    }
  })
})
</script>

<template>
  <div class="drawer drawer-end">
    <input id="vehicle-drawer" type="checkbox" class="drawer-toggle" v-model="drawer" />
    <div class="drawer-content">
      <ModalInfo class="w-full" ref="error" title="Error" :message="message" />
      <dialog ref="edit" id="edit" class="modal">
        <div class="modal-box flex flex-col">
          <form method="dialog flex flex-col" @submit.prevent="edit.close(), reset()">
            <button class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">✕</button>
          </form>
          <div v-if="editMode === 'extras'">
            <h3 class="text-lg font-bold">Editar Descuento</h3>
            <div class="divider m-0"></div>
            <form @submit.prevent="updateExtra" class="flex flex-col">
              <TextInput label="Titulo:" v-model="extraTitle" @input="disAdd = false" />
              <NumberInput label="Precio:" v-model="extraPrice" />
              <NumberInput
                v-if="extraCategory === 'DocumentManagement'"
                label="IVA:"
                v-model="extraIVA"
              />
              <AreaInput label="Descripción:" v-model="extraDescription" />
              <CheckInput
                v-if="extraCategory === 'DeliveryType'"
                label="¿Entrega a domicilio?"
                class="mt-3"
                v-model="extraDelivery"
              />
              <button type="submit" class="btn btn-primary mt-4 self-end text-white">
                <LoadingSpinner v-if="loadingSpinner" />
                Guardar
              </button>
            </form>
          </div>
          <div v-if="editMode === 'discounts'">
            <h3 class="text-lg font-bold">Editar Descuento</h3>
            <div class="divider m-0"></div>
            <form @submit.prevent="updateDiscount" class="flex flex-col">
              <TextInput label="Titulo:" v-model="discountTitle" />
              <div class="grid grid-cols-2 gap-x-4">
                <DateInput label="Valido desde:" v-model="discountFrom" />
                <DateInput label="Valido hasta:" v-model="discountTo" />
                <NumberInput label="Valor Porcentual:" v-model="discountPercent" />
                <NumberInput label="Valor Fijo:" v-model="discountFixed" />
              </div>
              <button type="submit" class="btn btn-primary mt-4 self-end text-white">
                <LoadingSpinner v-if="loadingSpinner" />
                Guardar
              </button>
            </form>
          </div>
          <div v-if="editMode === 'equip'">
            <h3 class="text-lg font-bold">Editar Equipamiento</h3>
            <div class="divider m-0"></div>
            <form @submit.prevent="updateEquip" class="flex flex-col">
              <TextInput label="Nombre:" placeholder="Introducir Serial" v-model="equipTitle" />
              <TextInput
                label="Descripción:"
                placeholder="Introducir Serial"
                v-model="equipDescription"
              />
              <SelectInput label="Grupo:" :options="equipmentsGroup" v-model="equipGroup" />
              <CheckInput label="Mostrar en pagina web:" v-model="equipWeb" />
              <CheckInput label="Mostrar como destacado:" v-model="equipFeatured" />
              <button type="submit" class="btn btn-primary mt-4 self-end text-white">
                <LoadingSpinner v-if="loadingSpinner" />
                Guardar
              </button>
            </form>
          </div>
        </div>
      </dialog>
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
          v-if="tab > 8 && tab < 11"
          role="tablist"
          class="tabs tabs-bordered sticky top-0 overflow-x-scroll text-nowrap px-4 lg:hidden"
        >
          <a ref="tab9" role="tab" class="tab tab-active" @click="tabEvent9"
            >Equipamiento de serie</a
          >
          <a ref="tab10" role="tab" class="tab" @click="tabEvent10">Equipamiento opcional</a>
        </div>
        <main class="flex w-full flex-col gap-6 lg:flex-row">
          <aside class="sticky top-[4rem] hidden h-min max-w-64 rounded bg-base-100 lg:block">
            <ul class="menu menu-sm w-56 rounded-box bg-base-100">
              <li>
                <a class="font-bold" @click="tabEvent1">Admin</a>
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
                  <li><a ref="serialEquipTab" @click="tabEvent9">Equipamiento de serie</a></li>
                  <li><a ref="optionalEquipTab" @click="tabEvent10">Equipamiento opcional</a></li>
                </ul>
              </li>
              <li><a class="font-bold" @click="tab = 11">PT</a></li>
            </ul>
          </aside>
          <section class="flex flex-1 flex-col">
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
                  <SearchSelect label="Modelo:" :options="modelOptions" v-model="model" />
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
                      table-class-name="z-0"
                      header-class-name="z-0"
                      hide-footer
                      border-cell
                      :headers="headersExtra"
                      :items="itemsExtra"
                      v-model:server-options="serverOptions"
                      :server-items-length="serverItemsLength"
                      :loading="isFetchingExtras"
                    >
                      <template v-slot:item-id="{ id }">
                        <div class="w-20">
                          <button class="btn btn-square btn-xs mr-2" @click="editModal(id, 0)">
                            <Icon icon="mdi:pencil" />
                          </button>
                          <button class="btn btn-square btn-error btn-xs" @click="removeExtra(id)">
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
                      table-class-name="z-0"
                      header-class-name="z-0"
                      hide-footer
                      border-cell
                      buttons-pagination
                      :headers="headersDiscounts"
                      :items="itemsDiscount"
                      v-model:server-options="serverOptions"
                      :server-items-length="serverItemsLength"
                      :loading="isFetchingDiscounts"
                    >
                      <template v-slot:item-id="{ id }">
                        <div class="w-20">
                          <button class="btn btn-square btn-xs mr-2" @click="editModal(id, 1)">
                            <Icon icon="mdi:pencil" />
                          </button>
                          <button
                            class="btn btn-square btn-error btn-xs"
                            @click="removeDiscount(id)"
                          >
                            <Icon icon="mdi:trash-can-outline" />
                          </button>
                        </div>
                      </template>
                    </EasyDataTable>
                  </template>
                </VehicleTable>
              </div>
            </div>
            <div v-if="tab > 8 && tab < 12" class="flex flex-col gap-8">
              <div
                ref="serialEquip"
                class="flex scroll-m-20 flex-col gap-4 rounded bg-base-100 p-4"
              >
                <VehicleTable title="Equipamiento de serie" @addBtn="drawerSection = 'SERIAL'">
                  <template #content>
                    <EasyDataTable
                      class="table-dark table-striped"
                      table-class-name="z-0"
                      header-class-name="z-0"
                      hide-footer
                      border-cell
                      :headers="headersEquip"
                      :items="serialEquipItems"
                      v-model:server-options="serverOptions"
                      :server-items-length="serverItemsLength"
                      :loading="isFetchingEquip"
                    >
                      <template v-slot:item-web="{ id, show_in_web }">
                        <input
                          type="checkbox"
                          class="checkbox"
                          :checked="show_in_web"
                          @click="webEquip(id, show_in_web, 0)"
                        />
                      </template>
                      <template v-slot:item-featured="{ id, is_featured }">
                        <input
                          type="checkbox"
                          class="checkbox"
                          :checked="is_featured"
                          @click="webEquip(id, is_featured, 1)"
                        />
                      </template>
                      <template v-slot:item-id="{ id }">
                        <div class="w-20">
                          <button class="btn btn-square btn-xs mr-2" @click="editModal(id, 2)">
                            <Icon icon="mdi:pencil" />
                          </button>
                          <button class="btn btn-square btn-error btn-xs" @click="removeEquip(id)">
                            <Icon icon="mdi:trash-can-outline" />
                          </button>
                        </div>
                      </template>
                    </EasyDataTable>
                  </template>
                  <template #drawer> </template>
                </VehicleTable>
              </div>
              <div
                ref="optionalEquip"
                class="flex scroll-m-20 flex-col gap-4 rounded bg-base-100 p-4"
              >
                <VehicleTable
                  title="Equipamiento opcional sin coste"
                  @addBtn="drawerSection = 'OPTIONAL_FREE_OF_CHARGE'"
                >
                  <template #content>
                    <EasyDataTable
                      class="table-dark table-striped"
                      table-class-name="z-0"
                      header-class-name="z-0"
                      hide-footer
                      border-cell
                      :headers="headersEquip"
                      :items="freeEquipItems"
                      v-model:server-options="serverOptions"
                      :server-items-length="serverItemsLength"
                      :loading="isFetchingEquip"
                    >
                      <template v-slot:item-web="{ id, show_in_web }">
                        <input
                          type="checkbox"
                          class="checkbox"
                          :checked="show_in_web"
                          @click="webEquip(id, show_in_web, 0)"
                        />
                      </template>
                      <template v-slot:item-featured="{ id, is_featured }">
                        <input
                          type="checkbox"
                          class="checkbox"
                          :checked="is_featured"
                          @click="webEquip(id, is_featured, 1)"
                        />
                      </template>
                      <template v-slot:item-id="{ id }">
                        <div class="w-20">
                          <button class="btn btn-square btn-xs mr-2" @click="editModal(id, 2)">
                            <Icon icon="mdi:pencil" />
                          </button>
                          <button class="btn btn-square btn-error btn-xs" @click="removeEquip(id)">
                            <Icon icon="mdi:trash-can-outline" />
                          </button>
                        </div>
                      </template>
                    </EasyDataTable>
                  </template>
                  <template #drawer> </template>
                </VehicleTable>
              </div>
              <div ref="paidEquip" class="flex scroll-m-20 flex-col gap-4 rounded bg-base-100 p-4">
                <VehicleTable
                  title="Equipamiento opcional con coste"
                  @addBtn="drawerSection = 'OPTIONAL_AT_EXTRA_CHARGE'"
                >
                  <template #content>
                    <EasyDataTable
                      class="table-dark table-striped"
                      table-class-name="z-0"
                      header-class-name="z-0"
                      hide-footer
                      border-cell
                      :headers="headersEquip"
                      :items="paidEquipItems"
                      v-model:server-options="serverOptions"
                      :server-items-length="serverItemsLength"
                      :loading="isFetchingEquip"
                    >
                      <template v-slot:item-web="{ id, show_in_web }">
                        <input
                          type="checkbox"
                          class="checkbox"
                          :checked="show_in_web"
                          @click="webEquip(id, show_in_web, 0)"
                        />
                      </template>
                      <template v-slot:item-featured="{ id, is_featured }">
                        <input
                          type="checkbox"
                          class="checkbox"
                          :checked="is_featured"
                          @click="webEquip(id, is_featured, 1)"
                        />
                      </template>
                      <template v-slot:item-id="{ id }">
                        <div class="w-20">
                          <button class="btn btn-square btn-xs mr-2" @click="editModal(id, 2)">
                            <Icon icon="mdi:pencil" />
                          </button>
                          <button class="btn btn-square btn-error btn-xs" @click="removeEquip(id)">
                            <Icon icon="mdi:trash-can-outline" />
                          </button>
                        </div>
                      </template>
                    </EasyDataTable>
                  </template>
                  <template #drawer> </template>
                </VehicleTable>
              </div>
            </div>
            <div ref="gallery" class="flex flex-col gap-4 rounded bg-base-100 p-4 lg:hidden">
              <h2 class="text-xl font-medium">Galería Multimedia</h2>
              <div role="tablist" class="tabs tabs-bordered tabs-md">
                <input type="radio" name="galeria" role="tab" class="tab" aria-label="Galería" />
                <div role="tabpanel" class="tab-content p-4 lg:p-8">
                  <button @click="open">open</button>
                  <div class="skeleton h-28 w-28"></div>
                  <div class="skeleton h-28 w-28"></div>
                  <div class="skeleton h-28 w-28"></div>
                  <div class="skeleton h-28 w-28"></div>
                  <div class="skeleton h-28 w-28"></div>
                  <div class="skeleton h-28 w-28"></div>
                </div>
                <input
                  type="radio"
                  name="galeria"
                  role="tab"
                  class="tab"
                  aria-label="Documentos"
                  checked
                />
                <div role="tabpanel" class="tab-content p-8"></div>
              </div>
            </div>
          </section>
          <aside class="hidden h-fit flex-col gap-4 rounded bg-base-100 p-4 lg:flex">
            <h2 class="text-xl font-medium">Galería Multimedia</h2>
            <div role="tablist" class="tabs tabs-bordered tabs-md">
              <input
                type="radio"
                name="galeria"
                role="tab"
                class="tab"
                aria-label="Fotos"
                checked
              />
              <div role="tabpanel" class="tab-content min-w-96 p-3">
                <DragDrop
                  type="image"
                  :url="galleryUrl"
                  :fetch="fetchingGallery"
                  format=".jpg"
                  :params="imagesParams"
                />
                <div v-if="skeletonGallery" class="grid w-96 grid-cols-2 gap-4 lg:grid-cols-3">
                  <div class="skeleton h-28 w-28"></div>
                  <div class="skeleton h-28 w-28"></div>
                  <div class="skeleton h-28 w-28"></div>
                  <div class="skeleton h-28 w-28"></div>
                  <div class="skeleton h-28 w-28"></div>
                  <div class="skeleton h-28 w-28"></div>
                </div>
                <div v-else class="grid w-96 grid-cols-2 gap-4 lg:grid-cols-3">
                  <img
                    v-for="(image, index) in galleryImages"
                    :key="index"
                    :src="image.image"
                    :alt="'vehicle img' + image.id"
                    class="h-28 w-28 rounded object-cover"
                  />
                </div>
              </div>
              <input type="radio" name="galeria" role="tab" class="tab" aria-label="Desperfectos" />
              <div role="tabpanel" class="tab-content min-w-96 p-3">
                <DragDrop
                  type="image"
                  :url="galleryUrl"
                  :fetch="fetchingFaulty"
                  format=".jpg"
                  :params="faultyParams"
                />
                <div v-if="skeletonGallery" class="grid w-96 grid-cols-2 gap-4 lg:grid-cols-3">
                  <div class="skeleton h-28 w-28"></div>
                  <div class="skeleton h-28 w-28"></div>
                  <div class="skeleton h-28 w-28"></div>
                  <div class="skeleton h-28 w-28"></div>
                  <div class="skeleton h-28 w-28"></div>
                  <div class="skeleton h-28 w-28"></div>
                </div>
                <div v-else class="grid w-96 grid-cols-2 gap-4 lg:grid-cols-3">
                  <img
                    v-for="(image, index) in galleryFaulty"
                    :key="index"
                    :src="image.image"
                    :alt="'vehicle img' + image.id"
                    class="h-28 w-28 rounded object-cover"
                  />
                </div>
              </div>
              <input type="radio" name="galeria" role="tab" class="tab" aria-label="Videos" />
              <div role="tabpanel" class="tab-content min-w-96 p-3">
                <DragDrop
                  type="video"
                  :url="galleryVideoUrl"
                  :fetch="fetchingVideo"
                  format=".mp4"
                  :params="videoParams"
                />
                <div v-if="skeletonGallery" class="grid w-96 grid-cols-2 gap-4 lg:grid-cols-3">
                  <div class="skeleton h-28 w-28"></div>
                  <div class="skeleton h-28 w-28"></div>
                  <div class="skeleton h-28 w-28"></div>
                  <div class="skeleton h-28 w-28"></div>
                  <div class="skeleton h-28 w-28"></div>
                  <div class="skeleton h-28 w-28"></div>
                </div>
                <div v-else class="grid w-96 grid-cols-2 gap-4 lg:grid-cols-3">
                  <video
                    v-for="(video, index) in galleryVideo"
                    :key="index"
                    :src="video.video"
                    :alt="'vehicle video' + video.id"
                    class="h-28 w-28 rounded object-cover"
                  />
                </div>
              </div>
              <input type="radio" name="galeria" role="tab" class="tab" aria-label="360" />
              <div role="tabpanel" class="tab-content min-w-96 p-3">
                <DragDrop
                  type="image"
                  :url="gallery360Url"
                  :fetch="fetching360"
                  format=".jpg"
                  :params="params360"
                />
                <div v-if="skeletonGallery" class="grid w-96 grid-cols-2 gap-4 lg:grid-cols-3">
                  <div class="skeleton h-28 w-28"></div>
                  <div class="skeleton h-28 w-28"></div>
                  <div class="skeleton h-28 w-28"></div>
                  <div class="skeleton h-28 w-28"></div>
                  <div class="skeleton h-28 w-28"></div>
                  <div class="skeleton h-28 w-28"></div>
                </div>
                <div v-else class="grid w-96 grid-cols-2 gap-4 lg:grid-cols-3">
                  <img
                    v-for="(image, index) in gallery360"
                    :key="index"
                    :src="image.image"
                    :alt="'vehicle img' + image.id"
                    class="h-28 w-28 rounded object-cover"
                  />
                </div>
              </div>
              <input type="radio" name="galeria" role="tab" class="tab" aria-label="Documentos" />
              <div role="tabpanel" class="tab-content min-w-96 p-3">
                <DragDrop
                  type="image"
                  :url="galleryUrl"
                  :fetch="fetchingFaulty"
                  format=".jpg"
                  :params="faultyParams"
                />
              </div>
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
          <ToggleInput label="Auto / Manual" v-model="extraMode" />
          <SelectInput
            vif
            label="categoria:"
            :options="options.extraType"
            v-model="extraCategory"
            @selected="extraSelected"
          />
          <SelectInput
            v-if="!extraMode"
            label="Tipo:"
            :options="extrasType"
            v-model="extraValue"
            :disabled="disCategory"
            @selected="disAdd = false"
          />
          <div v-if="extraMode && extraCategory !== '0'" class="flex flex-col">
            <TextInput label="Titulo:" v-model="extraTitle" @input="disAdd = false" />
            <NumberInput label="Precio:" v-model="extraPrice" />
            <NumberInput
              v-if="extraMode && extraCategory === 'DocumentManagement'"
              label="IVA:"
              v-model="extraIVA"
            />
            <AreaInput label="Descripción:" v-model="extraDescription" />
            <CheckInput
              v-if="extraMode && extraCategory === 'DeliveryType'"
              label="¿Entrega a domicilio?"
              class="mt-3"
              v-model="extraDelivery"
            />
          </div>
        </div>
        <DrawerActions
          class="self-end"
          secondary="Cancelar"
          primary="Guardar"
          :disabled="disAdd"
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
            :options="discountOptions"
            v-model="discount"
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
          @click-primary="addDiscount"
        />
      </ul>
      <ul
        v-if="
          drawerSection === 'OPTIONAL_AT_EXTRA_CHARGE' ||
          drawerSection === 'OPTIONAL_FREE_OF_CHARGE' ||
          drawerSection === 'SERIAL'
        "
        class="menu min-h-full w-96 flex-col justify-between bg-white p-4 text-base-content"
      >
        <div>
          <DrawerTitle title="Añadir Equipamiento" @toggle="toggleDrawer" />
          <TextInput label="Nombre:" v-model="equipTitle" />
          <TextInput label="Descripción:" v-model="equipDescription" />
          <SelectInput label="Grupo:" :options="equipmentsGroup" v-model="equipGroup" />
          <CheckInput label="Mostrar en pagina web:" v-model="equipWeb" />
          <CheckInput label="Mostrar como destacado:" v-model="equipFeatured" />
        </div>
        <DrawerActions
          class="self-end"
          secondary="Cancelar"
          primary="Guardar"
          @click-secondary="toggleDrawer"
          @click-primary="addEquip"
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
