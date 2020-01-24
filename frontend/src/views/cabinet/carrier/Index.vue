<template>

    <div>

        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1>
                Профиль
            </h1>
            <ol class="breadcrumb">
                <li><a href="#"> Главная</a></li>
                <li class="active">Профиль</li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content">
            <div class="box">
                <!-- /.box-header -->
                <div class="box-body" v-if="item">
                    <p><b>username:</b> {{item.username}}</p>
                    <p><b>fullName:</b> {{item.fullName}}</p>
                    <p><b>email:</b> {{item.email}}</p>
                    <p><b>phone:</b> {{item.phone}}</p>
                    <p><b>company name:</b> {{item.company.name}}</p>
                    <p><b>company address:</b> {{item.company.address}}</p>
                </div>
            </div>
        </section>
        <!-- /.content -->
    </div>
</template>


<script>
    import {mapGetters, mapState} from 'vuex'

    export default {
        computed: {
            ...mapState(['identity']),
            ...mapGetters({
                isLoading: 'carrier/isLoading',
                item: 'carrier/item'
            })
        },
        created() {
            this.load()
        },
        methods: {
            load() {
                this.$store.dispatch('carrier/fetchSelf')
            },
        },
    }
</script>