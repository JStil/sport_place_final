<template>
    <div>
        <h4 class="d-flex justify-content-between align-items-center w-100 py-3">
            <div>Сотрудники</div>
            <div class="d-flex">
                <b-btn :to="{ name: 'CabinetUserCreate' }" pill variant="primary"><font-awesome-icon icon="plus" /> Добавить</b-btn>
            </div>
        </h4>
        <b-card v-for="item in items" :key="'user-' + item.id" class="mb-2">
            <div class="mb-2 d-flex justify-content-between">
                <div>
                    <template v-if="item.fullName">{{ item.fullName }}</template>
                    <template v-else><span class="text-muted">Имя не указано</span></template>
                </div>
                <div v-if="item.id !== identity.id">
                    <b-btn :to="{ name: 'CabinetUserUpdate', params: { id: item.id } }" size="sm" variant="outline-primary"><font-awesome-icon icon="edit" /> Изменить</b-btn>
                    <template v-if="item.status !== 300">&nbsp;<b-btn @click="blockClick($event, item.id)" size="sm" variant="outline-danger"><font-awesome-icon icon="ban" /> Блокировать</b-btn></template>
                    <template v-if="item.status === 300">&nbsp;<b-button @click="activeClick($event, item.id)" size="sm" variant="outline-success"><font-awesome-icon icon="check" /> Активировать</b-button></template>
                </div>
            </div>
            <div>
                <div>{{ item.email }}</div>
                <div>
                    <template v-if="item.position">{{ item.position}}</template>
                    <template v-else><span class="text-muted">Должность не указана</span></template>
                </div>
            </div>
            <hr class="my-2">
            <div>
                <template v-if="item.status === 100"><b-badge variant="warning">Ожидает подтверждения</b-badge>&nbsp;</template>
                <template v-if="item.status === 200"><b-badge variant="success">Активен</b-badge>&nbsp;</template>
                <template v-if="item.status === 300"><b-badge variant="danger">Блокирован</b-badge>&nbsp;</template>

                <template v-if="item.isCanSign"><b-badge variant="success">Право подписи</b-badge></template>
                <template v-else><b-badge variant="secondary">Нет права подписи</b-badge></template>
            </div>
        </b-card>
    </div>
</template>

<script>
  import { mapGetters, mapState } from 'vuex'
  import Swal from 'sweetalert2'
  import toastr from 'toastr'

  export default {
    computed: {
      ...mapState(['identity']),
      ...mapGetters({
        errors: 'user/errors',
        firstError: 'user/firstError',
        isLoading: 'user/isLoading',
        items: 'user/items'
      })
    },
    created () {
      this.load()
    },
    methods: {
      load () {
        this.$store.dispatch('user/clear')
        this.$store.dispatch('user/fetchAll')
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
              toastr.success('Пользователь успешно блокирован')
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
              toastr.success('Пользователь успешно активирован')
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
