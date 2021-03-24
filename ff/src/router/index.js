import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import firebase from "firebase/app";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "login",
      meta: { layout: "auth" },
      component: () => import("../views/Login.vue"),
    },
    {
      path: "/register",
      name: "register",
      meta: { layout: "auth" },
      component: () => import("../views/register.vue"),
    },
    {
      path: "/",
      name: "Home",
      meta: { layout: "MainLayout", auth: true },
      component: Home,
    },

    {
      path: "/categories",
      name: "categories",
      meta: { layout: "MainLayout", auth: true },
      component: () => import("../views/Categories.vue"),
    },
    {
      path: "/detail-record/:id",
      name: "detail-record",
      meta: { layout: "MainLayout", auth: true },
      component: () => import("../views/detail-record.vue"),
    },
    {
      path: "/history",
      name: "history",
      meta: { layout: "MainLayout", auth: true },
      component: () => import("../views/history.vue"),
    },
    {
      path: "/planning",
      name: "planning",
      meta: { layout: "MainLayout", auth: true },
      component: () => import("../views/planning.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      meta: { layout: "MainLayout", auth: true },
      component: () => import("../views/profile.vue"),
    },
    {
      path: "/record",
      name: "record",
      meta: { layout: "MainLayout", auth: true },
      component: () => import("../views/record.vue"),
    },
  ],
});
router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requireAuth = to.matched.some((record) => record.meta.auth);
  if (requireAuth && !currentUser) {
    next("/login?message=login");
  } else {
    next();
  }
});

export default router;
