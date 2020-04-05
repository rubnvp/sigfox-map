import Vue from "vue";
import VueRouter from "vue-router";

import AppLogin from "@/views/AppLogin.vue";
import RouteMap from "@/views/RouteMap.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: AppLogin,
    meta: { isPublic: true },
  },
  {
    path: "/",
    name: "route-map",
    component: RouteMap
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const isLogged = Boolean(localStorage.getItem('username'));
  const isPublic = to.meta && to.meta.isPublic;

  if (!isLogged && !isPublic) {
    next({name: 'login'}); // redirect to login if it´s not logged
  }
  else {
    next();
  }
})

export default router;
