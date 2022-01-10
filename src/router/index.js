import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "main",
    meta: { layout: "main" },
    component: () => import("@/views/main.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    meta: { layout: "main" },
    component: () => import("@/views/404Error.vue"),
  },
  {
    path: "/login",
    name: "login",
    meta: { layout: "empty" },
    component: () => import("@/views/login.vue"),
  },
  {
    path: "/signup",
    name: "signUp",
    meta: { layout: "empty" },
    component: () => import("@/views/signup.vue"),
  },
  {
    path: "/signupNext",
    name: "signUpNext",
    meta: { layout: "empty" },
    component: () => import("@/views/signupNext.vue"),
  },
  {
    path: "/forgot",
    name: "forgot",
    meta: { layout: "empty" },
    component: () => import("@/views/forgot.vue"),
  },
  {
    path: "/verify",
    name: "verify",
    meta: { layout: "empty" },
    component: () => import("@/views/verify.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
