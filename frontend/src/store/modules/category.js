import createModule from './../create-module'
import * as types from '../common/mutation-types'
import {api} from '../../api'

const state = {}

const getters = {
    apiEndpoint() {
        return 'api/category'
    }
}

const actions = {
    async fetchAll({commit, getters}, filter) {
        commit(types.LOADING_START)
        try {
            let endpoint = getters.apiEndpoint + '/';
            const response = await api.get(endpoint, {params: filter || {}})
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
}

const mutations = {}

export default createModule({
    state,
    getters,
    actions,
    mutations
})
