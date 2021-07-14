<template>
  <div class="v-user-bar">
    <v-popup v-if="IS_INFO_POPUP_VISIBLE && !IS_AUTHORIZED_USER" @closePopup="closePopup">
      <template v-slot:namePopup>
        <h2>Авторизация</h2>
      </template>

      <template v-slot:bodyPopup>
        <p class="bodyPopup">
          <label>Введите имя пользователя:</label>
          <input v-model="user_name" placeholder="Имя пользователя" />
        </p>
        <button class="submit_btn btn" @click="checkUser">Войти</button>
      </template>
    </v-popup>

    <button
      class="auth_button btn"
      v-if="!IS_AUTHORIZED_USER"
      @click="startAuthorization"
    >
      Войти
    </button>

    <div class="v-user-bar__user" v-else>
      <p>{{ USER }} {{ BALANCE }} P.</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import vPopup from "./popup/v-popup";

export default {
  data() {
    return {
      user_name: "",
    };
  },
  components: {
    vPopup,
  },

  computed: {
    ...mapGetters(["USER", "BALANCE", "IS_AUTHORIZED_USER", "IS_INFO_POPUP_VISIBLE"]),
  },

  methods: {
    ...mapActions(["CHECK_USER_FROM_API", "START_AUTHORIZATION"]),

    checkUser() {
      console.log(this.user_name);
      this.CHECK_USER_FROM_API(this.user_name);
    },

    startAuthorization() {
    
      this.START_AUTHORIZATION()
      // this.isInfoPopupVisible = !this.isInfoPopupVisible;
    },

    closePopup() {
      this.START_AUTHORIZATION()
      // this.isInfoPopupVisible = false;
    },
  },
};
</script>


<style lang="scss">
.v-user-bar {
  &__user {
    p {
      margin: 0;
    }
    padding: $padding * 2;
    border: solid 1px #aeaeae;
  }
}

.bodyPopup {
  display: flex;
  justify-content: space-between;
}
.submit_btn {
  margin-left: 20px;
  border: 0;
}

.auth_button {
  border: solid 1px #aeaeae;
  margin: 10px;
  cursor: pointer;
  font-size: 16px;
  background-color: $green-bg;
  color: #fff;
}
</style>












