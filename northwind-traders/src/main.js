import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import Vuelidate from 'vuelidate'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@fortawesome/fontawesome-free/css/all.css'
import 'nprogress/nprogress.css'

import InvalidFeedback from '@/components/InvalidFeedback.vue'
import BaseInput from '@/components/BaseInput.vue'
import store from './store/index'

Vue.use(BootstrapVue)
Vue.use(Vuelidate)

Vue.component('InvalidFeedback', InvalidFeedback)
Vue.component('BaseInput', BaseInput)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (from.name) {
      store.dispatch('StoreInLocalStorage')
  }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
