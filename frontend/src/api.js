import axios from 'axios'

let baseUrl = 'http://localhost:8081'

let headers = {
    'Content-Type': 'application/json'
};

if (localStorage.token) {
    headers = {
        Authorization: 'Bearer ' + localStorage.token
    }
}


const api = axios.create({
    baseURL: baseUrl,
    headers: headers
});

api.interceptors.response.use(response => {
    return response
}, error => {
    if (error.response.status === 401) {
        localStorage.removeItem("token");
        delete error.response.config.headers['Authorization'];
        console.log('Авторизация вылетела')
    }
    return Promise.reject(error);
});

export {api};