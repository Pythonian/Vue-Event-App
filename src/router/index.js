import Vue from 'vue'
import VueRouter from 'vue-router'
import EventList from '../views/EventList.vue'
import EventShow from '../views/EventShow.vue'
import EventCreate from '../views/EventCreate.vue'
import NProgress from 'nprogress'
import store from '@/store/'
import NotFound from '../views/NotFound.vue'
import NetworkIssue from '../views/NetworkIssue.vue'

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
      }).catch(error => {
        if (error.response && error.response.status == 404) {
          next({ name: '404', params: { resource: 'event'} })
        } else {
          next({ name: 'network-issue' })
        }
      })
    }
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
    props: true
  },
  {
    path: '/network-issue',
    name: 'network-issue',
    component: NetworkIssue
  },
  // Catch all nav that doesnt match
  {
    path: '*',
    redirect: { name: '404', params: { resource: 'page' } }
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
