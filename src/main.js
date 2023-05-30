import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css'

import '@/assets/less/style.less'
import Default from '@/layout/default.vue'
import router from '@/router.js'

const pinia = createPinia()
const app = createApp(Default)

app.use(Antd)
app.use(pinia)
app.use(router)
app.mount('#app')
