import createModule from './../create-module'
import * as types from '../common/mutation-types'
import {apiImage} from '../../apiImage'

const state = {}

const getters = {
    apiEndpoint() {
        return 'api/files'
    }
}

const actions = {
    async upload({commit, getters}, data) {
        commit(types.LOADING_START)
        try {
            let endpoint = getters.apiEndpoint + '/upload';
            const response = await apiImage.post(endpoint, data, {
                'headers': {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            console.log(response.data);
            commit(types.FETCHING_ITEM_SUCCESS, response.data)
            commit(types.LOADING_SUCCESS)
            return true
        } catch (error) {
            console.log(error);
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
