<template>
  <div>
    <section class="hero text">
      <div class="hero-body">
        <div class="container">
          <h1>
            Add Property
          </h1>
        </div>
      </div>
    </section>
    <div class="container">
      <form @submit.prevent="addProperty">
        <div class="property">
          <b-notification
            :active.sync="isActive"
            v-bind:class="type"
            aria-close-label="Close notification"
          >
            {{ notification }}
          </b-notification>
          <div class="columns">
            <div class="column">
              <b-field label="Property Name" expanded>
                <b-input
                  placeholder="Property Name"
                  type="text"
                  v-model="text"
                  required
                ></b-input>
              </b-field>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <b-field label="City">
                <b-select v-model="city" expanded placeholder="Select a city">
                  <option value="Kaunas">Kaunas</option>
                  <option value="Vilnius">Vilnius</option>
                  <option value="Palanga">Palanga</option>
                </b-select>
              </b-field>
            </div>
            <div class="column">
              <b-field label="Price per night">
                <b-input placeholder="price" v-model="price" required></b-input>
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
            ></b-input>
          </b-field>
          <p v-if="display" @click="addImage" class="add">
            &#10010; Add another image
          </p>
          <div class="buttons is-right">
            <b-button native-type="submit" type="button is-warning"
              >Add</b-button
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
  name: "AddProperty",
  data() {
    return {
      price: "",
      text: "",
      img: [],
      city: "",
      type: "",
      name: "",
      notification: "",
      display: true,
      isActive: false,
      count: 1
    };
  },
  methods: {
    addProperty() {
      firebase
        .firestore()
        .collection("properties")
        .add({
          price: this.price,
          text: this.text,
          img: this.img,
          city: this.city,
          name: this.name
        })
        .then(() => {
          (this.isActive = true),
            (this.notification = "You have successfully added a property"),
            (this.type = "is-warning");
        })
        .catch(e => {
          alert(e.message);
        });
    },
    addImage() {
      this.count++;
      if (this.count >= 5) {
        this.display = false;
      }
    }
  }
};
</script>

<style scoped>
.property {
  margin: 30px 0;
  padding: 30px;
  box-shadow: 0 0px 2px 2px #eee;
  border-radius: 8px;
}
.add {
  cursor: pointer;
  color: rgb(196, 148, 60);
}
.text {
  background-color: rgba(24, 143, 77, 0.55);
}
h1 {
  color: rgb(83, 82, 82) !important;
  font-size: 2rem !important;
}
</style>
