<template>
    <div v-if="item">
        <h4 class="d-flex justify-content-between align-items-center w-100 py-3 mb-4">
            <div>Организация</div>
            <div class="d-flex">
                <b-btn v-if="isCanUpdate" :to="{ name: 'CabinetOrganizationUpdate' }" pill variant="primary"><font-awesome-icon icon="edit" /> Изменить</b-btn>&nbsp;
                <b-btn v-if="isCanUpdate && !item.isPaid" :to="{ name: 'CabinetOrganizationUploadPayFile' }" pill variant="primary"><font-awesome-icon icon="money-bill" /> Оплатить рег. сбор</b-btn>&nbsp;
                <b-btn v-if="item.offerId" :href="baseUrl() + '/v1/offer/' + item.offerId + '/download'" pill variant="success"><font-awesome-icon icon="download" /> Скачать оферту</b-btn>
                <b-btn v-else-if="isCanUpdate" :to="{ name: 'CabinetOrganizationOffer' }" pill variant="success"><font-awesome-icon icon="signature" /> Подписать оферту</b-btn>
            </div>
        </h4>
        <b-alert variant="danger" :show="!item.isPaid">
            Электронный документооборот не является юридически значимым. Компания не оплатила регистрационный сбор.
        </b-alert>
        <b-card>
            <table class="table table-borderless m-0">
                <tr>
                    <td>Название</td>
                    <td>{{ item.name }}</td>
                </tr>
                <tr>
                    <td>ИНН</td>
                    <td>{{ item.tin }}</td>
                </tr>
                <tr>
                    <td>ОГРН(ИП)</td>
                    <td>{{ item.regNumber }}</td>
                </tr>
                <tr>
                    <td>Страна</td>
                    <td>{{ countryLabel }}</td>
                </tr>
                <tr>
                    <td>Адрес</td>
                    <td>{{ item.address }}</td>
                </tr>
            </table>
        </b-card>
    </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapState(['identity']),
      ...mapGetters({
        countries: 'country/items',
        errors: 'organization/errors',
        isLoading: 'organization/isLoading',
        item: 'organization/item'
      }),
      countryLabel () {
        const country = this.countries.find(item => item.id === this.item.countryId)
        return country ? country.name : null
      },
      isCanUpdate () {
        return this.item && this.item.id === this.identity.organizationId
      }
    },
    created () {
      this.load()
    },
    methods: {
      load () {
        this.$store.dispatch('organization/clear')
        this.$store.dispatch('country/fetchAll')
        const id = this.$route.params.id || this.$store.state.identity.organizationId
        this.$store.dispatch('organization/fetchOne', id)
      },
      baseUrl () {
        let baseUrl = 'https://api.agredi.com'

        if (process.env.NODE_ENV === 'development') {
          baseUrl = 'http://localhost:8080'
        }

        return baseUrl
      }
    }
  }
</script>
