import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { Sortable } from 'sortablejs-vue3'
import { registerScrollSpy } from 'vue3-scroll-spy'
import App from './App.vue'
import router from './router'
import AreaInput from '@/components/AreaInput.vue'
import DateInput from '@/components/DateInput.vue'
import DragDrop from '@/components/DragDrop.vue'
import DraggableGallery from '@/components/DraggableGallery.vue'
import DrawerActions from '@/components/DrawerActions.vue'
import DrawerLink from '@/components/DrawerLink.vue'
import DrawerLogo from '@/components/DrawerLogo.vue'
import DrawerTitle from '@/components/DrawerTitle.vue'
import DropdownBtn from '@/components/DropdownBtn.vue'
import DropdownAvatar from '@/components/DropdownAvatar.vue'
import DropMobile from '@/components/DropMobile.vue'
import HeaderMain from '@/components/HeaderMain.vue'
import IntegrationCard from '@/components/IntegrationCard.vue'
import MenuLink from '@/components/MenuLink.vue'
import ModalConfirm from '@/components/ModalConfirm.vue'
import ModalDialog from '@/components/ModalDialog.vue'
import ModalInfo from '@/components/ModalInfo.vue'
import NavLink from '@/components/NavLink.vue'
import NumberInput from '@/components/NumberInput.vue'
import RadioInput from '@/components/RadioInput.vue'
import RangeInputN from '@/components/RangeInputN.vue'
import RangeSelect from '@/components/RangeSelect.vue'
import SelectInput from '@/components/SelectInput.vue'
import SelectTab from '@/components/SelectTab.vue'
import SearchSelect from '@/components/SearchSelect.vue'
import SettingTable from '@/components/SettingTable.vue'
import TextInput from '@/components/TextInput.vue'
import TextIcon from '@/components/TextIcon.vue'
import TextBtn from '@/components/TextBtn.vue'
import ToggleInput from '@/components/ToggleInput.vue'
import CheckInput from '@/components/CheckInput.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import VehicleAlert from '@/components/VehicleAlert.vue'
import VehicleCard from '@/components/VehicleCard.vue'
import VehicleTable from '@/components/VehicleTable.vue'
import Vue3EasyDataTable from 'vue3-easy-data-table'
import VueSelect from "vue-select"
import VueGoogleMaps from 'vue-google-maps-community-fork'
import 'vue3-easy-data-table/dist/style.css'
import 'vue-select/dist/vue-select.css'
import FileInput from './components/FileInput.vue'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)
registerScrollSpy(app)
app.component('EasyDataTable', Vue3EasyDataTable)
    .component('AreaInput', AreaInput)
    .component('CheckInput', CheckInput)
    .component('DateInput', DateInput)
    .component('DragDrop', DragDrop)
    .component('DraggableGallery', DraggableGallery)
    .component('DrawerActions', DrawerActions)
    .component('DrawerLink', DrawerLink)
    .component('DrawerLogo', DrawerLogo)
    .component('DrawerTitle', DrawerTitle)
    .component('DropdownAvatar', DropdownAvatar)
    .component('DropdownBtn', DropdownBtn)
    .component('DropMobile', DropMobile)
    .component('FileInput', FileInput)
    .component('HeaderMain', HeaderMain)
    .component('IntegrationCard', IntegrationCard)
    .component('MenuLink', MenuLink)
    .component('ModalConfirm', ModalConfirm)
    .component('ModalDialog', ModalDialog)
    .component('ModalInfo', ModalInfo)
    .component('NavLink', NavLink)
    .component('NumberInput', NumberInput)
    .component('RadioInput', RadioInput)
    .component('RangeInputN', RangeInputN)
    .component('RangeSelect', RangeSelect)
    .component('SearchSelect', SearchSelect)
    .component('SelectInput', SelectInput)
    .component('SelectTab', SelectTab)
    .component('SettingTable', SettingTable)
    .component('Sortable', Sortable)
    .component('LoadingSpinner', LoadingSpinner)
    .component('TextBtn', TextBtn)
    .component('TextIcon', TextIcon)
    .component('TextInput', TextInput)
    .component('ToggleInput', ToggleInput)
    .component('VehicleAlert', VehicleAlert)
    .component('VehicleCard', VehicleCard)
    .component('VehicleTable', VehicleTable)
    .component('VueSelect', VueSelect)

app.use(router)
app.use(pinia)
app.use(VueGoogleMaps, {
    load: {
        key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries: 'places',
        language: 'es'
    },
})

app.mount('#app')
