import { vuexfireMutations } from 'vuexfire'
import firebase from '@/plugins/firebase'

const db = firebase.firestore()

export const state = () => {
  return {
    loading: true,
    user: null
  }
}

export const mutations = {
  ...vuexfireMutations,
  setUser(state, user) {
    state.user = user
    state.loading = false
  }
}

export const actions = {
  setUser({ commit }, payload) {
    const user = {
      uid: payload.uid,
      email: payload.email,
      photoURL: payload.photoURL
    }
    commit('setUser', user)
  },
  unsetUser({ commit }) {
    commit('setUser', null)
  },
  updateUserMessagingToken(_, payload) {
    const ref = db.collection('users').doc(payload.userId)
    ref.update({ messagingToken: payload.messagingToken })
  }
}

export const getters = {
  authenticated(state) {
    return state.user !== null
  },
  user(state) {
    return state.user
  },
  loading(state) {
    return state.loading
  }
}
