import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// icons-vue
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)

// 将所有图标全局注册
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  // console.log(key, component)
  app.component(key, component)
}
app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.mount('#app')
