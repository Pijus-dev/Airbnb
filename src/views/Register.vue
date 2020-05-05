<template>
  <div>
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            REGISTER
          </h1>
        </div>
      </div>
    </section>
    <div class="container">
      <form @submit.prevent="addInfo">
        <div class="register">
          <b-notification
            :active.sync="isActive"
            v-bind:class="type"
            aria-close-label="Close notification"
          >
            {{ notification }}
          </b-notification>
          <div class="columns">
            <div class="column">
              <b-field grouped>
                <b-field label="Title">
                  <b-select placeholder="Title">
                    <option>Mr.</option>
                    <option>Ms.</option>
                    <option>Mrs.</option>
                  </b-select>
                </b-field>
                <b-field label="Name" expanded>
                  <b-input
                    placeholder="Name"
                    type="text"
                    v-model="name"
                    required
                  ></b-input>
                </b-field>
              </b-field>
            </div>
            <div class="column">
              <b-field label="Surname">
                <b-input
                  placeholder="Surname"
                  v-model="surname"
                  type="text"
                  required
                ></b-input>
              </b-field>
            </div>
          </div>
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
                  placeholder="password"
                  type="password"
                  required
                ></b-input>
              </b-field>
            </div>
          </div>
          <div class="buttons is-right">
            <b-button native-type="submit" type="button is-dark" outlined
              >Register</b-button
            >
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firebase-firestore";
import "firebase/auth";
// import Notification from "../components/Notification";

export default {
  name: "Register",
  // components: { Notification },
  data() {
    return {
      name: "",
      surname: "",
      email: "",
      password: "",
      isActive: false,
      type: "",
      notification: ""
    };
  },
  methods: {
    addInfo() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(cred => {
          firebase
            .firestore()
            .collection("admin")
            .doc(cred.user.uid)
            .set({
              name: this.name,
              surname: this.surname
            });
        })
        .then(() => {
          (this.isActive = true),
            (this.type = "is-warning"),
            (this.notification =
              "You have successfuly registered, please go to login page");
        });
    }
    // redirect() {
    //   this.$router.push("/login");
    // }
  }
};
</script>
<style scoped>
.register {
  margin: 30px 0;
  padding: 30px;
  box-shadow: 0 0px 2px 2px #eee;
  border-radius: 8px;
}
</style>
