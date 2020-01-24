<template>
    <main role="main" class=" inner cover cover-container-back">
        <div><h1 class="cover-heading">Добро пожаловать</h1>
        </div>
        <b-form @submit="searchSubmit">
            <div class="row">
                <div class="col-md-5">
                    <b-form-group label="Город" label-for="city">
                        <b-form-select id="city" v-model="form.city" :options="cityOptions"
                                       class="form-control">
                            <template slot="first">
                                <option :value="null" selected>Все</option>
                            </template>
                        </b-form-select>
                    </b-form-group>
                </div>
                <div class="col-md-5">
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
            </div>
        </b-form>


        <div class="row">
            <div class="col-md-12">
                <div id="map" style="height: 500px; margin-bottom: 10px"></div>
                <!--                <div id="map-container-google-1" class="z-depth-1-half map-container"-->
                <!--                     style="height: 500px; margin-bottom: 10px">-->
                <!--                    <iframe src="https://maps.google.com/maps?q=manhatan&t=&z=13&ie=UTF8&iwloc=&output=embed"-->
                <!--                            frameborder="0" s-->
                <!--                            style="border:0; width: 100%; height: 500px" allowfullscreen></iframe>-->
                <!--                </div>-->
            </div>
        </div>
    </main>
</template>


<script>
    import {mapGetters, mapState} from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                cityList: 'city/items',
                categoryList: 'category/items',
                isLoading: 'city/isLoading',
                items: 'city/items',
                places: 'place/items',
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
            async searchSubmit(e) {
                e.preventDefault();
                this.placesFiltered = this.places
                if (this.form.city) {
                    this.placesFiltered = this.places.filter(item => item.cityId === this.form.city);
                }
                if (this.form.category) {
                    this.placesFiltered = this.places.filter(item => item.categoryId === this.form.category);
                }
                this.renderMaps();
            },
            renderMaps() {
                this.myMap.geoObjects.removeAll();
                this.placesFiltered.forEach(item => {
                    this.myMap.geoObjects
                        .add(new ymaps.Placemark([item.latitude, item.longitude], {
                            balloonContent: item.name
                        }));
                })
            },
            async load() {
                this.$store.dispatch('city/fetchAll')
                this.$store.dispatch('category/fetchAll')
                const ready = await this.$store.dispatch('place/fetchAll');

                if (ready) {
                    this.placesFiltered = this.places;
                    this.myMap = new ymaps.Map("map", {
                        center: [59.956359, 30.310081],
                        zoom: 11
                    });
                    ymaps.ready(this.renderMaps());
                }
            },
        },
        data() {
            return {
                placesFiltered: [],
                form: {
                    city: null,
                    category: null
                },
                myMap: null
            }
        },
    }
</script>