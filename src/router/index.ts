import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/doctor/:id',
      name: 'doctor-details',
      component: () => import('../views/DoctorDetailsView.vue'),
    },
  ],
})

export default router
