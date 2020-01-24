import createModule from './../create-module'
import * as types from '../common/mutation-types'
import {api} from '../../api'

const state = {}

const getters = {
    apiEndpoint() {
        return 'api/user'
    }
}

const actions = {
    async clearTokens() {
        delete api.defaults.headers.common['Authorization'];
        localStorage.removeItem('token');
    },
    async login({commit, getters}, data) {
        commit(types.LOADING_START)
        try {
            const requestBody = {
                "client_id": "vuejs",
                "client_secret": "vuejssecret",
                "grant_type": "password",
                "username": data.data.email,
                "password": data.data.password
            };
            const result = await api.post('/oauth/token', requestBody)
            commit(types.CREATING_ITEM_SUCCESS, result.data)
            commit(types.LOADING_SUCCESS)
            return true
        } catch (error) {
            const response = error.response
            console.log(response);
            if (response.status === 400 || response.status === 401) {
                commit(types.LOADING_FAILURE, [response.data.error])
            } else {
                commit(types.LOADING_FAILURE, [response.statusText + ' (' + response.status + ')'])
            }
            return false
        }
    },
    async signup({commit, getters}, data) {
        commit(types.LOADING_START)
        try {
            const result = await api.post(getters.apiEndpoint + '/signup', data.data)
            commit(types.CREATING_ITEM_SUCCESS, result.data)
            commit(types.LOADING_SUCCESS)
            return true
        } catch (error) {
            const response = error.response
            if (response.status === 400) {
                commit(types.LOADING_FAILURE, response.data.errors.map(item => item.defaultMessage))
            } else if (response.status === 500) {
                commit(types.LOADING_FAILURE, [response.data.error])
            } else {
                commit(types.LOADING_FAILURE, [response.statusText + ' (' + response.status + ')'])
            }
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
