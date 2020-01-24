<template>
    <b-form @submit="formSubmit">
        <b-alert variant="danger" :show="errors.length > 0">
            <ul>
                <li v-for="(error, key) in errors" :key="key">{{ error }}</li>
            </ul>
        </b-alert>
        <b-card class="mb-2">
            <b-form-group label="E-mail" label-for="email">
                <b-form-input id="email" v-model="form.email" type="text" class="col-md-6" />
            </b-form-group>
            <b-form-row>
                <b-col>
                    <b-form-group label="Фамилия" label-for="last-name">
                        <b-form-input id="last-name" v-model="form.lastName" type="text" />
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group label="Имя" label-for="first-name">
                        <b-form-input id="first-name" v-model="form.firstName" type="text" />
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group label="Отчество" label-for="middle-name">
                        <b-form-input id="middle-name" v-model="form.middleName" type="text" />
                    </b-form-group>
                </b-col>
            </b-form-row>
            <b-form-group label="Должность" label-for="position">
                <b-form-input id="position" v-model="form.position" type="text" class="col-md-6" />
            </b-form-group>
            <b-form-group v-if="identity.isCanSign">
                <b-form-checkbox v-model="form.isCanSign">Право подписывать документы</b-form-checkbox>
            </b-form-group>
        </b-card>
        <div class="text-right">
            <b-btn type="submit" variant="primary" :disabled="isLoading">
                <b-spinner small v-if="isLoading"></b-spinner><font-awesome-icon icon="save" v-else /> Сохранить
            </b-btn>&nbsp;
            <b-btn :to="{ name: 'CabinetUserIndex' }" variant="secondary"><font-awesome-icon icon="ban" /> Отмена</b-btn>
        </div>
    </b-form>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['identity']),
    ...mapGetters({
      item: 'user/item',
      isLoading: 'user/isLoading',
      errors: 'user/errors'
    })
  },
  data () {
    return {
      form: {
        email: null,
        lastName: null,
        firstName: null,
        middleName: null,
        position: null,
        isCanSign: false
      }
    }
  },
  methods: {
    formSubmit (e) {
      e.preventDefault()
      if (this.identity.isCanSign === false) {
        this.form.isCanSign = null
      }
      this.$emit('formSubmit', this.form)
    },
    cancelClick (e) {
      e.preventDefault()
      this.$router.go(-1)
    }
  },
  watch: {
    item (item) {
      if (item) {
        this.form.email = item.email
        this.form.lastName = item.lastName
        this.form.firstName = item.firstName
        this.form.middleName = item.middleName
        this.form.position = item.position
        this.form.isCanSign = item.isCanSign
      }
    }
  }
}
</script>
