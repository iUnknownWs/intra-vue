import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import DateInput from '@/components/DateInput.vue'
import DrawerActions from '@/components/DrawerActions.vue'
import DrawerLink from '@/components/DrawerLink.vue'
import DrawerLogo from '@/components/DrawerLogo.vue'
import DrawerTitle from '@/components/DrawerTitle.vue'
import DropdownBtn from '@/components/DropdownBtn.vue'
import DropdownAvatar from '@/components/DropdownAvatar.vue'
import HeaderMain from '@/components/HeaderMain.vue'
import MenuLink from '@/components/MenuLink.vue'
import ModalDialog from '@/components/ModalDialog.vue'
import ModalInfo from './components/ModalInfo.vue'
import NavLink from '@/components/NavLink.vue'
import NumberInput from './components/NumberInput.vue'
import RangeInputN from '@/components/RangeInputN.vue'
import RangeSelect from '@/components/RangeSelect.vue'
import SelectInput from '@/components/SelectInput.vue'
import SelectTab from '@/components/SelectTab.vue'
import SettingTable from '@/components/SettingTable.vue'
import TextInput from '@/components/TextInput.vue'
import TextIcon from '@/components/TextIcon.vue'
import TextBtn from '@/components/TextBtn.vue'
import CheckInput from '@/components/CheckInput.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import Vue3EasyDataTable from 'vue3-easy-data-table'
import 'vue3-easy-data-table/dist/style.css'
import VueSelect from "vue-select"
import 'vue-select/dist/vue-select.css'


const app = createApp(App)
app.component('EasyDataTable', Vue3EasyDataTable)
    .component('CheckInput', CheckInput)
    .component('DateInput', DateInput)
    .component('DrawerActions', DrawerActions)
    .component('DrawerLink', DrawerLink)
    .component('DrawerLogo', DrawerLogo)
    .component('DrawerTitle', DrawerTitle)
    .component('DropdownAvatar', DropdownAvatar)
    .component('DropdownBtn', DropdownBtn)
    .component('HeaderMain', HeaderMain)
    .component('MenuLink', MenuLink)
    .component('ModalDialog', ModalDialog)
    .component('ModalInfo', ModalInfo)
    .component('NavLink', NavLink)
    .component('NumberInput', NumberInput)
    .component('RangeInputN', RangeInputN)
    .component('RangeSelect', RangeSelect)
    .component('SelectInput', SelectInput)
    .component('SelectTab', SelectTab)
    .component('SettingTable', SettingTable)
    .component('LoadingSpinner', LoadingSpinner)
    .component('TextBtn', TextBtn)
    .component('TextIcon', TextIcon)
    .component('TextInput', TextInput)
    .component('VueSelect', VueSelect)

app.use(router)

app.mount('#app')
