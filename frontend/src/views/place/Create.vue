<template>
    <main role="main" class=" inner cover cover-container-back">
        <div><h1 class="cover-heading text-center">Добавление места</h1>
        </div>

        <div>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">Главная</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Добавление места</li>
                </ol>
            </nav>
        </div>

        <div class="row">
            <div class="col-md-12">
                <h3>Общее</h3>
                <b-form @submit="placeSubmit">
                    <b-alert variant="danger" :show="errors.length > 0">
                        <ul>
                            <li v-for="(value, key) in errors" :key="'error-' + key">{{ value }}</li>
                        </ul>
                    </b-alert>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label :for="`name`">Название:</label>
                                <b-form-input id="name" v-model="form.name"></b-form-input>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <b-form-group label="Категория" label-for="category">
                                <b-form-select id="category" v-model="form.categoryId" :options="categoryOptions"
                                               class="form-control">
                                    <template slot="first">
                                        <option :value="null" selected disabled>Выберите категорию</option>
                                    </template>
                                </b-form-select>
                            </b-form-group>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <b-form-group label="Город" label-for="city">
                                <b-form-select id="city" v-model="form.cityId" :options="cityOptions"
                                               class="form-control">
                                    <template slot="first">
                                        <option :value="null" selected disabled>Выберите город</option>
                                    </template>
                                </b-form-select>
                            </b-form-group>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <div class="form-group">
                                    <label :for="`address`">Адрес:</label>
                                    <b-form-input id="address" v-model="form.address"></b-form-input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label :for="`latitude`">Широта:</label>
                                <b-form-input id="latitude" v-model="form.latitude"></b-form-input>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label :for="`longitude`">Долгота:</label>
                                <b-form-input id="longitude" v-model="form.longitude"></b-form-input>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label :for="`description`">Описание:</label>
                                <b-form-textarea
                                        id="description"
                                        v-model="form.description"
                                        rows="3"
                                        max-rows="6"
                                ></b-form-textarea>
                            </div>
                        </div>
                    </div>
                    <h3>Время работы</h3>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label :for="`working_hours_weekday_from`">В будние от:</label>
                                <b-form-input id="working_hours_weekday_from"
                                              v-model="form.working_hours_weekday_from"></b-form-input>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label :for="`working_hours_weekday_to`">В будние до:</label>
                                <b-form-input id="working_hours_weekday_to"
                                              v-model="form.working_hours_weekday_to"></b-form-input>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label :for="`working_hours_weekend_from`">В выходные от:</label>
                                <b-form-input id="working_hours_weekend_from"
                                              v-model="form.working_hours_weekend_from"></b-form-input>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label :for="`working_hours_weekend_to`">В выходные до:</label>
                                <b-form-input id="working_hours_weekend_to"
                                              v-model="form.working_hours_weekend_to"></b-form-input>
                            </div>
                        </div>
                    </div>
                    <h3>Доп услуги</h3>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label :for="`service`">Название услуги</label>
                                <b-form-input id="service" v-model="service"></b-form-input>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <label>&nbsp;</label>
                            <a href="#" @click="addService" class="btn btn-primary" style="width: 100%; ">Добавить</a>
                        </div>
                        <div class="col-md-12">
                            <h6>Добавленные услуги</h6>

                            <ol>
                                <li v-for="(value, key) in form.serviceList" :key="'service-' + key">
                                    {{value.name}}
                                    <a href="#" v-bind:data-id="key" @click="deleteService"
                                       class="btn btn-sm btn-danger">Удалить</a>
                                </li>
                            </ol>
                        </div>
                    </div>
                    <h3>Маршруты</h3>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label :for="`router_name`">Название маршрута</label>
                                <b-form-input id="router_name" v-model="router.name"></b-form-input>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <b-form-group label="Сложность" label-for="router_level">
                                <b-form-select id="router_level" v-model="router.levelId" :options="levelOptions"
                                               class="form-control">
                                    <template slot="first">
                                        <option :value="null" selected disabled>Выберите сложность</option>
                                    </template>
                                </b-form-select>
                            </b-form-group>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label :for="`router_length`">Протяженность</label>
                                <b-form-input id="router_length" v-model="router.length"></b-form-input>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label :for="`router_height`">Высота</label>
                                <b-form-input id="router_height" v-model="router.height"></b-form-input>
                            </div>
                        </div>
                    </div>
                    <a href="#" class="btn btn-primary" style="width: 100%; margin-bottom: 10px;" @click="addRouter">Добавить</a>
                    <h6>Добавленные маршруты</h6>

                    <table class="table">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Названиие</th>
                            <th scope="col">Сложность</th>
                            <th scope="col">Протяженность, м</th>
                            <th scope="col">Высота, м</th>
                            <th scope="col">Действие</th>
                        </tr>
                        </thead>
                        <tbody>

                        <tr>
                        <tr v-for="(value, key) in form.routerList" :key="'router-' + key">
                            <th scope="row">{{key+1}}</th>
                            <td>{{value.name}}</td>
                            <td>{{value.level_name}}</td>
                            <td>{{value.length}}</td>
                            <td>{{value.height}}</td>
                            <td>
                                <a href="#" v-bind:data-id="key" @click="deleteRouter" class="btn btn-sm btn-danger">Удалить</a>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <h3>Фотографии</h3>

                    <div class="row" style="margin-top: 20px">
                        <div class="col-md-12">
                            <input type="file" accept="image/*" @change="uploadImage($event)" id="file-input">
                        </div>
                        <div class="col-md-3" v-for="(value, key) in form.imageList" :key="'image-' + key">
                            <img :src="value.path" alt="" class="img-thumbnail">
                            <a href="#" v-bind:data-id="value.name" @click="deleteImage" class="btn btn-sm btn-danger"
                               style="margin: 10px 5px 0 0">Удалить</a>
                        </div>
                    </div>
                    <button class="btn btn-lg btn-success" style="margin: 20px auto 0 auto; display: block">Сохранить
                    </button>
                </b-form>
            </div>
        </div>
    </main>

