import Vue from 'vue'

export default {
  namespaced: true,
  state () {
    return {
      lists: [],
      currentList: null
    }
  },
  getters: {
    lists: state => state.lists,
    currentList: state => state.currentList
  },
  actions: {
    getLists ({ commit }) {
      Vue.axios.get('http://localhost:3000/v1/lists?limit=10&page=1').then(({ data }) => {
        commit('SET_LISTS', data.results)
      })
    },
    getListById ({ commit }, listId) {
      Vue.axios.get(`http://localhost:3000/v1/lists/${listId}`).then(({ data }) => {
        commit('SET_CURRENT_LIST', data)
      })
    },
    createList ({ dispatch }, list) {
      Vue.axios.post('http://localhost:3000/v1/lists', list).then(() => {
        dispatch('getLists')
      })
    },
    updateList ({ commit, dispatch }, { list, updateCurrent = false }) {
      console.log('updatecurrent', updateCurrent)
      const updatedList = { ...list }
      delete updatedList.user
      delete updatedList.id
      Vue.axios.patch(`http://localhost:3000/v1/lists/${list.id}`, updatedList).then(({ data }) => {
        if (updateCurrent) {
          commit('SET_CURRENT_LIST', data)
        }
        dispatch('getLists')
      })
    },
    deleteList ({ dispatch }, listId) {
      Vue.axios.delete(`http://localhost:3000/v1/lists/${listId}`).then(() => {
        dispatch('getLists')
      })
    }
  },
  mutations: {
    SET_LISTS (state, results) {
      state.lists = [...results]
    },
    SET_CURRENT_LIST (state, list) {
      state.currentList = { ...list }
    }
  }
}
