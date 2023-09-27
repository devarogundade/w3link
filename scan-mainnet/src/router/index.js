import { createRouter, createWebHistory } from 'vue-router'

import ScanView from '../views/ScanView.vue'
import ScanDetailView from '../views/ScanDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'scan',
      component: ScanView
    },
    {
      path: '/:id',
      name: 'scan-detail',
      component: ScanDetailView
    }
  ]
})

export default router