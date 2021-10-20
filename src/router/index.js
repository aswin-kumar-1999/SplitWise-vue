import { createRouter, createWebHistory } from "vue-router";
import DashBoard from "../components/DashBoard/DashBoard.vue"

const routes = [
  {
    path: "/",
    redirect:'/dashboard',
    component: DashBoard,
  },
  {
    path:'/dashboard',
    name:'DashBoard',
    component:DashBoard
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
