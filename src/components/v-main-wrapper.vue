<template>
    <div class="v-main-wrapper">
        <keep-alive>
        <router-view> </router-view>
        </keep-alive>

        <!-- <vAdminForm /> -->
    </div>
</template>

<script>

    // import vAdminForm from './v-admin-form'

export default {
    name: "v-main-wrapper",
    components: {

        // vAdminForm
        },
    props: {},
    data() {
        return {
            
        }
    },
    computed: {},
    methods: {},
    watch: {},

}
</script>

<style>
.v-main-wrapper {
    max-width: 900px;
    margin: 0 auto;
}
</style>