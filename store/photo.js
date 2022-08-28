import { cleanTableObject, queryStringify } from '@/utils/methods.js'

export default {
  namespaced: true,
  state() {
    return {
      loading: false,
      photos: [],
      currentPhoto: {},
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
    currentPhoto: (state) =>
      Object.keys(state.currentPhoto).length ? state.currentPhoto : null,
    photos: (state) => state.photos,
    loading: (state) => state.loading,
    totalResults: (state) => state.total,
    pagination: (state) => queryStringify(state.pagination),
  },
  actions: {
    async getPhotos({ commit, getters, state }) {
      commit('SET_LOADING', true)

      const { photos, count } = await this.$axios.$get(
        `/photos?${getters.pagination}`
      )
      commit('SET_PHOTOS', photos)
      commit('SET_PHOTO_TOTAL', count)
      commit('SET_LOADING', false)
    },
    async getPhotoById({ commit }, photoId) {
      const photo = await this.$axios.$get(`/photos/${photoId}`)
      commit('SET_CURRENT_PHOTO', photo)
    },
    async createPhoto({ dispatch }, { photo, lists = [] }) {
      await this.$axios.$post('/photos', {
        ...photo,
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
        dispatch('getPhotos')
      }
    },
    // async addPhotoToList(ctx, { photoId, listId }) {
    //   await this.$supabase.from('list_photo').insert([
    //     {
    //       photo_id: photoId,
    //       list_id: listId,
    //     },
    //   ])
    // },
    // async deletePhotoFromList(ctx, { photoId, listId }) {
    //   await this.$supabase
    //     .from('list_photo')
    //     .delete()
    //     .match({ photo_id: photoId, list_id: listId })
    // },
    async updatePhoto({ commit, dispatch }, { photo, updateCurrent = false }) {
      const photoToUpdate = cleanTableObject(photo)
      delete photoToUpdate.lists
      // handle list add/update/delete

      const updatedPhoto = await this.$axios.$put(
        `/photos/${photo.id}`,
        photoToUpdate
      )
      if (updateCurrent) {
        commit('SET_CURRENT_PHOTO', updatedPhoto)
      } else {
        dispatch('getPhotos')
      }
    },
    async deletePhoto({ dispatch }, photoId) {
      await this.$axios.$delete(`/photos/${photoId}`)
      dispatch('getPhotos')
    },
    // table options
    onPagingChange({ state, commit, dispatch }, params) {
      commit('SET_PHOTO_PAGINATION', {
        limit: params.currentPerPage,
        page:
          params.currentPerPage !== state.pagination.limit
            ? 1
            : params.currentPage,
      })
      dispatch('getPhotos')
    },
    onSortChange({ commit, dispatch }, params) {
      commit('SET_PHOTO_SORTS', params[0])
      dispatch('getPhotos')
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
    SET_PHOTOS(state, results) {
      state.photos = [...results]
    },
    SET_CURRENT_PHOTO(state, photo) {
      state.currentPhoto = { ...photo }
    },
    SET_PHOTO_TOTAL(state, total) {
      state.total = total
    },
    SET_PHOTO_PAGINATION(state, pagination) {
      state.pagination = { ...pagination }
    },
    SET_PHOTO_SORTS(state, sorts) {
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
