<template>
  <div>
    <Spinner v-bind:loading="loadingScreen" />
    <Hero :text="property.title" />
    <div class="container">
      <br />
      <router-link to="/properties"> Back to all properties</router-link>
      <hr />
      <div class="columns">
        <div class="column">
          <h1>{{ property.city }}</h1>
          <p class="subtitle is-3">{{ property.price }}&euro; per night</p>
          <p class="subtitle is-4">{{ property.name }}</p>
        </div>
        <div class="column">
          <b-carousel class="carousel" :indicator="false" :pause-info="false">
            <b-carousel-item v-for="(carousel, i) in property.img" :key="i">
              <img :src="carousel" />
            </b-carousel-item>
          </b-carousel>
          <!-- <p class="subtitle">{{ property.price }}</p> -->
          <!-- <div class="card-content">
            <p>{{ property.name }}</p>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firebase-firestore";
import Spinner from "../components/Spinner";
import Hero from "../components/Hero";
export default {
  name: "Property",
  data() {
    return {
      property: {
        id: "",
        price: undefined
      },
      id: this.$route.params.id,
      loadingScreen: true
    };
  },
  components: { Spinner, Hero },
  methods: {
    get() {
      firebase
        .firestore()
        .collection("properties")
        .doc(this.id)
        .get()
        .then(data => {
          (this.property.id = data.id),
            (this.property.title = data.data().text),
            (this.property.img = data.data().img),
            (this.property.price = data.data().price),
            (this.property.city = data.data().city);
          this.property.name = data.data().name;
        })
        .then(() => {
          this.loadingScreen = false;
        });
    }
  },
  beforeMount() {
    this.get();
  }
};
</script>

<style scoped>
img {
  height: 400px !important;
  border-radius: 8px;
}
.flex-card {
  display: flex;
  justify-content: center;
}
p {
  color: silver;
}
</style>
