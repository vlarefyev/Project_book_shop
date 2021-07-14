<template>
  <div class="v-cart">
    <div class="v-catalog__nav-bar">
      <v-user-bar></v-user-bar>
      <router-link class="v-catalog__link_to_cart" :to="{ name: 'catalog' }">
        <div>Вернуться в каталог</div>
      </router-link>
    </div>

    <p v-if="!cart_data.length">Ваша корзина пуста.</p>
    <v-cart-item
      v-for="(item, index) in cart_data"
      :key="item.id"
      :cart_item_data="item"
      @deleteFromCart="deleteFromCart(index)"
      @increment="increment(index)"
      @decrement="decrement(index)"
    />
    <button class="get-to-buy btn" v-if="cart_data.length" @click="getToBuy">
      Купить
    </button>

    <div class="v-cart__total">
      <p class="total__name">Суммарная стоимость:</p>
      <p>{{ cartTotalCost }} Р.</p>
    </div>
  </div>
</template>

<script>
import vCartItem from "./v-cart-item";
import { mapActions, mapGetters } from "vuex";
import VUserBar from "./v-user-bar.vue";

export default {
  name: "v-cart",
  components: {
    vCartItem,
    VUserBar,
  },
  props: {
    cart_data: {
      tupe: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["IS_AUTHORIZED_USER"]),
    cartTotalCost() {
      let result = [];

      if (this.cart_data.length) {
        for (let item of this.cart_data) {
          result.push(item.price * item.quantity);
        }

        result = result.reduce(function (sum, el) {
          return sum + el;
        });
        return result;
      } else {
        return 0;
      }
    },
  },
  methods: {
    ...mapActions([
      "INCREMENT_CART_ITEM",
      "DECREMENT_CART_ITEM",
      "DELETE_FROM_CART",
      "START_PAYMENT",
      "START_AUTHORIZATION"
    ]),
    increment(index) {
      this.INCREMENT_CART_ITEM(index);
    },
    decrement(index) {
      this.DECREMENT_CART_ITEM(index);
    },
    deleteFromCart(index) {
      this.DELETE_FROM_CART(index);
    },

    getToBuy() {
      if (this.IS_AUTHORIZED_USER == true) {
      this.START_PAYMENT(this.cart_data)
      } else {
        this.START_AUTHORIZATION()
      }
    },
  },

  watch: {},
};
</script>

<style lang="scss">
.v-cart {
  margin-bottom: 100px;
  &__total {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    padding: $padding * 2 $padding * 3;
    display: flex;
    justify-content: center;
    background: $green-bg;
    color: #ffffff;
    font-size: 20px;
  }

  .total__name {
    margin-right: $margin * 2;
  }

  .v-catalog__link_to_cart {
    text-decoration: none;
    color: blue;
  }

  .get-to-buy {
    font-size: 16px;
  }
}
</style>