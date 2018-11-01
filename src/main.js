import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import './assets/css/clear.css'
import global from './assets/js/global.js'

import invoke from './invoke'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.invoke = invoke
Vue.prototype.global = global


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')