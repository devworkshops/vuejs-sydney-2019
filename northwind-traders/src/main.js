import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import Vuelidate from 'vuelidate'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@fortawesome/fontawesome-free/css/all.css'
import InvalidFeedback from '@/components/InvalidFeedback.vue'
import BaseInput from '@/components/BaseInput.vue'

Vue.use(BootstrapVue)
Vue.use(Vuelidate)

Vue.component('InvalidFeedback', InvalidFeedback)
Vue.component('BaseInput', BaseInput)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
