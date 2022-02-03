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
    path: "/action",
    name: "action",
    meta: { layout: "main" },
    component: () => import("@/views/user/action.vue"),
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
  {
    path: "/terms",
    name: "terms",
    meta: { layout: "main" },
    component: () => import("@/views/terms.vue"),
  },
  {
    path: "/news",
    name: "news",
    meta: { layout: "main" },
    component: () => import("@/views/news.vue"),
  },
  {
    path: "/games",
    name: "games",
    meta: { layout: "main" },
    component: () => import("@/views/games.vue"),
  },
  {
    path: "/user",
    name: "user",
    meta: { layout: "main" },
    component: () => import("@/views/user.vue"),
  },
  {
    path: "/user/panel",
    name: "user-panel",
    meta: { layout: "main" },
    component: () => import("@/views/user/panel.vue"),
  },
  {
    path: "/user/subscribe",
    name: "user-subscribe",
    meta: { layout: "main" },
    component: () => import("@/views/user/subscribe.vue"),
  },
  {
    path: "/user/edit",
    name: "user-edit",
    meta: { layout: "main" },
    component: () => import("@/views/user/edit.vue"),
  },
  {
    path: "/user/settings",
    name: "user-settings",
    meta: { layout: "main" },
    component: () => import("@/views/user/settings.vue"),
  },
  {
    path: "/user/changeEmail",
    name: "user-change-email",
    meta: { layout: "main" },
    component: () => import("@/views/user/changeEmail.vue"),
  },
  {
    path: "/user/changePassword",
    name: "user-change-password",
    meta: { layout: "main" },
    component: () => import("@/views/user/changePassword.vue"),
  },
  {
    path: "/user/support",
    name: "user-support",
    meta: { layout: "main" },
    component: () => import("@/views/user/support.vue"),
  },
  {
    path: "/user/wallet/withdraw",
    name: "user-wallet-withdraw",
    meta: { layout: "main" },
    component: () => import("@/views/user/wallet/withdraw.vue"),
  },
  {
    path: "/user/wallet/deposit",
    name: "user-wallet-deposit",
    meta: { layout: "main" },
    component: () => import("@/views/user/wallet/deposit.vue"),
  },
  {
    path: "/user/wallet/history",
    name: "user-wallet-history",
    meta: { layout: "main" },
    component: () => import("@/views/user/wallet/history.vue"),
  },
  {
    path: "/user/team",
    name: "user-team",
    meta: { layout: "main" },
    component: () => import("@/views/user/team/index.vue"),
  },
  {
    path: "/user/team/:id",
    name: "user-team-edit",
    meta: { layout: "main" },
    props: true,
    component: () => import("@/views/user/team/create.vue"),
  },
  {
    path: "/user/team/manage/:id",
    name: "user-team-manage",
    meta: { layout: "main" },
    props: true,
    component: () => import("@/views/user/team/manage.vue"),
  },
  {
    path: "/user/team/:id/players",
    name: "user-team-players",
    meta: { layout: "main" },
    props: true,
    component: () => import("@/views/user/team/players.vue"),
  },
  {
    path: "/leagues",
    name: "leagues",
    meta: { layout: "main" },
    component: () => import("@/views/leagues/index.vue"),
  },
  {
    path: "/leagues/:game",
    name: "leagues-game",
    meta: { layout: "main" },
    props: true,
    component: () => import("@/views/leagues/game.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
