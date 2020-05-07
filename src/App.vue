<template>
  <section>
    <div class="container">
      <b-navbar>
        <template slot="brand">
          <b-navbar-item tag="router-link" :to="{ path: '/register' }">
            <img src="../public/logo3.png" />
          </b-navbar-item>
        </template>

        <template slot="end">
          <span class="nav" v-if="signIn">
            <b-navbar-item>
              <router-link to="/properties">Properties</router-link>
            </b-navbar-item>
            <b-navbar-item>
              <b-button id="btn" @click="logout">LogOut</b-button>
            </b-navbar-item>
          </span>
          <span class="nav" v-else>
            <b-navbar-item>
              <router-link to="/register">Register</router-link>
            </b-navbar-item>
            <b-navbar-item>
              <router-link to="/">Login</router-link>
            </b-navbar-item>
          </span>
        </template>
      </b-navbar>
    </div>
    <router-view />
  </section>
</template>
<script>
import firebase from "firebase/app";
import "firebase/auth";
export default {
  computed: {
    signIn() {
      return this.$route.path !== "/" && this.$route.path !== "/register";
    }
  },
  methods: {
    logout() {
      firebase.auth().signOut();
      this.$router.push("/");
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300&display=swap");
* {
  font-family: "Rubik", sans-serif;
}
.nav {
  display: flex;
}
.navbar-item img {
  max-height: 60px !important;
}
a {
  color: rgb(66, 134, 66) !important;
  font-size: 1em;
}
#btn {
  color: rgb(66, 134, 66) !important;
   border-color: rgb(66, 134, 66) !important;
}
#btn:hover {
  color: white !important;
  background-color: rgb(66, 134, 66) !important ;
}
</style>
