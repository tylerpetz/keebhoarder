import Vue from 'vue'

export default {
  namespaced: true,
  state () {
    return {
      items: [],
      currentItem: {}
    }
  },
  getters: {
    items: state => state.items,
    currentItem: state => Object.keys(state.currentItem).length ? state.currentItem : null
  },
  actions: {
    getItems ({ commit }) {
      Vue.axios.get('http://localhost:3000/v1/items?limit=10&page=1').then(({ data }) => {
        commit('SET_ITEMS', data.results)
      })
    },
    getItemById ({ commit }, itemId) {
      Vue.axios.get(`http://localhost:3000/v1/items/${itemId}`).then(({ data }) => {
        commit('SET_CURRENT_ITEM', data)
      })
    },
    createItem ({ dispatch }, item) {
      Vue.axios.post('http://localhost:3000/v1/items', item).then(() => {
        dispatch('getItems')
      })
    },
    updateItem ({ commit, dispatch }, { item, updateCurrent = false }) {
      const updatedItem = { ...item }
      delete updatedItem.user
      delete updatedItem.id
      delete updatedItem.items
      Vue.axios.patch(`http://localhost:3000/v1/items/${item.id}`, updatedItem).then(({ data }) => {
        if (updateCurrent) {
          commit('SET_CURRENT_ITEM', data)
        }
        dispatch('getItems')
      })
    },
    deleteItem ({ dispatch }, itemId) {
      Vue.axios.delete(`http://localhost:3000/v1/items/${itemId}`).then(() => {
        dispatch('getItems')
      })
    }
  },
  mutations: {
    SET_ITEMS (state, results) {
      state.items = [...results]
    },
    SET_CURRENT_ITEM (state, item) {
      state.currentItem = { ...item }
    }
  }
}
