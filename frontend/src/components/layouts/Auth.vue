<template>
    <div class="auth-wrapper">
        <div class="auth-inner">
            <router-view/>
        </div>
    </div>
</template>

<script>
    export default {
        created() {
            document.title = this.$route.meta.title
        },
        watch: {
            '$route'(to, from) {
                document.title = to.meta.title
            }
        }
  }
</script>

<style lang="scss">
    @import "./../../scss/auth";
</style>
