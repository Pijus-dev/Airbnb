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
              <router-link to="/user">Hello, {{ userName }} </router-link>
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
import "firebase/firebase-firestore";
import "firebase/auth";
export default {
  data() {
    return {
      userName: ""
    };
  },
  computed: {
    signIn() {
      return this.$route.path !== "/" && this.$route.path !== "/register";
    }
  },
  methods: {
    logout() {
      firebase.auth().signOut();
      this.$router.push("/");
    },
    getName() {
      let user = firebase.auth().currentUser;
      if (user != null) {
        firebase
          .firestore()
          .collection("admin")
          .doc(user.uid)
          .get()
          .then(doc => {
            this.userName = doc.data().name;
          });
      }
    }
  },
  beforeMount() {
    this.getName();
    console.log(firebase.auth().currentUser.uid);
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300&display=swap");
* {
  font-family: "Rubik", sans-serif;
}
.text {
  background-color: rgba(24, 143, 77, 0.55);
}
h1 {
  color: rgb(83, 82, 82) !important;
  font-size: 2rem !important;
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
