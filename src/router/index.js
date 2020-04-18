import Vue from 'vue'
import VueRouter from 'vue-router'
import EventList from '../views/EventList.vue'
import EventShow from '../views/EventShow.vue'
import EventCreate from '../views/EventCreate.vue'
import NProgress from 'nprogress'
import store from '@/store/'

Vue.use(VueRouter) // Tells Vue to use the Router

const routes = [
  {
    path: '/',
    name: 'event-list',
    component: EventList,
    props: true
  },
  {
    path: '/event/create',
    name: 'event-create',
    component: EventCreate
  },
  {
    path: '/event/:id',
    name: 'event-show',
    component: EventShow,
    props: true,
    // Runs after the global beforeEach
    beforeEnter(routeTo, routeFrom, next) {
      store.dispatch('event/fetchEvent', routeTo.params.id).then(event => {
        routeTo.params.event = event
        // Continue once promise from API call is resolved
        next()
      })
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((routeTo, routeFrom, next) => {
  // Start the progress bar when routing begins
  NProgress.start()
  next()
})

router.afterEach(() => {
  // Finish the progress bar when routing is about to end
  NProgress.done()
})

// Export an instance of Router with routes defined
export default router
