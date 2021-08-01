import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/map",
    name: "MapView",
    component: () => import("@/views/Maps/MapView.vue"),
  },
  {
    path: "/",
    name: "Signin",
    component: () => import("@/views/Auth/Signin.vue"),
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("@/views/Auth/Signup.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
