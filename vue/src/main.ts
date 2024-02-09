import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import VueMathjax from 'vue-mathjax-next'

const pinia = createPinia()
createApp(App)
  .use(router)
  .use(pinia)
  .use(VueMathjax)
  .mount('#app')