</template>


<script>
    import {mapGetters, mapState} from 'vuex'
    import {api} from "../../api";
    import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
    import _ from 'underscore'

    export default {
        components: {
            VueBootstrapTypeahead
        },
        computed: {
            ...mapGetters({
                errors: 'place/errors',
                cityList: 'city/items',
                categoryList: 'category/items',
                levelList: 'placeLevel/items',
                isLoading: 'city/isLoading',
                fileImage: 'fileImage/item',
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
            },
            levelOptions() {
                return this.levelList.map((item) => {
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
                this.$store.dispatch('placeLevel/fetchAll')
            },
            async getAddresses(query) {
                const res = await fetch("https://geocode-maps.yandex.ru/1.x/?apikey=f56b0ac7-7230-4b74-80b6-27a7cdcf71ad&format=json&results=5&geocode=:query".replace(':query', query))
                const suggestions = await res.json()
                this.addresses = suggestions.featureMember
            },
            async placeSubmit(e) {
                e.preventDefault()
                const result = await this.$store.dispatch('place/create', this.form)
                if (result) {
                    this.$router.push({name: 'PlaceIndex'})
                }
            },
            async addRouter(e) {
                e.preventDefault();
                const routerForm = this.router;
                const fields = ['name', 'height', 'levelId', 'length'];
                let isValid = true;
                for (let item of fields) {
                    if (routerForm[item] === null || routerForm[item].length === 0) {
                        alert('Нужно заполнить все поля');
                        isValid = false;
                        break;
                    }
                }
                if (isValid) {
                    this.form.routerList.push({
                        deleteId: this.form.routerList.length,
                        name: routerForm.name,
                        length: parseInt(this.router.length),
                        height: parseInt(this.router.height),
                        levelId: parseInt(this.router.levelId),
                        level_name: this.levelList.filter(item => parseInt(item.id) === parseInt(this.router.levelId))[0].name,
                    });
                }

            },
            async deleteRouter(e) {
                e.preventDefault();
                const routerId = e.toElement.attributes['data-id'].value;
                this.form.routerList = this.form.routerList.filter(item => parseInt(item.deleteId) !== parseInt(routerId))
            },
            async addService(e) {
                e.preventDefault();
                let isValid = true;
                if (this.service === null || this.service.length === 0) {
                    alert('Нужно заполнить все поля');
                    isValid = false;
                }
                if (isValid) {
                    this.form.serviceList.push({
                        deleteId: this.form.serviceList.length,
                        name: this.service,
                    });
                }
            },
            async deleteService(e) {
                e.preventDefault();
                const serviceId = e.toElement.attributes['data-id'].value;
                console.log(serviceId);
                this.form.serviceList = this.form.serviceList.filter(item => parseInt(item.deleteId) !== parseInt(serviceId))
                console.log(this.form.serviceList)
            },
            async uploadImage(event) {
                let data = new FormData();
                data.append('file', event.target.files[0]);

                const result = await this.$store.dispatch('fileImage/upload', data);
                if (result) {
                    console.log(this.fileImage);
                    this.form.imageList.push({
                        name: this.fileImage.name,
                        path: 'http://localhost:8081/images/' + this.fileImage.name,
                        deleteId: this.form.imageList.length
                    });
                    console.log(this.form.imageList);
                }
            },
            async deleteImage(e) {
                e.preventDefault();
                const elementId = e.toElement.attributes['data-id'].value;
                this.form.imageList = this.form.imageList.filter(item => item.name !== elementId)
                console.log(elementId);
                console.log(this.form.imageList);
            },
        },
        data() {
            return {
                form: {
                    name: null,
                    categoryId: null,
                    cityId: null,
                    description: null,
                    working_hours_weekday_from: null,
                    working_hours_weekday_to: null,
                    working_hours_weekend_from: null,
                    working_hours_weekend_to: null,
                    routerList: [],
                    serviceList: [],
                    imageList: [],
                    address: null,
                    longitude: null,
                    latitude: null,
                },
                service: null,
                router: {
                    name: null,
                    levelId: null,
                    length: null,
                    height: null
                },
            }
        },
        watch: {
            addressSearch: _.debounce(function (addr) {
                this.getAddresses(addr)
            }, 500)
        }
    }
</script>