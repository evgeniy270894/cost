import vue from '../../main'
// import usersData from '../../../server/data/usersData'
import api from '../../services/Api'

const currentUserState = {
  namespaced: true,
  state: {
    token: '',
    cards: [],
    loading: false
  },
  // element [0] is local state
  // element [1] is local getters
  // element [2] is global state
  // element [3] is global getters
  getters: {
    getUsername: (state, getters) => {
      if (getters.isExists) {
        return vue.$HotUtils.parseJwt(state.token).name
      }
    },
    getLogin: (state, getters) => {
      if (getters.isExists) {
        return vue.$HotUtils.parseJwt(state.token).login
      }
    },
    getRole: (state, getters) => {
      if (getters.isExists) {
        return vue.$HotUtils.parseJwt(state.token).role
      }
    },
    isAdmin: (state, getters) => {
      return getters.getRole === 'admin'
    },
    isExists: (state, getters) => {
      return !!state.token
    },
    getCurrentUserCards: (...state) => {
      return state[0].cards
    },
    getCardsByType: (...state) => type => {
      return state[1].getCurrentUserCards.filter(item => item.type === type)
    },
    getCardById: (...state) => id => {
      return state[1].getCurrentUserCards.filter(item => item.id === id)[0]
    },
    getLoading: (...state) => {
      return state[0].loading
    }
  },
  actions: {
    login: function ({ commit, state, getters }, payload) {
      return new Promise((resolve, reject) => {
        commit('setLoading', {data: true})
        api().post('/login', {
          login: payload.login
        })
          .then((res) => {
            commit('setUsername', res.data)
            resolve()
          })
          .catch((error) => {
            console.log(error)
            reject(error)
          })
          .finally(() => commit('setLoading', {data: false}))
      })
    },
    getCards: function ({ commit, state, getters }, payload) {
      return new Promise((resolve, reject) => {
        commit('setLoading', {data: true})
        setTimeout(() => {
          api().get(`/getCards?login=${payload.login}`)
            .then(res => {
              commit('setCards', res.data)
              resolve()
            })
            .catch((error) => {
              reject(error)
            })
            .finally(() => commit('setLoading', {data: false}))
        }, 500)
      })
    },
    logout: function ({ commit, state }, payload) {
      commit('setUsername', '')
      commit('setCards', {data: []})
    }
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload.data
    },
    setUsername (state, payload) {
      state.token = payload.data
    },
    setCards (state, payload) {
      state.cards = payload.data
    },
    addCard (state, payload) {
      state.cards = state.cards.concat(payload)
    },
    editCard (state, payload) {
      state.cards = state.cards.map(item => item.id === payload.id
        ? {
          ...item,
          money: payload.money,
          desc: payload.desc,
          type: payload.type
        }
        : item
      )
    },
    deleteCard (state, payload) {
      state.cards = state.cards.filter(item => item.id !== payload.id)
    }
  }
}

export default currentUserState
