import Vue from 'vue'
import { queryStringify, pick } from '@/utils/methods.js'

export default {
  namespaced: true,
  state () {
    return {
      loading: false,
      lists: [],
      currentList: {},
      pagination: {
        limit: 5, // vgt-table perPage
        page: 1 // vgt-table currentPage
      },
      sorts: {},
      meta: {
        totalResults: 0, // vgt-table totalRows
        totalPages: 0
      }
    }
  },
  getters: {
    currentList: state => Object.keys(state.currentList).length ? state.currentList : null,
    lists: state => state.lists,
    loading: state => state.loading,
    pagination: state => queryStringify(state.pagination),
    sorts: state => Object.keys(state.sorts).length ? `&sortBy=${state.sorts.field}:${state.sorts.type}` : '',
    totalResults: state => state.meta.totalResults
  },
  actions: {
    getLists ({ commit, getters }) {
      Vue.axios.get(`/lists?${getters.pagination}${getters.sorts}`).then(({ data }) => {
        commit('SET_LISTS', data.results)
        commit('SET_LIST_PAGINATION', pick(data, ['limit', 'page']))
        commit('SET_LIST_META', pick(data, ['totalPages', 'totalResults']))
      })
    },
    getListById ({ commit }, listId) {
      Vue.axios.get(`/lists/${listId}`).then(({ data }) => {
        commit('SET_CURRENT_LIST', data)
      })
    },
    createList ({ dispatch }, list) {
      Vue.axios.post('/lists', list).then(() => {
        dispatch('getLists')
      })
    },
    updateList ({ commit, dispatch }, { list, updateCurrent = false }) {
      const updatedList = { ...list }
      delete updatedList.user
      delete updatedList.id
      delete updatedList.items
      delete updatedList.vgt_id
      delete updatedList.originalIndex
      delete updatedList.createdAt
      delete updatedList.updatedAt
      Vue.axios.patch(`/lists/${list.id}`, updatedList).then(({ data }) => {
        if (updateCurrent) {
          commit('SET_CURRENT_LIST', data)
        }
        dispatch('getLists')
      })
    },
    deleteList ({ dispatch }, listId) {
      Vue.axios.delete(`/lists/${listId}`).then(() => {
        dispatch('getLists')
      })
    },
    // table options
    onPagingChange ({ commit, dispatch }, params) {
      const modifiedParams = {
        ...params.currentPage && { page: params.currentPage },
        ...params.currentPerPage && { limit: params.currentPerPage }
      }
      commit('SET_LIST_PAGINATION', modifiedParams)
      dispatch('getLists')
    },
    onSortChange ({ commit, dispatch }, params) {
      commit('SET_LIST_SORTS', params[0])
      dispatch('getLists')
    },
    onSearch ({ state }, params) {
      // name={query} - only works for exact match on 1 field
      // console.log(params)
    }
  },
  mutations: {
    SET_LOADING (state, loading) {
      state.loading = loading
    },
    SET_LISTS (state, results) {
      state.lists = [...results]
    },
    SET_CURRENT_LIST (state, list) {
      state.currentList = { ...list }
    },
    SET_LIST_PAGINATION (state, pagination) {
      state.pagination = { ...pagination }
    },
    SET_LIST_META (state, meta) {
      state.meta = { ...meta }
    },
    SET_LIST_SORTS (state, sorts) {
      if (sorts.type === 'none') {
        state.sorts = {}
      } else {
        state.sorts = { ...sorts }
      }
    }
  }
}
