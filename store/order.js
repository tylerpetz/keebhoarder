import { queryStringify } from '@/utils/methods.js'
import pick from 'lodash/pick'

export default {
  namespaced: true,
  state() {
    return {
      loading: false,
      orders: [],
      currentOrder: {},
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
    currentOrder: (state) =>
      Object.keys(state.currentOrder).length ? state.currentOrder : null,
    orders: (state) => state.orders,
    loading: (state) => state.loading,
    pagination: (state) => queryStringify(state.pagination),
    sorts: (state) =>
      Object.keys(state.sorts).length
        ? `&sortBy=${state.sorts.field}:${state.sorts.type}`
        : '',
    totalResults: (state) => state.meta.totalResults,
  },
  actions: {
    getOrders({ commit, getters }) {
      this.$axios
        .get(`/orders?${getters.pagination}${getters.sorts}`)
        .then(({ data }) => {
          commit('SET_ORDERS', data.results)
          commit('SET_ORDER_PAGINATION', pick(data, ['limit', 'page']))
          commit('SET_ORDER_META', pick(data, ['totalPages', 'totalResults']))
        })
    },
    getOrderById({ commit }, orderId) {
      this.$axios.get(`/orders/${orderId}`).then(({ data }) => {
        commit('SET_CURRENT_ORDER', data)
      })
    },
    createOrder({ dispatch }, order) {
      this.$axios.post('/orders', order).then(() => {
        dispatch('getOrders')
      })
    },
    updateOrder({ commit, dispatch }, { order, updateCurrent = false }) {
      const updatedOrder = { ...order }
      delete updatedOrder.user
      delete updatedOrder.id
      delete updatedOrder.items
      delete updatedOrder.vgt_id
      delete updatedOrder.originalIndex
      delete updatedOrder.createdAt
      delete updatedOrder.updatedAt
      this.$axios
        .patch(`/orders/${order.id}`, updatedOrder)
        .then(({ data }) => {
          if (updateCurrent) {
            commit('SET_CURRENT_ORDER', data)
          }
          dispatch('getOrders')
        })
    },
    deleteOrder({ dispatch }, orderId) {
      this.$axios.delete(`/orders/${orderId}`).then(() => {
        dispatch('getOrders')
      })
    },
    // table options
    onPagingChange({ commit, dispatch }, params) {
      const modifiedParams = {
        ...(params.currentPage && { page: params.currentPage }),
        ...(params.currentPerPage && { limit: params.currentPerPage }),
      }
      commit('SET_ORDER_PAGINATION', modifiedParams)
      dispatch('getOrders')
    },
    onSortChange({ commit, dispatch }, params) {
      commit('SET_ORDER_SORTS', params[0])
      dispatch('getOrders')
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
    SET_ORDERS(state, results) {
      state.orders = [...results]
    },
    SET_CURRENT_ORDER(state, order) {
      state.currentOrder = { ...order }
    },
    SET_ORDER_PAGINATION(state, pagination) {
      state.pagination = { ...pagination }
    },
    SET_ORDER_META(state, meta) {
      state.meta = { ...meta }
    },
    SET_ORDER_SORTS(state, sorts) {
      if (sorts.type === 'none') {
        state.sorts = {}
      } else {
        state.sorts = { ...sorts }
      }
    },
  },
}
