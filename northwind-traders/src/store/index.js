import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let nextNotificationId = 0

import supplier from './supplier'

export default new Vuex.Store({
  modules: { supplier },
  state: {
    release: {
      build: '1.0.0',
      environment: 'Development'
    },
    healthChecks: [
      { title: 'SMTP check', passed: true },
      { title: 'Database check', passed: true }
    ],
    notifications: []
  },
  getters: {
    failedHealthCheckCount: state => {
      return state.healthChecks.filter(hc => !hc.passed).length
    },
    notificationCount: state => {
      return state.notifications.length;
    }
  },
  mutations: {
    SET_STATE(state, payload) {
      let keys = Object.keys(state)
      keys.forEach(key => {
        state[key] = payload[key]
      })
    },
    raiseNotification(state, payload) {
      state.notifications.push({
        id: nextNotificationId++,
        context: payload.context,
        message: payload.message
      })
    },
    dismissNotification(state, payload) {
      state.notifications = state.notifications.filter(n => n.id !== payload)
    }
  },
  actions: {
    ReadInitialStateFromLocalStorage({ commit }) {
      let state = localStorage.getItem('state')
      if (state) commit('SET_STATE', JSON.parse(state))
    },
    StoreInLocalStorage({ state }) {
      localStorage.setItem('state', JSON.stringify(state))
    },
    raiseSuccessNotification({ commit }, payload) {
      commit('raiseNotification', {
        context: 'success',
        message: payload
      })
    },
    raiseErrorNotification({ commit }, payload) {
      commit('raiseNotification', {
        context: 'danger',
        message: payload
      })
    }
  }
})
