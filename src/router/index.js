import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/userStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/email',
      beforeEnter(to, from, next) {
        if (useUserStore().email) next()
        else next({ name: '/' })
      },
      name: 'email',
      component: () => import('../views/MainView.vue'),
      children: [
        {
          path: '',
          name: 'inbox',
          component: () => import('../views/InboxView.vue')
        },
        {
          path: 'starred',
          name: 'starred',
          component: () => import('../views/StarredView.vue')
        },
        {
          path: 'snoozed',
          name: 'snoozed',
          component: () => import('../views/SnoozedView.vue')
        },
        {
          path: 'sent',
          name: 'sent',
          component: () => import('../views/SentView.vue')
        },
        {
          path: 'draft',
          name: 'draft',
          component: () => import('../views/DraftView.vue')
        },
        {
          path: 'message/:id',
          name: 'detailMessage',
          component: () => import('../views/MessageView.vue')
        }
      ]
    },
    {
      path: '/:notFound',
      name: 'NotFoundPage',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})

export default router
