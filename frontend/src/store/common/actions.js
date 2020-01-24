import { api } from '../../api'
import * as types from './mutation-types'

export default {
  async fetchAll ({ commit, getters }, filter) {
    commit(types.LOADING_START)
    try {
      let entpoint = getters.apiEndpoint
      if (typeof entpoint !== 'string') {
        entpoint = entpoint()
      }
      const response = await api.get(entpoint, { params: filter || {} })
      commit(types.FETCHING_ITEMS_SUCCESS, response.data)
      commit(types.FETCHING_PAGINATION_SUCCESS, {
        totalCount: response.headers['x-total-count'] || null,
        pageCount: response.headers['x-page-count'] || null
      })
      commit(types.LOADING_SUCCESS)
      return true
    } catch (error) {
      commit(types.LOADING_FAILURE, [error.response.statusText + ' (' + error.response.status + ')'])
      return false
    }
  },

  async fetchOne ({ commit, getters }, id) {
    commit(types.LOADING_START)
    try {
      let entpoint = getters.apiEndpoint
      if (typeof entpoint !== 'string') {
        entpoint = entpoint()
      }
      const { data } = await api.get(entpoint + '/' + id)
      commit(types.FETCHING_ITEM_SUCCESS, data)
      // commit(types.FETCHING_META_SUCCESS, data.meta)
      commit(types.LOADING_SUCCESS)
      return true
    } catch (error) {
      commit(types.LOADING_FAILURE, [error.response.statusText + ' (' + error.response.status + ')'])
      return false
    }
  },

  async fetchCreateMeta ({ commit, getters }) {
    commit(types.LOADING_START)
    try {
      const { data } = await api.get(getters.apiEndpoint + '/create/meta')
      commit(types.FETCHING_META_SUCCESS, data.meta)
      commit(types.LOADING_SUCCESS)
      return true
    } catch (error) {
      commit(types.LOADING_FAILURE, [error.response.statusText + ' (' + error.response.status + ')'])
      return false
    }
  },

  async create ({ commit, getters }, data) {
    commit(types.LOADING_START)
    try {
      let entpoint = getters.apiEndpoint
      if (typeof entpoint !== 'string') {
        entpoint = entpoint()
      }
      const result = await api.post(entpoint, data, {
        onUploadProgress: function (progressEvent) {
          commit(types.LOADING_PROGRESS, progressEvent.loaded / progressEvent.total * 100)
        },
      })
      commit(types.CREATING_ITEM_SUCCESS, result.data)
      commit(types.LOADING_SUCCESS)
      return true
    } catch (error) {
      // console.log(error.status)
      // if (!(error.status && error.response)) {
      //   commit(types.LOADING_FAILURE, ['Ошибка сети, возможно пропал доступ к Интернет.']);
      //   return false;
      // }
      const response = error.response
      if (response.status === 400) {
        commit(types.LOADING_FAILURE, response.data.errors)
      } else {
        commit(types.LOADING_FAILURE, [response.statusText + ' (' + response.status + ')'])
      }
      return false
    }
  },

  async update ({ commit, getters }, { id, data }) {
    commit(types.LOADING_START)
    try {
      let entpoint = getters.apiEndpoint
      if (typeof entpoint !== 'string') {
        entpoint = entpoint()
      }
      await api.patch(entpoint + '/' + id, data)
      commit(types.UPDATING_ITEM_SUCCESS)
      commit(types.LOADING_SUCCESS)
      return true
    } catch (error) {
      const response = error.response
      if (response.status === 400) {
        commit(types.LOADING_FAILURE, response.data.errors)
      } else {
        commit(types.LOADING_FAILURE, [response.statusText + ' (' + response.status + ')'])
      }
      return false
    }
  },

  async delete ({ commit, getters }, id) {
    commit(types.LOADING_START)
    try {
      let entpoint = getters.apiEndpoint
      if (typeof entpoint !== 'string') {
        entpoint = entpoint()
      }
      await api.delete(entpoint + '/' + id)
      commit(types.DELETING_ITEM_SUCCESS)
      return true
    } catch (error) {
      const response = error.response
      if (response.status === 400) {
        commit(types.LOADING_FAILURE, response.data.errors)
      } else {
        commit(types.LOADING_FAILURE, [response.statusText + ' (' + response.status + ')'])
      }
      return false
    }
  },

  clear ({ commit }) {
    commit(types.CLEAR)
  },
  clearErrors ({ commit }) {
    commit(types.CLEAR_ERROR)
  }
}
