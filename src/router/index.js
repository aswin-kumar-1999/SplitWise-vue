import { createRouter, createWebHistory } from "vue-router";
import DashBoard from "../components/DashBoard/DashBoard.vue"
import Recent from "../components/Recent/Recent.vue"
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
  },
  {
    path:'/activity',
    name:'Recent',
    component:Recent
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
