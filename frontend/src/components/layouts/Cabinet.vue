<template>
    <div>
        <b-navbar variant="white" type="light" toggleable="sm">
            <b-navbar-brand href="#">
            </b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item :to="{ name: 'CabinetDocumentIndex' }">Документы</b-nav-item>
                    <b-nav-item :to="{ name: 'CabinetUserIndex' }">Сотрудники</b-nav-item>
                    <b-nav-item :to="{ name: 'CabinetOrganizationView' }">Организация</b-nav-item>
                    <b-nav-item :to="{ name: 'CabinetUserProfile' }">Профиль</b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown right>
                        <template slot="button-content">{{ user.email }}</template>
                        <b-dropdown-item @click="logoutClick">Выход</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <div class="container py-2">
            <div class="col-xs-12">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
  import jwt from 'jsonwebtoken'

  let cert;
  if (process.env.NODE_ENV !== 'development') {
      cert = '-----BEGIN PUBLIC KEY-----\n' +
          'MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAqk3N1yp0+kRlG7d/Cm7R\n' +
          'usF0WwViCHk9QkbFKZ0zPyD5+Vw5amKE/g6Es4R2sxjZJ3GzYBK9EZjscCG8rhow\n' +
          '35469doIh+8lVsZN5vNd0yAwuDUcQhIKQGcylk/AWoQ+JstTajOTPULx372W8+R7\n' +
          '1WmJ3DxZQ1mMXssD2UYN+l3A3AN0xlviwUIzeeq7wQdt/P5IYmC+bF/C7OdpG1uF\n' +
          'Ox+p19QnsiWqy2UmSTgGE7SykbqzL3aA9zUx7qSxRbNhCmr0+w+JglaBw/YU3yqG\n' +
          'bkCULOwqPPR0Uv+dLsVU/5lkLWZ2X1Sl9unzqFL8X6gtpL86GblFTs6/sa5GDYlV\n' +
          'f/xJKVMXUUsnetUOaLAEwlvhdlnBxwKgN6ZKALuGpPxXkaQrGA3eSDgyzvpA9Msb\n' +
          'kBVnzBBCA/WTXZYASwzKOco87pYWifRAYpSO2Mwno3VWm0gpQ/THJXOg9GvATuDO\n' +
          'CNbJs8iCr0Mkefd24HzINKE/D39xp4lNDCgLORMoTfsdZx3RxzlXbY+uqPuosuDv\n' +
          'gdcgCjJsJSoz/EQ4HA/euOhE4j48kR2qfCMbsb8EpjUjbjAlYR5vqEFeltBPn0Ts\n' +
          'aOmvkBG7fAp1FKiCSXbbaWCzNXoFxlRGPp5eLwDgotPVSm18kldsIYMVpSdolxX1\n' +
          '2wU/4TchYrBE/sIOYysVkQsCAwEAAQ==\n' +
          '-----END PUBLIC KEY-----'
  } else {
      cert = '-----BEGIN PUBLIC KEY-----\n' +
          'MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAqk3N1yp0+kRlG7d/Cm7R\n' +
          'usF0WwViCHk9QkbFKZ0zPyD5+Vw5amKE/g6Es4R2sxjZJ3GzYBK9EZjscCG8rhow\n' +
          '35469doIh+8lVsZN5vNd0yAwuDUcQhIKQGcylk/AWoQ+JstTajOTPULx372W8+R7\n' +
          '1WmJ3DxZQ1mMXssD2UYN+l3A3AN0xlviwUIzeeq7wQdt/P5IYmC+bF/C7OdpG1uF\n' +
          'Ox+p19QnsiWqy2UmSTgGE7SykbqzL3aA9zUx7qSxRbNhCmr0+w+JglaBw/YU3yqG\n' +
          'bkCULOwqPPR0Uv+dLsVU/5lkLWZ2X1Sl9unzqFL8X6gtpL86GblFTs6/sa5GDYlV\n' +
          'f/xJKVMXUUsnetUOaLAEwlvhdlnBxwKgN6ZKALuGpPxXkaQrGA3eSDgyzvpA9Msb\n' +
          'kBVnzBBCA/WTXZYASwzKOco87pYWifRAYpSO2Mwno3VWm0gpQ/THJXOg9GvATuDO\n' +
          'CNbJs8iCr0Mkefd24HzINKE/D39xp4lNDCgLORMoTfsdZx3RxzlXbY+uqPuosuDv\n' +
          'gdcgCjJsJSoz/EQ4HA/euOhE4j48kR2qfCMbsb8EpjUjbjAlYR5vqEFeltBPn0Ts\n' +
          'aOmvkBG7fAp1FKiCSXbbaWCzNXoFxlRGPp5eLwDgotPVSm18kldsIYMVpSdolxX1\n' +
          '2wU/4TchYrBE/sIOYysVkQsCAwEAAQ==\n' +
          '-----END PUBLIC KEY-----'
  }

  export default {
    data () {
      return {
        user: {
          email: null
        }
      }
    },
    methods: {
      logoutClick (e) {
        e.preventDefault()
        localStorage.removeItem('token')
        this.$router.push({ name: 'AuthLogin'})
      }
    },
    created () {
      if (!localStorage.token) {
        this.$router.push({ name: 'AuthLogin' })
      } else {
        try {
          const data = jwt.verify(localStorage.token, cert, { algorithms: ['RS256'] })
          this.user.email = data.email
          this.$store.dispatch('setUser', {
            id: data.id,
            email: data.email,
            organizationId: data.organizationId,
            isCanSign: data.isCanSign
          })
        } catch (e) {
          console.log(e)
        }
      }
    }
  }
</script>

<style lang="scss">
    @import "./../../scss/cabinet";
</style>
