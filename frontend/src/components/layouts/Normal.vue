<template>
    <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <header class="masthead mb-auto cover-container-back">
            <div class="inner">
                <h3 class="masthead-brand">SportPlaceGid</h3>
                <nav class="nav nav-masthead justify-content-center">
                    <router-link :to="{name: 'Index'}" v-slot="{ href, route, navigate, isActive, isExactActive }">
                        <a class="nav-link" :class="[isExactActive && ' active']" :href="href" @click="navigate">Главная</a>
                    </router-link>
                    <router-link :to="{name: 'PlaceIndex'}" v-slot="{ href, route, navigate, isActive, isExactActive }">
                        <a class="nav-link" :class="[isExactActive && ' active']" :href="href" @click="navigate">Список мест списком</a>
                    </router-link>
                    <router-link :to="{name: 'AuthLogin'}" v-slot="{ href, route, navigate, isActive, isExactActive }">
                        <a class="nav-link" :class="[isExactActive && ' active']" :href="href" @click="navigate">Войти</a>
                    </router-link>
                </nav>
            </div>
        </header>
        <router-view></router-view>
        <footer class="mastfoot mt-auto cover-container-back">
            <div class="inner">
                <div class="float-left">Все права защищены.</div>
                <div class="float-right">(c) SportPlaceGid 2019</div>
            </div>
        </footer>
    </div>

</template>


<script>
    import {api} from "../../api";

    export default {
        data() {
            return {}
        },
        created() {
            document.title = this.$route.meta.title
        },
        watch: {
            '$route'(to, from) {
                document.title = to.meta.title
            }
        },
        mounted() {
            let recaptchaScript = document.createElement('script')
            recaptchaScript.setAttribute('src', '/js/VueBootstrapTypeahead.umd.min.js')
            document.head.appendChild(recaptchaScript)
        },
        methods: {
            logoutClick(e) {
                e.preventDefault()
                localStorage.removeItem('token')
                api.defaults.headers.common['Authorization'] = null;
                this.$router.push({name: 'AuthIndex'})
            }
        },
    }
</script>

