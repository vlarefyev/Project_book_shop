<template>
  <div class="v-catalog">
    <div class="v-catalog__nav-bar">
      <v-user-bar></v-user-bar>
      <router-link
        class="v-catalog__link_to_cart"
        :to="{ name: 'cart', params: { cart_data: CART } }"
      >
        <div>Корзина: {{ CART.length }}</div>
      </router-link>
    </div>

    <h1>Книги:</h1>
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
import vUserBar from "./v-user-bar";

export default {
  name: "v-catalog",
  components: { VCatalogItem, vUserBar },
  props: {},
  data() {
    return {};
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
  &__link_to_cart {
    p {
      margin: 0;
    }
    padding: $padding * 2;
    border: solid 1px #aeaeae;
  }

  .v-catalog__link_to_cart {
    text-decoration: none;
    color: blue;
  }
}
</style>