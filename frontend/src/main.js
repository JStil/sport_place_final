import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import BootstrapVue from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faFolderOpen, faBan, faSave, faEdit, faPaperPlane, faCheck, faSignature, faDownload, faMoneyBill, faShareAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.use(BootstrapVue)

library.add(faPlus, faFolderOpen, faBan, faSave, faEdit, faPaperPlane, faCheck, faSignature, faDownload, faMoneyBill, faShareAlt)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  data: {
    title: 'Default'
  },
  render: h => h(App)
}).$mount('#app')
