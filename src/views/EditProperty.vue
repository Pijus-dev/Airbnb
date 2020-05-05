<template>
  <div>
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Edit Property: {{ property.title }}</h1>
        </div>
      </div>
    </section>
    <div class="container">
      <br />
      <router-link to="/properties"> Back to all properties</router-link>
      <form @submit.prevent="edit">
        <div class="edit">
          <b-notification
            :active.sync="isActive"
            v-bind:class="type"
            aria-close-label="Close notification"
          >
            {{ notification }}
          </b-notification>
          <div class="columns">
            <div class="column">
              <b-field label="Property Price" expanded>
                <b-input
                  placeholder="Property Price"
                  type="text"
                  v-model="price"
                  required
                ></b-input>
              </b-field>
            </div>
          </div>
          <b-field label="Description">
            <b-input v-model="name" maxlength="1000" type="textarea"></b-input>
          </b-field>
          <b-field
            v-for="index in count"
            :key="index"
            :label="'Images' + index"
          >
            <b-input
              :disabled="img[index]"
              v-model="img[index - 1]"
              placeholder="URL"
              required
            ></b-input>
          </b-field>
          <p v-if="display" @click="addImage" class="add">
            &#10010; Add another image
          </p>
          <div class="buttons is-right">
            <b-button native-type="submit" type="button is-warning"
              >Edit</b-button
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
export default {
  name: "Property",
  data() {
    return {
      property: {
        id: "",
        title: undefined
      },
      id: this.$route.params.id,
      isActive: false,
      type: "",
      notification: "",
      price: "",
      img: [],
      name: "",
      display: true,
      count: 1
    };
  },
  methods: {
    get() {
      firebase
        .firestore()
        .collection("properties")
        .doc(this.id)
        .get()
        .then(data => {
          (this.property.id = data.id),
            (this.property.title = data.data().text);
        });
    },
    edit() {
      firebase
        .firestore()
        .collection("properties")
        .doc(this.id)
        .update({
          price: this.price,
          img: this.img,
          name: this.name
        })
        .then(() => {
          (this.isActive = true),
            (this.type = "is-warning"),
            (this.notification = "You have successfully updated your property");
        });
    },
    addImage() {
      this.count++;
      if (this.count >= 5) {
        this.display = false;
      }
    }
  },
  beforeMount() {
    this.get();
  }
};
</script>

<style>
.edit {
  margin: 30px 0;
  padding: 30px;
  box-shadow: 0 0px 2px 2px #eee;
  border-radius: 8px;
}
.add {
  cursor: pointer;
  color: rgb(196, 148, 60);
}
</style>
