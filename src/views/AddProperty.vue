<template>
  <div>
    <Hero text="Add property"/>
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
                  <option v-for="value in cities" :value="value" :key="value">{{
                    value
                  }}</option>
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
              :disabled="index < count"
              v-model="img[index - 1]"
              placeholder="URL"
            ></b-input>
          </b-field>
          <p v-if="display" @click="addImage" class="add">
            &#10010; Add another image
          </p>
          <div class="buttons is-right">
            <b-button native-type="submit" id="btn">Add</b-button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firebase-firestore";
import Hero from "../components/Hero";
export default {
  name: "AddProperty",
  components: { Hero },
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
      count: 1,
      array: [],
      cities: []
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
            (this.price = ""),
            (this.name = ""),
            (this.img = ""),
            (this.text = ""),
            (this.city = ""),
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
    },
    getCities() {
      fetch(
        "https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-capital-city.json"
      )
        .then(response => response.json())
        .then(data => {
          data.forEach(item => {
            this.array.push(item.city);
            this.cities = this.array.filter(item => item !== null);
          });
        });
    }
  },
  beforeMount() {
    this.getCities();
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
</style>
