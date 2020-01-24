import axios from 'axios'
import {api} from './api'

let baseUrl = 'http://localhost:8081'


const apiImage = axios.create({
    baseURL: baseUrl
});
if (api.defaults.headers.access_token) {
    apiImage.defaults.headers.common['Authorization'] = 'Bearer ' + api.defaults.headers.access_token;
}

apiImage.interceptors.response.use(response => {
    return response
}, error => {
    if (error.response.status === 401) {
        localStorage.removeItem("token");
        delete error.response.config.headers['Authorization'];
        console.log('Авторизация вылетела')
    }
    return Promise.reject(error);
});

export {apiImage};