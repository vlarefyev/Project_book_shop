import Vue from 'vue'
import Router from 'vue-router'

import vCatalog from '../components/v-catalog'
import vCart from '../components/v-cart'
import Admin from '../components/v-admin-form'

Vue.use(Router)

    let router = new Router({
    mode: 'history',
    routes: [
        {
            path: "/",
            name: 'catalog',
            component: vCatalog
        },
        {
            path: "/cart",
            name: 'cart',
            component: vCart,
            props: true
        },
        {
            path: "/admin",
            name: 'admin',
            component: Admin, 
        }
    ]
})

export default router;