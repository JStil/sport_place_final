<template>
    <div>
        <h4 class="font-weight-bold py-3 mb-4">
            Редактирование сотрудника
        </h4>
        <item-form @formSubmit="formSubmit" />
    </div>
</template>

<script>
import ItemForm from './Form'

export default {
  components: { ItemForm },
  created () {
    this.$store.dispatch('user/fetchOne', this.$route.params.id)
  },
  methods: {
    async formSubmit (data) {
      const result = await this.$store.dispatch('user/update', { id: this.$route.params.id, data: data })
      if (result) {
        this.$router.go(-1)
      }
    }
  }
}
</script>
