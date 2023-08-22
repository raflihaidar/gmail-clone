import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import vue3GoogleLogin from 'vue3-google-login'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(vue3GoogleLogin, {
  clientId: '901850095440-ghnphj86drqm1gljggfqu1tddkc7vgvk.apps.googleusercontent.com'
})
app.mount('#app')
