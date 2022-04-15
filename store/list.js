import { cleanTableObject, queryStringify } from '@/utils/methods.js'

export default {
  namespaced: true,
  state() {
    return {
      loading: false,
      lists: [],
      currentList: {},
      pagination: {
        limit: 5, // vgt-table perPage
        page: 1, // vgt-table currentPage
      },
      sorts: {
        field: 'id',
        type: 'desc',
      },
      total: null,
    }
  },
  getters: {
    currentList: (state) =>
      Object.keys(state.currentList).length ? state.currentList : null,
    lists: (state) => state.lists,
    loading: (state) => state.loading,
    totalResults: (state) => state.total,
    pagination: (state) => queryStringify(state.pagination),
  },
  actions: {
    async getLists({ commit, getters, state }) {
      //   .order(state.sorts.field, {
      //     ascending: state.sorts.type === 'asc',
      //   })
      commit('SET_LOADING', true)
      const { lists, count } = await this.$axios.$get(
        `/lists?${getters.pagination}`
      )
      commit('SET_LISTS', lists)
      commit('SET_LIST_TOTAL', count)
      commit('SET_LOADING', false)
    },
    getListsForDropdown() {
      return this.$axios.$get('/lists')
    },
    async getListById({ commit }, listId) {
      const list = await this.$axios.$get(`/lists/${listId}`)
      commit('SET_CURRENT_LIST', list)
    },
    async createList({ dispatch }, list) {
      await this.$axios.$post('/lists', list)
      dispatch('getLists')
    },
    async updateList({ commit, dispatch }, { list, updateCurrent = false }) {
      const listToUpdate = cleanTableObject(list)
      delete listToUpdate.items
      // handle list add/update/delete

      const updatedList = await this.$axios.$put(
        `/lists/${list.id}`,
        listToUpdate
      )
      if (updateCurrent) {
        commit('SET_CURRENT_LIST', updatedList)
      } else {
        dispatch('getLists')
      }
    },
    async deleteList({ dispatch }, listId) {
      await this.$axios.$delete(`/lists/${listId}`)
      dispatch('getLists')
    },
    // table options
    onPagingChange({ commit, dispatch }, params) {
      const modifiedParams = {
        ...(params.currentPage && { page: params.currentPage }),
        ...(params.currentPerPage && { limit: params.currentPerPage }),
      }
      commit('SET_LIST_PAGINATION', modifiedParams)
      dispatch('getLists')
    },
    onSortChange({ commit, dispatch }, params) {
      commit('SET_LIST_SORTS', params[0])
      dispatch('getLists')
    },
    onSearch({ state }, params) {
      // name={query} - only works for exact match on 1 field
      // console.log(params)
    },
  },
  mutations: {
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    SET_LISTS(state, results) {
      state.lists = [...results]
    },
    SET_CURRENT_LIST(state, list) {
      state.currentList = { ...list }
    },
    SET_LIST_TOTAL(state, total) {
      state.total = total
    },
    SET_LIST_PAGINATION(state, pagination) {
      state.pagination = { ...pagination }
    },
    SET_LIST_SORTS(state, sorts) {
      if (sorts.type === 'none') {
        state.sorts = {
          field: 'id',
          type: 'desc',
        }
      } else {
        state.sorts = { ...sorts }
      }
    },
  },
}
