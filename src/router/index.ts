import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/image/:id',
      name: 'image-detail',
      component: () => import('../views/ImageDetailView.vue')
    }
  ]
})

export default router
