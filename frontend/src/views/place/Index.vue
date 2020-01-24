<template>
    <main role="main" class=" inner cover cover-container-back">
        <div><h1 class="cover-heading text-center">Места для отдыха списком</h1>
        </div>
        <b-form @submit="searchSubmit">
            <div class="row">
                <div class="col-md-4">
                    <b-form-group label="Город" label-for="city">
                        <b-form-select id="city" v-model="form.city" :options="cityOptions"
                                       class="form-control">
                            <template slot="first">
                                <option :value="null" selected>Все</option>
                            </template>
                        </b-form-select>
                    </b-form-group>
                </div>
                <div class="col-md-4">
                    <b-form-group label="Категория" label-for="category">
                        <b-form-select id="category" v-model="form.category" :options="categoryOptions"
                                       class="form-control">
                            <template slot="first">
                                <option :value="null" selected>Все</option>
                            </template>
                        </b-form-select>
                    </b-form-group>
                </div>
                <div class="col-md-2">
                    <div class="form-group">
                        <label>&nbsp;</label>
                        <button type="submit" class="btn btn-primary" style="width: 100%; ">Поискать</button>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-group">
                        <label>&nbsp;</label>
                        <router-link :to="{name: 'PlaceCreate'}"
                                     v-slot="{ href, route, navigate, isActive, isExactActive }">
                            <a class="btn btn-success" style="width: 100%; " :href="href"
                               @click="navigate">Добавить</a>
                        </router-link>
                    </div>
                </div>
            </div>
        </b-form>
        <div class="row">
            <div class="col-md-12" v-for="item in places" v-bind:key="item.id">
                <div class="card mb-4 shadow-sm">
                    <div class="row">
                        <div class="col-md-4">
                            <svg class="bd-placeholder-img card-img-top" width="100%" height="225"
                                 xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"
                                 focusable="false"
                                 role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title>
                                <rect width="100%" height="100%" fill="#55595c"></rect>
                                <text x="35%" y="50%" fill="#eceeef" dy=".3em">Превью</text>
                            </svg>
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <strong class="d-inline-block mb-2 text-primary">г. {{item.city_name}} / {{
                                    item.category_name }}</strong>
                                <h3 class="mb-0 text-black-50">{{ item.name }}</h3>
                                <p class="card-text">{{ item.description }} </p>
                                <div class="d-flex justify-content-between float-right">
                                    <div class="btn-group">
                                        <router-link :to="{name: 'PlaceView', params: {id: item.id}}"
                                                     v-slot="{ href, route, navigate, isActive, isExactActive }">
                                            <a class="btn btn-sm btn-outline-secondary btn-view" :href="href"
                                               @click="navigate">Просмотреть</a>
                                        </router-link>
                                        <!--                                        <a class="btn btn-sm btn-outline-secondary btn-view" href="place_edit.html">Отредактировать</a>-->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </main>
</template>


<script>
    import {mapGetters, mapState} from 'vuex'
    import {api} from "../../api";

    export default {
        computed: {
            ...mapGetters({
                cityList: 'city/items',
                categoryList: 'category/items',
                isLoading: 'city/isLoading',
                items: 'place/items',
                rawItems: 'place/items'
            }),
            cityOptions() {
                return this.cityList.map((item) => {
                    return {
                        value: item.id,
                        text: item.name
                    }
                })
            },
            categoryOptions() {
                return this.categoryList.map((item) => {
                    return {
                        value: item.id,
                        text: item.name
                    }
                })
            }
        },
        created() {
            this.load()
        },
        methods: {
            async load() {
                this.$store.dispatch('city/fetchAll')
                this.$store.dispatch('category/fetchAll')
                const isSuccessPlaceFetch = await this.$store.dispatch('place/fetchAll')
                if (isSuccessPlaceFetch) {
                    this.places = this.items
                }
            },
            async searchSubmit(e) {
                e.preventDefault();
                this.places = this.rawItems
                if (this.form.city) {
                    this.places = this.places.filter(item => item.cityId === this.form.city);
                }
                if (this.form.category) {
                    this.places = this.places.filter(item => item.categoryId === this.form.category);
                }
            }
        },
        data() {
            return {
                places: [],
                form: {
                    city: '',
                    category: '',
                }
            }
        },
    }
</script>