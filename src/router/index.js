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
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
