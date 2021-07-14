<template>
  <div class="v-popup">
    <div class="v-popup__header">
      <span>
          <slot name="namePopup"></slot>
      </span>
      <span>
        <i class="material-icons" @click="closePopup">close</i>
      </span>
    </div>
    <div class="v-popup__content">
      <slot name="bodyPopup"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "v-popup",
  props: {},
  data() {
    return {};
  },
  methods: {
    closePopup() {
      this.$emit("closePopup");
    },
  },
};
</script>

<style lang="scss">
.v-popup {
  padding: 16px;
  position: fixed;
  top: 62px;
  right: 0;
  width: 400px;
  background: #fff;
  box-shadow: 0 0 17px 0 #e7e7e7;
  &__header,
  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__content {
    justify-content: center;
    align-items: center;
  }

  .submit_btn {
    padding: 8px;
    color: #fff;
    background: $green-bg;
  }

  .close_modal {
    padding: 8px;
    color: #fff;
    background: red;
  }

  .material-icons {
    cursor: pointer;
  }
}
</style>