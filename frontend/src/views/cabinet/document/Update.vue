<template>
    <div v-if="item">
        <h4 class="py-3 mb-4">
            Редактирование документа
        </h4>
        <b-form @submit="formSubmit">
            <b-alert variant="danger" :show="errors.length > 0">
                <ul>
                    <li v-for="(error, key) in errors" :key="key">{{ error }}</li>
                </ul>
            </b-alert>
            <b-card class="mb-2">
                <b-form-group label="Название" label-for="name">
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
                <b-form-group label="Файл" label-for="file" description="Оставьте поле пустым, если не хотите заменить файл">
                    <b-form-file id="file" v-model="form.file" placeholder="Выберите файл docx или xlsx..." />
                </b-form-group>
            </b-card>
            <div class="text-right">
                <b-btn type="submit" variant="primary" :disabled="isLoading">
                    <b-spinner small v-if="isLoading"></b-spinner><font-awesome-icon icon="save" v-else /> Сохранить
                </b-btn>&nbsp;
                <b-btn :to="{ name: 'CabinetDocumentView', params: { id: item.id } }" variant="secondary"><font-awesome-icon icon="ban" /> Отмена</b-btn>
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
        item: 'document/item',
        isLoading: 'document/isLoading',
        errors: 'document/errors'
      })
    },
    data () {
      return {
        form: {
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
      this.load()
    },
    methods: {
      load () {
        this.$store.dispatch('document/clear')
        this.$store.dispatch('document/fetchOne', this.$route.params.id)
      },

      async formSubmit (e) {
        e.preventDefault()
        const formData = new FormData()
        for (let key in this.form) {
          const value = this.form[key]
          if (value !== null && value !== '') {
            formData.append(key, value)
          }
        }
        const result = await this.$store.dispatch('document/update', { id: this.item.id, data: formData })
        if (result) {
          this.$router.go(-1)
        }
      }
    },
    watch: {
      item (item) {
        if (item) {
          this.form.name = item.name
          this.form.number = item.number
          this.form.date = item.date
          this.form.amount = item.amount
          this.form.comment = item.comment
        }
      }
    }
  }
</script>
