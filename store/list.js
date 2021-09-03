import { cleanTableObject } from '@/utils/methods.js'

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
    rangeStart: (state) => (state.pagination.page - 1) * state.pagination.limit,
    rangeEnd: (state) => state.pagination.page * state.pagination.limit - 1,
  },
  actions: {
    async getLists({ commit, getters, state }) {
      const { data: lists, count } = await this.$supabase
        .from('lists')
        .select(
          `
          *,
          items (
            id,
            lists:list_item(list_id)
          )
        `,
          { count: 'exact' }
        )
        .order(state.sorts.field, {
          ascending: state.sorts.type === 'asc',
        })
        .range(getters.rangeStart, getters.rangeEnd)

      commit('SET_LISTS', lists)
      commit('SET_LIST_TOTAL', count)
    },
    async getListsForDropdown() {
      const { data: lists } = await this.$supabase.from('lists').select(
        `
          id,
          name
        `
      )

      return lists
    },
    async getListById({ commit }, listId) {
      const { data: lists } = await this.$supabase
        .from('lists')
        .select(
          `
          *,
          items (
            *,
            lists:list_item(list_id)
          )
        `,
          { count: 'exact' }
        )
        .eq('id', listId)

      commit('SET_CURRENT_LIST', lists[0])
    },
    async createList({ dispatch, rootGetters }, list) {
      const listToCreate = {
        ...list,
        user: rootGetters['auth/currentUser'].id,
      }
      await this.$supabase.from('lists').insert([listToCreate])
      dispatch('getLists')
    },
    async updateList({ commit, dispatch }, { list, updateCurrent = false }) {
      const listToUpdate = cleanTableObject(list)

      const { data } = await this.$supabase
        .from('lists')
        .update(listToUpdate)
        .eq('id', list.id)
      if (updateCurrent) {
        commit('SET_CURRENT_LIST', data)
      } else {
        dispatch('getLists')
      }
    },
    async deleteList({ dispatch }, listId) {
      // handle pivot table
      await this.$supabase.from('lists').delete().eq('id', listId)
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
