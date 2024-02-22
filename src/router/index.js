import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/usuarios',
      name: 'users',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
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
