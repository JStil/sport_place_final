<template>
    <div>
        <h4 class="py-3 mb-4">
            Новый документ
        </h4>
        <b-form @submit="formSubmit">
            <b-alert variant="danger" :show="errors.length > 0">
                <ul>
                    <li v-for="(error, key) in errors" :key="key">{{ error }}</li>
                </ul>
            </b-alert>
            <b-card class="mb-2">
                <b-form-group label="Адресат" label-for="organization-destination-id">
                    <b-form-select id="organization-destination-id" v-model="form.organizationDestinationId" :options="organizationDestinationIdOptions">
                        <template slot="first">
                            <option :value="null" disabled>Выберите организацию</option>
                        </template>
                    </b-form-select>
                </b-form-group>
                <b-form-group label="Файл" label-for="file">
                    <b-form-file id="file" v-model="form.file" placeholder="Выберите файл docx или xlsx..." />
                </b-form-group>
                <b-form-group label="Название" label-for="name" description="Если оставить поле пустым, то будет использовано имя файла">
                    <b-form-input id="name" v-model="form.name" type="text" class="col-md-6" />
                </b-form-group>
                <b-form-group label="Номер" label-for="number">
                    <b-form-input id="number" v-model="form.number" type="text" class="col-md-6" />
                </b-form-group>
                <b-form-group label="Дата" label-for="date">
                    <b-form-input id="date" v-model="form.date" type="date" class="col-md-6" />
                </b-form-group>
                <b-form-group label="Сумма" label-for="amount">
                    <b-form-input id="amount" v-model="form.amount" type="text" class="col-md-6" />
                </b-form-group>

<!--                <b-form-row>-->
<!--                    <b-col>-->
<!--                        <b-form-group label="Фамилия" label-for="last-name">-->
<!--                            <b-form-input id="last-name" v-model="form.lastName" type="text" />-->
<!--                        </b-form-group>-->
<!--                    </b-col>-->
<!--                    <b-col>-->
<!--                        <b-form-group label="Имя" label-for="first-name">-->
<!--                            <b-form-input id="first-name" v-model="form.firstName" type="text" />-->
<!--                        </b-form-group>-->
<!--                    </b-col>-->
<!--                    <b-col>-->
<!--                        <b-form-group label="Отчество" label-for="middle-name">-->
<!--                            <b-form-input id="middle-name" v-model="form.middleName" type="text" />-->
<!--                        </b-form-group>-->
<!--                    </b-col>-->
<!--                </b-form-row>-->

<!--                <b-form-group v-if="identity.isCanSign">-->
<!--                    <b-form-checkbox v-model="form.isCanSign">Право подписывать документы</b-form-checkbox>-->
<!--                </b-form-group>-->
            </b-card>
            <div class="text-right">
                <b-btn type="submit" variant="primary" :disabled="isLoading">
                    <b-spinner small v-if="isLoading"></b-spinner><font-awesome-icon icon="save" v-else /> Сохранить
                </b-btn>&nbsp;
                <b-btn :to="{ name: 'CabinetDocumentIndex' }" variant="secondary"><font-awesome-icon icon="ban" /> Отмена</b-btn>
            </div>
        </b-form>
    </div>
</template>

<script>
  import { mapGetters, mapState } from 'vuex'
  import toastr from 'toastr'

  export default {
    computed: {
      ...mapState(['identity']),
      ...mapGetters({
        organizations: 'organization/items',
        item: 'document/item',
        isLoading: 'document/isLoading',
        errors: 'document/errors'
      }),
      organizationDestinationIdOptions () {
        return this.organizations.map((item) => { return { value: item.id, text: item.name + ' (ИНН: ' + item.tin + ' ОГРН(ИП): ' + item.regNumber + ')' } })
      }
    },
    data () {
      return {
        form: {
          organizationDestinationId: '',
          file: '',
          name: '',
          number: '',
          date: '',
          amount: '',
          comment: ''
        }
      }
    },
    created () {
      this.$store.dispatch('organization/fetchAll')
    },
    methods: {
      async formSubmit (e) {
        e.preventDefault()
        const formData = new FormData()
        for (let key in this.form) {
          const value = this.form[key]
          if (value !== null && value !== '') {
            formData.append(key, value)
          }
        }
        const result = await this.$store.dispatch('document/create', formData)
        if (result) {
          this.$router.push({ name: 'CabinetDocumentView', params: { id: this.item.id }})
          toastr.success('Документ успешно создан')
        }
      }
    }
  }
</script>
