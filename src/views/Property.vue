<template>
  <div>
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            {{ property.title }}
          </h1>
        </div>
      </div>
    </section>
    <div class="container">
      <br />
      <router-link to="/properties"> Back to all properties</router-link>
      <hr />
      <h1 class="title">{{ property.city }}</h1>
      <div class="columns">
        <div class="column">
          <div class="flex-card">
            <img :src="property.img" />
          </div>
          <p class="subtitle">{{ property.price }}</p>
          <div class="card-content">
            <p>{{ property.name }}</p>
          </div>
        </div>
      </div>
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
        price: undefined
      },
      id: this.$route.params.id
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
            (this.property.title = data.data().text),
            (this.property.img = data.data().img),
            (this.property.price = data.data().price),
            (this.property.city = data.data().city);
          this.property.name = data.data().name;
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
}
.flex-card {
  display: flex;
  justify-content: center;
}
p {
  text-align: center;
  color: silver;
}
</style>
