import { createRouter, createWebHistory } from "vue-router";
import DashBoard from "../components/DashBoard/DashBoard.vue"
import Recent from "../components/Recent/Recent.vue"
import Group from '../components/Group/Group.vue'
import User from '../components/User/User.vue'
import AllExpense from '../components/AllExpense/AllExpense.vue'
const routes = [
  {
    path: "/",
    redirect: '/dashboard',
    component: DashBoard,
  },
  {
    path: '/dashboard',
    name: 'DashBoard',
    component: DashBoard
  },
  {
    path: '/activity',
    name: 'Recent',
    component: Recent
  },
  {
    path:'/expense',
    name:"AllExpense",
    component:AllExpense
  },
  {
    path: '/group/:id',
    name: 'Group',
    component: Group
  },
   {
    path: '/user/:id',
    name: 'User',
    component: User
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
