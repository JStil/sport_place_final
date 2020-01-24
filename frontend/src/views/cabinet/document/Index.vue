<template>
    <div>
        <h4 class="d-flex justify-content-between align-items-center w-100 py-3 mb-4">
            <div>Документы</div>
            <div class="d-flex">
                <b-btn :to="{ name: 'CabinetDocumentCreate' }" pill variant="primary"><font-awesome-icon icon="plus" /> Добавить</b-btn>
            </div>
        </h4>

        <b-card no-body>
            <b-table responsive :fields="fields" :items="items" :busy="isLoading">
                <template v-slot:cell(status)="data">
                    <template v-if="data.item.status === 100"><b-badge variant="secondary">Новый</b-badge></template>
                    <template v-if="data.item.status === 200"><b-badge variant="warning">На согласовании у составителя</b-badge></template>
                    <template v-if="data.item.status === 300"><b-badge variant="success">Согласован у составителя</b-badge></template>
                    <template v-if="data.item.status === 400"><b-badge variant="success">Подписан у составителя</b-badge></template>
                    <template v-if="data.item.status === 500"><b-badge variant="info">Отправлен адресату</b-badge></template>
                    <template v-if="data.item.status === 600"><b-badge variant="warning">На согласовании у адресата</b-badge></template>
                    <template v-if="data.item.status === 700"><b-badge variant="success">Согласован у адресата</b-badge></template>
                    <template v-if="data.item.status === 800"><b-badge variant="success">Подписан у адресата</b-badge></template>
                    <template v-if="data.item.status === 900"><b-badge variant="success">Готов</b-badge></template>
                </template>

                <template v-slot:cell(buttons)="data">
                    <b-btn :to="{ name: 'CabinetDocumentView', params: { id: data.item.id } }" size="sm" variant="outline-info"><font-awesome-icon icon="folder-open" /> Открыть</b-btn>
                </template>

                <template v-slot:table-busy>
                    <div class="text-center text-danger my-2">
                        <b-spinner class="align-middle" variant="primary"></b-spinner>
                    </div>
                </template>
            </b-table>
        </b-card>
    </div>
</template>

<script>
  import { mapGetters, mapState } from 'vuex'
  import Swal from 'sweetalert2'

  export default {
    computed: {
      ...mapState(['identity']),
      ...mapGetters({
        errors: 'document/errors',
        firstError: 'document/firstError',
        isLoading: 'document/isLoading',
        items: 'document/items'
      })
    },
    data () {
      return {
        fields: [
          {
            key: 'name',
            label: 'Название',
            sortable: true
          },
          {
            key: 'organizationAuthorName',
            label: 'Составитель'
          },
          {
            key: 'organizationDestinationName',
            label: 'Адресат'
          },
          {
            key: 'number',
            label: 'Номер'
          },
          {
            key: 'date',
            label: 'Дата'
          },
          {
            key: 'amount',
            label: 'Сумма'
          },
          {
            key: 'comment',
            label: 'Комментарий'
          },
          {
            key: 'status',
            label: 'Статус'
          },
          {
            key: 'buttons',
            label: '',
            thStyle: { 'min-width': '120px' }
          }
        ]
      }
    },
    created () {
      this.load()
    },
    methods: {
      load () {
        this.$store.dispatch('document/clear')
        this.$store.dispatch('document/fetchAll')
      },
      blockClick (e, id) {
        e.preventDefault()
        Swal.fire({
          title: 'Блокировать?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Да',
          cancelButtonText: 'Отмена',
        }).then(async (result) => {
          if (result.value) {
            const result2 = await this.$store.dispatch('user/block', id)
            if (result2) {
              this.load()
            } else {
              Swal.fire({
                type: 'error',
                title: 'Ошибка',
                text: this.firstError
              })
            }
          }
        })
      },
      activeClick (e, id) {
        e.preventDefault()
        Swal.fire({
          title: 'Активировать?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Да',
          cancelButtonText: 'Отмена',
        }).then(async (result) => {
          if (result.value) {
            const result2 = await this.$store.dispatch('user/active', id)
            if (result2) {
              this.load()
            } else {
              Swal.fire({
                type: 'error',
                title: 'Ошибка',
                text: this.firstError
              })
            }
          }
        })
      }
    }
  }
</script>
