import Vue from 'vue'
import Router from 'vue-router'
import NormalLayout from './components/layouts/Normal'
import EmptyLayout from './components/layouts/EmptyLayout'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            component: NormalLayout,
            meta: {
                title: "Главная",
            },
            children: [
                {
                    path: '',
                    name: 'Index',
                    component: () => import('./views/Index.vue'),
                    meta: {
                        title: "Главная",
                    }
                },
            ]
        },
        {
            path: '/auth/',
            component: NormalLayout,
            children: [
                {
                    path: 'login',
                    name: 'AuthLogin',
                    component: () => import('./views/auth/Login.vue'),
                    meta: {
                        title: "Войти",
                    }
                },
                {
                    path: 'signup',
                    name: 'AuthSignup',
                    component: () => import('./views/auth/Signup.vue'),
                    meta: {
                        title: "Регистрация",
                    }
                },
            ]
        },
        {
            path: '/place/',
            component: NormalLayout,
            children: [
                {
                    path: '',
                    name: 'PlaceIndex',
                    component: () => import('./views/place/Index.vue'),
                    meta: {
                        title: "Список мест",
                    }
                },
                {
                    path: 'create',
                    name: 'PlaceCreate',
                    component: () => import('./views/place/Create.vue'),
                    meta: {
                        title: "Добавление места",
                    }
                },
                {
                    path: ':id',
                    name: 'PlaceView',
                    component: () => import('./views/place/View.vue'),
                    meta: {
                        title: "Просмотр места",
                    }
                },
            ]
        },
    ]
})
