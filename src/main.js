import { createApp } from 'vue'
import { createPinia } from 'pinia'

import {
    Layout, Button, Input, Menu
} from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css'

import '@/assets/less/style.less'
import Default from '@/layout/default.vue'
import router from '@/router.js'

const pinia = createPinia()
const app = createApp(Default)

app.use(Layout)
app.use(Button)
app.use(Input)
app.use(Menu)

app.use(pinia)
app.use(router)
app.mount('#app')
