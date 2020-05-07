import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase/app";
import "firebase/auth";
// import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
// import Properties from "../views/Properties.vue";
// import AddProperty from "../views/AddProperty.vue";
// import Property from "../views/Property.vue";
// import EditProperty from "../views/EditProperty.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: {
      requiredAnon: true
    }
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Register.vue"),
    meta: {
      requiredAnon: true
    }
  },
  {
    path: "/properties",
    name: "Properties",
    component: () =>
      import(/* webpackChunkName: "properties" */ "../views/Properties.vue"),
    meta: {
      requiredAuth: true
    }
  },
  {
    path: "/properties/id/:id",
    name: "Property",
    component: () =>
      import(/* webpackChunkName: "property" */ "../views/Property.vue"),
    meta: {
      requiredAuth: true
    }
  },
  {
    path: "/properties/city/:id",
    name: "EditProperty",
    component: () =>
      import(/* webpackChunkName: "editproperty" */ "../views/EditProperty.vue"),
    meta: {
      requiredAuth: true
    }
  },
  {
    path: "/addProperty",
    name: "AddProperty",
    component: () =>
      import(/* webpackChunkName: "addproperty" */ "../views/AddProperty.vue"),
    meta: {
      requiredAuth: true
    }
  }
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  firebase.auth().onAuthStateChanged(user => {
    if (user && to.matched.some(record => record.meta.requiredAnon)) {
      next({
        path: "/properties"
      });
    } else if (!user && to.matched.some(record => record.meta.requiredAuth)) {
      next({
        path: "/"
      });
    } else {
      next();
    }
  });
});

export default router;
