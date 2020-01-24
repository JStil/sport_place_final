<template>
    <div v-if="item">
        <h4 class="mb-4 py-3">Профиль</h4>
        <b-form @submit="formSubmit">
            <b-alert variant="danger" :show="errors.length > 0">
                <ul>
                    <li v-for="(error, key) in errors" :key="key">{{ error }}</li>
                </ul>
            </b-alert>
            <b-alert variant="success" :show="isShowSuccess">
                Профиль успешно сохранён
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
                <b-form-group>
                    <b-form-checkbox v-model="form.isCanSign">Право подписывать документы</b-form-checkbox>
                </b-form-group>
                <b-form-group label="Новый пароль" label-for="password" description="Чтобы не менять пароль, оставьте это поле пустым">
                    <b-form-input id="password" v-model="form.password" type="password" class="col-md-6" />
                </b-form-group>
            </b-card>
            <div class="text-right">
                <b-btn type="submit" variant="primary" :disabled="isLoading">
                    <b-spinner small v-if="isLoading"></b-spinner><font-awesome-icon icon="save" v-else /> Сохранить
                </b-btn>
            </div>
        </b-form>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        errors: 'user/errors',
        isLoading: 'user/isLoading',
        item: 'user/item'
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
          isCanSign: null,
          password: null,
        },
        isShowSuccess: false
      }
    },
    created () {
      this.load()
    },
    methods: {
      load () {
        this.$store.dispatch('user/clear')
        this.$store.dispatch('user/fetchOne', this.$store.state.identity.id)
      },
      async formSubmit (e) {
        e.preventDefault()
        this.isShowSuccess = false
        const result = await this.$store.dispatch('user/updateProfile', { data: this.form })
        if (result) {
          this.isShowSuccess = true
          this.form.password = null
        }
      }
    },
    watch: {
      item () {
        this.form.email = this.item.email
        this.form.lastName = this.item.lastName
        this.form.firstName = this.item.firstName
        this.form.middleName = this.item.middleName
        this.form.position = this.item.position
        this.form.isCanSign = this.item.isCanSign
      }
    }
  }
</script>
