export default {
  state: {
    visibleItems: [],
    activeItem: {},
    totalItems: 0
  },
  getters: {
    visibleItems: (state) => state.visibleItems.length ? state.visibleItems : false,
    activeItem: (state) => Object.keys(state.activeItem).length ? state.activeItem : false,
    totalItems: (state) => state.totalItems
  },
  actions: {
    getItems ({ commit }) {
      const items = []
      commit('SET_VISIBLE_ITEMS', items)
      commit('SET_TOTAL_ITEMS', 100)
    },
    getItem ({ commit }, id) {
      const item = {}
      commit('SET_ACTIVE_ITEM', item)
    },
    addItem ({ commit }, item = {}) {
      commit('ADD_ITEM', item)
      commit('SET_ACTIVE_ITEM', item)
    },
    updateItem ({ commit }, { id, item }) {
      if (!id) return
      commit('UPDATE_ITEM', { id, item })
      commit('SET_ACTIVE_ITEM', item)
    },
    deleteItem ({ commit }, id) {
      if (!id) return
      commit('DELETE_ITEM', id)
    }
  },
  mutations: {
    SET_VISIBLE_ITEMS (state, items = []) {
      state.visibleItems = items
    },
    SET_ACTIVE_ITEM (state, item = {}) {
      state.activeItem = item
    },
    SET_TOTAL_ITEMS (state, totalItems = 0) {
      state.totalItems = totalItems
    },
    ADD_ITEM (state, item = {}) {
      state.visibleItems.unshift(item)
    },
    UPDATE_ITEM (state, { id, item }) {
      const itemIndex = state.visibleItems.findIndex(item => item.id === id)
      if (itemIndex >= 0) state.visibleItems[itemIndex] = item
    },
    DELETE_ITEM (state, id) {
      const itemIndex = state.visibleItems.findIndex(item => item.id === id)
      if (itemIndex >= 0) state.visibleItems.splice(itemIndex, 1)
    }
  }
}
