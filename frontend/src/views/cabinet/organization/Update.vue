<template>
    <div v-if="item">
        <h4 class="mb-4 py-3">Организация</h4>
        <b-form @submit="formSubmit">
            <b-alert variant="danger" :show="errors.length > 0">
                <ul>
                    <li v-for="(error, key) in errors" :key="key">{{ error }}</li>
                </ul>
            </b-alert>
            <b-alert variant="success" :show="isShowSuccess">
                Данные организации успешно сохранены
            </b-alert>
            <b-card class="mb-2">
                <b-form-group label="Название" label-for="name">
                    <b-form-input id="name" v-model="form.name" type="text" class="col-md-6" />
                </b-form-group>
                <b-form-group label="ИНН" label-for="tin">
                    <b-form-input id="tin" v-model="form.tin" type="text" class="col-md-6" />
                </b-form-group>
                <b-form-group label="ОГРН(ИП)" label-for="reg-number">
                    <b-form-input id="reg-number" v-model="form.regNumber" type="text" class="col-md-6" />
                </b-form-group>
                <b-form-group label="Страна" label-for="country-id">
                    <b-form-select id="country-id" v-model="form.countryId" :options="countryIdOptions" class="col-md-6">
                        <template slot="first">
                            <option :value="null" disabled>Выберите страну</option>
                        </template>
                    </b-form-select>
                </b-form-group>
                <b-form-row>
                    <b-col>
                        <b-form-group label="Индекс" label-for="zip">
                            <b-form-input id="zip" v-model="form.zip" type="text" />
                        </b-form-group>
                    </b-col>
                    <b-col>
                        <b-form-group label="Регион" label-for="region">
                            <b-form-input id="region" v-model="form.region" type="text" />
                        </b-form-group>
                    </b-col>
                    <b-col>
                        <b-form-group label="Город" label-for="city">
                            <b-form-input id="city" v-model="form.city" type="text" />
                        </b-form-group>
                    </b-col>
                </b-form-row>
                <b-form-row>
                    <b-col>
                        <b-form-group label="Улица" label-for="street">
                            <b-form-input id="street" v-model="form.street" type="text" />
                        </b-form-group>
                    </b-col>
                    <b-col>
                        <b-form-group label="Дом" label-for="house">
                            <b-form-input id="house" v-model="form.house" type="text" />
                        </b-form-group>
                    </b-col>
                    <b-col>
                        <b-form-group label="Офис" label-for="office">
                            <b-form-input id="office" v-model="form.office" type="text" />
                        </b-form-group>
                    </b-col>
                </b-form-row>
            </b-card>
            <div class="text-right">
                <b-btn type="submit" variant="primary" :disabled="isLoading">
                    <b-spinner small v-if="isLoading"></b-spinner><font-awesome-icon icon="save" v-else /> Сохранить
                </b-btn>&nbsp;
                <b-btn :to="{ name: 'CabinetOrganizationView' }" variant="secondary"><font-awesome-icon icon="ban" /> Отмена</b-btn>
            </div>
        </b-form>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        countries: 'country/items',
        errors: 'organization/errors',
        isLoading: 'organization/isLoading',
        item: 'organization/item'
      }),
      countryIdOptions () {
        return this.countries.map((item) => { return { value: item.id, text: item.name } })
      }
    },
    data () {
      return {
        form: {
          name: null,
          tin: null,
          regNumber: null,
          countryId: null,
          zip: null,
          region: null,
          city: null,
          street: null,
          house: null,
          office: null,
        },
        isShowSuccess: false
      }
    },
    created () {
      this.load()
    },
    methods: {
      load () {
        this.$store.dispatch('organization/clear')
        this.$store.dispatch('country/fetchAll')
        this.$store.dispatch('organization/fetchOne', this.$store.state.identity.organizationId)
      },
      async formSubmit (e) {
        e.preventDefault()
        this.isShowSuccess = false
        const result = await this.$store.dispatch('organization/update', { id: this.item.id,  data: this.form })
        if (result) {
          this.isShowSuccess = true
        }
      }
    },
    watch: {
      item (item) {
        if (item) {
          this.form.name = item.name
          this.form.tin = item.tin
          this.form.regNumber = item.regNumber
          this.form.countryId = item.countryId
          this.form.zip = item.zip
          this.form.region = item.region
          this.form.city = item.city
          this.form.street = item.street
          this.form.house = item.house
          this.form.office = item.office
        }
      }
    }
  }
</script>
