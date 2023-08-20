import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import Testing from '../views/Testing.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView
    },
    {
      path: '/test',
      name: 'test',
      component: Testing
    }
  ]
})

export default router
