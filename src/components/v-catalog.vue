<template>
  <div class="v-catalog">
    <div class="v-catalog__nav-bar">
      <v-popup v-if="isInfoPopupVisible" @closePopup="closePopup">
        <template v-slot:namePopup>
          <h2>Авторизация</h2>
        </template>

        <template v-slot:bodyPopup>
          <p class="bodyPopup">
            <label>UserName:</label>
            <input v-model="user_name" placeholder="Имя пользователя" />
          </p>
          <button 
          class="submit_btn"
          @click="checkUser"
          >Войти</button>
        </template>
      </v-popup>

      <button v-if="!isAuthorizedUser" @click="startAuthorization">
        Войти
      </button>
      <div class="v-catalog__user" v-else>
        <p>{{UserName}} {{Balance}} P.</p>
      </div>

      <router-link :to="{ name: 'cart', params: { cart_data: CART } }">
        <div class="v-catalog__link_to_cart">Cart: {{ CART.length }}</div>
      </router-link>
    </div>

    <h1>catalog</h1>
    <div class="v-catalog__list">
      <v-catalog-item
        v-for="product in PRODUCTS"
        :key="product.id"
        :product_data="product"
        @addToCart="addToCart"
      />
    </div>
  </div>
</template>

<script>
import VCatalogItem from "./v-catalog-item.vue";
import { mapActions, mapGetters } from "vuex";
import vPopup from "./popup/v-popup";
import axios from "axios";

export default {
  name: "v-catalog",
  components: { VCatalogItem, vPopup },
  props: {},
  data() {
    return {
      isAuthorizedUser: false,
      isInfoPopupVisible: false,
      user_name: "",
    };
  },
  computed: {
    ...mapGetters(["PRODUCTS", "CART"]),
  },
  watch: {},
  methods: {
    ...mapActions(["GET_PRODUCTS_FROM_API", "ADD_TO_CART"]),
    addToCart(data) {
      this.ADD_TO_CART(data);
    },

    startAuthorization() {
      this.isInfoPopupVisible = true;
    },

    closePopup() {
      this.isInfoPopupVisible = false;
    },

    checkUser(){
      let url_to_check_user = "http://194.67.111.249:8080/user/get/" + this.user_name;
      return (
        axios
          .get(url_to_check_user)
          .then((response) => {

if (response.length == 0) {
  this.isAuthorizedUser = false
} else {
  this.isAuthorizedUser = true,
  this.isInfoPopupVisible = false,
  console.log(response)

  this.UserName = response.data.name,
  this.Balance = response.data.money
}

            })
          .catch((error) => console.log(error)),
          console.log(this.checkUser) 
          
          );}
  
  },
  mounted() {
    this.GET_PRODUCTS_FROM_API();
  },
};
</script>

.<style lang="scss">
.v-catalog {
  &__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
  &__nav-bar {
    display: flex;
    position: absolute;
    top: 10px;
    right: 10px;
  }
  &__link_to_cart,
  &__user {
    p {
      margin: 0;
    }
    padding: $padding * 2;
    border: solid 1px #aeaeae;
  }
  .bodyPopup {
    display: flex;
    justify-content: space-between;
  }
}
</style>