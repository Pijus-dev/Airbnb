<template>
  <div class="about">
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            LOGIN
          </h1>
        </div>
      </div>
    </section>
    <div class="container">
      <div class="login">
        <form @submit.prevent="login">
          <div class="columns">
            <div class="column">
              <b-field label="Email">
                <b-input
                  v-model="email"
                  type="email"
                  placeholder="some@email.com"
                  required
                ></b-input>
              </b-field>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <b-field label="Password">
                <b-input
                  v-model="password"
                  type="password"
                  placeholder="password"
                  required
                ></b-input>
              </b-field>
            </div>
          </div>
          <div class="buttons is-right">
            <b-button native-type="submit" type="button is-dark" outlined
              >Login</b-button
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push("/properties");
        })
        .catch(e => {
          alert(e.message);
        });
    }
  }
};
</script>
<style scoped>
.login {
  margin: 30px 0;
  padding: 30px;
  box-shadow: 0 0px 2px 2px #eee;
  border-radius: 8px;
}
</style>
