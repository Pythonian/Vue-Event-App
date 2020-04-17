import EventService from '@/services/EventService.js'

export const namespaced = true

export const state = {
	events: [],
    eventsTotal: 0,
    event: {}
  }
export const mutations = {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_EVENTS_TOTAL(state, eventsTotal) {
      state.eventsTotal = eventsTotal
    },
    SET_EVENT(state, event) {
      state.event = event
    }
  }
export const actions = {
    createEvent({ commit }, event) {
      return EventService.postEvent(event).then(() => {
        commit('ADD_EVENT', event)
      })
    },
    fetchEvents({ commit }, { perPage, page }) {
      EventService.getEvents(perPage, page)
        .then(response => {
          commit(
            'SET_EVENTS_TOTAL',
            parseInt(response.headers['x-total-count'])
          )
          // Sets it to the list of event data
          commit('SET_EVENTS', response.data)
        })
        .catch(error => {
          console.log('There was an error:' + error.response)
        })
    },
    fetchEvent({ commit, getters }, id) {
      // See if we already have this event
      var event = getters.getEventById(id)
      if (event) {
        // If we do, set the event
        commit('SET_EVENT', event)
      } else {
        // If not, get it with the API.
        EventService.getEvent(id)
          .then(response => {
            commit('SET_EVENT', response.data)
          })
          .catch(error => {
            console.log('There was an error:', error.response)
          })
      }
    }
  }
export const getters = {
    // Dynamic getters
    getEventById: state => id => {
      return state.events.find(event => event.id === id)
    }
  }