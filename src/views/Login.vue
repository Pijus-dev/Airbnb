<template>
  <div class="about">
    <Hero text="Login" />
    <div class="container">
      <div class="login animate__animated animate__bounceInUp">
        <b-notification
          :active.sync="isActive"
          v-bind:class="type"
          aria-close-label="Close notification"
        >
          {{ notification }}
        </b-notification>
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
            <b-button native-type="submit" id="btn">Login</b-button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import Hero from "../components/Hero";

export default {
  name: "Login",
  components: { Hero },
  data() {
    return {
      email: "",
      password: "",
      isActive: false,
      notification: "",
      type: ""
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
          (this.type = "is-danger"),
            (this.isActive = true),
            (this.notification = e.message);
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
.about{
  height: 80vh;
}
</style>
