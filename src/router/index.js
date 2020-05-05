import Vue from "vue";
import VueRouter from "vue-router";
// import firebase from "firebase/app";
import "firebase/auth";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import Properties from "../views/Properties.vue";
import AddProperty from "../views/AddProperty.vue";
import Property from "../views/Property.vue";
import EditProperty from "../views/EditProperty.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/properties",
    name: "Properties",
    component: Properties
  },
  {
    path: "/properties/id/:id",
    name: "Property",
    component: Property
  },
  {
    path: "/properties/city/:id",
    name: "EditProperty",
    component: EditProperty
  },
  {
    path: "/addProperty",
    name: "AddProperty",
    component: AddProperty
  }
];
const router = new VueRouter({
  mode: "history",
  routes
});

// const router = new VueRouter({
//   mode: "history",
//   base: process.env.BASE_URL,
//   routes: [
//     {
//       path: "/",
//       redirect: "/login"
//     },
//     {
//       path: "/register",
//       name: "Register",
//       component: Register,
//       meta: {
//         requiresAuth: true
//       }
//     },
//     {
//       path: "/login",
//       name: "Login",
//       component: Login
//     }
//   ]
// });

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     firebase.auth().onAuthStateChanged(user => {
//       if (user) {
//         next();
//       } else {
//         next({
//           path: "/login"
//         });
//       }
//     });
//   } else {
//     firebase.auth().onAuthStateChanged(user => {
//       if (user) {
//         next({
//           path: "/register"
//         });
//       } else {
//         next();
//       }
//     });
//   }
// });

export default router;
