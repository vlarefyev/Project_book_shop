<template>
  <div class="v-admin-form">
    <router-link :to="{ name: 'admin' }"></router-link>
    <h1>Панель администратора</h1>
    <div class="v-admin-form__book">
      <div class="v-admin-form__add-book">
        <h2>Управление книгами</h2>
        <div class="v-admin-form__field">
          <p>
            <label>Название:</label>
            <input v-model="name_book" placeholder="name" />
          </p>
          <p>
            <label>Стоимость:</label>
            <input v-model="price_book" placeholder="price" />
          </p>
          <p>
            <label>Изображение:</label>
            <input v-model="image_book" placeholder="image" />
          </p>
        </div>
        <button @click="addBook">Добавить книгу</button>
      </div>

      <div class="v-admin-form__del-book">
        <div class="v-admin-form__field">
          <p>
            <label>Название:</label>
            <input v-model="name_book_to_del" placeholder="name" />
          </p>
          <button @click="delBook">Удалить книгу</button>
        </div>
      </div>
    </div>

    <div class="v-admin-form__user">
      <h2>Управление пользователями</h2>
      <div class="v-admin-form__field">
        <p>
          <label>Пользователь:</label>
          <input v-model="user_name" placeholder="user_name" />
        </p>
        <p>
          <label>Счёт:</label>
          <input v-model="user_balance" placeholder="price" />
        </p>
      </div>
      <button @click="addUser">Добавить пользователя</button>
    </div>

    <a class="go-to-start-page" href="/">Вернуться на главную страницу</a>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "v-admin-form",
  data() {
    return {
      name_book: "",
      price_book: "",
      image_book: "",
      name_book_to_del: "",
      user_name: "",
      user_balance: ""
    };
  },
  methods: {
    addBook() {
      return (
        axios
          .post("http://194.67.111.249:8080/books/save/", {
            name: this.name_book,
            price: this.price_book,
            img: this.image_book,
          })
          .then((response) => console.log(response))
          .catch((error) => console.log(error)),
        (this.name_book = ""),
        (this.price_book = ""),
        (this.image_book = "")
      );
    },

    delBook() {
      let url_to_del_book =
        "http://194.67.111.249:8080/books/delete/" + this.name_book_to_del;
      console.log(url_to_del_book);
      return (
        axios
          .delete(url_to_del_book)
          .then((response) => console.log(response))
          .catch((error) => console.log(error)),
        (this.name_book_to_del = "")
      );
    },

    addUser(){
      return (
        axios
        .post("http://194.67.111.249:8080/user/create", {
          money: this.user_balance,
          name: this.user_name
        })
        .then((response) => console.log(response))
        .catch((error) => console.log(error)),
        (this.user_balance = 0),
        (this.user_name = "")
      )
    }
  },
};
</script>

<style lang="scss">
.v-admin-form {
  margin-top: 100px;
  h1 {
    margin-bottom: 100px;
  }

  button {
    background-color: $green-bg;
    color: #fff;
    border: 0;
    padding: $padding;
  }

  &__add-book, &__dell-book, &__user{
    margin-bottom: 30px;
  }

  &__field {
    margin: 0 auto;
    width: 320px;
    p {
      display: flex;
      justify-content: space-between;
    }
  }
}
.go-to-start-page {
  display: block;
  margin-top: 15px;
}


  .go-to-start-page{
    padding: $padding $padding*2;
    background: rgb(59, 59, 233);
    color: #fff;
    border: 0;
    border-radius: $radius;
    cursor: pointer;
    text-decoration: none;
    width: 200px; 
    display: inline-block;
  }

</style>