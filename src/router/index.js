import { createRouter, createWebHistory } from 'vue-router'

import { useUserStore } from '../stores/userStore'
import { defineAsyncComponent } from 'vue'
import LoadingComponent from '../components/LoadingComponent.vue'

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
          component: defineAsyncComponent({
            loader: () => import('../views/InboxView.vue'),
            loadingComponent: LoadingComponent
          })
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
          component: defineAsyncComponent({
            loader: () => import('../views/MessageView.vue'),
            loadingComponent: LoadingComponent
          })
        }
      ]
    }
  ]
})

export default router
