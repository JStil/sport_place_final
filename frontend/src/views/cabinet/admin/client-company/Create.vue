<template>

    <div>

        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1>
                Добавление компании грузовладельца
            </h1>
            <ol class="breadcrumb">
                <li>
                    <router-link to="/cabinet/admin/"> Главная</router-link>
                </li>
                <li>
                    <router-link to="/cabinet/admin/client-company"> Грузовладельцы</router-link>
                </li>
                <li class="active">Добавление </li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content">

            <b-form @submit="formSubmit">
                <div class="box">
                    <!-- /.box-header -->
                    <div class="box-body">
                        <b-alert variant="danger" :show="errors.length > 0">
                            <ul>
                                <li v-for="(error, key) in errors" :key="key">{{ error.field }}: {{ error.message }}</li>
                            </ul>
                        </b-alert>
                        <b-card class="mb-2">
                            <b-form-group label="Название" label-for="name">
                                <b-form-input id="name" v-model="form.name" type="text" class="col-md-6"/>
                            </b-form-group>
                            <b-form-group label="Адрес" label-for="address">
                                <b-form-input id="address" v-model="form.address" type="text" class="col-md-6"/>
                            </b-form-group>
                        </b-card>

                    </div>

                    <div class="box-footer">
                        <b-btn type="submit" variant="primary" :disabled="isLoading" class="pull-right">
                            <b-spinner small v-if="isLoading"></b-spinner>
                            Добавить
                        </b-btn>&nbsp;
                    </div>

                </div>
            </b-form>


        </section>
        <!-- /.content -->
    </div>
</template>


<script>
    import {mapGetters, mapState} from 'vuex'
    import toastr from "toastr";

    export default {
        computed: {
            ...mapState(['identity']),
            ...mapGetters({
                isLoading: 'clientCompany/isLoading',
                errors: 'clientCompany/errors'
            }),
        },
        data() {
            return {
                form: {
                    name: '',
                    address: ''
                }
            }
        },
        methods: {
            async formSubmit(e) {
                e.preventDefault()
                const payloadData = {}
                for (let key in this.form) {
                    const value = this.form[key]
                    if (value !== null && value !== '') {
                        payloadData[key] = value
                    }
                }
                const result = await this.$store.dispatch('clientCompany/create', payloadData)
                if (result) {
                    this.$router.push({name: 'CabinetAdminClientCompanyIndex'})
                    toastr.success('Компания грузовладельца успешно создана')
                }
            }
        }
    }
</script>