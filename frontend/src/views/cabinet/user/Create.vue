<template>
    <div>
        <h4 class="py-3 mb-4">
            Новый сотрудник
        </h4>
        <item-form @formSubmit="formSubmit" />
    </div>
</template>

<script>
import ItemForm from './Form'

export default {
  components: { ItemForm },
  methods: {
    async formSubmit (data) {
      const result = await this.$store.dispatch('user/create', data)
      if (result) {
        this.$router.go(-1)
      }
    }
  }
}
</script>
