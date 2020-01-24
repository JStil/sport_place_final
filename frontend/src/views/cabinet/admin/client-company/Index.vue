<template>

    <div>

        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1>
                Список компаний
            </h1>
            <ol class="breadcrumb">
                <li><a href="#"> Главная</a></li>
                <li class="active">Список компаний</li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content">
            <div class="box">
                <!-- /.box-header -->
                <div class="box-body">
                    <b-table responsive :fields="fields" :items="items" :busy="isLoading">
                        <template v-slot:cell(number)="data">
                            {{ data.index + 1 }}
                        </template>
                        <template v-slot:table-busy>
                            <div class="text-center text-danger my-2">
                                <b-spinner class="align-middle" variant="primary"></b-spinner>
                            </div>
                        </template>
                    </b-table>
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
                isLoading: 'clientCompany/isLoading',
                items: 'clientCompany/items'
            })
        },
        created() {
            this.load()
        },
        methods: {
            load() {
                this.$store.dispatch('clientCompany/fetchAll')
            },
        },
        data() {
            return {
                fields: [
                    {
                        key: 'number',
                        label: '#',
                    },
                    {
                        key: 'name',
                        label: 'Название',
                    },
                    {
                        key: 'address',
                        label: 'Адрес'
                    },
                ]
            }
        },
    }
</script>