import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/UserStore";
import routers from "./config";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login.vue"),
    },
    {
      path: "/mainBox",
      name: "mainBox",
      component: () => import("@/views/mainBox.vue"),
    },
  ],
});
const configRoutes = () => {
  if (!router.hasRoute("mainBox")) {
    router.addRoute({
      path: "/mainBox",
      name: "mainBox",
      component: () => import("../views/mainBox.vue"),
    });
    routers.forEach((i) => {
      router.addRoute("mainBox", i);
    });
    const userStore = useUserStore();
    userStore.isGetRouter=true
  }
};
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (to.name == "login") {
    next();
  } else {
    if (!localStorage.getItem("token")) {
      next({ path: "/login" });
    } else {
      if (!userStore.isGetRouter) {
        router.removeRoute("mainBox");
        configRoutes();
        next({path:to.fullPath})
      } else {
        next();
      }
    }
  }
});
export default router;
