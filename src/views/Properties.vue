<template>
  <div>
    <Spinner v-bind:loading="loadingScreen" />
    <section class="hero text">
      <div class="hero-body">
        <div class="container">
          <h1>
            Properties
          </h1>
        </div>
      </div>
    </section>
    <div class="container">
      <div class="properties">
        <div
          class="columns"
          v-for="property in properties"
          :key="property.text"
        >
          <div class="column">
            <div class="card">
              <div class="card-content">
                <div class="media">
                  <div class="media-left">
                    <figure class="image">
                      <img
                        @click="redirectTo(property.id)"
                        :src="property.img"
                        :alt="property.text"
                        class="property-img"
                      />
                    </figure>
                  </div>
                  <div class="media-content">
                    <p id="tekstas">{{ property.text }}</p>
                    <p class="subtitle is-6">{{ property.city }}</p>
                    <p class="subtitle is-4">{{ property.price }}</p>
                  </div>
                  <div class="media-right">
                    <p
                      @click="redirectToEdit(property.id)"
                      class="subtitle is-4 update"
                    >
                      Edit
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="buttons">
          <b-button @click="redirect" type="button is-info" outlined
            >Add Property</b-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firebase-firestore";
import Spinner from "../components/Spinner";
export default {
  name: "Properties",
  data() {
    return {
      properties: [],
      loadingScreen: true
    };
  },
  components: { Spinner },
  methods: {
    getData() {
      firebase
        .firestore()
        .collection("properties")
        .get()
        .then(data => {
          data.forEach(product => {
            const obj = {
              id: product.id,
              text: product.data().text,
              price: product.data().price,
              city: product.data().city,
              img: product.data().img[0]
            };
            this.properties.push(obj);
          });
        })
        .then(() => {
          this.loadingScreen = false;
        });
    },
    redirect() {
      this.$router.push("/addProperty");
    },
    redirectTo(id) {
      this.$router.push("/properties/id/" + id);
    },
    redirectToEdit(id) {
      this.$router.push("/properties/city/" + id);
    }
  },
  beforeMount() {
    this.getData();
  }
};
</script>

<style>
.image img {
  width: 150px !important;
}
.properties {
  margin-top: 20px;
}
.property-img {
  cursor: pointer;
}
.property-img:hover {
  opacity: 0.7;
}
.update {
  cursor: pointer;
  margin-top: 35px;
}
.text {
  background-color: rgba(24, 143, 77, 0.55);
}
#tekstas {
  color: rgb(29, 29, 29) !important;
  font-size: 1.5rem !important;
}
h1 {
  color: rgb(83, 82, 82) !important;
  font-size: 2rem !important;
}
</style>
