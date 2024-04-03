import { createRouter, createWebHistory } from 'vue-router'
import BookingsView from '@/views/BookingsView.vue'
import DiscountsView from '@/views/DiscountsView.vue'
import HomeViewVue from '@/views/HomeView.vue'
import LoginViewVue from '@/views/LoginView.vue'
import RecoveryView from '@/views/RecoveryView.vue'
import VehicleView from '@/views/VehicleView.vue'
import ValuationView from '@/views/ValuationView.vue'
import UsersView from '@/views/UsersView.vue'
import WarrantsView from '@/views/WarrantsView.vue'
import DeliveriesView from '@/views/DeliveriesView.vue'
import DocsView from '@/views/DocsView.vue'
import ExtrasView from '@/views/ExtrasView.vue'
import IntegrationsView from '@/views/IntegrationsView.vue'
import ReserveView from '@/views/ReserveView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginViewVue
    },
    {
      path: '/vehiculos',
      name: 'home',
      component: HomeViewVue
    },
    {
      path: '/vehiculos/:id',
      name: 'vehicle',
      component: VehicleView
    },
    {
      path: '/reservas',
      name: 'bookings',
      component: BookingsView
    },
    {
      path: '/reservas/:id',
      name: 'reserve-detail',
      component: ReserveView
    },
    {
      path: '/tasaciones',
      name: 'valuation',
      component: () => ValuationView
    },
    {
      path: '/recuperar',
      name: 'recovery',
      component: () => RecoveryView
    },
    {
      path: '/usuarios',
      name: 'users',
      component: () => UsersView
    },
    {
      path: '/descuentos',
      name: 'discounts',
      component: () => DiscountsView
    },
    {
      path: '/garantias',
      name: 'warranty',
      component: () => WarrantsView
    },
    {
      path: '/entregas',
      name: 'deliveries',
      component: () => DeliveriesView
    },
    {
      path: '/documentos',
      name: 'docs',
      component: () => DocsView
    },
    {
      path: '/extras',
      name: 'extras',
      component: () => ExtrasView
    },
    {
      path: '/integraciones',
      name: 'integration',
      component: () => IntegrationsView
    },
  ]
})

export default router
