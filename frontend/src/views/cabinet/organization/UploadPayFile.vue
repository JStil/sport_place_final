<template>
    <div>
        <h4 class="py-3 mb-4">
            Оплата регистрационного сбора
        </h4>
        <b-form @submit="formSubmit">
            <b-alert variant="info" :show=true>
               Скачайте <a href="#">счет</a> для оплаты. После оплаты загрузите в форму ниже квитанцию.
            </b-alert>
            <b-alert variant="danger" :show="errors.length > 0">
                <ul>
                    <li v-for="(error, key) in errors" :key="key">{{ error }}</li>
                </ul>
            </b-alert>
            <b-card class="mb-2">
                <b-form-group label="Файл" label-for="file" description="Оставьте поле пустым, если не хотите заменить файл">
                    <b-form-file id="file" v-model="form.file" placeholder="Выберите файл docx, xlsx, pdf, png, jpg..." />
                </b-form-group>
                <b-form-group>
                    <b-form-checkbox
                            id="rule"
                            name="rule"
                            v-bind:required=true
                    >
                        Я согласен с <a href="/docs/rules.pdf" target="_blank">правилами пользования сервисом</a>
                    </b-form-checkbox>
                </b-form-group>
            </b-card>
            <div class="text-right">
                <b-btn type="submit" variant="primary" :disabled="isLoading">
                    <b-spinner small v-if="isLoading"></b-spinner><font-awesome-icon icon="save" v-else /> Отправить
                </b-btn>&nbsp;
            </div>
        </b-form>
    </div>
</template>

<script>
  import { mapGetters, mapState } from 'vuex'

  export default {
    computed: {
      ...mapState(['identity']),
      ...mapGetters({
          isLoading: 'organization/isLoading',
          errors: 'organization/errors'
      })
    },
    data () {
      return {
        form: {
          file: '',
        }
      }
    },
    created () {
      this.load()
    },
    methods: {
      load () {},
      async formSubmit (e) {
        e.preventDefault()
        const formData = new FormData()
        for (let key in this.form) {
          const value = this.form[key]
          if (value !== null && value !== '') {
            formData.append(key, value)
          }
        }
        const result = await this.$store.dispatch('organization/uploadPayFile', {data: formData })
        if (result) {
          this.$router.go(-1)
        }
      }
    },
    watch: {
    }
  }
</script>