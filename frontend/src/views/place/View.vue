<template>
    <main role="main" class=" inner cover cover-container-back" v-if="item">
        <div><h1 class="cover-heading text-center">{{item.name}}s</h1>
        </div>

        <div>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">Главная</a></li>
                    <li class="breadcrumb-item active">{{item.category_name}}</li>
                    <li class="breadcrumb-item active" aria-current="page">{{item.name}}</li>
                </ol>
            </nav>
        </div>

        <div class="row">
            <div class="col-md-12">
                <div id="myCarousel" class="carousel slide" data-ride="carousel">
                    <ol class="carousel-indicators">
                        <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                        <li data-target="#myCarousel" data-slide-to="1"></li>
                        <li data-target="#myCarousel" data-slide-to="2"></li>
                    </ol>
                    <div class="carousel-inner">
                        <div class="carousel-item active" v-for="value in item.imageList">
                            <img :src="value.path" alt="">
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>

                <div class="row" style="margin-top: 20px">
                    <div class="col-md-3" v-for="(value, key) in item.imageList" :key="'image-' + key">
                        <img :src="value.path" alt="" class="img-thumbnail">
                    </div>
                </div>

                <div class="row" style="margin: 20px 0;">
                    <div class="col-md-8">
                        <div id="map" style="height: 420px; margin-bottom: 10px"></div>
                    </div>
                    <div class="col-md-4">
                        <dl>
                            <dt>Город</dt>
                            <dd>{{item.city_name}}</dd>
                            <dt>Категория</dt>
                            <dd>{{item.category_name}}</dd>
                            <dt>Адрес</dt>
                            <dd>{{item.address}}</dd>
                            <dt>Координаты</dt>
                            <dd>{{item.latitude}}, {{item.longitude}}</dd>
                        </dl>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <h3>Описание</h3>
                        <p>
                            {{item.description}}
                        </p>
                    </div>
                    <div class="col-md-12">
                        <h3>Дополнительные услуги</h3>

                        <ol>
                            <li v-for="service in item.serviceList">{{service.name}}</li>
                        </ol>
                    </div>
                    <div class="col-md-12">
                        <h3>Маршруты</h3>

                        <table class="table">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Названиие</th>
                                <th scope="col">Сложность</th>
                                <th scope="col">Протяженность, м</th>
                                <th scope="col">Высота, м</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="router in item.routerList">
                                <th scope="row">1</th>
                                <td>{{router.name}}</td>
                                <td>{{router.level_name}}</td>
                                <td>{{router.length}}</td>
                                <td>{{router.height}}</td>
                            </tr>

                            </tbody>
                        </table>
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
                item: 'place/item',
            }),
        },
        created() {
            this.load()
        },
        data() {
            return {
                myMap: null
            }
        },
        methods: {
            renderMaps() {
                this.myMap.geoObjects
                    .add(new ymaps.Placemark([this.item.latitude, this.item.longitude], {
                        balloonContent: this.item.name
                    }));
            },
            async load() {
                this.$store.dispatch('place/fetchOne', this.$route.params.id);
                const ready = await this.$store.dispatch('place/fetchAll');
                if (ready) {
                    this.placesFiltered = this.places;
                    this.myMap = new ymaps.Map("map", {
                        center: [59.956359, 30.310081],
                        zoom: 11
                    });
                    ymaps.ready(this.renderMaps());
                }
            }
        }
    }
</script>