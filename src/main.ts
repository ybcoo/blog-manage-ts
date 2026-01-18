import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/css/global.scss' // 导入全局样式
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import Draggable from 'vuedraggable'
const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router).use(ArcoVue)
app.component('draggable',Draggable)
app.mount('#app')
