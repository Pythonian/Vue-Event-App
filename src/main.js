import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BaseIcon from '@/components/BaseIcon.vue'
import 'nprogress/nprogress.css'
import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import BaseButton from '@/components/BaseButton.vue'
import Vuelidate from 'vuelidate'
import DateFilter from './filters/date'

// Register a component globally
Vue.component('BaseIcon', BaseIcon)
Vue.component('BaseInput', BaseInput)
Vue.component('BaseSelect', BaseSelect)
Vue.component('BaseButton', BaseButton)

Vue.filter('date', DateFilter)

Vue.use(Vuelidate)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
