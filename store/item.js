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

      const { lists, count } = await this.$axios.$get(
        `/items?${getters.pagination}`
      )
      commit('SET_LISTS', lists)
      commit('SET_LIST_TOTAL', count)
      commit('SET_LOADING', false)
    },
    async getItemById({ commit }, itemId) {
      const item = await this.$axios.$get(`/items/${itemId}`)
      commit('SET_CURRENT_LIST', item)
    },
    async createItem({ dispatch, rootGetters }, { item, lists = [] }) {
      const itemToCreate = {
        ...item,
        user_id: rootGetters['auth/currentUser'].id,
      }
      const { data } = await this.$supabase.from('items').insert([itemToCreate])
      if (lists.length) {
        dispatch('addItemToList', {
          listId: lists[0],
          itemId: data[0].id,
        })
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

      await this.$supabase.from('items').update(itemToUpdate).eq('id', item.id)
      if (updateCurrent) {
        dispatch('getItemById', item.id)
      } else {
        dispatch('getItems')
      }
    },
    async deleteItem({ dispatch }, itemId) {
      // handle pivot table list_items
      await this.$supabase.from('items').delete().eq('id', itemId)
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
