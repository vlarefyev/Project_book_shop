import axios from "axios"

export default {
    actions: {

        START_AUTHORIZATION({ commit }) {
            commit('AUTHORIZATION_FORM')
        },

        REFUSE_AUTHORIZATION({ commit }) {
            commit('AUTHORIZATION_FORM')
        },

        CHECK_USER_FROM_API({ commit }, user_name) {
            let url_to_check_user = "http://194.67.111.249:8080/user/get/" + user_name;
            let successful_authorization = false;
            return (
                axios
                .get(url_to_check_user)
                .then((response) => {
                    // console.log(response)
                    commit('IS_USER_NAME', response.data.name)
                    commit('IS_BALANCE', response.data.money)
                    commit('IS_USER_ID', response.data.id)
                    successful_authorization = true;
                    commit('IS_AUTHORIZED_USER', successful_authorization)

                    console.log(response.data.id)
                })
                .catch((error) => {
                    console.log(error, successful_authorization)
                })
            );
        },


        START_PAYMENT({ commit, state }, products) {

            let booksToPay = products.map(el => { return { id: el.id, count: el.quantity } })
            let successfulPurchase = false

            console.log(state.userId, booksToPay)
            return (
                axios
                .post("http://194.67.111.249:8080/books/by", {
                    userId: state.userId,
                    books: booksToPay
                })
                .then((response) => {

                    axios
                        .get("http://194.67.111.249:8080/user/get/" + state.user_name)

                    .then((response) => {
                            successfulPurchase = true,
                                commit('SUCCESSFUL_PURCHASE', successfulPurchase)
                            commit('IS_BALANCE', response.data.money)
                        }),


                        console.log(response)
                })
                .catch((error) => console.log(error))
            )
        },
    },
    mutations: {

        IS_USER_NAME(state, user_name) {
            state.user_name = user_name
        },

        IS_BALANCE(state, Balance) {
            state.Balance = Balance
        },

        IS_USER_ID(state, userId) {
            state.userId = userId
            console.log(state.userId, userId)
        },

        IS_AUTHORIZED_USER(state, successful_authorization) {
            state.isAuthorizedUser = successful_authorization
        },

        SUCCESSFUL_PURCHASE(state, successfulPurchase) {
            state.successfulPurchase = successfulPurchase
        },

        AUTHORIZATION_FORM(state) {
            state.isInfoPopupVisible = !state.isInfoPopupVisible
            console.log(state.isInfoPopupVisible)
        }
    },
    state: {
        user_name: "",
        Balance: 0,
        isAuthorizedUser: false,
        userId: 0,
        successfulPurchase: false,
        isInfoPopupVisible: false
    },
    getters: {
        USER(state) {
            return state.user_name
        },

        BALANCE(state) {
            return state.Balance
        },

        IS_AUTHORIZED_USER(state) {
            return state.isAuthorizedUser
        },

        IS_PAYMENT_PASSED(state) {
            return state.successfulPurchase
        },

        IS_INFO_POPUP_VISIBLE(state) {
            return state.isInfoPopupVisible
        }
    }
}