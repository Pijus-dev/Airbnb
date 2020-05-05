<template>
  <div>
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
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
                    <p class="title is-4">{{ property.text }}</p>
                    <p class="subtitle is-6">{{ property.city }}</p>
                    <p class="subtitle is-4">{{ property.price }}</p>
                  </div>
                  <div class="media-right">
                    <p
                      @click="redirectToEdit(property.id)"
                      class="subtitle is-4 edit"
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
export default {
  name: "Properties",
  data() {
    return {
      properties: []
    };
  },
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
              img: product.data().img
            };
            this.properties.push(obj);
          });
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
.edit{
  cursor: pointer;
}
</style>
