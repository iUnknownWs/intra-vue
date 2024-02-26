import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import BtnPrimary from '@/components/BtnPrimary.vue'
import DateInput from '@/components/DateInput.vue'
import DrawerActions from '@/components/DrawerActions.vue'
import DrawerLink from '@/components/DrawerLink.vue'
import DrawerLogo from '@/components/DrawerLogo.vue'
import DrawerTitle from '@/components/DrawerTitle.vue'
import DropdownBtn from '@/components/DropdownBtn.vue'
import DropdownAvatar from '@/components/DropdownAvatar.vue'
import HeaderMain from '@/components/HeaderMain.vue'
import MenuLink from '@/components/MenuLink.vue'
import NavLink from '@/components/NavLink.vue'
import RangeInput from '@/components/RangeInput.vue'
import RangeInputN from '@/components/RangeInputN.vue'
import RangeSelect from '@/components/RangeSelect.vue'
import SelectInput from '@/components/SelectInput.vue'
import SelectTab from '@/components/SelectTab.vue'
import SettingTable from '@/components/SettingTable.vue'
import TextInput from '@/components/TextInput.vue'
import TextIcon from '@/components/TextIcon.vue'
import CheckInput from '@/components/CheckInput.vue'
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

const app = createApp(App)
app.component('EasyDataTable', Vue3EasyDataTable)
    .component('BtnPrimary', BtnPrimary)
    .component('CheckInput', CheckInput)
    .component('DateInput', DateInput)
    .component('DrawerActions', DrawerActions)
    .component('DrawerLink', DrawerLink)
    .component('DrawerLogo', DrawerLogo)
    .component('DrawerTitle', DrawerTitle)
    .component('DropdownBtn', DropdownBtn)
    .component('DropdownAvatar', DropdownAvatar)
    .component('DropdownBtn', DropdownBtn)
    .component('HeaderMain', HeaderMain)
    .component('MenuLink', MenuLink)
    .component('NavLink', NavLink)
    .component('RangeInput', RangeInput)
    .component('RangeInputN', RangeInputN)
    .component('RangeSelect', RangeSelect)
    .component('SelectInput', SelectInput)
    .component('SelectTab', SelectTab)
    .component('SettingTable', SettingTable)
    .component('TextIcon', TextIcon)
    .component('TextInput', TextInput)

app.use(router)

app.mount('#app')
