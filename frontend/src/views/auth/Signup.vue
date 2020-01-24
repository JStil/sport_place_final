<template>
    <main role="main" class=" inner cover cover-container-back login-container">
        <div><h1 class="cover-heading text-center">Регистрация</h1></div>
        <div class="row">
            <div class="col-md-12">
                <b-form @submit="signupSubmit">
                    <b-alert variant="danger" :show="errors.length > 0">
                        <ul>
                            <li v-for="(value, key) in errors" :key="'error-' + key">{{ value }}</li>
                        </ul>
                    </b-alert>
                    <b-form-group>
                        <label v-bind:for="form.email">Email:</label>
                        <b-form-input v-model="form.email" type="email" required/>
                    </b-form-group>
                    <b-form-group>
                        <label v-bind:for="form.name">Имя:</label>
                        <b-form-input v-model="form.name" type="text" required/>
                    </b-form-group>
                    <b-form-group>
                        <label v-bind:for="form.password">Пароль:</label>
                        <b-form-input v-model="form.password" type="password" required/>
                    </b-form-group>
                    <b-form-group>
                        <label v-bind:for="form.password_repeat">Подтверждение пароля:</label>
                        <b-form-input v-model="form.password_repeat" type="password" required/>
                    </b-form-group>

                    <div class="text-center">
                        <b-button type="submit" variant="primary" :disabled="isLoading">
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"
                          v-if="isLoading"></span>
                            Зарегистрироваться
                        </b-button>
                        или
                        <router-link :to="{name: 'AuthLogin'}"
                                     v-slot="{ href, route, navigate, isActive, isExactActive }">
                            <a class="login-signup-link" :class="[isExactActive && ' active']" :href="href"
                               @click="navigate">войти?</a>
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
                    name: null,
                    email: null,
                    password: null,
                    password_repeat: null,
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
            async signupSubmit(e) {
                e.preventDefault();
                if (this.form.password !== this.form.password_repeat) {
                    alert("Пароли не совпадают");
                } else {
                    const isSuccess = await this.$store.dispatch('user/signup', {data: this.form})
                    if (isSuccess) {
                        this.$router.push({name: 'PlaceIndex'})
                    }
                }
            }
        }
    }
</script>
