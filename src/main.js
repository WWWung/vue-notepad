import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

// import axios from 'axios'
// import VueAxios from 'vue-axios'

// Vue.use(VueAxios, axios)

import invoke from './invoke'

Vue.config.productionTip = false
Vue.prototype.invoke = invoke


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')