<template>
  <section>
    <div class="container">
      <b-navbar>
        <template slot="brand">
          <b-navbar-item tag="router-link" :to="{ path: '/register' }">
            <img
              src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
              alt="Lightweight UI components for Vue.js based on Bulma"
            />
          </b-navbar-item>
        </template>

        <template slot="end">
          <span class="nav" v-if="signIn">
            <b-navbar-item>
              <router-link to="/properties">Properties</router-link>
            </b-navbar-item>
            <b-navbar-item>
              <b-button type="button is-primary" outlined @click="logout"
                >LogOut</b-button
              >
            </b-navbar-item>
          </span>
          <span class="nav" v-else>
            <b-navbar-item>
              <router-link to="/register">Register</router-link>
            </b-navbar-item>
            <b-navbar-item>
              <router-link to="/login">Login</router-link>
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
      return this.$route.path !== "/login" && this.$route.path !== "/register";
    }
  },
  methods: {
    logout() {
      firebase.auth().signOut();
      this.$router.push("/login");
    }
  }
};
</script>

<style>
.nav {
  display: flex;
}
</style>
