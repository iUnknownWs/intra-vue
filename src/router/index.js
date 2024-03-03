import HomeViewVue from '@/views/HomeView.vue'
import LoginViewVue from '@/views/LoginView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginViewVue,
    },
    {
      path: '/vehiculos',
      name: 'home',
      component: HomeViewVue,
    },
    {
      path: '/vehiculos/:id',
      name: 'vehicle',
      component: () => import('../views/VehicleView.vue')
    },
    {
      path: '/reservas',
      name: 'reserve',
      component: () => import('../views/ReserveView.vue')
    },
    {
      path: '/tasaciones',
      name: 'valuation',
      component: () => import('../views/ValuationView.vue')
    },
    {
      path: '/recuperar',
      name: 'recovery',
      component: () => import('../views/RecoveryView.vue')
    },
    {
      path: '/usuarios',
      name: 'users',
      component: () => import('../views/UsersView.vue')
    },
    {
      path: '/descuentos',
      name: 'discounts',
      component: () => import('../views/DiscountsView.vue')
    },
    {
      path: '/garantias',
      name: 'warranty',
      component: () => import('../views/WarrantsView.vue')
    },
    {
      path: '/entregas',
      name: 'deliveries',
      component: () => import('../views/DeliveriesView.vue')
    },
    {
      path: '/documentos',
      name: 'docs',
      component: () => import('../views/DocsView.vue')
    },
    {
      path: '/extras',
      name: 'extras',
      component: () => import('../views/ExtrasView.vue')
    },
    {
      path: '/integraciones',
      name: 'integration',
      component: () => import('../views/IntegrationsView.vue')
    },
  ]
})

export default router
