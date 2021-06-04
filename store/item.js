import { queryStringify, removeEmpty } from '@/utils/methods.js'
import pick from 'lodash/pick'

export default {
  namespaced: true,
  state() {
    return {
      loading: false,
      items: [],
      currentItem: {},
      pagination: {
        limit: 5, // vgt-table perPage
        page: 1, // vgt-table currentPage
      },
      sorts: {},
      meta: {
        totalResults: 0, // vgt-table totalRows
        totalPages: 0,
      },
    }
  },
  getters: {
    currentItem: (state) =>
      Object.keys(state.currentItem).length ? state.currentItem : null,
    items: (state) => state.items,
    loading: (state) => state.loading,
    pagination: (state) => queryStringify(state.pagination),
    sorts: (state) =>
      Object.keys(state.sorts).length
        ? `&sortBy=${state.sorts.field}:${state.sorts.type}`
        : '',
    totalResults: (state) => state.meta.totalResults,
  },
  actions: {
    getItems({ commit, getters }) {
      this.$axios
        .get(`/items?${getters.pagination}${getters.sorts}`)
        .then(({ data }) => {
          commit('SET_ITEMS', data.results)
          commit('SET_ITEM_PAGINATION', pick(data, ['limit', 'page']))
          commit('SET_ITEM_META', pick(data, ['totalPages', 'totalResults']))
        })
    },
    getItemById({ commit }, itemId) {
      this.$axios.get(`/items/${itemId}`).then(({ data }) => {
        commit('SET_CURRENT_ITEM', data)
      })
    },
    createItem({ dispatch }, item) {
      this.$axios.post('/items', removeEmpty(item)).then(() => {
        dispatch('getItems')
      })
    },
    updateItem({ commit, dispatch }, { item, updateCurrent = false }) {
      const updatedItem = { ...item }
      delete updatedItem.user
      delete updatedItem.id
      delete updatedItem.vgt_id
      delete updatedItem.originalIndex
      delete updatedItem.createdAt
      delete updatedItem.updatedAt
      this.$axios
        .patch(`/items/${item.id}`, removeEmpty(updatedItem))
        .then(({ data }) => {
          if (updateCurrent) {
            commit('SET_CURRENT_ITEM', data)
          }
          dispatch('getItems')
        })
    },
    deleteItem({ dispatch }, itemId) {
      this.$axios.delete(`/items/${itemId}`).then(() => {
        dispatch('getItems')
      })
    },
    // table options
    onPagingChange({ commit, dispatch }, params) {
      const modifiedParams = {
        ...(params.currentPage && { page: params.currentPage }),
        ...(params.currentPerPage && { limit: params.currentPerPage }),
      }
      commit('SET_ITEM_PAGINATION', modifiedParams)
      dispatch('getItems')
    },
    onSortChange({ commit, dispatch }, params) {
      commit('SET_ITEM_SORTS', params[0])
      dispatch('getItems')
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
    SET_ITEMS(state, results) {
      state.items = [...results]
    },
    SET_CURRENT_ITEM(state, item) {
      state.currentItem = { ...item }
    },
    SET_ITEM_PAGINATION(state, pagination) {
      state.pagination = { ...pagination }
    },
    SET_ITEM_META(state, meta) {
      state.meta = { ...meta }
    },
    SET_ITEM_SORTS(state, sorts) {
      if (sorts.type === 'none') {
        state.sorts = {}
      } else {
        state.sorts = { ...sorts }
      }
    },
  },
}
