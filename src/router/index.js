import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import MessageView from '../views/MessageView.vue'
import SentView from '../views/SentView.vue'
import InboxView from '../views/InboxView.vue'
import StarredView from '../views/StarredView.vue'
import SnoozedView from '../views/SnoozedView.vue'
import DraftView from '../views/DraftView.vue'
import LoginView from '../views/LoginView.vue'

import { useUserStore } from '../stores/userStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/email',
      beforeEnter(to, from, next) {
        if (useUserStore().email) next()
        else next({ name: '/' })
      },
      name: 'email',
      component: MainView,
      children: [
        {
          path: '',
          name: 'inbox',
          component: InboxView
        },
        {
          path: 'starred',
          name: 'starred',
          component: StarredView
        },
        {
          path: 'snoozed',
          name: 'snoozed',
          component: SnoozedView
        },
        {
          path: 'sent',
          name: 'sent',
          component: SentView
        },
        {
          path: 'draft',
          name: 'draft',
          component: DraftView
        },
        {
          path: 'message/:id',
          name: 'detailMessage',
          component: MessageView
        }
      ]
    }
  ]
})

export default router
