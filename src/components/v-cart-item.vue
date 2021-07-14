<template>
  <div class="v-cart-item">
    <img class="v-cart-item__image" :src="cart_item_data.img" alt="" />
    <div class="v-cart-item__info">
      <p>{{ cart_item_data.name }}</p>
      <p>{{ cart_item_data.price }}</p>
    </div>
    <div class="v-cart-item__nav">
    <div class="v-cart-item__quantity">
      <p>Количество</p>
      <span>
        <span class="quantity__btn" @click="decrementItem">-</span>
        {{ cart_item_data.quantity }}
        <span class="quantity__btn" @click="incrementItem">+</span>
      </span>
    </div>
    <button class="del__btn btn" @click="deleteFromCart">Удалить</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "v-cart-item",
  components: {},
  props: {
    cart_item_data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    deleteFromCart() {
      this.$emit("deleteFromCart");
    },

    incrementItem() {
      this.$emit("increment");
    },

    decrementItem() {
      this.$emit("decrement");
    },
  },
  watch: {},
};
</script>

<style lang="scss">
.v-cart-item {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 8px 0 #e0e0e0;
  padding: $padding * 2;
  margin-bottom: $margin * 2;
  &__image {
    max-width: 100px;
  }
  &__nav {
    display: flex;
  }

  &__quantity {
    height: 52px;
    margin-top: -10px;
  }
}

.quantity__btn {
  cursor: pointer;
}

.del__btn{
  margin-left: 60px;
  height: 52px;
  font-size: 16px;
}
</style>