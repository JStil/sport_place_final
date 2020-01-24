<template>
    <main role="main" class=" inner cover cover-container-back login-container">
        <div><h1 class="cover-heading text-center">Вход</h1></div>
        <div class="row">
            <div class="col-md-12">
                <b-form @submit="loginSubmit">
                    <b-alert variant="danger" :show="errors.length > 0">
                        <p>{{errors[0]}}</p>
                    </b-alert>
                    <b-form-group>
                        <label v-bind:for="form.email">Email:</label>
                        <b-form-input v-model="form.email" type="email" required/>
                    </b-form-group>
                    <b-form-group>
                        <label v-bind:for="form.password">Пароль:</label>
                        <b-form-input v-model="form.password" type="password" required/>
                    </b-form-group>
                    <div class="text-center">
                        <b-button type="submit" variant="primary" :disabled="isLoading">
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"
                          v-if="isLoading"></span>
                            Войти
                        </b-button>
                        или
                        <router-link :to="{name: 'AuthSignup'}" v-slot="{ href, route, navigate, isActive, isExactActive }">
                            <a class="login-signup-link" :class="[isExactActive && ' active']" :href="href" @click="navigate">зарегистрироваться?</a>
                        </router-link>
                    </div>
                </b-form>
            </div>
        </div>
    </main>
</template>

<script>
    import {mapGetters} from 'vuex'
    import toastr from "toastr";

    import {api} from '../../api'

    export default {
        computed: {
            ...mapGetters({
                errors: 'user/errors',
                isLoading: 'user/isLoading',
                item: 'user/item'
            })
        },
        data() {
            return {
                title: this.$route.meta.title,
                form: {
                    username: null,
                    password: null
                }
            }
        },
        created() {
            this.load()
        },
        methods: {
            load() {
                this.$store.dispatch('user/clearErrors')
                this.$store.dispatch('user/clearTokens')
            },
            async loginSubmit(e) {
                e.preventDefault()
                const result = await this.$store.dispatch('user/login', {data: this.form})
                if (result) {
                    console.log('token: ' + this.item.access_token);
                    await localStorage.setItem("token", this.item.access_token);
                    api.defaults.headers.common['Authorization'] = 'Bearer ' + this.item.access_token;
                    this.$router.push({name: 'Index'})
                }
            }
        }
    }
</script>
