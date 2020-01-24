<template>
    <div v-if="item">
        <h4 class="d-sm-flex justify-content-between align-items-center w-100 py-3">
            <div class="mb-2 mb-sm-0">Документ</div>
            <div class="d-flex flex-column flex-md-row">
                <div class="d-flex">
                    <div class="flex-fill mr-1">
                        <b-btn :to="{ name: 'CabinetDocumentUpdate', params: { id: item.id } }" size="sm" variant="primary" class="w-100" :disabled="!isShowUpdateButton"><font-awesome-icon icon="edit" /> Изменить</b-btn>
                    </div>
                    <div class="flex-fill mr-md-1">
                        <b-dropdown variant="info" size="sm" right :disabled="!isShowSendButton" class="w-100">
                            <template slot="button-content"><font-awesome-icon icon="paper-plane" /> Отправить</template>
                            <b-dropdown-item v-b-modal.send-to-agreement :disabled="!isShowSendToAgreementButton">Сотруднику на согласование</b-dropdown-item>
                            <b-dropdown-item v-b-modal.send-to-signing :disabled="!isShowSendToSigningButton">Сотруднику на подписание</b-dropdown-item>
                            <b-dropdown-item @click="sendToDestinationClick" :disabled="!isShowSendToDestinationButton">Адресату</b-dropdown-item>
                        </b-dropdown>
                    </div>
                </div>
                <div class="d-flex">
                    <div class="flex-fill mr-md-1">
                        <b-dropdown variant="info" size="sm" right class="w-100">
                            <template slot="button-content"><font-awesome-icon icon="share-alt" /> Поделиться </template>
                            <b-dropdown-item v-if="!isShowPublicLink" @click="allowPublicLinkClick">Разрешить публичный доступ</b-dropdown-item>
                            <b-dropdown-item :disabled="!isShowPublicLink" @click="copyPublicLinkClick">Скопировать ссылку</b-dropdown-item>
                        </b-dropdown>
                    </div>
                </div>
                <div class="d-flex">
                    <div class="flex-fill mr-1">
                        <b-btn size="sm" variant="success" class="w-100" @click="agreementClick" :disabled="!isShowAgreementButton"><font-awesome-icon icon="check" /> Согласовать</b-btn>
                    </div>
                    <div class="flex-fill mr-md-1">
                        <b-btn size="sm" variant="success" class="w-100" @click="signClick" :disabled="!isShowSignButton"><font-awesome-icon icon="signature" /> Подписать</b-btn>
                    </div>
                </div>
                <div class="d-flex">
                    <div class="flex-fill mr-1">
                        <b-btn :href="baseUrl() + '/v1/document/' + item.id + '/download'" size="sm" variant="success" class="w-100"><font-awesome-icon icon="download" /> Скачать</b-btn>
                    </div>
                    <div class="flex-fill mr-md-1">
                        <b-btn :href="baseUrl() + '/v1/document/' + item.id + '/certificate'" size="sm" variant="success" class="w-100"><font-awesome-icon icon="download" /> Сертификат</b-btn>
                    </div>
                </div>
            </div>
        </h4>
        <input type="hidden" id="publicUrlHash" :value="frontBaseUrl() + '/cabinet/guest/document/' + item.publicUrlHash">
        <b-alert variant="danger" :show="!item.organizationAuthorIsPaid">
            Электронный документооборот не является юридически значимым. Компания не оплатила регистрационный сбор.
        </b-alert>
        <b-card class="mb-2">
            <table class="table table-borderless">
                <tr>
                    <td>Идентификатор:</td>
                    <td>{{ item.id }}</td>
                </tr>
                <tr>
                    <td>Название:</td>
                    <td>{{ item.name }}</td>
                </tr>
                <tr>
                    <td>Составитель:</td>
                    <td><router-link :to="{ name: 'CabinetOrganizationView', params: { id: item.organizationAuthorId } }">{{ item.organizationAuthorName }}</router-link></td>
                </tr>
                <tr>
                    <td>Адресат:</td>
                    <td><router-link :to="{ name: 'CabinetOrganizationView', params: { id: item.organizationDestinationId } }">{{ item.organizationDestinationName }}</router-link></td>
                </tr>
                <tr>
                    <td>Номер:</td>
                    <td><template v-if="item.number">{{ item.number }}</template><span v-else class="text-muted">не указано</span></td>
                </tr>
                <tr>
                    <td>Дата:</td>
                    <td><template v-if="item.date">{{ item.date|date }}</template><span v-else class="text-muted">не указано</span></td>
                </tr>
                <tr>
                    <td>Сумма:</td>
                    <td><template v-if="item.amount">{{ item.amount }}</template><span v-else class="text-muted">не указано</span></td>
                </tr>
                <tr>
                    <td>Комментарий:</td>
                    <td><template v-if="item.comment">{{ item.comment }}</template><span v-else class="text-muted">не указано</span></td>
                </tr>
            </table>
        </b-card>
        <b-card>
            <table class="table table-borderless">
                <tr v-for="documentStatus in documentStatuses" :key="'document-status-' + documentStatus.id">
                    <td>
                        {{ documentStatus.createdAt|datetime }}
                    </td>
                    <td>
                        <div>
                            <template v-if="documentStatus.status === 100"><b-badge variant="secondary">Новый</b-badge></template>
                            <template v-if="documentStatus.status === 200"><b-badge variant="warning">На согласовании у составителя</b-badge></template>
                            <template v-if="documentStatus.status === 300"><b-badge variant="success">Согласован у составителя</b-badge></template>
                            <template v-if="documentStatus.status === 350"><b-badge variant="warning">Ожидает подписания у составителя</b-badge></template>
                            <template v-if="documentStatus.status === 400"><b-badge variant="success">Подписан у составителя</b-badge></template>
                            <template v-if="documentStatus.status === 500"><b-badge variant="info">Отправлен адресату</b-badge></template>
                            <template v-if="documentStatus.status === 600"><b-badge variant="warning">На согласовании у адресата</b-badge></template>
                            <template v-if="documentStatus.status === 700"><b-badge variant="success">Согласован у адресата</b-badge></template>
                            <template v-if="documentStatus.status === 750"><b-badge variant="warning">Ожидает подписания у адресата</b-badge></template>
                            <template v-if="documentStatus.status === 800"><b-badge variant="success">Подписан у адресата</b-badge></template>
                            <template v-if="documentStatus.status === 900"><b-badge variant="success">Готов</b-badge></template>
                        </div>
                        <div v-if="documentStatus.userTo">
                            Ожидает действий от: <template v-if="documentStatus.userTo.fullName">{{ documentStatus.userTo.fullName }}</template><template v-else><span class="text-muted">имя не указано</span></template> ({{ documentStatus.userTo.email }})
                        </div>
                        <div v-if="documentStatus.userFrom">
                            Источник события: {{ documentStatus.userFrom.fullName }} ({{ documentStatus.userFrom.email }})
                        </div>
                    </td>
                </tr>
            </table>
        </b-card>
        <b-modal id="send-to-agreement" title="Отправить сотруднику на согласование" centered @ok="sendToAgreementClick">
            <b-form-group label="Пользователь" label-for="send-to-agreement-user-id">
                <b-form-select id="send-to-agreement-user-id" v-model="sendToAgreementUserToId" :options="sendToAgreementUserToIdOptions">
                    <template slot="first">
                        <option :value="null" disabled>Выберите пользователя</option>
                    </template>
                </b-form-select>
            </b-form-group>
            <template slot="modal-footer" slot-scope="{ ok, cancel }">
                <b-button size="sm" variant="secondary" @click="cancel()">
                    <font-awesome-icon icon="ban" /> Отмена
                </b-button>
                <b-button size="sm" variant="success" @click="ok()">
                    <font-awesome-icon icon="check" /> Отправить
                </b-button>
            </template>
        </b-modal>
        <b-modal id="send-to-signing" title="Отправить сотруднику на подписание" centered @ok="sendToSigningClick">
            <b-form-group label="Пользователь" label-for="send-to-signing-user-id">
                <b-form-select id="send-to-signing-user-id" v-model="sendToSigningUserToId" :options="sendToSigningUserToIdOptions">
                    <template slot="first">
                        <option :value="null" disabled>Выберите пользователя</option>
                    </template>
                </b-form-select>
            </b-form-group>
            <template slot="modal-footer" slot-scope="{ ok, cancel }">
                <b-button size="sm" variant="secondary" @click="cancel()">
                    <font-awesome-icon icon="ban" /> Отмена
                </b-button>
                <b-button size="sm" variant="success" @click="ok()">
                    <font-awesome-icon icon="check" /> Отправить
                </b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
  import { mapGetters, mapState } from 'vuex'
  import Swal from 'sweetalert2'
  import moment from 'moment'
  import toastr from 'toastr'

  export default {
    computed: {
      ...mapState(['identity']),
      ...mapGetters({
        errors: 'document/errors',
        firstError: 'document/firstError',
        isLoading: 'document/isLoading',
        item: 'document/item',
        documentStatuses: 'documentStatus/items',
        users: 'user/items'
      }),
      sendToAgreementUserToIdOptions () {
        return this.users.map((item) => { return { value: item.id, text: (item.fullName ? item.fullName : 'не указано') + ' (' + item.email + ')' } })
      },
      sendToSigningUserToIdOptions () {
        return this.users.filter(item => item.isCanSign === true).map((item) => { return { value: item.id, text: (item.fullName ? item.fullName : 'не указано') + ' (' + item.email + ')' } })
      },
      isShowUpdateButton () {
        return this.isAuthor && !(this.item.isSignedByAuthor | this.item.isSignedByDestination)
      },
      isShowSendToAgreementButton () {
        if (this.isAuthor) {
          return !this.item.isDestinationHasAccess && !this.item.isSignedByAuthor
        } else if (this.isDestination) {
          return !this.item.isSignedByDestination
        } else {
          return false
        }
      },
      isShowSendToSigningButton () {
        if (this.isAuthor) {
          return !this.item.isDestinationHasAccess && !this.item.isSignedByAuthor
        } else if (this.isDestination) {
          return !this.item.isSignedByDestination
        } else {
          return false
        }
      },
      isShowSendToDestinationButton () {
        return this.isAuthor && !this.item.isDestinationHasAccess
      },
      isShowSendButton () {
        return this.isShowSendToAgreementButton | this.isShowSendToDestinationButton | this.isShowSendToSigningButton
      },
      isShowAgreementButton () {
        if (this.isAuthor) {
          return !this.item.isDestinationHasAccess && !this.item.isSignedByAuthor
        } else if (this.isDestination) {
          return !this.item.isSignedByDestination
        } else {
          return false
        }
      },
      isShowSignButton () {
        if (this.isAuthor && this.identity.isCanSign) {
          return !this.item.isSignedByAuthor
        } else if (this.isDestination && this.identity.isCanSign) {
          return !this.item.isSignedByDestination
        } else {
          return false
        }
      },
      isAuthor () {
        return this.item.organizationAuthorId === this.identity.organizationId
      },
      isDestination () {
        return this.item.organizationDestinationId === this.identity.organizationId
      },
      isShowPublicLink() {
        return this.item.publicUrlHash !== null
      },
    },
    data () {
      return {
        sendToAgreementUserToId: null,
        sendToSigningUserToId: null
      }
    },
    created () {
      this.$store.dispatch('document/clear')
      this.load()
    },
    methods: {
      load () {
        this.$store.dispatch('document/fetchOne', this.$route.params.id)
        this.$store.dispatch('documentStatus/fetchAll', { documentId: this.$route.params.id })
        this.$store.dispatch('user/fetchAll')
      },
      async sendToAgreementClick () {
        const result = await this.$store.dispatch('document/sendToAgreement', { id: this.item.id, data: { userToId: this.sendToAgreementUserToId }})
        this.sendToAgreementUserToId = null
        if (result) {
          toastr.success('Документ успешно отправлен')
          this.load()
        }
      },
      async sendToSigningClick () {
        const result = await this.$store.dispatch('document/sendToSigning', { id: this.item.id, data: { userToId: this.sendToSigningUserToId }})
        this.sendToSigningUserToId = null
        if (result) {
          toastr.success('Документ успешно отправлен')
          this.load()
        }
      },
      async copyPublicLinkClick(e) {
          e.preventDefault();
          let fieldPublicUrl = document.querySelector('#publicUrlHash');
          fieldPublicUrl.setAttribute('type', 'text');
          fieldPublicUrl.select();
          try {
              document.execCommand('copy');
              fieldPublicUrl.setAttribute('type', 'hidden');
              toastr.success('Публичная ссылка скопирована в буфер обмена');
          } catch (err) {
              toastr.error('Возникли проблемы про копировании ссылки в буфер обмена');
          }

      },
      async allowPublicLinkClick(e) {
          e.preventDefault()
          Swal.fire({
              title: 'Разрешить публичный доступ?',
              type: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Да',
              cancelButtonText: 'Отмена',
          }).then(async (result) => {
              if (result.value) {
                  const result2 = await this.$store.dispatch('document/sendAllowPublicUrl', { id: this.item.id, data: {}})
                  if (result2) {
                      toastr.success('Публичная ссылка успешно сгенерирована');
                      let fieldPublicUrl = document.querySelector('#publicUrlHash');
                      fieldPublicUrl.setAttribute('value', result2.publicUrlHash);
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
      async agreementClick (e) {
        e.preventDefault()
        Swal.fire({
          title: 'Согласовать?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Да',
          cancelButtonText: 'Отмена',
        }).then(async (result) => {
          if (result.value) {
            const result2 = await this.$store.dispatch('document/agreement', { id: this.item.id, data: {}})
            if (result2) {
              toastr.success('Документ успешно согласован')
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
      async signClick (e) {
        e.preventDefault()
        Swal.fire({
          title: 'Подписать?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Да',
          cancelButtonText: 'Отмена',
        }).then(async (result) => {
          if (result.value) {
            const result2 = await this.$store.dispatch('code/create', { documentId: this.item.id})
            if (result2) {
              const { value: code } = await Swal.fire({
                title: 'Введите код',
                input: 'text',
                inputAttributes: {
                  maxlength: 10,
                  autocapitalize: 'off',
                  autocorrect: 'off'
                }
              })
              const result3 = await this.$store.dispatch('document/sign', { id: this.item.id, data: { code: code }})
              if (result3) {
                toastr.success('Документ успешно подписан')
                this.load()
              } else {
                Swal.fire({
                  type: 'error',
                  title: 'Ошибка',
                  text: this.firstError
                })
              }
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
      async sendToDestinationClick (e) {
        e.preventDefault()
        Swal.fire({
          title: 'Отправить адресату?',
          text: 'После отправки документа адресату, вы не сможете отправить его на согласование своему сотруднику.',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Да',
          cancelButtonText: 'Отмена',
        }).then(async (result) => {
          if (result.value) {
            const result2 = await this.$store.dispatch('document/sendToDestination', { id: this.item.id, data: {}})
            if (result2) {
              toastr.success('Документ успешно отправлен')
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
      baseUrl () {
        let baseUrl = 'https://api.agredi.com'

        if (process.env.NODE_ENV === 'development') {
          baseUrl = 'http://localhost:8080'
        }

        return baseUrl
      },
      frontBaseUrl() {
        let baseUrl = 'https://lk.agredi.com'

        if (process.env.NODE_ENV === 'development') {
          baseUrl = 'http://localhost:8081'
        }
        return baseUrl
        }
    },
    filters: {
      date (val) {
        return moment(val).format('DD.MM.YYYY')
      },
      datetime (val) {
        return moment(val).format('DD.MM.YYYY HH:mm:ss')
      }
    }
  }
</script>
