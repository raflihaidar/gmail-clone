import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import MessageDetails from '../components/MessageDetails.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/mail',
      name: 'main',
      component: MainView
    }
  ]
})

export default router
