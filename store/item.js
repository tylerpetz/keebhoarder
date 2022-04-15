import { cleanTableObject, queryStringify } from '@/utils/methods.js'

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
      sorts: {
        field: 'id',
        type: 'desc',
      },
      total: null,
    }
  },
  getters: {
    currentItem: (state) =>
      Object.keys(state.currentItem).length ? state.currentItem : null,
    items: (state) => state.items,
    loading: (state) => state.loading,
    totalResults: (state) => state.total,
    pagination: (state) => queryStringify(state.pagination),
  },
  actions: {
    async getItems({ commit, getters, state }) {
      commit('SET_LOADING', true)

      const { items, count } = await this.$axios.$get(
        `/items?${getters.pagination}`
      )
      commit('SET_ITEMS', items)
      commit('SET_ITEM_TOTAL', count)
      commit('SET_LOADING', false)
    },
    async getItemById({ commit }, itemId) {
      const item = await this.$axios.$get(`/items/${itemId}`)
      commit('SET_CURRENT_ITEM', item)
    },
    async createItem({ dispatch }, { item, lists = [] }) {
      await this.$axios.$post('/items', {
        ...item,
        ...(lists.length
          ? {
              list: {
                connect: { id: lists[0] },
              },
            }
          : {}),
      })
      if (lists.length) {
        dispatch('list/getListById', lists[0], { root: true })
      } else {
        dispatch('getItems')
      }
    },
    async addItemToList(ctx, { itemId, listId }) {
      await this.$supabase.from('list_item').insert([
        {
          item_id: itemId,
          list_id: listId,
        },
      ])
    },
    async deleteItemFromList(ctx, { itemId, listId }) {
      await this.$supabase
        .from('list_item')
        .delete()
        .match({ item_id: itemId, list_id: listId })
    },
    async updateItem({ commit, dispatch }, { item, updateCurrent = false }) {
      const itemToUpdate = cleanTableObject(item)
      delete itemToUpdate.lists
      // handle list add/update/delete

      const updatedItem = await this.$axios.$put(
        `/items/${item.id}`,
        itemToUpdate
      )
      if (updateCurrent) {
        commit('SET_CURRENT_ITEM', updatedItem)
      } else {
        dispatch('getItems')
      }
    },
    async deleteItem({ dispatch }, itemId) {
      await this.$axios.$delete(`/items/${itemId}`)
      dispatch('getItems')
    },
    // table options
    onPagingChange({ state, commit, dispatch }, params) {
      commit('SET_ITEM_PAGINATION', {
        limit: params.currentPerPage,
        page:
          params.currentPerPage !== state.pagination.limit
            ? 1
            : params.currentPage,
      })
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
    SET_ITEM_TOTAL(state, total) {
      state.total = total
    },
    SET_ITEM_PAGINATION(state, pagination) {
      state.pagination = { ...pagination }
    },
    SET_ITEM_SORTS(state, sorts) {
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
